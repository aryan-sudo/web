import { Heading } from "@/components/ui/heading"

export default function CodeTemplatesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Code Templates</Heading>
        <p className="text-muted-foreground">
          Access and manage reusable code templates and patterns.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">React Components</h3>
          <p className="mt-2 text-muted-foreground">
            Reusable React component templates and patterns.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">API Endpoints</h3>
          <p className="mt-2 text-muted-foreground">
            Templates for common API endpoint patterns.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Database Models</h3>
          <p className="mt-2 text-muted-foreground">
            Templates for database schema definitions.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Custom Templates</h3>
          <p className="mt-2 text-muted-foreground">
            Your saved custom code templates.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create Template</h3>
          <p className="mt-2 text-muted-foreground">
            Create a new reusable code template.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Template Categories</h3>
          <p className="mt-2 text-muted-foreground">
            Manage template organization and categories.
          </p>
        </div>
      </div>
    </div>
  )
} 