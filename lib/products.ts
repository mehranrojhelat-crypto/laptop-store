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

export const brands = ['نکسوس', 'والکان', 'آریا', 'تیتان', 'آرورا', 'سایبر']

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
