'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const SHIPPING = 500000

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem, count } = useCart()

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <ShoppingBag className="size-7" />
        </span>
        <h1 className="mt-5 text-xl font-bold">سبد خرید شما خالی است</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">
            شروع خرید
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  const total = subtotal + SHIPPING

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">
        سبد خرید ({count.toLocaleString('fa-IR')} کالا)
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <Link
                href={`/products/${item.id}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-secondary"
              >
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {item.brand}
                    </span>
                    <Link
                      href={`/products/${item.id}`}
                      className="block font-semibold hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                    aria-label="حذف"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-md border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label="کاهش"
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
                      aria-label="افزایش"
                    >
                      <Plus className="size-3.5" />
                    </Button>
                  </div>
                  <span className="font-bold">
                    {formatPrice(item.price * item.quantity)}{' '}
                    <span className="text-xs font-normal text-muted-foreground">
                      تومان
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">خلاصه سفارش</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span>{formatPrice(subtotal)} تومان</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">هزینه ارسال</span>
                <span>{formatPrice(SHIPPING)} تومان</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>مبلغ قابل پرداخت</span>
                <span>{formatPrice(total)} تومان</span>
              </div>
            </div>
            <Button asChild size="lg" className="mt-5 w-full">
              <Link href="/checkout">
                ادامه و پرداخت
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link href="/products">افزودن محصول بیشتر</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
