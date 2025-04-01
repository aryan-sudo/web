import { Heading } from "@/components/ui/heading"

export default function GenerateCodePage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Heading as="h1">Generate Code</Heading>
        <p className="text-muted-foreground">
          Create code snippets and components using AI-powered tools.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6 shadow-sm col-span-2">
          <h3 className="text-xl font-semibold">AI Code Generator</h3>
          <p className="mt-2 text-muted-foreground">
            Describe what you want to build and let AI generate the code.
          </p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="font-mono text-sm">
              {`// Placeholder for AI code generation interface
// Example:
              
function ExampleComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 border rounded-lg">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Recent Generations</h3>
          <p className="mt-2 text-muted-foreground">
            Access your recently generated code snippets.
          </p>
        </div>
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Saved Snippets</h3>
          <p className="mt-2 text-muted-foreground">
            Browse your library of saved code snippets.
          </p>
        </div>
      </div>
    </div>
  )
} 