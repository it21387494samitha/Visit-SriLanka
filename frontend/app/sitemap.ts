import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://visitsrilanka.lk'
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function fetchSlugs(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(`${apiUrl}/api/v1/${endpoint}?per_page=1000`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return (json.data ?? []).map((item: any) => item.slug as string)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [destinations, hotels, tours, posts] = await Promise.all([
    fetchSlugs('destinations'),
    fetchSlugs('hotels'),
    fetchSlugs('tours'),
    fetchSlugs('blog'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/destinations`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/hotels`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/tours`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...destinations.map((slug) => ({
      url: `${siteUrl}/destinations/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...hotels.map((slug) => ({
      url: `${siteUrl}/hotels/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...tours.map((slug) => ({
      url: `${siteUrl}/tours/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...posts.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
