import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://excelardor.com'
  const lastModified = new Date()

  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/services',
    '/industries',
    '/applications',
    '/contact',
    '/projects',
    '/certifications',
    '/gallery',
    '/quality-policy',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const products = [
    '/telescopic-mast',
    '/pneumatic-mast',
    '/military-mast',
    '/communication-mast',
    '/antenna-mast',
    '/camera-mast',
    '/lighting-mast',
    '/hydraulic-mast',
    '/portable-mast',
    '/custom-mast',
  ].map((route) => ({
    url: `${baseUrl}/products${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...products]
}
