import { getLaptops } from '@/lib/products'
import { ProductsBrowser } from '@/components/products-browser'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>
}) {
  const { cat, q } = await searchParams
  const laptops = await getLaptops()

  return (
    <ProductsBrowser
      initialLaptops={laptops}
      initialCategory={cat}
      initialSearch={q}
    />
  )
}
