"use client"

import { Link2 } from "lucide-react"

interface SectionHeaderProps {
  title: string
  id?: string
  action?: React.ReactNode
}

export function SectionHeader({ title, id, action }: SectionHeaderProps) {
  const slug = id || title.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="flex items-center justify-between">
      <h2 id={slug} className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
        <a href={`#${slug}`} className="flex items-center gap-2">
          {title}
          <Link2 className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      </h2>
      {action}
    </div>
  )
}
