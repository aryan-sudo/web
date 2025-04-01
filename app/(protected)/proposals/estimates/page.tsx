import { Heading } from "@/components/ui/heading"

export default function ProposalsEstimatesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Proposals & Estimates</Heading>
        <p className="text-muted-foreground">
          Create and manage detailed proposals and estimates for your potential clients.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create New Proposal</h3>
          <p className="mt-2 text-muted-foreground">
            Generate a new proposal from templates or start from scratch.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Pending Proposals</h3>
          <p className="mt-2 text-muted-foreground">
            View and edit proposals awaiting client review.
          </p>
        </div>
      </div>
    </div>
  )
} 