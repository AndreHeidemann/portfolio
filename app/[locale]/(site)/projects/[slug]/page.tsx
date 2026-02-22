import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { profile } from "@/data/profile"
import { absoluteUrl, OG_IMAGE, SITE_NAME, getOgLocale } from "@/lib/site"
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n-config"
import { ProjectDetailClient } from "./project-detail-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = isSupportedLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE
  const project = profile.projects.find((p) => p.slug === resolvedParams.slug)
  if (!project) {
    return { title: "Project not found" }
  }
  const titleCopy = project.copy.title[DEFAULT_LOCALE]
  const descriptionCopy = project.copy.description[DEFAULT_LOCALE]
  const title = `${titleCopy} – Case Study`
  const description = descriptionCopy
  const url = `/${locale}/projects/${project.slug}`
  const ogLocale = getOgLocale(locale)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: absoluteUrl(url),
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale,
      images: [OG_IMAGE],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = profile.projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
