"use client"

import Link from "next/link"
import { FileDown, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { SkillsTable } from "@/components/skills-table"
import { SkillChips } from "@/components/skill-chips"
import { ExperienceCard } from "@/components/experience-card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { profile } from "@/data/profile"
import { CopyButton } from "@/components/copy-button"
import { useRouter } from "next/navigation"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

const { skills, additionalSkills, experiences, projects, education, certifications, awards } = profile
const sideProjects = projects.filter((p) => p.type === "personal")

export function ResumeClient() {
  const { t, locale } = useI18n()
  const router = useRouter()
  const fallback = DEFAULT_LOCALE
  const basicsCopy = profile.basics.translations[locale] ?? profile.basics.translations[fallback]
  const summary = profile.basics.summary[locale] ?? profile.basics.summary[fallback]

  const handleDownload = () => {
    router.push(`/${locale}/resume/print?print=1`)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-12 py-12 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {basicsCopy.name}
            </h1>
            <p className="text-sm text-muted-foreground">{basicsCopy.headline}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${locale}/resume/print`}>
                <Printer className="size-3.5" />
                {t("resume.print")}
              </Link>
            </Button>
            <Button size="sm" type="button" onClick={handleDownload}>
              <FileDown className="size-3.5" />
              {t("resume.downloadPdf")}
            </Button>
            <CopyButton
              text={typeof window !== "undefined" ? window.location.href : ""}
              label={t("misc.share")}
              toastMessage={t("project.copied")}
            />
          </div>
        </div>

        <section className="flex flex-col gap-3">
          <SectionHeader title={t("section.summary")} />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.skills")} />
          <SkillsTable skills={skills} />
        </section>

        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.additionalSkills")} />
          <SkillChips skills={additionalSkills} />
        </section>

        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.workHistory")} />
          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <ExperienceCard key={`${exp.company}-${exp.startDate}`} experience={exp} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.sideProjects")} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sideProjects.map((project) => {
              const title = project.copy.title[locale] ?? project.copy.title[fallback]
              const blurb = project.copy.oneLiner[locale] ?? project.copy.oneLiner[fallback]
              return (
                <div key={project.slug} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.education")} />
          <div className="flex flex-col gap-3">
            {education.map((edu) => {
              const degree = edu.degree[locale] ?? edu.degree[fallback]
              return (
                <div key={edu.institution} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">{degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution} &middot; {edu.start} – {edu.end}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {certifications.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeader title={t("section.certifications")} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certifications.map((cert) => {
                const name = cert.name[locale] ?? cert.name[fallback]
                return (
                  <div key={`${name}-${cert.year}`} className="rounded-lg border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground">{name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section className="flex flex-col gap-4">
            <SectionHeader title={t("section.awards")} />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {awards.map((award) => {
                const title = award.title[locale] ?? award.title[fallback]
                const description = award.description
                  ? award.description[locale] ?? award.description[fallback]
                  : undefined
                return (
                  <div key={`${title}-${award.year}`} className="rounded-lg border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {award.issuer ?? ""} {award.issuer ? "·" : ""} {award.year}
                    </p>
                    {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
