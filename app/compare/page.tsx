'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  GitCompare,
  ShoppingCart,
  Star,
  Trash2,
  X,
  Check,
  ArrowRight,
} from 'lucide-react'
import { useCompare } from '@/components/compare-provider'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/components/ui/toast'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function formatStorage(storage: number) {
  return storage >= 1024
    ? `${(storage / 1024).toLocaleString('fa-IR')} ترابایت SSD`
    : `${storage.toLocaleString('fa-IR')} گیگابایت SSD`
}

const rows: {
  key: string
  label: string
  getValue: (l: import('@/lib/products').Laptop) => React.ReactNode
  highlightBest?: 'price' | 'rating' | 'ram' | 'storage' | 'screen'
}[] = [
  {
    key: 'price',
    label: 'قیمت',
    highlightBest: 'price',
    getValue: (l) => (
      <div>
        {l.oldPrice && (
          <span className="mb-0.5 block text-xs text-muted-foreground line-through">
            {formatPrice(l.oldPrice)}
          </span>
        )}
        <span className="text-base font-black text-primary">
          {formatPrice(l.price)}{' '}
          <span className="text-xs font-normal text-muted-foreground">تومان</span>
        </span>
      </div>
    ),
  },
  {
    key: 'brand',
    label: 'برند',
    getValue: (l) => l.brand,
  },
  {
    key: 'category',
    label: 'دسته‌بندی',
    getValue: (l) => l.category,
  },
  {
    key: 'rating',
    label: 'امتیاز',
    highlightBest: 'rating',
    getValue: (l) => (
      <span className="inline-flex items-center gap-1">
        <Star className="size-3.5 fill-amber-400 text-amber-400" />
        {l.rating.toLocaleString('fa-IR')}
        <span className="text-xs text-muted-foreground">
          ({l.reviews.toLocaleString('fa-IR')})
        </span>
      </span>
    ),
  },
  {
    key: 'cpu',
    label: 'پردازنده',
    getValue: (l) => l.cpu,
  },
  {
    key: 'ram',
    label: 'حافظه رم',
    highlightBest: 'ram',
    getValue: (l) => `${l.ram.toLocaleString('fa-IR')} گیگابایت`,
  },
  {
    key: 'storage',
    label: 'حافظه ذخیره',
    highlightBest: 'storage',
    getValue: (l) => formatStorage(l.storage),
  },
  {
    key: 'gpu',
    label: 'کارت گرافیک',
    getValue: (l) => l.gpu,
  },
  {
    key: 'screen',
    label: 'نمایشگر',
    highlightBest: 'screen',
    getValue: (l) => `${l.screen.toLocaleString('fa-IR')} اینچ`,
  },
  {
    key: 'weight',
    label: 'وزن',
    getValue: (l) => l.weight,
  },
  {
    key: 'battery',
    label: 'باتری',
    getValue: (l) => l.battery,
  },
  {
    key: 'os',
    label: 'سیستم‌عامل',
    getValue: (l) => l.os,
  },
  {
    key: 'stock',
    label: 'موجودی',
    getValue: (l) =>
      l.inStock ? (
        <span className="inline-flex items-center gap-1 text-primary">
          <Check className="size-3.5" /> موجود
        </span>
      ) : (
        <span className="text-muted-foreground">ناموجود</span>
      ),
  },
]

export default function ComparePage() {
  const { items, count, removeItem, clear } = useCompare()
  const { addItem } = useCart()
  const { toast } = useToast()

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
          <GitCompare className="size-8" />
        </div>
        <h1 className="text-2xl font-bold">لیست مقایسه خالی است</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          برای مقایسه، از کارت محصولات یا صفحه محصول، دکمه «مقایسه» را بزنید.
        </p>
        <Button asChild className="mt-6 gap-2">
          <Link href="/products">
            مشاهده محصولات
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  const best = {
    price: Math.min(...items.map((i) => i.price)),
    rating: Math.max(...items.map((i) => i.rating)),
    ram: Math.max(...items.map((i) => i.ram)),
    storage: Math.max(...items.map((i) => i.storage)),
    screen: Math.max(...items.map((i) => i.screen)),
  }

  const isBest = (
    type: 'price' | 'rating' | 'ram' | 'storage' | 'screen' | undefined,
    laptop: (typeof items)[0],
  ) => {
    if (!type || items.length < 2) return false
    if (type === 'price') return laptop.price === best.price
    if (type === 'rating') return laptop.rating === best.rating
    if (type === 'ram') return laptop.ram === best.ram
    if (type === 'storage') return laptop.storage === best.storage
    if (type === 'screen') return laptop.screen === best.screen
    return false
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">مقایسه محصولات</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {count.toLocaleString('fa-IR')} محصول انتخاب شده
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clear} className="gap-1.5">
            <Trash2 className="size-3.5" />
            پاک کردن همه
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/products">افزودن محصول بیشتر</Link>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="sticky right-0 z-10 w-32 bg-card px-4 py-4 text-right font-semibold text-muted-foreground">
                مشخصات
              </th>
              {items.map((laptop) => (
                <th
                  key={laptop.id}
                  className="min-w-[180px] border-r border-border px-4 py-4 text-center align-top last:border-r-0"
                >
                  <div className="relative mx-auto mb-3 aspect-square w-28 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={laptop.image || '/placeholder.svg'}
                      alt={laptop.name}
                      fill
                      className="object-contain p-3"
                      sizes="112px"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(laptop.id)}
                      className="absolute left-1.5 top-1.5 rounded-full bg-background/90 p-1 text-muted-foreground shadow hover:text-destructive"
                      aria-label="حذف"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  {laptop.badge && (
                    <Badge className="mb-2 border-0 bg-primary text-[10px] text-primary-foreground">
                      {laptop.badge}
                    </Badge>
                  )}
                  <Link
                    href={`/products/${laptop.id}`}
                    className="line-clamp-2 text-sm font-bold leading-snug hover:text-primary"
                  >
                    {laptop.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.key}
                className={cn(
                  'border-b border-border last:border-b-0',
                  idx % 2 === 0 ? 'bg-background' : 'bg-secondary/30',
                )}
              >
                <td className="sticky right-0 z-10 bg-inherit px-4 py-3.5 text-right font-medium text-muted-foreground">
                  {row.label}
                </td>
                {items.map((laptop) => {
                  const highlight = isBest(row.highlightBest, laptop)
                  return (
                    <td
                      key={laptop.id}
                      className={cn(
                        'border-r border-border px-4 py-3.5 text-center last:border-r-0',
                        highlight && 'bg-primary/5 font-semibold text-primary',
                      )}
                    >
                      {row.getValue(laptop)}
                    </td>
                  )
                })}
              </tr>
            ))}

            {/* دکمه افزودن به سبد */}
            <tr className="bg-card">
              <td className="sticky right-0 z-10 bg-card px-4 py-4" />
              {items.map((laptop) => (
                <td
                  key={laptop.id}
                  className="border-r border-border px-4 py-4 text-center last:border-r-0"
                >
                  <Button
                    size="sm"
                    disabled={!laptop.inStock}
                    className="w-full gap-1.5"
                    onClick={() => {
                      addItem(laptop)
                      toast(`${laptop.name} به سبد اضافه شد`, {
                        actionHref: '/cart',
                        actionLabel: 'مشاهده سبد',
                      })
                    }}
                  >
                    <ShoppingCart className="size-3.5" />
                    {laptop.inStock ? 'افزودن به سبد' : 'ناموجود'}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {count < 2 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          برای مقایسه معنادار، حداقل ۲ محصول اضافه کنید.
        </p>
      )}
    </div>
  )
}
