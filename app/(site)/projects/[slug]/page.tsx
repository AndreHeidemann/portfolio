"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { projects } from "@/lib/data"
import { useI18n } from "@/lib/i18n"
import { notFound } from "next/navigation"

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t } = useI18n()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const sections = [
    { key: "project.overview", content: project.overview },
    { key: "project.context", content: project.context },
    { key: "project.approach", content: project.approach },
    { key: "project.architecture", content: project.architecture },
    { key: "project.challenges", content: project.challenges },
    { key: "project.results", content: project.results },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6">
      <div className="flex flex-col gap-8 py-12 md:py-20">
        {/* Back button */}
        <Button variant="ghost" size="sm" className="w-fit" asChild>
          <Link href="/projects">
            <ArrowLeft className="size-3.5" />
            {t("project.backToProjects")}
          </Link>
        </Button>

        {/* Title area */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
                {project.title}
              </h1>
              <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
            </div>
            <CopyButton
              text={typeof window !== "undefined" ? window.location.href : ""}
              label={t("project.copyLink")}
              toastMessage={t("project.copied")}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Impact */}
          <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-muted/30 p-4">
            {project.impactBullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                <span className="inline-block size-1.5 rounded-full bg-foreground" />
                {bullet}
              </div>
            ))}
          </div>
        </div>

        {/* Case Study Sections */}
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

        {/* Tech Stack */}
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

        {/* Screenshot Gallery */}
        <ScreenshotGallery />

        {/* External Links */}
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
      </div>
    </div>
  )
}
