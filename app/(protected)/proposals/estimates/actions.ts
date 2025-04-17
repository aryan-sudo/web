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