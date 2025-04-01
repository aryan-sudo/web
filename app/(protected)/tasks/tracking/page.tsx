import { Heading } from "@/components/ui/heading"

export default function TaskTrackingPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Task Tracking</Heading>
        <p className="text-muted-foreground">
          Monitor task progress and track time spent on activities.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Time Tracking</h3>
          <p className="mt-2 text-muted-foreground">
            Log and monitor time spent on different tasks.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Progress Reports</h3>
          <p className="mt-2 text-muted-foreground">
            View task completion metrics and progress.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Activity Logs</h3>
          <p className="mt-2 text-muted-foreground">
            Review detailed logs of task-related activities.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Time Analysis</h3>
          <p className="mt-2 text-muted-foreground">
            Analyze time spent on different project categories.
          </p>
        </div>
      </div>
    </div>
  )
} 