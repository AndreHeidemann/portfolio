"use client"

import { useI18n } from "@/lib/i18n"
import type { Skill } from "@/data/profile"

interface SkillsTableProps {
  skills: Skill[]
}

export function SkillsTable({ skills }: SkillsTableProps) {
  const { t } = useI18n()

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
              {t("resume.skill")}
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
              {t("resume.years")}
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
              {t("resume.level")}
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, i) => (
            <tr key={skill.name} className={i !== skills.length - 1 ? "border-b border-border" : ""}>
              <td className="px-4 py-2.5 font-medium text-foreground">{skill.name}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{skill.years}</td>
              <td className="px-4 py-2.5">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    skill.level === "Expert"
                      ? "bg-foreground text-background"
                      : skill.level === "Advanced"
                        ? "bg-muted text-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {skill.level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
