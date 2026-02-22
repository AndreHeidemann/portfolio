"use client"

import { useI18n } from "@/lib/i18n"
import type { Experience } from "@/data/profile"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { t, locale } = useI18n()
  const fallback = DEFAULT_LOCALE
  const title = experience.role[locale] ?? experience.role[fallback]
  const location = experience.location[locale] ?? experience.location[fallback]
  const bullets = experience.bullets[locale] ?? experience.bullets[fallback]
  const endLabel = experience.endDate ?? t("misc.present")

  return (
    <div className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground/80">{experience.company}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            {experience.startDate} — {endLabel}
          </span>
          <span className="hidden md:inline">{"/"}</span>
          <span>
            {location}
            {experience.remote && ` (${t("misc.remote")})`}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-1.5">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-baseline gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className="inline-block size-1 shrink-0 rounded-full bg-foreground/30 translate-y-[1px]" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}
