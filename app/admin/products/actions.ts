'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'

export async function deleteLaptop(id: string) {
  await requireAdmin()
  await prisma.laptop.delete({ where: { id } })
  revalidatePath('/admin/products')
  revalidatePath('/')
  revalidatePath('/products')
}

export async function createLaptop(formData: FormData) {
  await requireAdmin()

  const highlightsRaw = (formData.get('highlights') as string) || ''
  const highlights = highlightsRaw
    .split('\n')
    .map((h) => h.trim())
    .filter(Boolean)

  const data = {
    id: crypto.randomUUID(),
    name: formData.get('name') as string,
    brand: formData.get('brand') as string,
    category: formData.get('category') as string,
    price: Number(formData.get('price')),
    oldPrice: formData.get('oldPrice')
      ? Number(formData.get('oldPrice'))
      : null,
    image: formData.get('image') as string,
    rating: Number(formData.get('rating') || 4.5),
    reviews: Number(formData.get('reviews') || 0),
    inStock: formData.get('inStock') === 'on',
    badge: (formData.get('badge') as string) || null,
    cpu: formData.get('cpu') as string,
    ram: Number(formData.get('ram')),
    storage: Number(formData.get('storage')),
    gpu: formData.get('gpu') as string,
    screen: Number(formData.get('screen')),
    os: formData.get('os') as string,
    weight: formData.get('weight') as string,
    battery: formData.get('battery') as string,
    description: formData.get('description') as string,
    highlights: JSON.stringify(highlights),
  }

  await prisma.laptop.create({ data })

  revalidatePath('/admin/products')
  revalidatePath('/')
  revalidatePath('/products')
  redirect('/admin/products')
}

export async function updateLaptop(id: string, formData: FormData) {
  await requireAdmin()

  const highlightsRaw = (formData.get('highlights') as string) || ''
  const highlights = highlightsRaw
    .split('\n')
    .map((h) => h.trim())
    .filter(Boolean)

  const data = {
    name: formData.get('name') as string,
    brand: formData.get('brand') as string,
    category: formData.get('category') as string,
    price: Number(formData.get('price')),
    oldPrice: formData.get('oldPrice')
      ? Number(formData.get('oldPrice'))
      : null,
    image: formData.get('image') as string,
    rating: Number(formData.get('rating') || 4.5),
    reviews: Number(formData.get('reviews') || 0),
    inStock: formData.get('inStock') === 'on',
    badge: (formData.get('badge') as string) || null,
    cpu: formData.get('cpu') as string,
    ram: Number(formData.get('ram')),
    storage: Number(formData.get('storage')),
    gpu: formData.get('gpu') as string,
    screen: Number(formData.get('screen')),
    os: formData.get('os') as string,
    weight: formData.get('weight') as string,
    battery: formData.get('battery') as string,
    description: formData.get('description') as string,
    highlights: JSON.stringify(highlights),
  }

  await prisma.laptop.update({ where: { id }, data })

  revalidatePath('/admin/products')
  revalidatePath('/')
  revalidatePath('/products')
  redirect('/admin/products')
}



