"use client"

import { useMemo, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilterBar } from "@/components/project-filter-bar"
import { useI18n } from "@/lib/i18n"
import { projects } from "@/lib/data"

export default function ProjectsPage() {
  const { t } = useI18n()
  const [typeFilter, setTypeFilter] = useState<"all" | "work" | "personal">("all")
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"featured" | "recent">("featured")
  const [searchQuery, setSearchQuery] = useState("")

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [])

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter)
    }

    if (tagFilter) {
      result = result.filter((p) => p.tags.includes(tagFilter))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.oneLiner.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === "featured") {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else {
      result.sort((a, b) => b.year - a.year)
    }

    return result
  }, [typeFilter, tagFilter, sortBy, searchQuery])

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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allTags={allTags}
        />

        {filteredProjects.length === 0 ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-border py-16">
            <p className="text-sm text-muted-foreground">No projects match your filters.</p>
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
