import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''

  if (q.length < 2) {
    return NextResponse.json([])
  }

  const laptops = await prisma.laptop.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { brand: { contains: q } },
        { category: { contains: q } },
        { cpu: { contains: q } },
        { gpu: { contains: q } },
      ],
    },
    take: 6,
    orderBy: { reviews: 'desc' },
  })

  return NextResponse.json(
    laptops.map((l) => ({
      id: l.id,
      name: l.name,
      brand: l.brand,
      price: l.price,
      image: l.image,
      category: l.category,
      inStock: l.inStock,
    })),
  )
}
