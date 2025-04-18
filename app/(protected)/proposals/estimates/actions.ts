'use server'

import { z } from 'zod'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import mammoth from 'mammoth'

// LangChain imports
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

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
      chunkSize: 500,
      chunkOverlap: 100,
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

// --- Action: Generate Proposal Sections --- 

interface GenerateInput {
  proposalRequestId: string;
  templateId: string;
  clientName?: string;
  projectTitle?: string;
}

// Prompt template refinement 3
const sectionPromptTemplate = new PromptTemplate({
  template: `Act as an expert proposal writer creating a compelling draft for a proposal titled "{projectTitle}" for the client "{clientName}".
  
  Your task is to generate the content **only for the section: "{section_query}"**. 
  Focus *exclusively* on information relevant to this specific section query.
  
  Use the following potentially relevant context retrieved from source documents as inspiration and grounding:
  --- START CONTEXT ---
  {context}
  --- END CONTEXT ---
  
  Instructions:
  - Write a comprehensive and professional section body for "{section_query}".
  - Elaborate on key points found *within the provided context* that are directly relevant to the section query.
  - If specific details are missing, make reasonable assumptions *relevant to the section's topic* or state that details will be finalized later. Generate a plausible section body.
  - **CRITICAL: Do NOT mention or reference other section numbers or the overall proposal structure unless the provided context explicitly does so.** Focus only on the content for *this* section.
  - Ensure the tone is confident and professional.
  - Structure the output clearly, using paragraphs and bullet points where appropriate.

  Generated Section Content for "{section_query}":
`,
  inputVariables: ["context", "section_query", "projectTitle", "clientName"],
});

// Simple mapping from placeholder name to a query for vector search & LLM prompt
const sectionQueryMapping: Record<string, string> = {
  "project_overview": "Provide a concise overview of the project.",
  "solution_details": "Describe the proposed solution in detail.",
  "timeline": "Outline the project timeline and key milestones.",
  "investment": "Detail the required investment or budget.",
  "executive_summary": "Write an executive summary for the project.",
  "scope_of_work": "Define the scope of work.",
  "cost_discovery": "Estimate the cost for discovery and planning.",
  "cost_design": "Estimate the cost for design and UX.",
  "cost_development": "Estimate the cost for development.",
  "cost_qa": "Estimate the cost for testing and QA.",
  "cost_deployment": "Estimate the cost for deployment and setup.",
  "total_cost": "Summarize the total estimated cost.",
  "assumptions": "List any assumptions made for this estimate/proposal.",
  "next_steps": "Outline the next steps after proposal acceptance.",
  // Add mappings for any other placeholders you might use
};

export async function generateProposalSections({ proposalRequestId, templateId, clientName, projectTitle }: GenerateInput) {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return { success: false, error: 'Server configuration error: Missing Google API Key' };
  }

  try {
    // 1. Fetch Template Content
    const { data: templateData, error: templateError } = await supabase
      .from('templates')
      .select('content')
      .eq('id', templateId)
      .single();

    if (templateError || !templateData) {
      console.error('Error fetching template:', templateError);
      return { success: false, error: 'Failed to fetch template content.' };
    }
    let templateContent = templateData.content;

    // 2. Pre-fill Simple Placeholders
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    templateContent = templateContent.replace(/{{(?:\s*)clientName(?:\s*)}}/g, clientName || "[Client Name]");
    templateContent = templateContent.replace(/{{(?:\s*)projectTitle(?:\s*)}}/g, projectTitle || "[Project Title]");
    templateContent = templateContent.replace(/{{(?:\s*)currentDate(?:\s*)}}/g, currentDate);
    console.log("Pre-filled simple placeholders.");

    // 3. Initialize Embeddings and LLM
    const embeddings = new GoogleGenerativeAIEmbeddings({ apiKey, modelName: "text-embedding-004" });
    const llm = new ChatGoogleGenerativeAI({ apiKey, model: "gemini-1.5-flash-latest" }); 
    const outputParser = new StringOutputParser();
    const chain = sectionPromptTemplate.pipe(llm).pipe(outputParser);

    // 4. Find remaining placeholders (for RAG generation)
    const placeholderRegex = /{{\s*([\w_]+)\s*}}/g;
    const placeholders = [...templateContent.matchAll(placeholderRegex)];

    if (placeholders.length === 0) {
       console.log("No RAG placeholders found after pre-fill.");
       return { success: true, generatedContent: templateContent };
    }
    
    console.log(`Found ${placeholders.length} RAG placeholders to generate.`);

    // 5. Process each remaining placeholder
    for (const match of placeholders) {
      const placeholder = match[0]; 
      const sectionKey = match[1]; 
      console.log(`Processing RAG placeholder: ${placeholder}`);

      const sectionQuery = sectionQueryMapping[sectionKey] || `Generate content for the section: ${sectionKey}`;
      
      try {
          // 4a. Generate query embedding
          const queryEmbedding = await embeddings.embedQuery(sectionQuery);

          // 4b. Retrieve context from Supabase
          const { data: chunks, error: rpcError } = await supabase.rpc('match_document_chunks', {
            query_embedding: queryEmbedding,
            match_threshold: 0.5, 
            match_count: 5, // Reduced chunk count
            p_request_id: proposalRequestId
          });

          if (rpcError) {
            console.error(`Error searching documents for section ${sectionKey}:`, rpcError);
            throw new Error(`Failed to retrieve context for section: ${sectionKey}`);
          }

          const context = chunks && chunks.length > 0 
              ? chunks.map((chunk: { content: string }) => chunk.content).join("\n\n") 
              : "No specific context found for this section in the documents.";
          
          console.log(`Retrieved ${chunks?.length || 0} chunks for section ${sectionKey}.`);

          // Call LLM chain
          const generatedSection = await chain.invoke({ 
              context: context,
              section_query: sectionQuery,
              projectTitle: projectTitle || "",
              clientName: clientName || "" 
          });
          
          console.log(`Generated content for ${sectionKey}`);

          // Replace placeholder
          templateContent = templateContent.replace(placeholder, generatedSection.trim());

      } catch (sectionError) {
          console.error(`Error processing section ${sectionKey}:`, sectionError);
          // Replace placeholder with an error message or leave it?
          templateContent = templateContent.replace(placeholder, `[Error generating content for ${sectionKey}]`);
      }
    }

    // 6. Return assembled content
    return { success: true, generatedContent: templateContent };

  } catch (error) {
    console.error('Error generating proposal sections:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate proposal content' };
  }
}