const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${DEFAULT_SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export const SITE_URL = DEFAULT_SITE_URL
