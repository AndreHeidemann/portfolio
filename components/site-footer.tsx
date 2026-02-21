"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-6">
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6" aria-label="Footer navigation">
          <Link href="/" className="transition-colors hover:text-foreground">
            {t("nav.home")}
          </Link>
          <Link href="/projects" className="transition-colors hover:text-foreground">
            {t("nav.projects")}
          </Link>
          <Link href="/resume" className="transition-colors hover:text-foreground">
            {t("nav.resume")}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            {t("nav.contact")}
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">{t("footer.updated")}</p>
      </div>
    </footer>
  )
}
