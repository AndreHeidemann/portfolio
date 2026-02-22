"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import type { Locale } from "@/data/profile"

export function LanguageToggle() {
  const { locale } = useI18n()
  const pathname = usePathname()
  const router = useRouter()

  const updateLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return
      const segments = pathname ? pathname.split("/") : [""]
      segments[1] = nextLocale
      const nextPath = segments.join("/") || `/${nextLocale}`
      document.cookie = `NEXT_LOCALE=${nextLocale};path=/`
      router.push(nextPath)
    },
    [locale, pathname, router]
  )

  const options: { value: Locale; label: string }[] = [
    { value: "en-US", label: "EN" },
    { value: "pt-BR", label: "PT" },
  ]

  return (
    <div className="flex items-center rounded-md border border-border bg-muted p-0.5 text-xs font-medium" role="group" aria-label="Language selector">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => updateLocale(option.value)}
          className={`rounded-sm px-2 py-1 transition-colors ${
            locale === option.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={locale === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
