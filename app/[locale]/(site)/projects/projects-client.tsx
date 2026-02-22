"use client"

import { useMemo, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilterBar } from "@/components/project-filter-bar"
import { useI18n } from "@/lib/i18n"
import { profile } from "@/data/profile"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

export function ProjectsClient() {
  const { t, locale } = useI18n()
  const [typeFilter, setTypeFilter] = useState<"all" | "work" | "personal">("all")
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"featured" | "recent" | "impact">("featured")
  const [yearFilter, setYearFilter] = useState<string | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    profile.projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [])

  const allYears = useMemo(() => {
    const years = Array.from(new Set(profile.projects.map((p) => p.year)))
    return years.sort((a, b) => b - a)
  }, [])

  const filteredProjects = useMemo(() => {
    let result = [...profile.projects]

    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter)
    }

    if (tagFilter) {
      result = result.filter((p) => p.tags.includes(tagFilter))
    }

    if (yearFilter !== "all") {
      result = result.filter((p) => String(p.year) === String(yearFilter))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => {
        const title = (p.copy.title[locale] ?? p.copy.title[DEFAULT_LOCALE]).toLowerCase()
        const oneLiner = (p.copy.oneLiner[locale] ?? p.copy.oneLiner[DEFAULT_LOCALE]).toLowerCase()
        const description = (p.copy.description[locale] ?? p.copy.description[DEFAULT_LOCALE]).toLowerCase()
        const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(q))
        return title.includes(q) || oneLiner.includes(q) || description.includes(q) || matchesTags
      })
    }

    if (sortBy === "featured") {
      result.sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year)
    } else if (sortBy === "recent") {
      result.sort((a, b) => b.year - a.year)
    } else {
      result.sort((a, b) => b.impactScore - a.impactScore)
    }

    return result
  }, [typeFilter, tagFilter, sortBy, searchQuery, yearFilter])

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-8 py-12 md:py-20">
        <SectionHeader title={t("section.allProjects")} />

        <ProjectFilterBar
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          tagFilter={tagFilter}
          onTagFilterChange={setTagFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          yearFilter={yearFilter}
          onYearFilterChange={setYearFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
          years={allYears}
        />

        {filteredProjects.length === 0 ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-border py-16">
            <p className="text-sm text-muted-foreground">{t("projects.emptyState")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
