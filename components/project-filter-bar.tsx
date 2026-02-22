"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

interface ProjectFilterBarProps {
  typeFilter: "all" | "work" | "personal"
  onTypeFilterChange: (type: "all" | "work" | "personal") => void
  tagFilter: string | null
  onTagFilterChange: (tag: string | null) => void
  sortBy: "featured" | "recent" | "impact"
  onSortChange: (sort: "featured" | "recent" | "impact") => void
  yearFilter: string | "all"
  onYearFilterChange: (year: string | "all") => void
  searchQuery: string
  onSearchChange: (query: string) => void
  allTags: string[]
  years: number[]
}

export function ProjectFilterBar({
  typeFilter,
  onTypeFilterChange,
  tagFilter,
  onTagFilterChange,
  sortBy,
  onSortChange,
  yearFilter,
  onYearFilterChange,
  searchQuery,
  onSearchChange,
  allTags,
  years,
}: ProjectFilterBarProps) {
  const { t } = useI18n()

  const typeOptions: { value: "all" | "work" | "personal"; label: string }[] = [
    { value: "all", label: t("filter.all") },
    { value: "work", label: t("filter.work") },
    { value: "personal", label: t("filter.personal") },
  ]

  const sortOptions: { value: "featured" | "recent" | "impact"; label: string }[] = [
    { value: "featured", label: t("filter.sortFeatured") },
    { value: "recent", label: t("filter.sortRecent") },
    { value: "impact", label: t("filter.sortImpact") },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("filter.search")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onTypeFilterChange(opt.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                typeFilter === opt.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-pressed={typeFilter === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSortChange(opt.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                sortBy === opt.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-pressed={sortBy === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {years.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{t("filter.years")}</span>
            <select
              className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground"
              value={yearFilter}
              aria-label={t("filter.years")}
              onChange={(event) => {
                const value = event.target.value
                onYearFilterChange(value === "all" ? "all" : value)
              }}
            >
              <option value="all">{t("filter.all")}</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onTagFilterChange(null)}
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
            tagFilter === null
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
          }`}
          aria-pressed={tagFilter === null}
        >
          {t("filter.all")}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagFilterChange(tag === tagFilter ? null : tag)}
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
              tagFilter === tag
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
            aria-pressed={tagFilter === tag}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
