import Link from 'next/link'

export default function CommunitySection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        Trusted by Development Teams <br /> Around the World
                    </h2>
                    <p className="mt-6">Join the growing community of developers and teams that use FlowPilot to streamline their SDLC.</p>
                </div>
                <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-3">
                    <Link href="#" target="_blank" title="Engineering Lead" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Project Manager" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/2.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Developer" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/3.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="QA Engineer" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/4.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Product Owner" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/5.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Tech Lead" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/6.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="DevOps Engineer" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/7.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="CTO" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Scrum Master" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/8.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="UX Designer" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/9.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                    <Link href="#" target="_blank" title="Software Architect" className="size-16 rounded-full border *:size-full *:rounded-full *:object-cover">
                        <img alt="Team Member" src="https://randomuser.me/api/portraits/men/10.jpg" loading="lazy" width={120} height={120} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
