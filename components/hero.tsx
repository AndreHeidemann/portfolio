"use client"

import Image from "next/image"
import { Mail, Linkedin, Github, FileDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { profile } from "@/data/profile"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

export function Hero() {
  const { t, locale } = useI18n()
  const { basics } = profile
  const basicsCopy = basics.translations[locale] ?? basics.translations[DEFAULT_LOCALE]
  const github = basics.socials.find((link) => link.platform === "github")
  const linkedin = basics.socials.find((link) => link.platform === "linkedin")
  const resumeFile =
    locale === "pt-BR" ? 'pt-BR - Andre Nicolas Heidemann.pdf' : 'en-US - Andre Nicolas Heidemann.pdf'
  const resumePath = `/${encodeURIComponent(resumeFile)}`

  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-6 md:max-w-2xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            {basicsCopy.name}
          </h1>
          <p className="text-lg font-medium text-foreground/80">
            {basicsCopy.headline}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {`${basicsCopy.location} / ${basics.timezone}`}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {basicsCopy.bio}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" asChild>
            <a href={`mailto:${basics.email}`}>
              <Mail className="size-3.5" />
              {t("hero.email")}
            </a>
          </Button>
          {linkedin && (
            <Button variant="outline" size="sm" asChild>
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                <Linkedin className="size-3.5" />
                {linkedin.label}
              </a>
            </Button>
          )}
          {github && (
            <Button variant="outline" size="sm" asChild>
              <a href={github.url} target="_blank" rel="noopener noreferrer">
                <Github className="size-3.5" />
                {github.label}
              </a>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <a href={resumePath} target="_blank" rel="noopener noreferrer">
              <FileDown className="size-3.5" />
              {t("hero.downloadResume")}
            </a>
          </Button>
        </div>

        <div className="md:hidden">
          <Image
            src="/profile img.jpeg"
            alt="Portrait"
            width={360}
            height={360}
            className="mx-auto rounded-full border border-border object-cover"
            priority
          />
        </div>
      </div>

      <div className="hidden md:block shrink-0">
        <Image
          src="/profile img.jpeg"
          alt="Portrait"
          width={320}
          height={420}
          className="rounded-[32px] border border-border object-cover shadow-lg"
          priority
        />
      </div>
    </section>
  )
}
