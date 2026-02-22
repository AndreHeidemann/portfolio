import type { Locale } from '@/data/profile'

const FALLBACK_SITE_URL = 'https://www.andreheidemann.com'
const DEFAULT_METADATA_LOCALE: Locale = 'en-US'

export const SITE_NAME = 'André Nicolas Heidemann'

const SITE_ROLES: Record<Locale, string> = {
  'en-US': 'Digital Transformation Analyst',
  'pt-BR': 'Analista de Transformação Digital',
}

const SITE_DESCRIPTIONS: Record<Locale, string> = {
  'en-US': 'Digital Transformation Analyst | 5+ years bridging OT↔IT with PLC telemetry, SAP PCo, Node.js, TypeScript, and Industry 4.0 automation.',
  'pt-BR': 'Analista de Transformação Digital | 5+ anos conectando TO↔TI com telemetria de CLPs, SAP PCo, Node.js, TypeScript e automação para Indústria 4.0.',
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export function getSiteRole(locale: Locale = DEFAULT_METADATA_LOCALE) {
  return SITE_ROLES[locale] ?? SITE_ROLES[DEFAULT_METADATA_LOCALE]
}

export function getSiteTitle(locale: Locale = DEFAULT_METADATA_LOCALE) {
  return `${SITE_NAME} | ${getSiteRole(locale)}`
}

export function getSiteDescription(locale: Locale = DEFAULT_METADATA_LOCALE) {
  return SITE_DESCRIPTIONS[locale] ?? SITE_DESCRIPTIONS[DEFAULT_METADATA_LOCALE]
}

export function getOgLocale(locale?: Locale) {
  return locale === 'pt-BR' ? 'pt_BR' : 'en_US'
}

export const OG_IMAGE_URL = absoluteUrl('/api/og')

export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: getSiteTitle(),
} as const
