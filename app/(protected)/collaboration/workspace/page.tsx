import { Heading } from "@/components/ui/heading"

export default function WorkspacePage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Workspace</Heading>
        <p className="text-muted-foreground">
          Access shared resources and collaborate on documents.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Shared Documents</h3>
          <p className="mt-2 text-muted-foreground">
            Access and collaborate on shared documents.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">File Storage</h3>
          <p className="mt-2 text-muted-foreground">
            Manage files and documents in cloud storage.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Collaborative Editing</h3>
          <p className="mt-2 text-muted-foreground">
            Edit documents and files in real-time with team members.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Workspace Settings</h3>
          <p className="mt-2 text-muted-foreground">
            Configure workspace preferences and access controls.
          </p>
        </div>
      </div>
    </div>
  )
} 