'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GitCompare, X, Trash2 } from 'lucide-react'
import { useCompare } from '@/components/compare-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CompareBar() {
  const { items, count, max, removeItem, clear } = useCompare()

  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 shadow-2xl backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <GitCompare className="size-4 text-primary" />
          <span>
            مقایسه ({count.toLocaleString('fa-IR')} از {max.toLocaleString('fa-IR')})
          </span>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative flex items-center gap-2 rounded-xl border border-border bg-card py-1.5 pl-2 pr-8"
            >
              <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className="object-contain p-1"
                  sizes="36px"
                />
              </div>
              <span className="max-w-[120px] truncate text-xs font-medium sm:max-w-[160px]">
                {item.name}
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="absolute left-1 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="حذف از مقایسه"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}

          {Array.from({ length: max - count }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className={cn(
                'hidden h-[42px] min-w-[100px] items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground sm:flex',
              )}
            >
              خالی
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clear}
            className="gap-1.5 text-muted-foreground"
          >
            <Trash2 className="size-3.5" />
            پاک کردن
          </Button>
          <Button asChild size="sm" disabled={count < 2} className="gap-1.5">
            <Link href="/compare">
              <GitCompare className="size-3.5" />
              مقایسه کن
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
