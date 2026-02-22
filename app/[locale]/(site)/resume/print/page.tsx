import type { Metadata } from "next"
import { profile } from "@/data/profile"
import { absoluteUrl } from "@/lib/site"
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n-config"
import { PrintResumeClient } from "./print-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
  const englishBasics = profile.basics.translations[DEFAULT_LOCALE]
  const title = `${englishBasics.name} – Printable Resume`
  const description = `${englishBasics.headline} printable resume view`
  const url = `/${locale}/resume/print`
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: absoluteUrl(url),
    },
  }
}

export default function PrintResumePage() {
  return <PrintResumeClient />
}
