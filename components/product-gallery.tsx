'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type ProductGalleryProps = {
  images: string[]
  name: string
  brand: string
  category: string
  badge?: string | null
}

export function ProductGallery({
  images,
  name,
  brand,
  category,
  badge,
}: ProductGalleryProps) {
  const list =
    images && images.length > 0 ? images : ['/placeholder.svg']
  const [active, setActive] = useState(0)

  const goPrev = () => {
    setActive((i) => (i === 0 ? list.length - 1 : i - 1))
  }

  const goNext = () => {
    setActive((i) => (i === list.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="flex flex-col gap-3">
      {/* عکس اصلی */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
        <Image
          src={list[active] || '/placeholder.svg'}
          alt={`${name} — ${brand} ${category} — تصویر ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 sm:p-8"
        />

        {badge && (
          <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}

        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={goNext}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background"
              aria-label="عکس بعدی"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goPrev}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background"
              aria-label="عکس قبلی"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'size-2 rounded-full transition-all',
                    i === active
                      ? 'w-5 bg-primary'
                      : 'bg-foreground/30 hover:bg-foreground/50',
                  )}
                  aria-label={`تصویر ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* بندانگشتی‌ها */}
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-secondary transition sm:size-20',
                i === active
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent hover:border-border',
              )}
            >
              <Image
                src={src || '/placeholder.svg'}
                alt={`${name} بندانگشتی ${i + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
