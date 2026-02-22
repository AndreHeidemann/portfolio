const FALLBACK_SITE_URL = 'https://www.andreheidemann.com'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export const OG_IMAGE_URL = absoluteUrl('/profile-img.jpeg')

export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: 'Portrait of André Nicolas Heidemann',
} as const
