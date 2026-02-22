"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { useI18n } from "@/lib/i18n"
import type { Project } from "@/data/profile"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { t, locale } = useI18n()
  const fallback = DEFAULT_LOCALE
  const copy = project.copy
  const title = copy.title[locale] ?? copy.title[fallback]
  const oneLiner = copy.oneLiner[locale] ?? copy.oneLiner[fallback]
  const impactBullets = copy.impactBullets[locale] ?? copy.impactBullets[fallback]

  const sections = [
    { key: "project.overview", content: copy.overview[locale] ?? copy.overview[fallback] },
    { key: "project.context", content: copy.context[locale] ?? copy.context[fallback] },
    { key: "project.approach", content: copy.approach[locale] ?? copy.approach[fallback] },
    { key: "project.architecture", content: copy.architecture[locale] ?? copy.architecture[fallback] },
    { key: "project.challenges", content: copy.challenges[locale] ?? copy.challenges[fallback] },
    { key: "project.results", content: copy.results[locale] ?? copy.results[fallback] },
  ].filter((section) => section.content && section.content.trim().length > 0)

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6">
      <div className="flex flex-col gap-8 py-12 md:py-20">
        <Button variant="ghost" size="sm" className="w-fit" asChild>
          <Link href={`/${locale}/projects`}>
            <ArrowLeft className="size-3.5" />
            {t("project.backToProjects")}
          </Link>
        </Button>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">{oneLiner}</p>
            </div>
            <CopyButton
              text={typeof window !== "undefined" ? window.location.href : ""}
              label={t("project.copyLink")}
              toastMessage={t("project.copied")}
            />
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {impactBullets.length > 0 && (
            <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-muted/30 p-4">
              {impactBullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="inline-block size-1.5 rounded-full bg-foreground" />
                  {bullet}
                </div>
              ))}
            </div>
          )}
        </div>

        {sections.length > 0 && (
          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.key} className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(section.key)}
                </h2>
                <p className="text-sm leading-relaxed text-foreground">{section.content}</p>
              </div>
            ))}
          </div>
        )}

        {project.tags.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("project.techStack")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {(project.repoUrl || project.demoUrl) && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("project.links")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.repoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="size-3.5" />
                    {t("misc.repo")}
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-3.5" />
                    {t("misc.demo")}
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
