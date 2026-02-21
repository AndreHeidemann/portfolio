"use client"

import { useI18n } from "@/lib/i18n"

export function ScreenshotGallery() {
  const { t } = useI18n()

  const placeholders = [
    { label: "Dashboard Overview", bg: "bg-muted" },
    { label: "Detail View", bg: "bg-muted/60" },
    { label: "Settings Panel", bg: "bg-muted/40" },
  ]

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground">{t("misc.screenshots")}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {placeholders.map((item) => (
          <div
            key={item.label}
            className={`flex aspect-video items-center justify-center rounded-lg border border-border ${item.bg}`}
          >
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
