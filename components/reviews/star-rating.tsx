'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
}

const sizeMap = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export function StarRating({
  value,
  onChange,
  size = 'md',
  readonly = false,
}: Props) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly || !onChange}
          onClick={() => onChange?.(star)}
          className={cn(
            'transition-transform',
            !readonly && onChange && 'hover:scale-110 cursor-pointer',
            readonly && 'cursor-default',
          )}
          aria-label={`${star} ستاره`}
        >
          <Star
            className={cn(
              sizeMap[size],
              star <= value
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-muted-foreground/40',
            )}
          />
        </button>
      ))}
    </div>
  )
}
