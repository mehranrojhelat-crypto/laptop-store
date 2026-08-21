'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  X,
  Maximize2,
} from 'lucide-react'
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const dragStart = useRef({ x: 0, y: 0 })
  const offsetStart = useRef({ x: 0, y: 0 })

  const openLightbox = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
    setLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const goPrev = () => {
    setActive((i) => (i === 0 ? list.length - 1 : i - 1))
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const goNext = () => {
    setActive((i) => (i === list.length - 1 ? 0 : i + 1))
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  const zoomIn = () => {
    setScale((s) => Math.min(s + 0.5, 4))
  }

  const zoomOut = () => {
    setScale((s) => {
      const next = Math.max(s - 0.5, 1)
      if (next === 1) setOffset({ x: 0, y: 0 })
      return next
    })
  }

  const resetZoom = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  // بستن با Escape + قفل اسکرول
  useEffect(() => {
    if (!lightboxOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goNext()
      if (e.key === 'ArrowRight') goPrev()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen, closeLightbox, list.length])

  // درگ برای جابه‌جایی وقتی زوم است
  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    offsetStart.current = { ...offset }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || scale <= 1) return
    setOffset({
      x: offsetStart.current.x + (e.clientX - dragStart.current.x),
      y: offsetStart.current.y + (e.clientY - dragStart.current.y),
    })
  }

  const onPointerUp = () => {
    setDragging(false)
  }

  // زوم با اسکرول ماوس داخل لایت‌باکس
  const onWheel = (e: React.WheelEvent) => {
    if (!lightboxOpen) return
    e.preventDefault()
    if (e.deltaY < 0) zoomIn()
    else zoomOut()
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* عکس اصلی */}
        <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
          <button
            type="button"
            onClick={openLightbox}
            className="absolute inset-0 z-10 cursor-zoom-in"
            aria-label="بزرگ‌نمایی تصویر"
          />

          <Image
            src={list[active] || '/placeholder.svg'}
            alt={`${name} — ${brand} ${category} — تصویر ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 sm:p-8 transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {badge && (
            <Badge className="absolute right-4 top-4 z-20 bg-primary text-primary-foreground">
              {badge}
            </Badge>
          )}

          {/* دکمه زوم */}
          <button
            type="button"
            onClick={openLightbox}
            className="absolute left-3 bottom-3 z-20 flex size-10 items-center justify-center rounded-xl border border-border/80 bg-background/95 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background hover:text-primary"
            aria-label="بزرگ‌نمایی"
          >
            <Maximize2 className="size-4" />
          </button>

          {list.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background"
                aria-label="عکس بعدی"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background"
                aria-label="عکس قبلی"
              >
                <ChevronRight className="size-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                {list.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActive(i)
                    }}
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

      {/* لایت‌باکس زوم */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="نمایش بزرگ تصویر"
          onWheel={onWheel}
        >
          {/* نوار ابزار */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <p className="truncate text-sm text-white/80">
              {name} — تصویر {(active + 1).toLocaleString('fa-IR')} از{' '}
              {list.length.toLocaleString('fa-IR')}
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= 1}
                className="flex size-9 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 disabled:opacity-40"
                aria-label="کوچک‌نمایی"
              >
                <ZoomOut className="size-5" />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                className="min-w-[3.5rem] rounded-lg px-2 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10"
                aria-label="بازنشانی زوم"
              >
                {Math.round(scale * 100)}٪
              </button>

              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= 4}
                className="flex size-9 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 disabled:opacity-40"
                aria-label="بزرگ‌نمایی"
              >
                <ZoomIn className="size-5" />
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                className="mr-1 flex size-9 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10"
                aria-label="بستن"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* ناحیه تصویر */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox()
            }}
          >
            {list.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="عکس بعدی"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="عکس قبلی"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            <div
              className={cn(
                'relative h-[min(80vh,90vw)] w-[min(90vw,900px)] select-none',
                scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in',
              )}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onDoubleClick={() => {
                if (scale > 1) resetZoom()
                else setScale(2)
              }}
            >
              <div
                className="absolute inset-0 transition-transform duration-150 ease-out"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                }}
              >
                <Image
                  src={list[active] || '/placeholder.svg'}
                  alt={`${name} — زوم`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* بندانگشتی پایین لایت‌باکس */}
          {list.length > 1 && (
            <div className="flex justify-center gap-2 border-t border-white/10 px-4 py-3">
              {list.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => {
                    setActive(i)
                    resetZoom()
                  }}
                  className={cn(
                    'relative size-14 overflow-hidden rounded-lg border-2 transition',
                    i === active
                      ? 'border-white'
                      : 'border-transparent opacity-60 hover:opacity-100',
                  )}
                >
                  <Image
                    src={src || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain bg-black/40 p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
