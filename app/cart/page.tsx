'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const SHIPPING = 500000

export default function CartPage() {
  const { items, subtotal, count, setQuantity, removeItem, clear } = useCart()
  const total = subtotal + (items.length ? SHIPPING : 0)

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <ShoppingBag className="size-16 text-muted-foreground mb-4" />
        <h1 className="text-xl font-bold">سبد خرید خالی است</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          هنوز محصولی اضافه نکرده‌اید.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">مشاهده محصولات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          سبد خرید ({count.toLocaleString('fa-IR')} کالا)
        </h1>
        <Button variant="ghost" size="sm" onClick={clear} className="text-destructive">
          خالی کردن سبد
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="font-semibold hover:text-primary line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">{item.brand}</p>
                </div>

                <div className="flex items-center justify-between gap-3 mt-3">
                  <div className="flex items-center rounded-lg border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity.toLocaleString('fa-IR')}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      {formatPrice(item.price * item.quantity)} تومان
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-semibold">خلاصه سفارش</h2>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">جمع کالاها</span>
              <span>{formatPrice(subtotal)} تومان</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">هزینه ارسال</span>
              <span>{formatPrice(SHIPPING)} تومان</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>مبلغ نهایی</span>
              <span>{formatPrice(total)} تومان</span>
            </div>
            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">ادامه و تسویه حساب</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
