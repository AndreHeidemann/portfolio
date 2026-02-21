"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/hero"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { ExperienceCard } from "@/components/experience-card"
import { CTASection } from "@/components/cta-section"
import { useI18n } from "@/lib/i18n"
import { projects, experiences } from "@/lib/data"

const featuredProjects = projects.filter((p) => p.featured).slice(0, 6)
const featuredExperiences = experiences.slice(0, 2)

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-16 py-12 md:py-20">
        {/* Hero */}
        <Hero />

        {/* Quick Highlights */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-2xl font-bold text-foreground">6+</p>
            <p className="text-sm text-muted-foreground">{t("highlights.experience")}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">{t("highlights.domains")}</p>
            <p className="text-sm text-muted-foreground">{t("highlights.domainsValue")}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">{t("highlights.stack")}</p>
            <p className="text-sm text-muted-foreground">{t("highlights.stackValue")}</p>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            title={t("section.featuredProjects")}
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects">
                  {t("misc.viewAll")}
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            }
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Featured Experience */}
        <section className="flex flex-col gap-6">
          <SectionHeader
            title={t("section.experience")}
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resume">
                  {t("misc.viewAll")}
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            }
          />
          <div className="flex flex-col gap-4">
            {featuredExperiences.map((exp) => (
              <ExperienceCard key={exp.company} experience={exp} />
            ))}
          </div>
        </section>

        {/* Testimonials Placeholder */}
        <section className="flex flex-col gap-6">
          <SectionHeader title="Testimonials" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                quote: "Alex is one of the most talented engineers I've worked with. Their attention to detail and ability to ship high-quality code quickly is exceptional.",
                name: "Sarah Johnson",
                role: "VP of Engineering, TechCorp",
              },
              {
                quote: "A true full-stack engineer who understands both the technical depth and the user impact. Consistently delivers beyond expectations.",
                name: "Michael Torres",
                role: "CTO, StartupXYZ",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg border border-border bg-card p-5">
                <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                  {`"${testimonial.quote}"`}
                </blockquote>
                <div className="mt-3 flex flex-col">
                  <span className="text-sm font-medium text-foreground">{testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </div>
    </div>
  )
}
