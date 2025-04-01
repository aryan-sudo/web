import { Heading } from "@/components/ui/heading"

export default function IntegrationsPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Integrations</Heading>
        <p className="text-muted-foreground">
          Connect third-party applications and services to enhance your workflow.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">GitHub</h3>
          <p className="mt-2 text-muted-foreground">
            Connect your GitHub repositories to sync code and issues.
          </p>
          <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Connect
          </button>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Slack</h3>
          <p className="mt-2 text-muted-foreground">
            Get notifications and updates directly in your Slack channels.
          </p>
          <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Connect
          </button>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Google Drive</h3>
          <p className="mt-2 text-muted-foreground">
            Access and share documents from your Google Drive.
          </p>
          <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Connect
          </button>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Jira</h3>
          <p className="mt-2 text-muted-foreground">
            Synchronize tasks with your Jira projects.
          </p>
          <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Connect
          </button>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Microsoft Teams</h3>
          <p className="mt-2 text-muted-foreground">
            Integrate with Teams for chat and collaboration.
          </p>
          <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Connect
          </button>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">API</h3>
          <p className="mt-2 text-muted-foreground">
            Generate API keys and manage access for custom integrations.
          </p>
          <button className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Manage Keys
          </button>
        </div>
      </div>
    </div>
  )
} 