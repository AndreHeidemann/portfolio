"use client"

import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"

export function BlogClient() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6">
      <div className="flex flex-col gap-6 py-12 md:py-20">
        <SectionHeader title={t("section.blog")} />
        <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center">
          <p className="text-base font-semibold text-foreground">{t("blog.empty")}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("blog.cta")}</p>
        </div>
      </div>
    </div>
  )
}
