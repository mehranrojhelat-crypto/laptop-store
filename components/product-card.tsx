'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import type { Laptop } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ProductCard({ laptop }: { laptop: Laptop }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/products/${laptop.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-secondary"
      >
        <Image
          src={laptop.image || '/placeholder.svg'}
          alt={laptop.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {laptop.badge && (
            <Badge className="bg-primary text-primary-foreground">
              {laptop.badge}
            </Badge>
          )}
          {laptop.oldPrice && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              تخفیف
            </Badge>
          )}
        </div>
        {!laptop.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <span className="rounded-md bg-foreground px-3 py-1 text-sm font-semibold text-background">
              ناموجود
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{laptop.brand}</span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <Star className="size-3.5 fill-primary text-primary" />
            {laptop.rating.toLocaleString('fa-IR')}
          </span>
        </div>
        <Link href={`/products/${laptop.id}`}>
          <h3 className="mt-1 font-semibold leading-6 text-balance hover:text-primary">
            {laptop.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
          {laptop.cpu} · {laptop.ram} گیگ رم · {laptop.screen} اینچ
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              {laptop.oldPrice && (
                <span className="block text-xs text-muted-foreground line-through">
                  {formatPrice(laptop.oldPrice)}
                </span>
              )}
              <span className="text-base font-bold">
                {formatPrice(laptop.price)}{' '}
                <span className="text-xs font-normal text-muted-foreground">
                  تومان
                </span>
              </span>
            </div>
            <Button
              size="icon"
              disabled={!laptop.inStock}
              onClick={() => addItem(laptop)}
              aria-label="افزودن به سبد"
            >
              <ShoppingCart className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
