"use client"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center rounded-md border border-border bg-muted p-0.5 text-xs font-medium">
      <button
        onClick={() => setLocale("en")}
        className={`rounded-sm px-2 py-1 transition-colors ${
          locale === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLocale("pt-br")}
        className={`rounded-sm px-2 py-1 transition-colors ${
          locale === "pt-br"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to Portuguese"
      >
        PT-BR
      </button>
    </div>
  )
}
