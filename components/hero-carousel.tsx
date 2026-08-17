'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const HERO_SLIDES = [
  {
    src: '/laptops/hero-laptop.png',
    alt: 'لپ‌تاپ ویژه — پیشنهاد تخفیف',
    href: '#deals',
  },
  {
    src: '/laptops/gaming-rog.png',
    alt: 'لپ‌تاپ گیمینگ قدرتمند',
    href: '/products?cat=%DA%AF%DB%8C%D9%85%DB%8C%D9%86%DA%AF',
  },
  {
    src: '/laptops/pro-ultra.png',
    alt: 'اولترابوک سبک و حرفه‌ای',
    href: '/products?cat=%D8%A7%D9%88%D9%84%D8%AA%D8%B1%D8%A7%D8%A8%D9%88%DA%A9',
  },
  {
    src: '/laptops/titan-blade-15.jpg',
    alt: 'لپ‌تاپ گیمینگ تایتان',
    href: '#deals',
  },
  {
    src: '/laptops/aurora-book-14.jpg',
    alt: 'لپ‌تاپ اولترابوک آرورا',
    href: '/products',
  },
  {
    src: '/laptops/cyber-force-17.jpg',
    alt: 'لپ‌تاپ گیمینگ سایبر فورس',
    href: '/products?cat=%DA%AF%DB%8C%D9%85%DB%8C%D9%86%DA%AF',
  },
]

const INTERVAL = 4500 // میلی‌ثانیه

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const goTo = (index: number) => {
    setCurrent(index)
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [isPaused, next])

  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-orange-500/25 to-transparent blur-3xl" />

      <div className="relative block h-full overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 p-5 shadow-2xl shadow-primary/15 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10 pointer-events-none" />

        {HERO_SLIDES.map((slide, index) => (
          <Link
            key={slide.src}
            href={slide.href}
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out',
              index === current
                ? 'opacity-100 z-[1]'
                : 'opacity-0 z-0 pointer-events-none'
            )}
            tabIndex={index === current ? 0 : -1}
            aria-hidden={index !== current}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-contain p-4 drop-shadow-2xl motion-safe:animate-[float_6s_ease-in-out_infinite]"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </Link>
        ))}

        {/* دکمه‌های قبلی / بعدی */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            prev()
          }}
          className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/90 text-foreground shadow-lg backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="عکس قبلی"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            next()
          }}
          className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-card/90 text-foreground shadow-lg backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="عکس بعدی"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* نقطه‌های ناوبری */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                'size-2.5 rounded-full transition-all duration-300',
                index === current
                  ? 'w-6 bg-primary'
                  : 'bg-foreground/30 hover:bg-foreground/50'
              )}
              aria-label={`رفتن به اسلاید ${index + 1}`}
              aria-current={index === current}
            />
          ))}
        </div>
      </div>

      {/* بج پیشنهاد ویژه */}
      <Link
        href="#deals"
        className="absolute -bottom-3 left-4 z-20 rounded-2xl border border-border/50 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-card sm:left-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold">پیشنهاد ویژه</p>
            <p className="text-xs text-muted-foreground">تا ۳۰٪ تخفیف</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
