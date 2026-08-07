import { ProductsBrowser } from '@/components/products-browser'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>
}) {
  const { cat, q } = await searchParams
  return <ProductsBrowser initialCategory={cat} initialSearch={q} />
}