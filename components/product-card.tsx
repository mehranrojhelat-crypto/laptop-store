'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Percent } from 'lucide-react'
import type { Laptop } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function ProductCard({ laptop }: { laptop: Laptop }) {
  const { addItem } = useCart()

  const discountPercent =
    laptop.oldPrice && laptop.oldPrice > laptop.price
      ? Math.round(((laptop.oldPrice - laptop.price) / laptop.oldPrice) * 100)
      : null

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card',
        'shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5',
      )}
    >
      <Link
        href={`/products/${laptop.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-b from-secondary/80 to-secondary"
      >
        <Image
          src={laptop.image || '/placeholder.svg'}
          alt={laptop.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute right-2.5 top-2.5 flex flex-col items-end gap-1.5">
          {laptop.badge && (
            <Badge className="border-0 bg-primary text-[11px] text-primary-foreground shadow-sm">
              {laptop.badge}
            </Badge>
          )}
          {discountPercent && (
            <Badge className="border-0 bg-red-500 text-[11px] text-white shadow-sm">
              <Percent className="ml-0.5 size-3" />
              {discountPercent.toLocaleString('fa-IR')}٪
            </Badge>
          )}
        </div>

        {!laptop.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background">
              ناموجود
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
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

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border/60 pt-3">
          <div className="min-w-0">
            {laptop.oldPrice && (
              <span className="block text-[11px] text-muted-foreground line-through">
                {formatPrice(laptop.oldPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
                {formatPrice(laptop.price)}
              </span>
              <span className="text-[11px] text-muted-foreground">تومان</span>
            </div>
          </div>

          <Button
            size="icon"
            disabled={!laptop.inStock}
            onClick={(e) => {
              e.preventDefault()
              addItem(laptop)
            }}
            aria-label="افزودن به سبد"
            className="size-9 shrink-0 rounded-xl shadow-sm transition-transform active:scale-95"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
