'use server'

// import { promises as fs } from 'fs'
// import path from 'path'
import { z } from 'zod'
// import { proposalSchema } from './data/schema'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { supabase } from '@/lib/supabaseClient'
// import * as pdfjsLib from 'pdfjs-dist'
// import type { TextItem } from 'pdfjs-dist/types/src/display/api'
import { v4 as uuidv4 } from 'uuid'
import mammoth from 'mammoth'

// LangChain imports
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

// Import LangChain Loaders and Node.js modules
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Schema for the uploaded files
const uploadedFileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  content: z.string(), // Base64 content required
})

export type UploadedFile = z.infer<typeof uploadedFileSchema>

// Schema for the create proposal action
const createProposalActionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client name is required"),
  type: z.enum(["proposal", "estimate"]),
  value: z.number().optional(),
  dueDate: z.string().optional(),
  templateId: z.string().uuid("Invalid template ID"),
  files: z.array(uploadedFileSchema).min(1, "At least one file is required"),
})

export type CreateProposalActionInput = z.infer<typeof createProposalActionSchema>

const PROPOSAL_GENERATION_PROMPT = `You are an expert business proposal writer. Your task is to analyze the provided RFP (Request for Proposal) or related documents and generate a professional, comprehensive proposal response.

Generate the content in a clean, readable format that works with rich text editors. Do not use complex HTML - stick to basic formatting. Generate real, contextual content based on the provided information. If specific details are missing, make reasonable assumptions based on industry standards.

# Executive Summary

Write a compelling overview of our understanding of the client's needs and proposed solution. This should be 2-3 paragraphs of actual content, not placeholder text.

# Understanding of Requirements

Provide a detailed analysis of the client's needs and objectives based on the RFP. If the RFP is not detailed, focus on standard industry requirements and best practices for similar projects.

# Proposed Solution

Describe our specific approach, methodology, and deliverables. Include concrete examples and specific technologies or methods we'll use.

# Timeline & Milestones

Our proposed timeline includes:
• Discovery & Planning Phase: 2-3 weeks
• Development & Implementation: 8-10 weeks
• Testing & Quality Assurance: 2-3 weeks
• Deployment & Training: 2 weeks

# Team & Resources

Our dedicated team includes:
• Project Manager with 10+ years experience
• Senior Technical Architects
• Industry Specialists
• Quality Assurance Team

# Budget & Pricing

Investment breakdown:
• Professional Services: 60%
• Technology & Infrastructure: 25%
• Training & Support: 15%

Total Investment: {projectValue}

# Why Choose Us

Our key differentiators include:
• Proven track record in similar projects
• Industry-leading expertise
• Innovative solutions
• Dedicated support team

# Next Steps

Upon acceptance of this proposal, we will:
• Schedule a kick-off meeting
• Finalize project timeline
• Begin resource allocation
• Initiate discovery phase

Guidelines for content generation:
- Generate actual content, not placeholder text
- Be specific and data-driven
- Focus on value proposition and ROI
- Use clear, professional language
- Include relevant examples
- Address key requirements from the RFP
- Highlight unique differentiators
- Keep content concise but comprehensive
- Use simple text formatting (no complex HTML)
- Use bullet points for lists
- Keep paragraphs clear and well-structured

Context about the client and project:
Client Name: {clientName}
Project Title: {projectTitle}
Project Value: {projectValue}
Due Date: {dueDate}

Analyze the provided documents and generate a proposal that addresses the client's specific needs. Replace all placeholder content with actual, contextual content based on the provided information and industry best practices.`

export async function createProposal(input: CreateProposalActionInput) {
  try {
    // Validate input
    const validatedInput = createProposalActionSchema.parse(input)

    // Generate a new proposal ID
    const proposalId = `${validatedInput.type === 'proposal' ? 'PROP' : 'EST'}-${Math.floor(Math.random() * 9000) + 1000}`

    // Process uploaded files and generate proposal if any
    let generatedProposal = ''
    if (validatedInput.files.length > 0) {
      try {
        // Prepare the context for the prompt
        const context = {
          clientName: validatedInput.client,
          projectTitle: validatedInput.title,
          projectValue: validatedInput.value ? `$${validatedInput.value.toLocaleString()}` : 'To be determined',
          dueDate: validatedInput.dueDate || 'To be determined'
        }

        // Replace placeholders in the prompt
        const customizedPrompt = PROPOSAL_GENERATION_PROMPT
          .replace('{clientName}', context.clientName)
          .replace('{projectTitle}', context.projectTitle)
          .replace('{projectValue}', context.projectValue)
          .replace('{dueDate}', context.dueDate)

        // Create messages for AI processing
        const messages = [{
          role: 'user' as const,
          content: [
            { type: 'text' as const, text: customizedPrompt },
            ...validatedInput.files.map(file => ({
              type: 'file' as const,
              mimeType: file.type,
              data: Buffer.from(file.content || '', 'base64'),
              filename: file.name,
            }))
          ],
        }]

        // Generate proposal using AI
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          messages,
        })

        generatedProposal = result.text
        console.log('Generated Proposal (not saved to file):', generatedProposal)

      } catch (error) {
        console.error('Error generating proposal:', error)
        // Continue with proposal creation even if generation fails
      }
    }

    // Prepare the data for Supabase insertion (using lowercase keys for DB)
    const dataToInsert = {
      id: proposalId,
      title: validatedInput.title,
      client: validatedInput.client,
      status: "draft",
      value: validatedInput.value,
      type: validatedInput.type,
      duedate: validatedInput.dueDate,
      createdby: "Current User",
    }

    // Determine the target table
    const targetTable = validatedInput.type === 'proposal' ? 'proposals' : 'estimates'

    // Insert into Supabase
    const { data: insertedData, error: insertError } = await supabase
      .from(targetTable)
      .insert([dataToInsert])
      .select()
      .single()

    if (insertError) {
      console.error(`Error inserting into ${targetTable}:`, insertError)
      throw new Error(`Failed to save ${validatedInput.type} to database.`)
    }

    return {
      success: true,
      data: insertedData,
      generatedProposal: generatedProposal || undefined
    }
  } catch (error) {
    console.error('Error creating proposal:', error)
    if (error instanceof z.ZodError) {
        return { success: false, error: "Validation failed", issues: error.errors };
    }
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create proposal' }
  }
}

