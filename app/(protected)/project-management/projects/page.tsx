import { Heading } from "@/components/ui/heading"

export default function ProjectsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Projects</Heading>
        <p className="text-muted-foreground">
          View and manage all your active and upcoming projects.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Active Projects</h3>
          <p className="mt-2 text-muted-foreground">
            View currently active projects and their status.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Upcoming Projects</h3>
          <p className="mt-2 text-muted-foreground">
            Review projects scheduled to start soon.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Completed Projects</h3>
          <p className="mt-2 text-muted-foreground">
            Access archive of completed projects and their outcomes.
          </p>
        </div>
      </div>
    </div>
  )
} 