import { Heading } from "@/components/ui/heading"

export default function MyTasksPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">My Tasks</Heading>
        <p className="text-muted-foreground">
          View and manage your assigned tasks and personal to-dos.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Assigned Tasks</h3>
          <p className="mt-2 text-muted-foreground">
            Tasks assigned to you across all projects.
          </p>
          <div className="mt-4 space-y-2">
            <div className="rounded-md bg-muted p-3">Task placeholder 1</div>
            <div className="rounded-md bg-muted p-3">Task placeholder 2</div>
            <div className="rounded-md bg-muted p-3">Task placeholder 3</div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Personal To-Dos</h3>
          <p className="mt-2 text-muted-foreground">
            Personal tasks and reminders.
          </p>
          <div className="mt-4 space-y-2">
            <div className="rounded-md bg-muted p-3">To-do placeholder 1</div>
            <div className="rounded-md bg-muted p-3">To-do placeholder 2</div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm col-span-2">
          <h3 className="text-xl font-semibold">Upcoming Deadlines</h3>
          <p className="mt-2 text-muted-foreground">
            Tasks with approaching deadlines.
          </p>
          <div className="mt-4 space-y-2">
            <div className="rounded-md bg-muted p-3 border-l-4 border-l-yellow-500">Deadline: Tomorrow - Task placeholder 4</div>
            <div className="rounded-md bg-muted p-3 border-l-4 border-l-red-500">Deadline: Today - Task placeholder 5</div>
          </div>
        </div>
      </div>
    </div>
  )
} 