export default function FAQs() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p>Common questions about FlowPilot platform</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">How does the AI code generation work?</h3>
                            <p className="text-muted-foreground mt-4">FlowPilot&apos;s AI code generation analyzes your requirements and project context to generate high-quality, secure code that follows your team&apos;s conventions and best practices.</p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">The AI learns from your codebase to understand your coding styles and patterns.</li>
                                <li className="text-muted-foreground mt-4">It generates code based on requirements you specify in natural language.</li>
                                <li className="text-muted-foreground mt-4">The platform provides explanations for the generated code and allows for easy customization.</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can FlowPilot integrate with my existing tools?</h3>
                            <p className="text-muted-foreground mt-4">Yes, FlowPilot integrates with popular version control systems, project management tools, and CI/CD pipelines including GitHub, GitLab, Jira, Jenkins, and more.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">How does the platform handle data security?</h3>
                            <p className="text-muted-foreground my-4">We take data security very seriously and have implemented multiple layers of protection for your code and project information.</p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">All data is encrypted in transit and at rest.</li>
                                <li className="text-muted-foreground">We offer role-based access controls to ensure only authorized team members can access sensitive information.</li>
                                <li className="text-muted-foreground">Enterprise plans include additional security features like single sign-on, audit logs, and custom data retention policies.</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">What kind of support do you offer?</h3>
                            <p className="text-muted-foreground mt-4">We offer different levels of support based on your plan. All customers receive email support, while Team and Enterprise plans include priority support with faster response times. Enterprise customers also receive a dedicated account manager and 24/7 technical support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
