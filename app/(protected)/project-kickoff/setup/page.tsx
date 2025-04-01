import { Heading } from "@/components/ui/heading"

export default function ProjectSetupPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Project Setup</Heading>
        <p className="text-muted-foreground">
          Configure and initialize new projects with templates and settings.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">New Project</h3>
          <p className="mt-2 text-muted-foreground">
            Create a new project with custom or template settings.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Project Templates</h3>
          <p className="mt-2 text-muted-foreground">
            Select from pre-configured project templates.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Initial Configuration</h3>
          <p className="mt-2 text-muted-foreground">
            Set up base configuration for project parameters.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Client Information</h3>
          <p className="mt-2 text-muted-foreground">
            Connect client details and project requirements.
          </p>
        </div>
      </div>
    </div>
  )
} 