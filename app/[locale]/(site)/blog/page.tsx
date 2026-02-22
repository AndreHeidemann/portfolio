import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site"
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n-config"
import { BlogClient } from "./blog-client"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
  const title = `Writing & Blog – ${locale}`
  const description = "Thoughts on engineering leadership, architecture, and developer productivity."
  const url = `/${locale}/blog`
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

export default function BlogPage() {
  return <BlogClient />
}
