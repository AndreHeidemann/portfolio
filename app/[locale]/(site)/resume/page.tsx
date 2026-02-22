import type { Metadata } from "next"
import { profile } from "@/data/profile"
import { absoluteUrl, OG_IMAGE, SITE_NAME, getOgLocale } from "@/lib/site"
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n-config"
import { ResumeClient } from "./resume-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
  const englishBasics = profile.basics.translations[DEFAULT_LOCALE]
  const title = `${englishBasics.name} – Resume`
  const description = profile.basics.summary[DEFAULT_LOCALE]
  const url = `/${locale}/resume`
  const ogLocale = getOgLocale(locale)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url: absoluteUrl(url),
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale,
      images: [OG_IMAGE],
    },
  }
}

export default function ResumePage() {
  return <ResumeClient />
}
