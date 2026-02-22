import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Locale } from '@/data/profile'
import { DEFAULT_LOCALE, isSupportedLocale } from '@/lib/i18n-config'
import { SITE_URL, SITE_NAME, OG_IMAGE, getOgLocale, getSiteDescription, getSiteTitle } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
const baseTitle = getSiteTitle()
const baseDescription = getSiteDescription()
const baseOgLocale = getOgLocale()

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: baseTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: baseDescription,
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: baseTitle,
    description: baseDescription,
    siteName: SITE_NAME,
    locale: baseOgLocale,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andreheidemann',
    creator: '@andreheidemann',
    title: baseTitle,
    description: baseDescription,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value
  const lang: Locale = isSupportedLocale(localeCookie) ? localeCookie : DEFAULT_LOCALE
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        {enableAnalytics ? <Analytics /> : null}
      </body>
    </html>
  )
}
