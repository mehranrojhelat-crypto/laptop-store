import { prisma } from './prisma'

export type Laptop = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  oldPrice?: number | null
  image: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string | null
  cpu: string
  ram: number
  storage: number
  gpu: string
  screen: number
  os: string
  weight: string
  battery: string
  description: string
  highlights: string[]
}

// تبدیل رکورد دیتابیس به تایپ Laptop
function mapLaptop(laptop: any): Laptop {
  return {
    ...laptop,
    oldPrice: laptop.oldPrice ?? undefined,
    badge: laptop.badge ?? undefined,
    highlights: JSON.parse(laptop.highlights || '[]'),
  }
}

export async function getLaptops(): Promise<Laptop[]> {
  const data = await prisma.laptop.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return data.map(mapLaptop)
}

export async function getLaptop(id: string): Promise<Laptop | null> {
  const data = await prisma.laptop.findUnique({
    where: { id },
  })
  return data ? mapLaptop(data) : null
}

export async function getFeaturedLaptops(limit = 4): Promise<Laptop[]> {
  const data = await prisma.laptop.findMany({
    take: limit,
    orderBy: { reviews: 'desc' },
  })
  return data.map(mapLaptop)
}

export async function getDealLaptops(): Promise<Laptop[]> {
  const data = await prisma.laptop.findMany({
    where: {
      oldPrice: { not: null },
    },
  })
  return data.map(mapLaptop)
}

export const brands = ['ایسوس', 'ام‌اس‌آی', 'لنوو', 'اچ‌پی', 'دل', 'ایسر']

export const categories = [
  'گیمینگ',
  'اولترابوک',
  'اداری',
  'مهندسی',
  'دانشجویی',
] as const

export function formatPrice(price: number) {
  return price.toLocaleString('fa-IR')
}



/** محصولات مشابه بر اساس دسته‌بندی، برند و نزدیکی قیمت */
export async function getSimilarLaptops(
  laptop: Laptop,
  limit = 4,
): Promise<Laptop[]> {
  const all = await prisma.laptop.findMany({
    where: { id: { not: laptop.id } },
  })

  const scored = all
    .map((row) => {
      const item = mapLaptop(row)
      let score = 0

      // همان دسته‌بندی = بیشترین وزن
      if (item.category === laptop.category) score += 50

      // همان برند
      if (item.brand === laptop.brand) score += 20

      // نزدیکی قیمت (هرچه نزدیک‌تر، امتیاز بیشتر)
      const priceDiff = Math.abs(item.price - laptop.price)
      const priceRatio = priceDiff / Math.max(laptop.price, 1)
      if (priceRatio < 0.15) score += 15
      else if (priceRatio < 0.3) score += 10
      else if (priceRatio < 0.5) score += 5

      // رم مشابه
      if (item.ram === laptop.ram) score += 8

      // اندازه صفحه مشابه
      if (Math.abs(item.screen - laptop.screen) <= 0.5) score += 5

      // اولویت به موجودها
      if (item.inStock) score += 3

      // امتیاز بالاتر کمی کمک کند
      score += item.rating

      return { item, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.item)
}