export async function initiateProposalCreation(input: CreateProposalActionInput) {
  let tempDir: string | undefined;
  try {
    const validatedInput = createProposalActionSchema.parse(input)
    const proposalRequestId = uuidv4();
    let documentsText = "";
    console.log(`Processing ${validatedInput.files.length} file(s)...`);

    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `proposal-${proposalRequestId}-`));
    console.log(`Created temporary directory: ${tempDir}`);

    for (const file of validatedInput.files) {
      console.log(`Parsing file: ${file.name} (${file.type})`);
      const buffer = Buffer.from(file.content, 'base64');
      const tempFilePath = path.join(tempDir, file.name);
      let text = '';

      try {
        await fs.writeFile(tempFilePath, buffer);

        if (file.type === 'application/pdf') {
          const loader = new PDFLoader(tempFilePath);
          const docs = await loader.load();
          text = docs.map((doc: { pageContent: string }) => doc.pageContent).join('\n\n');
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // DOCX
          const { value } = await mammoth.extractRawText({ buffer });
          text = value;
        } else if (file.type.startsWith('text/')) {
          const loader = new TextLoader(tempFilePath);
          const docs = await loader.load();
          text = docs.map((doc: { pageContent: string }) => doc.pageContent).join('\n\n');
        } else {
          console.warn(`Unsupported file type: ${file.type} for file ${file.name}. Skipping.`);
          continue;
        }

        if (text) {
          documentsText += `\n\n--- Document: ${file.name} ---\n\n${text}`;
          console.log(`Successfully parsed ${file.name}`);
        }
      } catch (parseError) {
        console.error(`Error parsing file ${file.name}:`, parseError);
      } finally {
         try {
             await fs.unlink(tempFilePath);
         } catch (unlinkError) {
             console.warn(`Could not delete temporary file ${tempFilePath}:`, unlinkError);
         }
      }
    }

    if (!documentsText.trim()) {
      return { success: false, error: "No text could be extracted from the provided files." };
    }
    console.log("Total extracted text length:", documentsText.length);

    return {
      success: true,
      proposalRequestId: proposalRequestId,
      extractedText: documentsText,
      message: "Files parsed successfully. Ready for processing."
    }

  } catch (error) {
    console.error('Error initiating proposal creation:', error)
    if (error instanceof z.ZodError) {
        return { success: false, error: "Validation failed", issues: error.errors };
    }
    return { success: false, error: error instanceof Error ? error.message : 'Failed to initiate proposal creation' }
  } finally {
    // Clean up the temporary directory
    if (tempDir) {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        console.log(`Cleaned up temporary directory: ${tempDir}`);
      } catch (cleanupError) {
        console.error(`Error cleaning up temporary directory ${tempDir}:`, cleanupError);
      }
    }
  }
}

// --- Action: Process and Embed Documents --- 

interface ProcessInput {
  proposalRequestId: string;
  documentsText: string;
}

export async function processAndEmbedDocuments({ proposalRequestId, documentsText }: ProcessInput) {
  // Check for either API key name
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error('Google API Key (GOOGLE_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY) is not set');
    return { success: false, error: 'Server configuration error: Missing Google API Key' };
  }
  if (!proposalRequestId || !documentsText) {
    return { success: false, error: 'Invalid input: Missing proposalRequestId or documentsText' };
  }
  console.log(`Starting processing for request ID: ${proposalRequestId}`);

  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 150,
    });
    let docs = await splitter.createDocuments([documentsText]);
    console.log(`Split text into ${docs.length} chunks.`);

    if (docs.length === 0) {
      return { success: false, error: 'Failed to split documents into chunks.' };
    }

    docs = docs.map(doc => ({
        ...doc,
        metadata: { ...doc.metadata, proposal_request_id: proposalRequestId }
    }));

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: apiKey,
      modelName: "text-embedding-004",
    });

    await SupabaseVectorStore.fromDocuments(
      docs,
      embeddings,
      {
        client: supabase,
        tableName: 'document_chunks',
        queryName: 'match_document_chunks',
      }
    );
    console.log(`Successfully embedded and stored ${docs.length} chunks for request ID: ${proposalRequestId}`);

    return { success: true, message: `Processed ${docs.length} chunks.` };

  } catch (error) {
    console.error(`Error processing documents for request ID ${proposalRequestId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process and embed documents' 
    };
  }
}

// --- Action: Fetch Templates --- 

export async function getTemplates() {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('id, name, description')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching templates:', error);
      throw new Error('Failed to fetch templates');
    }
    return { success: true, data };
  } catch (error) {
    console.error('Error in getTemplates action:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch templates' };
  }
}