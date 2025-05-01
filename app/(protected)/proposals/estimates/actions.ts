'use server'

import { z } from 'zod'
import { supabase } from '@/lib/supabaseClient'
import mammoth from 'mammoth'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Simple schemas
const uploadedFileSchema = z.object({
  name: z.string().min(1, "Filename is required"),
  type: z.string().refine(type => 
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    .includes(type), 
    { message: "Only DOCX and TXT files are supported" }
  ),
  content: z.string().min(1, "File content is required") // Base64 content
})

export type UploadedFile = z.infer<typeof uploadedFileSchema>

const proposalInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client name is required"),
  companyName: z.string().min(1, "Company name is required"),
  templateId: z.string().uuid("Invalid template ID"),
  files: z.array(uploadedFileSchema).min(1, "At least one file is required").max(10, "Maximum 10 files allowed")
})

export type ProposalInput = z.infer<typeof proposalInputSchema>

/**
 * Generate a proposal from a template using direct prompting
 */
export async function generateProposal(input: ProposalInput) {
  try {
    // Validate input
    const validatedInput = proposalInputSchema.parse(input)
    
    // 1. Extract text from uploaded documents
    const documentsText = await extractDocumentsText(validatedInput.files)
    
    // 2. Get template
    const template = await getTemplate(validatedInput.templateId)
    if (!template) {
      return { success: false, error: "Template not found" }
    }
    
    // 3. Generate content with entire template
    const generatedContent = await generateContent({
      documentsText,
      templateContent: template.content,
      companyName: validatedInput.companyName,
      clientName: validatedInput.client,
      projectTitle: validatedInput.title
    })

    return {
      success: true,
      generatedContent
    }
  } catch (error) {
    console.error("Error generating proposal:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }
  }
}

/**
 * Extract text from uploaded base64 encoded files
 */
async function extractDocumentsText(files: UploadedFile[]): Promise<string> {
  const textPromises = files.map(async (file) => {
    const buffer = Buffer.from(file.content, 'base64')
    
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { value } = await mammoth.extractRawText({ buffer })
      return `--- Document: ${file.name} ---\n\n${value}`
    } else if (file.type.startsWith('text/')) {
      return `--- Document: ${file.name} ---\n\n${buffer.toString('utf-8')}`
    }
    
    return `[Could not extract content from ${file.name}]`
  })
  
  const extractedTexts = await Promise.all(textPromises)
  return extractedTexts.join('\n\n')
}

/**
 * Get a template from the database
 */
async function getTemplate(templateId: string) {
  const { data, error } = await supabase
    .from('templates')
    .select('content, name')
    .eq('id', templateId)
    .single()
    
  if (error) {
    console.error("Error fetching template:", error)
    return null
  }
  
  return data
}

/**
 * Extract placeholders from template content (Deprecated - now using whole template approach)
 * We're keeping this for reference in case we need it in the future
 */
// function extractPlaceholders(templateContent: string): string[] {
//   const placeholderRegex = /{{\s*([\w_]+)\s*}}/g
//   const matches = [...templateContent.matchAll(placeholderRegex)]
//   const placeholders = matches.map(match => match[1])
//   return [...new Set(placeholders)] // Remove duplicates
// }

/**
 * Generate content for a complete template using direct prompting
 */
async function generateContent({
  documentsText,
  templateContent,
  companyName,
  clientName,
  projectTitle
}: {
  documentsText: string,
  placeholders?: string[], // Optional parameter we no longer use
  templateContent: string,
  companyName: string,
  clientName: string,
  projectTitle: string
}): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

  if (!apiKey) {
    throw new Error("Missing API key")
  }
  
  // Build prompt for AI with entire template
  const promptText = `You are a senior proposal writer at ${companyName}.

SOURCE DOCUMENTS:
${documentsText}

CLIENT: ${clientName}
PROJECT: ${projectTitle}
COMPANY: ${companyName}

TASK:
I have a proposal template with placeholders in {{placeholder}} format.
Your job is to generate a complete proposal by filling in ALL placeholders with appropriate content based on the source documents.
Return the ENTIRE template with all placeholders replaced.
Maintain the same structure and formatting as the original template.

The template is in markdown format and will be rendered in a markdown editor.
Make sure all content you generate is valid markdown.
Use proper markdown formatting for headings, lists, emphasis, links, etc.

Here is the template:

${templateContent}

IMPORTANT: Return the COMPLETE filled template with valid markdown formatting, not just individual sections.`

  // Call AI API
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  const aiResponse = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: promptText }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  })
  
  const responseText = aiResponse.response.text()
  console.log(responseText, "responseText")
  
  // Clean up the response - sometimes the AI might wrap the content in code blocks
  const cleanedResponse = responseText.replace(/^```(?:markdown|md)?\n([\s\S]*)\n```$/m, '$1');
  console.log(cleanedResponse, "cleanedResponse")
  return cleanedResponse;
}

/**
 * Ensure content is in HTML format for Tiptap (Deprecated - keeping for reference)
 * This function is no longer used as we're getting the complete template from the AI
 */
// function ensureHtmlFormat(content: string, isHtmlTemplate: boolean): string {
//   if (isHtmlTemplate) {
//     // Cleanup any potential script tags for security
//     content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
//     return content;
//   }
//   
//   // If not already HTML, convert plain text to HTML with paragraphs
//   if (!content.includes('<html') && !content.includes('<body') && !content.includes('<p>')) {
//     return content
//       .split('\n\n')
//       .map(paragraph => paragraph.trim() ? `<p>${paragraph}</p>` : '')
//       .join('')
//       .replace(/\n/g, '<br>');
//   }
//   
//   return content;
// }

// Export getTemplates function for the UI
export async function getTemplates() {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('id, name, description, created_at')
      .order('name', { ascending: true })

    if (error) {
      throw new Error('Failed to fetch templates')
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Error in getTemplates action', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch templates' 
    }
  }
}