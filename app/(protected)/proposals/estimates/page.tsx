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
import { proposalSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Proposals & Estimates",
  description: "Create and manage proposals and estimates for potential clients.",
}

// Simulate a database read for proposals and estimates
async function getProposals() {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), "app/(protected)/proposals/estimates/data/proposals.json")
    )
    const proposals = JSON.parse(data.toString())
    return z.array(proposalSchema).parse(proposals)
  } catch (error) {
    console.error("Error loading proposals:", error)
    return []
  }
}

// We'll use the same function for estimates since the schema is likely similar
async function getEstimates() {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), "app/(protected)/proposals/estimates/data/estimates.json")
    )
    const estimates = JSON.parse(data.toString())
    return z.array(proposalSchema).parse(estimates)
  } catch (error) {
    console.error("Error loading estimates:", error)
    return []
  }
}

export default async function ProposalsEstimatesPage() {
  const proposals = await getProposals()
  const estimates = await getEstimates()

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
            <h2 className="text-2xl font-bold tracking-tight">Proposals & Estimates</h2>
            <p className="text-muted-foreground">
              Create and manage client proposals and detailed cost estimates
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </div>

        <Tabs defaultValue="estimates" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="estimates">Estimates</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
          </TabsList>
          <TabsContent value="estimates">
            <DataTable data={estimates} columns={columns} />
          </TabsContent>
          <TabsContent value="proposals">
            <DataTable data={proposals} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}