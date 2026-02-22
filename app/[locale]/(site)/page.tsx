import type { Metadata } from "next"
import { absoluteUrl, OG_IMAGE, SITE_NAME, getOgLocale, getSiteDescription, getSiteTitle } from "@/lib/site"
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n-config"
import { HomeClient } from "./home-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
  const title = getSiteTitle(locale)
  const description = getSiteDescription(locale)
  const url = `/${locale}`
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
    twitter: {
      card: "summary_large_image",
      site: "@andreheidemann",
      creator: "@andreheidemann",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}

export default function HomePage() {
  return <HomeClient />
}
