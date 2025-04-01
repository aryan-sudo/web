import { Heading } from "@/components/ui/heading"

export default function ResourceAllocationPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Resource Allocation</Heading>
        <p className="text-muted-foreground">
          Assign and manage team members and resources for your projects.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Team Assignment</h3>
          <p className="mt-2 text-muted-foreground">
            Assign team members to projects based on skills and availability.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Capacity Planning</h3>
          <p className="mt-2 text-muted-foreground">
            Plan resource allocation and track team capacity.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Skill Matching</h3>
          <p className="mt-2 text-muted-foreground">
            Match team members to projects based on required skills.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Resource Calendar</h3>
          <p className="mt-2 text-muted-foreground">
            View and manage resource availability and scheduling.
          </p>
        </div>
      </div>
    </div>
  )
} 