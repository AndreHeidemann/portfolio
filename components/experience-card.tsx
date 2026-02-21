"use client"

import { useI18n } from "@/lib/i18n"
import type { Experience } from "@/lib/data"

interface ExperienceCardProps {
  experience: Experience
  showInitiatives?: boolean
}

export function ExperienceCard({ experience, showInitiatives = false }: ExperienceCardProps) {
  const { t } = useI18n()

  return (
    <div className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{experience.title}</h3>
          <p className="text-sm text-foreground/80">{experience.company}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{experience.startDate} — {experience.endDate}</span>
          <span className="hidden md:inline">{"/"}</span>
          <span>
            {experience.location}
            {experience.remote && ` (${t("misc.remote")})`}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-1.5">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="flex items-baseline gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className="inline-block size-1 shrink-0 rounded-full bg-foreground/30 translate-y-[1px]" />
            {bullet}
          </li>
        ))}
      </ul>

      {showInitiatives && experience.keyInitiatives && (
        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          <p className="text-xs font-medium text-foreground">{t("resume.keyInitiatives")}</p>
          <ul className="flex flex-col gap-1">
            {experience.keyInitiatives.map((init, i) => (
              <li key={i} className="flex items-baseline gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="inline-block size-1 shrink-0 rounded-full bg-foreground/30 translate-y-[1px]" />
                {init}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
