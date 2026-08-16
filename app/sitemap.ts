import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { getAllArticles } from '@/lib/articles'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laptopland.ir'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ]

  let productPages: MetadataRoute.Sitemap = []

  try {
    const laptops = await prisma.laptop.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    })

    productPages = laptops.map((laptop) => ({
      url: `${siteUrl}/products/${laptop.id}`,
      lastModified: laptop.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // اگر دیتابیس در زمان build در دسترس نبود، فقط صفحات استاتیک
  }

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticPages, ...productPages, ...articlePages]
}
