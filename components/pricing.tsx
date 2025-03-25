import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Pricing() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with Your Team</h1>
                    <p>FlowPilot offers flexible pricing options to support teams of all sizes. Choose the plan that best fits your organization&apos;s development needs.</p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-medium">Starter</CardTitle>

                            <span className="my-3 block text-2xl font-semibold">$29 / mo</span>

                            <CardDescription className="text-sm">Per user</CardDescription>
                            <Button asChild variant="outline" className="mt-4 w-full">
                                <Link href="">Get Started</Link>
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Basic Project Management', 'Requirements Tracking', 'Task Management', 'Limited AI Assistance', 'Basic Analytics', 'Email Support'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="relative">
                        <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Most Popular</span>

                        <CardHeader>
                            <CardTitle className="font-medium">Team</CardTitle>

                            <span className="my-3 block text-2xl font-semibold">$79 / mo</span>

                            <CardDescription className="text-sm">Per user</CardDescription>

                            <Button asChild className="mt-4 w-full">
                                <Link href="">Get Started</Link>
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Everything in Starter Plan', 'Full AI Code Generation', 'Advanced Project Planning', 'Intelligent Requirements Analysis', 'Task Dependencies & Automation', 'Integration with GitHub/GitLab', 'Predictive Risk Analysis', 'Team Collaboration Tools', 'Priority Support', 'Custom Dashboards'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-medium">Enterprise</CardTitle>

                            <span className="my-3 block text-2xl font-semibold">Custom</span>

                            <CardDescription className="text-sm">Contact for pricing</CardDescription>

                            <Button asChild variant="outline" className="mt-4 w-full">
                                <Link href="">Contact Sales</Link>
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Everything in Team Plan', 'Unlimited Projects', 'Advanced Security Features', 'Custom AI Model Training', 'Enterprise Integrations', 'Dedicated Account Manager', 'On-premise Deployment Option', '24/7 Priority Support', 'Custom Reporting', 'SLA Guarantees'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
