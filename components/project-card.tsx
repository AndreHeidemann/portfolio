"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/profile"
import { useI18n } from "@/lib/i18n"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, locale } = useI18n()
  const copy = project.copy
  const fallback = DEFAULT_LOCALE
  const title = copy.title[locale] ?? copy.title[fallback]
  const oneLiner = copy.oneLiner[locale] ?? copy.oneLiner[fallback]
  const bullets = copy.impactBullets[locale] ?? copy.impactBullets[fallback]

  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground group-hover:underline underline-offset-2">
          {title}
        </h3>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {oneLiner}
      </p>

      {bullets.length > 0 && (
        <ul className="flex flex-col gap-1">
          {bullets.slice(0, 2).map((bullet, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-baseline gap-1.5">
              <span className="inline-block size-1 shrink-0 rounded-full bg-foreground/30 translate-y-[-1px]" />
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  )
}
