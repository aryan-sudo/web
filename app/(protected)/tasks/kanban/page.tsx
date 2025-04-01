import { Heading } from "@/components/ui/heading"

export default function KanbanBoardPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Kanban Board</Heading>
        <p className="text-muted-foreground">
          Visualize and manage your workflow with a kanban board.
        </p>
      </div>
      
      <div className="grid gap-4 grid-cols-1">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Board View</h3>
          <p className="mt-2 text-muted-foreground">
            The kanban board interface will be displayed here, showing columns for To Do, In Progress, In Review, and Done.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">To Do</h4>
              <div className="space-y-2">
                <div className="rounded-md bg-card p-3 shadow-sm border">Task placeholder 1</div>
                <div className="rounded-md bg-card p-3 shadow-sm border">Task placeholder 2</div>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">In Progress</h4>
              <div className="space-y-2">
                <div className="rounded-md bg-card p-3 shadow-sm border">Task placeholder 3</div>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">In Review</h4>
              <div className="space-y-2">
                <div className="rounded-md bg-card p-3 shadow-sm border">Task placeholder 4</div>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">Done</h4>
              <div className="space-y-2">
                <div className="rounded-md bg-card p-3 shadow-sm border">Task placeholder 5</div>
                <div className="rounded-md bg-card p-3 shadow-sm border">Task placeholder 6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 