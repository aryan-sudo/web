import { Heading } from "@/components/ui/heading"

export default function CommunicationsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Communications</Heading>
        <p className="text-muted-foreground">
          Manage team and client communications in one place.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Team Chat</h3>
          <p className="mt-2 text-muted-foreground">
            Internal messaging for team collaboration.
          </p>
          <div className="mt-4 rounded-lg bg-muted p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">JD</div>
                <div className="flex-1 rounded-lg bg-card p-3 shadow-sm">
                  <p className="text-sm text-muted-foreground">Hey team, let&apos;s discuss the latest project updates!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 rounded-lg bg-primary/10 p-3 text-right">
                  <p className="text-sm">Sounds good, I have some ideas to share.</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">ME</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Client Messages</h3>
          <p className="mt-2 text-muted-foreground">
            External communications with clients.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Notification Settings</h3>
          <p className="mt-2 text-muted-foreground">
            Configure communication preferences and alerts.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Message Archives</h3>
          <p className="mt-2 text-muted-foreground">
            Access and search past communications.
          </p>
        </div>
      </div>
    </div>
  )
} 