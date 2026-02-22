import type { MetadataRoute } from 'next'
import { SUPPORTED_LOCALES } from '@/lib/i18n-config'
import { profile } from '@/data/profile'
import { absoluteUrl } from '@/lib/site'

const staticPaths = ['', '/projects', '/resume', '/resume/print', '/contact', '/blog']
const lastModified = new Date(profile.basics.lastUpdated).toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = SUPPORTED_LOCALES.flatMap((locale) => {
    const base = `/${locale}`
    const localizedStatics = staticPaths.map((path) => {
      const normalized = path === '' ? base : `${base}${path}`
      return {
        url: absoluteUrl(normalized),
        lastModified,
      }
    })

    const projectRoutes = profile.projects.map((project) => ({
      url: absoluteUrl(`${base}/projects/${project.slug}`),
      lastModified,
    }))

    return [...localizedStatics, ...projectRoutes]
  })

  return routes
}
