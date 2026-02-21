"use client"

import { Mail, Linkedin, Github, FileDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
          Alex Chen
        </h1>
        <p className="text-lg font-medium text-foreground/80">
          {t("hero.title")}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {t("hero.location")}
        </p>
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {t("hero.tagline")}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" asChild>
          <a href="mailto:alex@example.com">
            <Mail className="size-3.5" />
            {t("hero.email")}
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="size-3.5" />
            LinkedIn
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="size-3.5" />
            GitHub
          </a>
        </Button>
        <Button variant="ghost" size="sm">
          <FileDown className="size-3.5" />
          {t("hero.downloadResume")}
        </Button>
      </div>
    </section>
  )
}
