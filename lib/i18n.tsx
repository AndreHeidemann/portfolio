"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { Locale } from "@/data/profile"

export type Messages = Record<string, string>

interface I18nContextValue {
  locale: Locale
  t: (key: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

function translate(messages: Messages, key: string, vars?: Record<string, string | number>) {
  const template = messages[key] ?? key
  if (!vars) return template
  return Object.keys(vars).reduce((acc, variable) => {
    return acc.replace(new RegExp(`{${variable}}`, "g"), String(vars[variable]))
  }, template)
}

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: Locale
  messages: Messages
}) {
  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      t: (key, vars) => translate(messages, key, vars),
    }
  }, [locale, messages])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
