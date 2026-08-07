'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2, CreditCard, Wallet } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const SHIPPING = 500000

export default function CheckoutPage() {
  const { items, subtotal, clear, count } = useCart()
  const [done, setDone] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [payment, setPayment] = useState('online')

  const total = subtotal + SHIPPING

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderId(id)
    setDone(true)
    clear()
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-9" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">سفارش شما ثبت شد</h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          از خرید شما سپاسگزاریم. کد پیگیری سفارش شما{' '}
          <span className="font-bold text-foreground">
            {orderId.toLocaleString('fa-IR')}
          </span>{' '}
          است.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">
            ادامه خرید
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="text-xl font-bold">سبد خرید خالی است</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          برای تسویه حساب ابتدا محصولی به سبد اضافه کنید.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">مشاهده محصولات</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">تسویه حساب</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]"
      >
        <div className="flex flex-col gap-6">
          {/* Contact + address */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 font-semibold">اطلاعات گیرنده</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">نام</Label>
                <Input id="firstName" required placeholder="مثال: علی" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input id="lastName" required placeholder="مثال: رضایی" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">شماره موبایل</Label>
                <Input
                  id="phone"
                  required
                  inputMode="numeric"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">شهر</Label>
                <Input id="city" required placeholder="تهران" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="address">نشانی کامل</Label>
                <Input
                  id="address"
                  required
                  placeholder="خیابان، کوچه، پلاک و واحد"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="postal">کد پستی</Label>
                <Input
                  id="postal"
                  required
                  inputMode="numeric"
                  placeholder="۱۰ رقمی"
                />
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 font-semibold">روش پرداخت</h2>
            <RadioGroup
              value={payment}
              onValueChange={setPayment}
              className="grid gap-3 sm:grid-cols-2"
            >
              <Label
                htmlFor="online"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <RadioGroupItem id="online" value="online" />
                <CreditCard className="size-5 text-primary" />
                <span className="text-sm font-medium">پرداخت آنلاین</span>
              </Label>
              <Label
                htmlFor="cod"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[:checked]:border-primary has-[:checked]:bg-secondary"
              >
                <RadioGroupItem id="cod" value="cod" />
                <Wallet className="size-5 text-primary" />
                <span className="text-sm font-medium">پرداخت در محل</span>
              </Label>
            </RadioGroup>
          </section>
        </div>

        {/* Summary */}
        <aside>
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">
              سفارش شما ({count.toLocaleString('fa-IR')} کالا)
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium leading-tight">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity.toLocaleString('fa-IR')} عدد
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-2.5 text-sm">
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
                <span>مبلغ نهایی</span>
                <span>{formatPrice(total)} تومان</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-5 w-full">
              ثبت و پرداخت سفارش
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              با ثبت سفارش، قوانین فروشگاه را می‌پذیرید.
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}
