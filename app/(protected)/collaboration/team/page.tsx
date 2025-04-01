import { Heading } from "@/components/ui/heading"

export default function TeamPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Team</Heading>
        <p className="text-muted-foreground">
          View and manage your team members and collaborate effectively.
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Team Members</h3>
          <p className="mt-2 text-muted-foreground mb-4">
            View and manage your team members.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">AS</span>
                </div>
                <div>
                  <h4 className="font-medium">Alex Smith</h4>
                  <p className="text-sm text-muted-foreground">Product Manager</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">JD</span>
                </div>
                <div>
                  <h4 className="font-medium">Jane Doe</h4>
                  <p className="text-sm text-muted-foreground">Lead Developer</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">RJ</span>
                </div>
                <div>
                  <h4 className="font-medium">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">UX Designer</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs bg-gray-300 text-gray-800 rounded-full">
                Away
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">MT</span>
                </div>
                <div>
                  <h4 className="font-medium">Maria Torres</h4>
                  <p className="text-sm text-muted-foreground">Frontend Developer</p>
                </div>
              </div>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
          </div>
          
          <button className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Invite Team Member
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Team Activity</h3>
            <p className="mt-2 text-muted-foreground">
              Recent activities from your team.
            </p>
            <div className="mt-4 space-y-3">
              <div className="text-sm">
                <span className="font-medium">Alex Smith</span> created a new task
                <div className="text-xs text-muted-foreground">Today, 11:30 AM</div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Jane Doe</span> completed a task
                <div className="text-xs text-muted-foreground">Today, 10:15 AM</div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Robert Johnson</span> uploaded a new design
                <div className="text-xs text-muted-foreground">Yesterday, 4:45 PM</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Team Calendar</h3>
            <p className="mt-2 text-muted-foreground">
              View upcoming team events and meetings.
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded border p-2">
                <div className="text-sm font-medium">Weekly Sprint Planning</div>
                <div className="text-xs text-muted-foreground">Monday, 9:00 AM</div>
              </div>
              <div className="rounded border p-2">
                <div className="text-sm font-medium">Design Review</div>
                <div className="text-xs text-muted-foreground">Wednesday, 2:00 PM</div>
              </div>
              <div className="rounded border p-2">
                <div className="text-sm font-medium">Team Retrospective</div>
                <div className="text-xs text-muted-foreground">Friday, 3:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 