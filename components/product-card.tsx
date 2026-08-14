'use client'

import { useToast } from '@/components/ui/toast'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Percent, Eye, GitCompare, Check } from 'lucide-react'
import type { Laptop } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useCart } from '@/components/cart-provider'
import { useCompare } from '@/components/compare-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function ProductCard({ laptop }: { laptop: Laptop }) {
  const { addItem } = useCart()
  const { isInCompare, addItem: addCompare, removeItem: removeCompare, canAdd } =
    useCompare()
  const { toast } = useToast()

  const inCompare = isInCompare(laptop.id)

  const discountPercent =
    laptop.oldPrice && laptop.oldPrice > laptop.price
      ? Math.round(((laptop.oldPrice - laptop.price) / laptop.oldPrice) * 100)
      : null

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) {
      removeCompare(laptop.id)
      toast('از لیست مقایسه حذف شد')
      return
    }
    const ok = addCompare(laptop)
    if (ok) {
      toast('به لیست مقایسه اضافه شد', {
        actionHref: '/compare',
        actionLabel: 'مشاهده مقایسه',
      })
    } else {
      toast('حداکثر ۴ محصول می‌توانید مقایسه کنید')
    }
  }

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card',
        'shadow-sm transition-all duration-400',
        'hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10',
        inCompare && 'border-primary/50 ring-2 ring-primary/20',
      )}
    >
      <Link
        href={`/products/${laptop.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-b from-secondary/90 to-secondary/50"
      >
        <Image
          src={laptop.image || '/placeholder.svg'}
          alt={laptop.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
        />

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-xl bg-background/95 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-sm scale-90 transition-transform duration-300 group-hover:scale-100">
            <Eye className="size-4" />
            مشاهده سریع
          </span>
        </div>

        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {laptop.badge && (
            <Badge className="border-0 bg-primary text-xs font-bold text-primary-foreground shadow-md">
              {laptop.badge}
            </Badge>
          )}
          {discountPercent && (
            <Badge className="border-0 bg-red-500 text-xs font-bold text-white shadow-md animate-pulse">
              <Percent className="ml-0.5 size-3" />
              {discountPercent.toLocaleString('fa-IR')}٪ تخفیف
            </Badge>
          )}
        </div>

        {/* دکمه مقایسه روی تصویر */}
        <button
          type="button"
          onClick={handleCompare}
          className={cn(
            'absolute left-3 top-3 flex size-9 items-center justify-center rounded-xl border shadow-md transition-all',
            inCompare
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border/80 bg-background/95 text-muted-foreground hover:border-primary hover:text-primary',
          )}
          aria-label={inCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
        >
          {inCompare ? (
            <Check className="size-4" />
          ) : (
            <GitCompare className="size-4" />
          )}
        </button>

        {!laptop.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background">
              ناموجود
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-lg bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {laptop.brand}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-foreground/80">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {laptop.rating.toLocaleString('fa-IR')}
          </span>
        </div>

        <Link href={`/products/${laptop.id}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug transition-colors group-hover:text-primary sm:text-[15px]">
            {laptop.name}
          </h3>
        </Link>

        <p className="line-clamp-1 text-[11px] text-muted-foreground sm:text-xs">
          {laptop.cpu} · {laptop.ram.toLocaleString('fa-IR')} گیگ ·{' '}
          {laptop.screen.toLocaleString('fa-IR')} اینچ
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border/50 pt-3">
          <div className="min-w-0">
            {laptop.oldPrice && (
              <span className="block text-xs text-muted-foreground line-through">
                {formatPrice(laptop.oldPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black tracking-tight text-foreground sm:text-xl">
                {formatPrice(laptop.price)}
              </span>
              <span className="text-xs text-muted-foreground">تومان</span>
            </div>
          </div>

          <Button
            size="icon"
            disabled={!laptop.inStock}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              addItem(laptop)
              toast(`${laptop.name} به سبد اضافه شد`, {
                actionHref: '/cart',
                actionLabel: 'مشاهده سبد',
              })
            }}
            aria-label="افزودن به سبد"
            className="size-10 shrink-0 rounded-xl shadow-md transition-all hover:scale-110 active:scale-95"
          >
            <ShoppingCart className="size-4.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
