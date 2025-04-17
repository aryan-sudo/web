"use client"

import * as React from "react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createProposal } from "../actions"
import { CreateProposalActionInput, UploadedFile } from "../actions"
import { toast } from "sonner"
import Tiptap from "@/components/common/editor"

export function CreateProposalDialog() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [generatedProposal, setGeneratedProposal] = useState<string>('')
  const [open, setOpen] = useState(false)

  // Reset state when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setFiles([])
      setGeneratedProposal('')
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    }
  })

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64String = reader.result as string
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64Content = base64String.split(',')[1]
        resolve(base64Content)
      }
      reader.onerror = error => reject(error)
    })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setGeneratedProposal('')

    try {
      const formData = new FormData(event.currentTarget)
      
      // Convert files to base64
      const processedFiles: UploadedFile[] = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          content: await convertFileToBase64(file)
        }))
      )

      const input: CreateProposalActionInput = {
        title: formData.get('title') as string,
        client: formData.get('client') as string,
        type: formData.get('type') as "proposal" | "estimate",
        value: formData.get('value') ? Number(formData.get('value')) : undefined,
        dueDate: formData.get('dueDate') as string || undefined,
        files: processedFiles
      }

      const result = await createProposal(input)

      if (result.success) {
        toast.success("Proposal created successfully")
        if (result.generatedProposal) {
          setGeneratedProposal(result.generatedProposal)
        }
        router.refresh()
      } else {
        toast.error(result.error || "Failed to create proposal")
      }
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An error occurred while creating the proposal")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold tracking-tight">Create New Document</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Fill in the details and upload any RFP documents to generate a proposal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter document title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  name="client"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <RadioGroup defaultValue="proposal" name="type" className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="proposal" id="proposal" />
                    <Label htmlFor="proposal" className="font-normal">Proposal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="estimate" id="estimate" />
                    <Label htmlFor="estimate" className="font-normal">Estimate</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    placeholder="Enter value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div
              {...getRootProps()}
              className={cn(
                "relative border-2 border-dashed rounded-xl p-10 transition-colors",
                "hover:bg-muted/50",
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium leading-6">
                    {isDragActive ? "Drop the files here" : "Drag & drop RFP files here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to select from your computer
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/75">
                  Supports PDF, DOC, DOCX, and TXT files
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Selected files:</p>
                  <ul className="text-sm text-muted-foreground">
                    {files.map((file) => (
                      <li key={file.name} className="flex items-center space-x-2">
                        <FileCheck className="h-4 w-4" />
                        <span>{file.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Document"}
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Generated Proposal</h3>
              {generatedProposal ? (
                <div className="rounded-lg border bg-card text-card-foreground p-4 h-[600px] overflow-y-auto">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <Tiptap content={generatedProposal} />
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                  <Upload className="mx-auto h-8 w-8 mb-3 text-muted-foreground/50" />
                  <p>Upload RFP documents and fill in the form to generate a proposal automatically.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}