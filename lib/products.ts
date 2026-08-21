import { prisma } from './prisma'

export type Laptop = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  oldPrice?: number | null
  image: string
  images: string[]
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

function mapLaptop(laptop: any): Laptop {
  let images: string[] = []
  try {
    images = JSON.parse(laptop.images || '[]')
  } catch {
    images = []
  }

  if (!Array.isArray(images) || images.length === 0) {
    images = laptop.image ? [laptop.image] : ['/placeholder.svg']
  }

  return {
    ...laptop,
    oldPrice: laptop.oldPrice ?? undefined,
    badge: laptop.badge ?? undefined,
    image: laptop.image || images[0] || '/placeholder.svg',
    images,
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

export const brands = ['ASUS', 'MSI', 'Lenovo', 'HP', 'Dell', 'Acer']

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

      if (item.category === laptop.category) score += 50
      if (item.brand === laptop.brand) score += 20

      const priceDiff = Math.abs(item.price - laptop.price)
      const priceRatio = priceDiff / Math.max(laptop.price, 1)
      if (priceRatio < 0.15) score += 15
      else if (priceRatio < 0.3) score += 10
      else if (priceRatio < 0.5) score += 5

      if (item.ram === laptop.ram) score += 8
      if (Math.abs(item.screen - laptop.screen) <= 0.5) score += 5
      if (item.inStock) score += 3
      score += item.rating

      return { item, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.item)
}
