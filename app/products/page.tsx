import type { Metadata } from 'next'
import { getLaptops } from '@/lib/products'
import { ProductsBrowser } from '@/components/products-browser'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laptopland.ir'

export const metadata: Metadata = {
  title: 'لیست لپ‌تاپ‌ها',
  description:
    'مشاهده و مقایسه تمام لپ‌تاپ‌های گیمینگ، اولترابوک، اداری، مهندسی و دانشجویی در فروشگاه لپ‌تاپ‌لند. فیلتر بر اساس دسته، برند و جستجو.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'لیست لپ‌تاپ‌ها | لپ‌تاپ‌لند',
    description:
      'تمام لپ‌تاپ‌ها را ببینید، فیلتر کنید و با بهترین قیمت بخرید.',
    url: `${siteUrl}/products`,
  },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; brand?: string; q?: string }>
}) {
  const { cat, brand, q } = await searchParams
  const laptops = await getLaptops()

  return (
    <ProductsBrowser
      initialLaptops={laptops}
      initialCategory={cat}
      initialBrand={brand}
      initialSearch={q}
    />
  )
}