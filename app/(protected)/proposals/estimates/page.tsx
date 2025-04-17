import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabaseClient"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { proposalSchema } from "./data/schema"
import { CreateProposalDialog } from "./_components/create-proposal-dialog"

export const metadata: Metadata = {
  title: "Proposals & Estimates",
  description: "Create and manage proposals and estimates for potential clients.",
}

// Simulate a database read for proposals and estimates
async function getProposals() {
  const { data, error } = await supabase
    .from('proposals') // Assuming table name is 'proposals'
    .select('*')

  if (error) {
    console.error("Error fetching proposals:", error)
    return []
  }

  console.log("Raw proposals data:", data);

  try {
    // Validate data against the schema
    return z.array(proposalSchema).parse(data)
  } catch (validationError) {
    console.error("Error validating proposals data:", validationError)
    return []
  }
}

// We'll use the same function for estimates since the schema is likely similar
async function getEstimates() {
  const { data, error } = await supabase
    .from('estimates') // Assuming table name is 'estimates'
    .select('*')

  if (error) {
    console.error("Error fetching estimates:", error)
    return []
  }

  console.log("Raw estimates data:", data);

  try {
    // Validate data against the schema
    return z.array(proposalSchema).parse(data)
  } catch (validationError) {
    console.error("Error validating estimates data:", validationError)
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
            <CreateProposalDialog />
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