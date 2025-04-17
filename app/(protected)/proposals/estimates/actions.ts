'use server'

import { promises as fs } from 'fs'
import path from 'path'
import { z } from 'zod'
import { proposalSchema } from './data/schema'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

// Schema for the uploaded files
const uploadedFileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  content: z.string().optional(), // Base64 content of the file
})

export type UploadedFile = z.infer<typeof uploadedFileSchema>

// Schema for the create proposal action
const createProposalActionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client name is required"),
  type: z.enum(["proposal", "estimate"]),
  value: z.number().optional(),
  dueDate: z.string().optional(),
  files: z.array(uploadedFileSchema),
})

export type CreateProposalActionInput = z.infer<typeof createProposalActionSchema>

const PROPOSAL_GENERATION_PROMPT = `You are an expert business proposal writer. Your task is to analyze the provided RFP (Request for Proposal) or related documents and generate a professional, comprehensive proposal response.

Please structure your response in markdown format with the following sections:

# Executive Summary
[A compelling overview of our understanding of the client's needs and our proposed solution]

# Understanding of Requirements
[Detailed analysis of the client's needs and objectives based on the RFP]

# Proposed Solution
[Comprehensive description of our proposed approach, methodology, and deliverables]

# Timeline & Milestones
[Proposed project schedule with key milestones and deliverables]

# Team & Resources
[Overview of the team structure and key personnel who will work on this project]

# Budget & Pricing
[Detailed cost breakdown and payment terms]

# Why Choose Us
[Our competitive advantages and relevant experience]

# Next Steps
[Clear call to action and immediate next steps]

Guidelines:
- Be specific and data-driven where possible
- Focus on value proposition and ROI
- Use clear, professional language
- Include relevant examples and case studies if applicable
- Address all key requirements from the RFP
- Highlight unique differentiators
- Be concise but comprehensive

Context about the client and project:
Client Name: {clientName}
Project Title: {projectTitle}
Project Value: {projectValue}
Due Date: {dueDate}

Please analyze the provided documents and generate a proposal that addresses the client's specific needs while following these guidelines.`

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
        console.log('Generated Proposal:', generatedProposal)

        // Save the generated proposal to a markdown file
        const proposalFileName = `${proposalId}-proposal.md`
        const proposalFilePath = path.join(
          process.cwd(),
          'app/(protected)/proposals/estimates/data/generated',
          proposalFileName
        )

        // Ensure the directory exists
        await fs.mkdir(path.dirname(proposalFilePath), { recursive: true })
        await fs.writeFile(proposalFilePath, generatedProposal)

      } catch (error) {
        console.error('Error generating proposal:', error)
        // Continue with proposal creation even if generation fails
      }
    }

    // Create the new proposal object
    const newProposal = proposalSchema.parse({
      id: proposalId,
      title: validatedInput.title,
      client: validatedInput.client,
      status: "draft",
      date: new Date().toISOString().split('T')[0],
      value: validatedInput.value,
      type: validatedInput.type,
      dueDate: validatedInput.dueDate,
      createdBy: "Current User", // TODO: Replace with actual user info when auth is implemented
    })

    // Read the existing proposals/estimates file
    const filePath = path.join(
      process.cwd(),
      'app/(protected)/proposals/estimates/data',
      `${validatedInput.type}s.json`
    )
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const existingData = JSON.parse(fileContent)

    // Add the new proposal/estimate
    const updatedData = [...existingData, newProposal]

    // Write back to the file
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2))

    return { 
      success: true, 
      data: newProposal,
      generatedProposal: generatedProposal || undefined
    }
  } catch (error) {
    console.error('Error creating proposal:', error)
    return { success: false, error: 'Failed to create proposal' }
  }
} 