"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { profile } from "@/data/profile"

export function SiteFooter() {
  const { t, locale } = useI18n()
  const { basics } = profile
  const prefix = `/${locale}`

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Footer navigation">
          <Link href={prefix} className="transition-colors hover:text-foreground">
            {t("nav.home")}
          </Link>
          <Link href={`${prefix}/projects`} className="transition-colors hover:text-foreground">
            {t("nav.projects")}
          </Link>
          <Link href={`${prefix}/resume`} className="transition-colors hover:text-foreground">
            {t("nav.resume")}
          </Link>
          <Link href={`${prefix}/contact`} className="transition-colors hover:text-foreground">
            {t("nav.contact")}
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          {t("footer.updated", { date: basics.lastUpdated })}
        </p>
      </div>
    </footer>
  )
}
