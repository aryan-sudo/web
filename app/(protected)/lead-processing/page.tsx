import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { leadSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Lead Processing",
  description: "Manage and track leads through the sales pipeline.",
}

// Simulate a database read for leads.
async function getLeads() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(protected)/lead-processing/data/leads.json")
  )

  const leads = JSON.parse(data.toString())

  return z.array(leadSchema).parse(leads)
}

export default async function LeadProcessingPage() {
  const leads = await getLeads()

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Lead Processing</h2>
            <p className="text-muted-foreground">
              Manage and track potential client leads
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </div>
        </div>

        <Tabs defaultValue="lead-processing" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="lead-processing">Lead Processing</TabsTrigger>
            <TabsTrigger value="client-communications">Client Communications</TabsTrigger>
          </TabsList>
          <TabsContent value="inquiries">
            {/* Content for Inquiries tab */}
          </TabsContent>
          <TabsContent value="lead-processing">
            <DataTable data={leads} columns={columns} />
          </TabsContent>
          <TabsContent value="client-communications">
            {/* Content for Client Communications tab */}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}