import { Heading } from "@/components/ui/heading"

export default function DependenciesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Task Dependencies</Heading>
        <p className="text-muted-foreground">
          Manage relationships and dependencies between tasks.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Dependency Map</h3>
          <p className="mt-2 text-muted-foreground">
            Visualize task relationships and dependencies.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create Dependency</h3>
          <p className="mt-2 text-muted-foreground">
            Link tasks together and establish dependencies.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Critical Path</h3>
          <p className="mt-2 text-muted-foreground">
            View critical path analysis for project timeline.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Dependency Alerts</h3>
          <p className="mt-2 text-muted-foreground">
            Get notified of dependency conflicts or delays.
          </p>
        </div>
      </div>
    </div>
  )
} 