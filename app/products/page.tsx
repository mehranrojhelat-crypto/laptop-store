import { ProductsBrowser } from '@/components/products-browser'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  return <ProductsBrowser initialCategory={cat} />
}
