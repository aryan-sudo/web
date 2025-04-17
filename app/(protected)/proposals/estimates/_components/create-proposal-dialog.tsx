"use client"

import * as React from "react"
import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTemplates, initiateProposalCreation, processAndEmbedDocuments } from "../actions"
import { CreateProposalActionInput, UploadedFile } from "../actions"
import { toast } from "sonner"

interface Template {
  id: string;
  name: string;
  description: string | null;
}

export function CreateProposalDialog() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [processingStep, setProcessingStep] = useState<'idle' | 'parsing' | 'embedding' | 'done' | 'error'>('idle')
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")

  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getTemplates();
      if (result.success && result.data) {
        setTemplates(result.data);
      } else {
        toast.error(result.error || "Failed to fetch templates");
      }
    };
    if (open) {
      fetchTemplates();
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setFiles([])
      setSelectedTemplate("")
      setIsSubmitting(false)
      setProcessingStep('idle')
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
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
        const base64Content = base64String.split(',')[1]
        resolve(base64Content)
      }
      reader.onerror = error => reject(error)
    })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedTemplate) { toast.error("Please select a template."); return; }
    if (files.length === 0) { toast.error("Please upload at least one document."); return; }
    setIsSubmitting(true)
    setProcessingStep('parsing')

    let proposalRequestId: string | undefined;

    try {
      const formData = new FormData(event.currentTarget)
      toast.info("Parsing uploaded files...");

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
        templateId: selectedTemplate,
        files: processedFiles
      }

      const initiationResult = await initiateProposalCreation(input)

      if (!initiationResult.success || !initiationResult.proposalRequestId || !initiationResult.extractedText) {
        setProcessingStep('error');
        toast.error(initiationResult.error || "Failed to parse documents or extract text.");
        setIsSubmitting(false);
        return;
      }

      proposalRequestId = initiationResult.proposalRequestId;
      const documentsText = initiationResult.extractedText;

      console.log("Initiation successful, Request ID:", proposalRequestId)
      toast.success("Files parsed successfully. Starting embedding...");
      setProcessingStep('embedding');

      const embeddingResult = await processAndEmbedDocuments({
        proposalRequestId: proposalRequestId,
        documentsText: documentsText
      });

      if (!embeddingResult.success) {
        setProcessingStep('error');
        toast.error(embeddingResult.error || "Failed to embed documents.");
        setIsSubmitting(false);
        return;
      }

      setProcessingStep('done');
      toast.success("Documents processed and ready for generation!");
      router.refresh()
      handleOpenChange(false)

    } catch (error: Error | unknown) {
      setProcessingStep('error');
      const message = error instanceof Error ? error.message : "An unexpected error occurred."
      toast.error(`Error: ${message}`)
      setIsSubmitting(false);
    }
  }

  const getSubmitButtonText = () => {
    if (processingStep === 'parsing') return "Parsing Files..."
    if (processingStep === 'embedding') return "Embedding Documents..."
    if (isSubmitting) return "Processing..."
    return "Initiate Creation"
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold tracking-tight">Initiate Proposal Creation</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Fill details, select a template, and upload documents to start the RAG process.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate} required name="templateId">
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.length === 0 && <SelectItem value="loading" disabled>Loading templates...</SelectItem>}
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} {template.description ? `- ${template.description}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter document title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" name="client" placeholder="Enter client name" required />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select name="type" defaultValue="proposal" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="estimate">Estimate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input id="value" name="value" type="number" placeholder="Enter value" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>RFP/Source Documents</Label>
            <div
              {...getRootProps()}
              className={cn(
                "relative border-2 border-dashed rounded-lg p-8 transition-colors",
                "hover:bg-muted/50 cursor-pointer",
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-3 text-center">
                <div className="rounded-full border border-dashed bg-muted p-2">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {isDragActive ? "Drop the files here" : "Drag & drop files here"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to select (PDF, DOCX, TXT)
                  </p>
                </div>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p className="font-medium">Selected files:</p>
                <ul className="list-disc pl-5 space-y-0.5">
                  {files.map((file) => (
                    <li key={file.name} className="truncate">{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" size="lg" disabled={isSubmitting || files.length === 0 || !selectedTemplate}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {getSubmitButtonText()}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}