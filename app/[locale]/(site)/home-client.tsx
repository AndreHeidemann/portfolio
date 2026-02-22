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
import { profile } from "@/data/profile"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

const featuredProjects = profile.projects.filter((p) => p.featured).slice(0, 6)
const featuredExperiences = profile.experiences.slice(0, 2)

export function HomeClient() {
  const { t, locale } = useI18n()
  const { basics, testimonials } = profile

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-16 py-12 md:py-20">
        <Hero />

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-2xl font-bold text-foreground">{basics.yearsExperience}+</p>
            <p className="text-sm text-muted-foreground">{t("highlights.experience")}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">{t("highlights.domains")}</p>
            <p className="text-sm text-muted-foreground">{basics.domains.join(", ")}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">{t("highlights.stack")}</p>
            <p className="text-sm text-muted-foreground">{basics.coreStack.join(", ")}</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeader
            title={t("section.featuredProjects")}
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${locale}/projects`}>
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

        <section className="flex flex-col gap-6">
          <SectionHeader
            title={t("section.experience")}
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${locale}/resume`}>
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

        {testimonials.length > 0 && (
          <section className="flex flex-col gap-6">
            <SectionHeader title={t("section.testimonials")} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {testimonials.map((testimonial) => {
                const fallback = DEFAULT_LOCALE
                const quote = testimonial.quote[locale] ?? testimonial.quote[fallback]
                const role = testimonial.role[locale] ?? testimonial.role[fallback]
                return (
                  <div key={testimonial.name} className="rounded-lg border border-border bg-card p-5">
                    <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                      {`"${quote}"`}
                    </blockquote>
                    <div className="mt-3 flex flex-col">
                      <span className="text-sm font-medium text-foreground">{testimonial.name}</span>
                      <span className="text-xs text-muted-foreground">{role}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <CTASection />
      </div>
    </div>
  )
}
