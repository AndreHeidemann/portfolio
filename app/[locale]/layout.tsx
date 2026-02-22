import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import type { Locale } from "@/data/profile"
import { I18nProvider } from "@/lib/i18n"
import { SUPPORTED_LOCALES, isSupportedLocale } from "@/lib/i18n-config"

async function loadMessages(locale: Locale) {
  return (await import(`@/messages/${locale}.json`)).default
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export const dynamicParams = false

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = isSupportedLocale(resolvedParams.locale) ? (resolvedParams.locale as Locale) : undefined
  if (!locale) {
    notFound()
  }

  const messages = await loadMessages(locale)

  return <I18nProvider locale={locale} messages={messages}>{children}</I18nProvider>
}
