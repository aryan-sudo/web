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
import { getTemplates, generateProposal } from "../actions"
import { ProposalInput, UploadedFile } from "../actions"
import { toast } from "sonner"
import Tiptap from "@/components/common/editor"

interface Template {
  id: string;
  name: string;
  description: string | null;
}

export function CreateProposalDialog() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [processingStep, setProcessingStep] = useState<'idle' | 'processing' | 'displaying' | 'error'>('idle')
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [generatedContent, setGeneratedContent] = useState<string>("")

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
      setGeneratedContent("")
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
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
    event.preventDefault();
    
    if (!selectedTemplate) { toast.error("Please select a template."); return; }
    if (files.length === 0) { toast.error("Please upload at least one document."); return; }
    
    setIsSubmitting(true)
    setGeneratedContent("")
    setProcessingStep('processing')
    toast.info("Processing documents and generating proposal...");

    try {
      const formData = new FormData(event.currentTarget)

      const processedFiles: UploadedFile[] = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          content: await convertFileToBase64(file)
        }))
      )

      const inputData: ProposalInput = {
        title: formData.get('title') as string,
        client: formData.get('client') as string,
        companyName: formData.get('companyName') as string || "Our Company",
        templateId: selectedTemplate,
        files: processedFiles
      }

      const result = await generateProposal(inputData)

      if (!result.success || !result.generatedContent) {
        setProcessingStep('error');
        toast.error(result.error || "Failed to generate proposal content.");
        setIsSubmitting(false);
        return;
      }

      setGeneratedContent(result.generatedContent);
      setProcessingStep('displaying');
      toast.success("Proposal generated successfully!");
      setIsSubmitting(false);
      router.refresh()

    } catch (error: Error | unknown) {
      setProcessingStep('error');
      const message = error instanceof Error ? error.message : "An unexpected error occurred."
      toast.error(`Error: ${message}`)
      setIsSubmitting(false);
    }
  }

  const getSubmitButtonText = () => {
    if (processingStep === 'processing') return "Generating Proposal..."
    if (isSubmitting) return "Processing..."
    return "Generate Proposal"
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9" disabled={processingStep !== 'idle' && processingStep !== 'displaying' && processingStep !== 'error'}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 space-y-1 flex-shrink-0 border-b">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {processingStep === 'displaying' ? "Generated Proposal" : "Create New Proposal"}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {processingStep === 'displaying' 
              ? "Review the generated content below. You can copy or edit it further outside this dialog."
              : "Fill details, select template, and upload documents to generate a proposal."
            }
          </DialogDescription>
        </DialogHeader>

        {processingStep === 'displaying' ? (
          <div className="flex-grow overflow-y-auto overflow-x-hidden p-6 border-t">
              {generatedContent ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <Tiptap content={generatedContent} />
                  </div>
              ) : (
                <p className="text-center text-muted-foreground py-10">No content was generated.</p>
              )}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
            <div className="space-y-1.5">
               <Label htmlFor="template">Template</Label>
               <Select value={selectedTemplate} onValueChange={setSelectedTemplate} required name="templateId" disabled={isSubmitting}>
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
 
             <div className="space-y-1.5">
               <Label htmlFor="title">Project Title</Label>
               <Input id="title" name="title" placeholder="Enter project title" required disabled={isSubmitting}/>
             </div>
             <div className="space-y-1.5">
               <Label htmlFor="client">Client Name</Label>
               <Input id="client" name="client" placeholder="Enter client name" required disabled={isSubmitting}/>
             </div>
             <div className="space-y-1.5">
               <Label htmlFor="companyName">Your Company Name</Label>
               <Input id="companyName" name="companyName" placeholder="Enter your company name" required disabled={isSubmitting}/>
             </div>

            <div className="space-y-1.5">
               <Label>Source Documents</Label>
               <div
                 {...getRootProps()}
                 className={cn(
                   "relative flex flex-col items-center justify-center space-y-3 border-2 border-dashed rounded-lg p-8 transition-colors",
                   isSubmitting ? "cursor-not-allowed bg-muted/30 opacity-50" : "hover:bg-muted/50 cursor-pointer",
                   isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                 )}
               >
                 <input {...getInputProps()} disabled={isSubmitting}/>
                 <div className="rounded-full border border-dashed bg-background p-2">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium">
                      {isDragActive ? "Drop the files here" : "Drag & drop files here"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to select (DOCX, TXT only)
                    </p>
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

            <div className="flex justify-end pt-4 flex-shrink-0 sticky bottom-0 bg-background pb-4">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting || files.length === 0 || !selectedTemplate}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
                {getSubmitButtonText()}
              </Button>
            </div>
          </form>
        )}

        <div className="flex justify-end p-6 pt-4 flex-shrink-0 border-t">
          {processingStep === 'displaying' && (
            <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}