import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentSection() {
    return (
        <section className="py-16 md:py-32" style={{ backgroundColor: "#09090B" }}>
            <div className="mx-auto max-w-7xl px-6">
                <div className="space-y-8 md:space-y-12">
                    <div className="w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
                        <img
                            className="w-full h-full object-cover grayscale"
                            src="/professional-man-cybersecurity-expert.png"
                            alt="ETSEC cybersecurity team working on advanced threat detection"
                            loading="lazy"
                        />
                    </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium text-white">The ETSEC ecosystem brings together our expertise, advanced tools and cutting-edge platforms.</h2>
                    <div className="space-y-6">
                        <p className="text-muted-foreground">ETSEC is evolving to be more than just cybersecurity services. We support an entire ecosystem — from threat detection products to the APIs and platforms helping businesses and organizations strengthen their security posture.</p>

                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5 bg-cyan-500 text-white hover:bg-cyan-600">
                            <Link href="/about">
                                <span>Learn More</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}
