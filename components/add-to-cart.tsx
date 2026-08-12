'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import type { Laptop } from '@/lib/products'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'

export function AddToCart({ laptop }: { laptop: Laptop }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(laptop, qty)
    setAdded(true)
    toast(`${laptop.name} به سبد اضافه شد`, {
      actionHref: '/cart',
      actionLabel: 'مشاهده سبد',
    })
    setTimeout(() => setAdded(false), 2000)
  }

  if (!laptop.inStock) {
    return (
      <Button size="lg" className="w-full" disabled>
        ناموجود
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex items-center justify-between rounded-md border border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="کاهش"
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-10 text-center font-medium">
          {qty.toLocaleString('fa-IR')}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQty((q) => Math.min(10, q + 1))}
          aria-label="افزایش"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <Button size="lg" className="flex-1" onClick={handleAdd}>
        {added ? (
          <>
            <Check className="size-4" />
            به سبد اضافه شد
          </>
        ) : (
          <>
            <ShoppingCart className="size-4" />
            افزودن به سبد خرید
          </>
        )}
      </Button>

      <Button asChild size="lg" variant="outline">
        <Link href="/cart">مشاهده سبد</Link>
      </Button>
    </div>
  )
}
