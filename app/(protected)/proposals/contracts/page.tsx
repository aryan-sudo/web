import { Heading } from "@/components/ui/heading"

export default function ContractGenerationPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Contract Generation</Heading>
        <p className="text-muted-foreground">
          Generate legal contracts and agreements for your clients.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Create Contract</h3>
          <p className="mt-2 text-muted-foreground">
            Generate a new contract using templates or custom fields.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Contract Templates</h3>
          <p className="mt-2 text-muted-foreground">
            Access and manage pre-approved contract templates.
          </p>
        </div>
      </div>
    </div>
  )
} 