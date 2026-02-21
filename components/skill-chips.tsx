"use client"

import { Badge } from "@/components/ui/badge"

interface SkillChipsProps {
  skills: string[]
}

export function SkillChips({ skills }: SkillChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill} variant="outline" className="font-normal text-xs">
          {skill}
        </Badge>
      ))}
    </div>
  )
}
