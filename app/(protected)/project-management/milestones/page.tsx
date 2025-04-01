import { Heading } from "@/components/ui/heading"

export default function MilestonesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Milestones</Heading>
        <p className="text-muted-foreground">
          Track important project milestones and deliverables.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Upcoming Milestones</h3>
          <p className="mt-2 text-muted-foreground">
            View and track upcoming milestones across all projects.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create Milestone</h3>
          <p className="mt-2 text-muted-foreground">
            Add new milestones and set delivery expectations.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Milestone Timeline</h3>
          <p className="mt-2 text-muted-foreground">
            View project milestones on a timeline for better planning.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Milestone Reports</h3>
          <p className="mt-2 text-muted-foreground">
            Generate reports on milestone completion and delays.
          </p>
        </div>
      </div>
    </div>
  )
} 