import { Heading } from "@/components/ui/heading"

export default function CodeReviewPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Code Review</Heading>
        <p className="text-muted-foreground">
          Get AI-powered analysis and feedback on your code.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm col-span-2">
          <h3 className="text-xl font-semibold">Submit Code for Review</h3>
          <p className="mt-2 text-muted-foreground">
            Paste your code or upload files for AI review and analysis.
          </p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="font-mono text-sm">
              {`// Placeholder for code input area
// Example code with issues:

function calculateTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return;  // Missing return value
}`}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Review History</h3>
          <p className="mt-2 text-muted-foreground">
            Access previously reviewed code snippets and feedback.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Review Settings</h3>
          <p className="mt-2 text-muted-foreground">
            Configure code review preferences and standards.
          </p>
        </div>
      </div>
    </div>
  )
} 