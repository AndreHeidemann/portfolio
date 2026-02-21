"use client"

import { Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function CTASection() {
  const { t } = useI18n()

  return (
    <section className="rounded-lg border border-border bg-muted/30 p-6 md:p-8">
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-lg font-semibold text-foreground">{t("section.cta")}</h2>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          {t("cta.description")}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" asChild>
            <a href="mailto:alex@example.com">
              <Mail className="size-3.5" />
              {t("cta.emailMe")}
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="size-3.5" />
            {t("cta.bookCall")}
          </Button>
        </div>
      </div>
    </section>
  )
}
