'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Laptop } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type Props = {
  products: Laptop[]
  autoPlay?: boolean
  interval?: number
  /** تعداد کارت در دسکتاپ (پیش‌فرض ۳) */
  slidesToShow?: number
  /** استایل کارت‌ها: 'default' یا 'deal' (برای بخش تخفیف) */
  variant?: 'default' | 'deal'
}

export function ProductCarousel({
  products,
  autoPlay = true,
  interval = 5000,
  slidesToShow = 3,
  variant = 'default',
}: Props) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(1)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024) setItemsPerView(Math.min(slidesToShow, products.length))
      else if (w >= 640) setItemsPerView(Math.min(2, products.length))
      else setItemsPerView(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [slidesToShow, products.length])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (!autoPlay || isPaused || products.length <= itemsPerView) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, isPaused, next, interval, products.length, itemsPerView])

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  if (products.length === 0) return null

  const showControls = products.length > itemsPerView
  const gap = 16 // px معادل gap-4

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {showControls && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute -right-1 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/95 text-foreground shadow-lg backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:-right-4 sm:size-11"
            aria-label="قبلی"
          >
            <ChevronRight className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute -left-1 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/95 text-foreground shadow-lg backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:-left-4 sm:size-11"
            aria-label="بعدی"
          >
            <ChevronLeft className="size-5" />
          </button>
        </>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(${current * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((laptop) => (
            <div
              key={laptop.id}
              className="shrink-0"
              style={{
                width: `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})`,
              }}
            >
              {variant === 'deal' ? (
                <div className="h-full rounded-2xl bg-background/95 p-1.5 shadow-xl backdrop-blur-sm ring-1 ring-white/20">
                  <ProductCard laptop={laptop} />
                </div>
              ) : (
                <ProductCard laptop={laptop} />
              )}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={cn(
                'size-2.5 rounded-full transition-all duration-300',
                index === current
                  ? 'w-6 bg-primary'
                  : 'bg-foreground/25 hover:bg-foreground/40',
              )}
              aria-label={`اسلاید ${index + 1}`}
              aria-current={index === current}
            />
          ))}
        </div>
      )}
    </div>
  )
}
