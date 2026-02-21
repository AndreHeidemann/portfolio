"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { skills, experiences, education, certifications, additionalSkills } from "@/lib/data"

export default function PrintResumePage() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6">
      {/* Back button - hidden in print */}
      <div className="flex items-center gap-2 pt-6 print:hidden">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/resume">
            <ArrowLeft className="size-3.5" />
            Back to Resume
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          Print
        </Button>
      </div>

      <div className="flex flex-col gap-8 py-8 print:gap-5 print:py-0">
        {/* Header */}
        <div className="border-b border-border pb-4 print:border-foreground/20">
          <h1 className="text-xl font-bold text-foreground">Alex Chen</h1>
          <p className="text-sm text-muted-foreground">{t("hero.title")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            alex@example.com &middot; San Francisco, CA &middot; github.com/alexchen &middot; linkedin.com/in/alexchen
          </p>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.summary")}
          </h2>
          <p className="text-xs leading-relaxed text-foreground">
            {t("resume.summaryText")}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.skills")}
          </h2>
          <div className="grid grid-cols-4 gap-x-4 gap-y-1 text-xs">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-baseline justify-between">
                <span className="text-foreground">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Also: </span>
            {additionalSkills.join(", ")}
          </p>
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.workHistory")}
          </h2>
          {experiences.map((exp) => (
            <div key={exp.company} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold text-foreground">{exp.title}</span>
                  <span className="text-xs text-muted-foreground"> &middot; {exp.company}</span>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <ul className="flex flex-col gap-0.5 pl-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-[11px] text-foreground leading-relaxed list-disc">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.education")}
          </h2>
          {education.map((edu) => (
            <div key={edu.institution} className="flex items-baseline justify-between text-xs">
              <span className="text-foreground">
                {edu.degree} in {edu.field}, {edu.institution}
              </span>
              <span className="text-muted-foreground">{edu.year}</span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.certifications")}
          </h2>
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-baseline justify-between text-xs">
              <span className="text-foreground">{cert.name}</span>
              <span className="text-muted-foreground">{cert.issuer}, {cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
