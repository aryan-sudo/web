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
    
    // 3. Extract placeholders
    const placeholders = extractPlaceholders(template.content)
    
    // 4. Generate content
    const generatedContent = await generateContent({
      documentsText,
      placeholders,
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
 * Extract placeholders from template content
 */
function extractPlaceholders(templateContent: string): string[] {
  const placeholderRegex = /{{\s*([\w_]+)\s*}}/g
  const matches = [...templateContent.matchAll(placeholderRegex)]
  const placeholders = matches.map(match => match[1])
  return [...new Set(placeholders)] // Remove duplicates
}

/**
 * Generate content for placeholders using direct prompting
 */
async function generateContent({
  documentsText,
  placeholders,
  templateContent,
  companyName,
  clientName,
  projectTitle
}: {
  documentsText: string,
  placeholders: string[],
  templateContent: string,
  companyName: string,
  clientName: string,
  projectTitle: string
}): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  
  if (!apiKey) {
    throw new Error("Missing API key")
  }
  
  // 1. Handle simple replacements directly
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
  
  const basicReplacements: Record<string, string> = {
    'clientName': clientName,
    'projectTitle': projectTitle,
    'currentDate': currentDate,
    'companyName': companyName,
    'company_name': companyName,
  }
  
  let result = templateContent
  
  // Apply basic replacements
  Object.entries(basicReplacements).forEach(([key, value]) => {
    result = result.replace(
      new RegExp(`{{\\s*${key}\\s*}}`, 'g'), 
      value
    )
  })
  
  // 2. Get remaining placeholders
  const remainingPlaceholders = placeholders.filter(p => !Object.keys(basicReplacements).includes(p))
  
  if (remainingPlaceholders.length === 0) {
    return result
  }
  
  // 3. Build prompt for AI
  const promptText = `You are a senior proposal writer at ${companyName}.

DOCUMENTS:
${documentsText}

CLIENT: ${clientName}
PROJECT: ${projectTitle}

TASK:
Fill in the following placeholders for a proposal template:
${remainingPlaceholders.map(p => `- ${p}`).join('\n')}

For each placeholder, provide ONLY the content that should replace it.
Keep your responses concise and professional.
Format your response as JSON:
{
  ${remainingPlaceholders.map(p => `"${p}": "Your content for ${p}"`).join(',\n  ')}
}`

  // 4. Call AI API
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
  const aiResponse = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: promptText }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  })
  
  const responseText = aiResponse.response.text()
  
  // 5. Extract and apply generated content
  try {
    // Extract JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from AI response")
    }
    
    const generatedContent = JSON.parse(jsonMatch[0])
    
    // Replace placeholders
    for (const placeholder of remainingPlaceholders) {
      if (generatedContent[placeholder]) {
        result = result.replace(
          new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g'), 
          generatedContent[placeholder]
        )
      } else {
        // Fallback for missing content
        result = result.replace(
          new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g'), 
          `[Insert ${placeholder}]`
        )
      }
    }
    
    return result
  } catch (error) {
    console.error("Failed to parse AI response:", error)
    
    // Fallback: replace remaining placeholders with generic text
    for (const placeholder of remainingPlaceholders) {
      result = result.replace(
        new RegExp(`{{\\s*${placeholder}\\s*}}`, 'g'), 
        `[Content for ${placeholder} will be provided]`
      )
    }
    
    return result
  }
}

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