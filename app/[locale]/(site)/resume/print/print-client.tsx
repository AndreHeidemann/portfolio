"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { profile } from "@/data/profile"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

const { skills, experiences, education, certifications, additionalSkills, awards } = profile

export function PrintResumeClient() {
  const { t, locale } = useI18n()
  const searchParams = useSearchParams()
  const fallback = DEFAULT_LOCALE
  const basicsCopy = profile.basics.translations[locale] ?? profile.basics.translations[fallback]
  const summary = profile.basics.summary[locale] ?? profile.basics.summary[fallback]
  const socialHandles = profile.basics.socials
    .filter((social) => social.platform !== "email")
    .map((social) => social.url.replace(/https?:\/\//, ""))
  const contactLine = [profile.basics.email, basicsCopy.location, ...socialHandles].join(
    " · "
  )

  useEffect(() => {
    if (searchParams?.get("print") === "1") {
      window.print()
    }
  }, [searchParams])

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6">
      <div className="flex items-center gap-2 pt-6 print:hidden">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${locale}/resume`}>
            <ArrowLeft className="size-3.5" />
            {t("resume.printBack")}
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          {t("resume.print")}
        </Button>
      </div>

      <div className="flex flex-col gap-8 py-8 print:gap-5 print:py-0">
        <div className="border-b border-border pb-4 print:border-foreground/20">
          <h1 className="text-xl font-bold text-foreground">{basicsCopy.name}</h1>
          <p className="text-sm text-muted-foreground">{basicsCopy.headline}</p>
          <p className="mt-1 text-xs text-muted-foreground">{contactLine}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.summary")}
          </h2>
          <p className="text-xs leading-relaxed text-foreground">{summary}</p>
        </div>

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

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.workHistory")}
          </h2>
          {experiences.map((exp) => {
            const title = exp.role[locale] ?? exp.role[fallback]
            const bullets = exp.bullets[locale] ?? exp.bullets[fallback]
            const endLabel = exp.endDate ?? t("misc.present")
            return (
              <div key={`${exp.company}-${title}`} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground">{title}</span>
                    <span className="text-xs text-muted-foreground"> &middot; {exp.company}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {exp.startDate} — {endLabel}
                  </span>
                </div>
                <ul className="flex flex-col gap-0.5 pl-3">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="text-[11px] text-foreground leading-relaxed list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("section.education")}
          </h2>
          {education.map((edu) => {
            const degree = edu.degree[locale] ?? edu.degree[fallback]
            return (
              <div key={edu.institution} className="flex items-baseline justify-between text-xs">
                <span className="text-foreground">
                  {degree}, {edu.institution}
                </span>
                <span className="text-muted-foreground">{edu.start} – {edu.end}</span>
              </div>
            )
          })}
        </div>

        {certifications.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("section.certifications")}
            </h2>
            {certifications.map((cert) => {
              const name = cert.name[locale] ?? cert.name[fallback]
              return (
                <div key={`${name}-${cert.year}`} className="flex items-baseline justify-between text-xs">
                  <span className="text-foreground">{name}</span>
                  <span className="text-muted-foreground">{cert.issuer}, {cert.year}</span>
                </div>
              )
            })}
          </div>
        )}

        {awards.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("section.awards")}
            </h2>
            {awards.map((award) => {
              const title = award.title[locale] ?? award.title[fallback]
              const description = award.description
                ? award.description[locale] ?? award.description[fallback]
                : undefined
              return (
                <div key={`${title}-${award.year}`} className="flex flex-col text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-foreground">{title}</span>
                    <span className="text-muted-foreground">{award.year}</span>
                  </div>
                  {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
