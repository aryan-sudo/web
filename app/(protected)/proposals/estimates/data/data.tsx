import {
  CheckCircle2,
  XCircle,
  CircleDashed,
  Send,
  FileEdit,
} from "lucide-react"

// Proposal and Estimate statuses
export const proposalStatuses = [
  {
    value: "draft",
    label: "Draft",
    icon: CircleDashed,
  },
  {
    value: "submitted",
    label: "Submitted",
    icon: Send,
  },
  {
    value: "accepted",
    label: "Accepted",
    icon: CheckCircle2,
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: XCircle,
  },
  {
    value: "revising",
    label: "Revising",
    icon: FileEdit,
  },
]

// Document types
export const documentTypes = [
  {
    value: "proposal",
    label: "Proposal",
  },
  {
    value: "estimate",
    label: "Estimate",
  },
]

// Utility function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
