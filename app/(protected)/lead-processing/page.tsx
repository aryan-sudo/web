import { Heading } from "@/components/ui/heading"

export default function LeadProcessingPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Lead Processing</Heading>
        <p className="text-muted-foreground">
          Manage and process all your leads from initial contact to qualification.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">New Leads</h3>
          <p className="mt-2 text-muted-foreground">
            Process and qualify new incoming leads from various channels.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Lead Qualification</h3>
          <p className="mt-2 text-muted-foreground">
            Score and qualify leads based on engagement and interest.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Follow-up Tasks</h3>
          <p className="mt-2 text-muted-foreground">
            Manage follow-up communications and next steps for each lead.
          </p>
        </div>
      </div>
    </div>
  )
} 