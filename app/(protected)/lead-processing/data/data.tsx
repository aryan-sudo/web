import {
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  XCircle,
} from "lucide-react"

// Status data for leads
export const statuses = [
  {
    value: "new",
    label: "New",
    icon: HelpCircle,
  },
  {
    value: "contacted",
    label: "Contacted",
    icon: MessageSquare,
  },
  {
    value: "qualified",
    label: "Qualified",
    icon: CheckCircle2,
  },
  {
    value: "proposal",
    label: "Proposal",
    icon: ArrowUpRight,
  },
  {
    value: "closed",
    label: "Closed",
    icon: CheckCircle2,
  },
  {
    value: "lost",
    label: "Lost",
    icon: XCircle,
  },
]

// Lead sources
export const sources = [
  {
    value: "website",
    label: "Website",
  },
  {
    value: "referral",
    label: "Referral",
  },
  {
    value: "conference",
    label: "Conference",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "email",
    label: "Email Campaign",
  },
  {
    value: "trade_show",
    label: "Trade Show",
  },
  {
    value: "cold_call",
    label: "Cold Call",
  },
  {
    value: "social_media",
    label: "Social Media",
  },
  {
    value: "partner",
    label: "Partner Referral",
  },
]
