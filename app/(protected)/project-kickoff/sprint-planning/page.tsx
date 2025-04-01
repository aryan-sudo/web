import { Heading } from "@/components/ui/heading"

export default function SprintPlanningPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Sprint Planning</Heading>
        <p className="text-muted-foreground">
          Plan and organize work into sprints for efficient delivery.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create Sprint</h3>
          <p className="mt-2 text-muted-foreground">
            Set up a new sprint with goals and timeframe.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Sprint Backlog</h3>
          <p className="mt-2 text-muted-foreground">
            Organize and prioritize tasks for upcoming sprints.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Capacity Planning</h3>
          <p className="mt-2 text-muted-foreground">
            Estimate team capacity and plan sprint workload.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Sprint Timeline</h3>
          <p className="mt-2 text-muted-foreground">
            View and manage sprint schedules and deadlines.
          </p>
        </div>
      </div>
    </div>
  )
} 