import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Locale } from '@/data/profile'
import { DEFAULT_LOCALE, isSupportedLocale } from '@/lib/i18n-config'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'André Nicolas Heidemann – Digital Transformation Analyst',
    template: '%s | André Nicolas Heidemann',
  },
  description: 'Digital Transformation Analyst and Computer Engineer bridging OT ↔ IT with PLC integrations, SAP PCo, and full stack automation.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'André Nicolas Heidemann – Digital Transformation Analyst',
    description: 'Industrial automation and full stack solutions linking PLCs, SAP PCo, APIs, and edge AI.',
    siteName: 'André Nicolas Heidemann',
    images: [
      {
        url: '/profile-img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Portrait of André Nicolas Heidemann',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andreheidemann',
    creator: '@andreheidemann',
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
