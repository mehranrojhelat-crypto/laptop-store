'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Wallet,
  Loader2,
} from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useAuth } from '@/components/auth-provider'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const SHIPPING = 500_000

export default function CheckoutPage() {
  const { items, subtotal, clear, count } = useCart()
  const { user } = useAuth()

  const [done, setDone] = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  const [payment, setPayment] = useState<'online' | 'cod'>('online')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [note, setNote] = useState('')

  const total = subtotal + SHIPPING

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          city,
          address,
          postalCode,
          paymentMethod: payment,
          note: note || undefined,
          items: items.map((i) => ({
            id: i.id,
            quantity: i.quantity,
          })),
          userId: user?.id ?? null,
          userEmail: user?.email ?? null,
          userName: user?.name ?? null,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.message || 'ثبت سفارش ناموفق بود.')
        setLoading(false)
        return
      }

      setTrackingCode(data.order.trackingCode)
      setDone(true)
      clear()
    } catch {
      setError('خطای شبکه. لطفاً دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
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
          <span className="font-bold text-foreground" dir="ltr">
            {trackingCode}
          </span>{' '}
          است.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          می‌توانید این کد را برای پیگیری سفارش نگه دارید.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/products">
              ادامه خرید
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </div>
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
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 font-semibold">اطلاعات گیرنده</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  required
                  placeholder="مثال: علی"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input
                  id="lastName"
                  required
                  placeholder="مثال: رضایی"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">شماره موبایل</Label>
                <Input
                  id="phone"
                  required
                  inputMode="numeric"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">شهر</Label>
                <Input
                  id="city"
                  required
                  placeholder="تهران"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="address">نشانی کامل</Label>
                <Input
                  id="address"
                  required
                  placeholder="خیابان، کوچه، پلاک و واحد"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="postal">کد پستی</Label>
                <Input
                  id="postal"
                  required
                  inputMode="numeric"
                  placeholder="۱۰ رقمی"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="note">توضیحات (اختیاری)</Label>
                <Input
                  id="note"
                  placeholder="مثلاً ساعت تماس ترجیحی"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 font-semibold">روش پرداخت</h2>
            <RadioGroup
              value={payment}
              onValueChange={(v) => setPayment(v as 'online' | 'cod')}
              className="grid gap-3 sm:grid-cols-2"
              disabled={loading}
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

          {error && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

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

            <Button
              type="submit"
              size="lg"
              className="mt-5 w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                'ثبت و پرداخت سفارش'
              )}
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
