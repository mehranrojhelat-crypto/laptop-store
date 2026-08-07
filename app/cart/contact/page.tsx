'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">تماس با ما</h1>
        <p className="mt-2 text-muted-foreground">
          سوالی داری؟ خوشحال می‌شیم کمکت کنیم.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* اطلاعات تماس */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Phone className="size-5" />
            </span>
            <div>
              <h3 className="font-semibold">تلفن پشتیبانی</h3>
              <p className="mt-1 text-sm text-muted-foreground">۰۲۱-۹۱۰۰۰۰۰۰</p>
              <p className="text-sm text-muted-foreground">۰۹۱۲-۰۰۰-۰۰۰۰</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Mail className="size-5" />
            </span>
            <div>
              <h3 className="font-semibold">ایمیل</h3>
              <p className="mt-1 text-sm text-muted-foreground">support@laptopland.ir</p>
              <p className="text-sm text-muted-foreground">info@laptopland.ir</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <MapPin className="size-5" />
            </span>
            <div>
              <h3 className="font-semibold">آدرس فروشگاه</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <Clock className="size-5" />
            </span>
            <div>
              <h3 className="font-semibold">ساعات کاری</h3>
              <p className="mt-1 text-sm text-muted-foreground">شنبه تا پنج‌شنبه: ۹ صبح تا ۹ شب</p>
              <p className="text-sm text-muted-foreground">جمعه: ۱۰ صبح تا ۶ عصر</p>
            </div>
          </div>
        </div>

        {/* فرم تماس */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-6 text-xl font-semibold">ارسال پیام</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input id="name" placeholder="مثلاً علی محمدی" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="ali@email.com" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس</Label>
              <Input id="phone" type="tel" placeholder="۰۹۱۲۰۰۰۰۰۰۰" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
<Label htmlFor="message">پیام شما</Label>
              <textarea
                id="message"
                rows={5}
                placeholder="متن پیام خود را بنویسید..."
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
            <Button type="submit" className="w-full">
              ارسال پیام
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              این فرم نمایشی است و پیام واقعی ارسال نمی‌شود.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
