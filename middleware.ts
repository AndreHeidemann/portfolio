import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n-config'
import type { Locale } from '@/data/profile'

function matchLocale(pathname: string): Locale | undefined {
  const segment = pathname.split('/')[1]
  return SUPPORTED_LOCALES.find((locale) => locale === segment)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next()
  }
  const localeInPath = matchLocale(pathname)

  if (!localeInPath) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    const locale = isSupportedLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE
    const redirectURL = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    return NextResponse.redirect(redirectURL)
  }

  const response = NextResponse.next()
  response.cookies.set('NEXT_LOCALE', localeInPath, { path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.\w+).*)'],
}
