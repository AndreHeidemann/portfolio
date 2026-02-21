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
import { skills, additionalSkills, experiences, projects, education, certifications } from "@/lib/data"

const sideProjects = projects.filter((p) => p.type === "personal")

export default function ResumePage() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-12 py-12 md:py-20">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Alex Chen
            </h1>
            <p className="text-sm text-muted-foreground">{t("hero.title")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/resume/print">
                <Printer className="size-3.5" />
                Print
              </Link>
            </Button>
            <Button size="sm">
              <FileDown className="size-3.5" />
              {t("resume.downloadPdf")}
            </Button>
          </div>
        </div>

        {/* Summary */}
        <section className="flex flex-col gap-3">
          <SectionHeader title={t("section.summary")} />
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t("resume.summaryText")}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.skills")} />
          <SkillsTable skills={skills} />
        </section>

        {/* Additional Skills */}
        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.additionalSkills")} />
          <SkillChips skills={additionalSkills} />
        </section>

        {/* Work History */}
        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.workHistory")} />
          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.company} experience={exp} showInitiatives />
            ))}
          </div>
        </section>

        {/* Side Projects */}
        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.sideProjects")} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sideProjects.map((project) => (
              <div key={project.slug} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.oneLiner}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.education")} />
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div key={edu.institution} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {edu.institution} &middot; {edu.year}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="flex flex-col gap-4">
          <SectionHeader title={t("section.certifications")} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer} &middot; {cert.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
