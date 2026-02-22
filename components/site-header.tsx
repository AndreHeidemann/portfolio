"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useI18n } from "@/lib/i18n"
import { useState } from "react"
import { profile } from "@/data/profile"
import { DEFAULT_LOCALE } from "@/lib/i18n-config"

const baseNavItems = [
  { key: "nav.home", path: "" },
  { key: "nav.projects", path: "projects" },
  { key: "nav.resume", path: "resume" },
  { key: "nav.contact", path: "contact" },
]

export function SiteHeader() {
  const { t, locale } = useI18n()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const localePrefix = `/${locale}`
  const githubSocial = profile.basics.socials.find((social) => social.platform === "github")
  const githubLink = githubSocial?.url ?? "https://github.com"
  const githubLabel = githubSocial?.label ?? "GitHub"
  const basicsCopy = profile.basics.translations[locale] ?? profile.basics.translations[DEFAULT_LOCALE]
  const navItems = baseNavItems.map((item) => {
    const href = item.path ? `${localePrefix}/${item.path}` : localePrefix
    return { ...item, href }
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <Link href={localePrefix} className="text-sm font-semibold tracking-tight text-foreground">
          {basicsCopy.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {githubLabel}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-1 pt-8" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-accent text-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Github className="size-4" />
                  {githubLabel}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
