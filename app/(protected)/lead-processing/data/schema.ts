import { z } from "zod"

// Define schema for lead data
export const leadSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string(),
  status: z.string(),
  source: z.string(),
  lastcontact: z.string(),
})

export type Lead = z.infer<typeof leadSchema>
