import { Heading } from "@/components/ui/heading"

export default function ApprovalWorkflowPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Approval Workflow</Heading>
        <p className="text-muted-foreground">
          Manage and track proposal and contract approval processes.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Pending Approvals</h3>
          <p className="mt-2 text-muted-foreground">
            Review documents waiting for approval or signature.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Approved Documents</h3>
          <p className="mt-2 text-muted-foreground">
            View previously approved contracts and proposals.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Configure Workflow</h3>
          <p className="mt-2 text-muted-foreground">
            Set up approval chains and notification preferences.
          </p>
        </div>
      </div>
    </div>
  )
} 