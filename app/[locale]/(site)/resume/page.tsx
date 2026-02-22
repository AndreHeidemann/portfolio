import type { Metadata } from "next"
import { profile } from "@/data/profile"
import { absoluteUrl } from "@/lib/site"
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n-config"
import { ResumeClient } from "./resume-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
  const englishBasics = profile.basics.translations[DEFAULT_LOCALE]
  const title = `${englishBasics.name} – Resume`
  const description = profile.basics.summary[DEFAULT_LOCALE]
  const url = `/${locale}/resume`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: absoluteUrl(url),
    },
  }
}

export default function ResumePage() {
  return <ResumeClient />
}
