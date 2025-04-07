import { z } from "zod"

// Define the proposal schema
export const proposalSchema = z.object({
  id: z.string(),
  title: z.string(),
  client: z.string(),
  status: z.enum(["draft", "submitted", "accepted", "rejected", "revising"]),
  date: z.string(),
  value: z.number().optional(),
  type: z.enum(["proposal", "estimate"]),
  dueDate: z.string().optional(),
  createdBy: z.string(),
})

export type Proposal = z.infer<typeof proposalSchema>

// We'll use the same schema for estimates
export type Estimate = Proposal
