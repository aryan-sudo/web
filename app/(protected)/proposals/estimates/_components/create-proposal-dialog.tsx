"use client"

import * as React from "react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export function CreateProposalDialog() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the uploaded files here
    console.log(acceptedFiles)
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold tracking-tight">Upload RFP Documents</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Upload your RFP documents and any additional context files to generate a proposal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
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
                  {isDragActive ? "Drop the files here" : "Drag & drop files here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to select from your computer
                </p>
              </div>
              <p className="text-xs text-muted-foreground/75">
                Supports PDF, DOC, DOCX, and TXT files
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="lg" className="px-8">
            Generate Proposal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}