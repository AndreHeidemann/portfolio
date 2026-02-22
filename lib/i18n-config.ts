import type { Locale } from "@/data/profile"

export const SUPPORTED_LOCALES: Locale[] = ["en-US", "pt-BR"]
export const DEFAULT_LOCALE: Locale = "en-US"

export function isSupportedLocale(input: string | undefined): input is Locale {
  return !!input && SUPPORTED_LOCALES.includes(input as Locale)
}
