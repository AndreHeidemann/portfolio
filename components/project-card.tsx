"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/data"
import { useI18n } from "@/lib/i18n"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useI18n()

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground group-hover:underline underline-offset-2">
          {project.title}
        </h3>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.oneLiner}
      </p>

      <ul className="flex flex-col gap-1">
        {project.impactBullets.slice(0, 2).map((bullet, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-baseline gap-1.5">
            <span className="inline-block size-1 shrink-0 rounded-full bg-foreground/30 translate-y-[-1px]" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tags.slice(0, 4).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </Link>
  )
}
