'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import { laptops, brands, categories, formatPrice } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const PRICE_MIN = 40000000
const PRICE_MAX = 170000000
const ramOptions = [8, 16, 32, 64]

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'rating'

const sortLabels: Record<SortKey, string> = {
  popular: 'محبوب‌ترین',
  'price-asc': 'ارزان‌ترین',
  'price-desc': 'گران‌ترین',
  rating: 'بیشترین امتیاز',
}

export function ProductsBrowser({
  initialCategory,
  initialSearch,
}: {
  initialCategory?: string
  initialSearch?: string
}) {
  const [search, setSearch] = useState(initialSearch ?? '')
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRam, setSelectedRam] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState<SortKey>('popular')
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = <T,>(
    value: T,
    list: T[],
    setList: (v: T[]) => void,
  ) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()

    const result = laptops.filter((l) => {
      // جستجوی متنی
      if (q) {
        const searchable = [
          l.name,
          l.brand,
          l.category,
          l.cpu,
          l.gpu,
          l.os,
          l.description,
          ...l.highlights,
        ]
          .join(' ')
          .toLowerCase()

        if (!searchable.includes(q)) return false
      }

      if (selectedCats.length && !selectedCats.includes(l.category)) return false
      if (selectedBrands.length && !selectedBrands.includes(l.brand)) return false
      if (selectedRam.length && !selectedRam.includes(l.ram)) return false
      if (l.price < priceRange[0] || l.price > priceRange[1]) return false
      if (inStockOnly && !l.inStock) return false
      return true
    })

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.reviews - a.reviews)
    }
    return result
  }, [search, selectedCats, selectedBrands, selectedRam, priceRange, inStockOnly, sort])

  const activeCount =
    selectedCats.length +
    selectedBrands.length +
    selectedRam.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0) +
    (search.trim() ? 1 : 0)

  const resetFilters = () => {
    setSearch('')
    setSelectedCats([])
    setSelectedBrands([])
    setSelectedRam([])
    setPriceRange([PRICE_MIN, PRICE_MAX])
    setInStockOnly(false)
  }

  const filterPanel = (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">فیلترها</h2>
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-primary hover:underline"
          >
            حذف همه ({activeCount.toLocaleString('fa-IR')})
          </button>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium">دسته‌بندی</h3>
        <div className="flex flex-col gap-2.5">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedCats.includes(cat)}
                onCheckedChange={() => toggle(cat, selectedCats, setSelectedCats)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-medium">برند</h3>
        <div className="flex flex-col gap-2.5">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() =>
                  toggle(brand, selectedBrands, setSelectedBrands)
                }
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-medium">حافظه رم</h3>
        <div className="flex flex-wrap gap-2">
          {ramOptions.map((ram) => (
            <button
              key={ram}
              onClick={() => toggle(ram, selectedRam, setSelectedRam)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                selectedRam.includes(ram)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:bg-secondary',
              )}
            >
              {ram.toLocaleString('fa-IR')} گیگ
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-medium">محدوده قیمت (تومان)</h3>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1000000}
          value={priceRange}
          onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
          className="my-4"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <Separator />

      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={inStockOnly}
          onCheckedChange={(v) => setInStockOnly(Boolean(v))}
        />
        فقط کالاهای موجود
      </label>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">همه لپ‌تاپ‌ها</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length.toLocaleString('fa-IR')} محصول یافت شد
        </p>
      </div>

      {/* جعبه جستجو */}
      <div className="relative mb-5 max-w-md">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="جستجو بر اساس نام، برند، پردازنده..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="پاک کردن جستجو"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <SlidersHorizontal className="size-4" />
          فیلترها
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeCount.toLocaleString('fa-IR')}
            </span>
          )}
        </Button>
        <div className="flex items-center gap-2 lg:mr-auto">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            مرتب‌سازی:
          </span>
          <Select
            value={sort}
            onValueChange={(v) => setSort(v as SortKey)}
            items={sortLabels}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">محبوب‌ترین</SelectItem>
              <SelectItem value="price-asc">ارزان‌ترین</SelectItem>
              <SelectItem value="price-desc">گران‌ترین</SelectItem>
              <SelectItem value="rating">بیشترین امتیاز</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            {filterPanel}
          </div>
        </aside>

        <div>
          {filtered.length ? (
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
              {filtered.map((laptop) => (
                <ProductCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
              <p className="font-medium">محصولی با این فیلترها یافت نشد</p>
              <Button variant="link" onClick={resetFilters}>
                حذف فیلترها
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-card p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">فیلتر محصولات</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="بستن"
              >
                <X className="size-5" />
              </Button>
            </div>
            {filterPanel}
            <Button className="mt-6 w-full" onClick={() => setMobileOpen(false)}>
              نمایش {filtered.length.toLocaleString('fa-IR')} محصول
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
