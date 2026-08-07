import Link from 'next/link'
import { Laptop, ShieldCheck, Truck, Headphones, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: ShieldCheck,
    title: 'گارانتی معتبر',
    desc: 'تمام محصولات با ۱۸ ماه گارانتی رسمی ارائه می‌شوند.',
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    desc: 'ارسال به سراسر کشور در کوتاه‌ترین زمان ممکن.',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی واقعی',
    desc: 'تیم پشتیبانی همیشه آماده پاسخگویی به سوالات شماست.',
  },
  {
    icon: Award,
    title: 'انتخاب تخصصی',
    desc: 'فقط لپ‌تاپ‌هایی که از نظر کیفیت تایید شده‌اند.',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Laptop className="size-7" />
        </div>
        <h1 className="text-3xl font-bold">معرفی فروشگاه</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          لپ‌تاپ‌لند یک فروشگاه تخصصی لپ‌تاپ است که با تمرکز روی کیفیت، قیمت منصفانه
          و مشاوره درست، به شما کمک می‌کند بهترین انتخاب را داشته باشید.
        </p>
      </div>

      <div className="mb-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">داستان ما</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            لپ‌تاپ‌لند با هدف ساده‌تر کردن خرید لپ‌تاپ شکل گرفت. ما می‌دانیم انتخاب
            بین مدل‌های گیمینگ، اداری، دانشجویی و مهندسی می‌تواند گیج‌کننده باشد؛
            به همین دلیل محصولات را دسته‌بندی کرده‌ایم و مشخصات مهم را شفاف
            نمایش می‌دهیم تا تصمیم‌گیری راحت‌تر شود.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">ماموریت ما</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            ماموریت ما این است که خرید لپ‌تاپ را شفاف، سریع و قابل‌اعتماد کنیم.
            از معرفی مشخصات فنی تا پشتیبانی بعد از خرید، کنار شما هستیم تا
            تجربه‌ای مطمئن از خرید آنلاین داشته باشید.
          </p>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="mb-6 text-center text-2xl font-bold">چرا لپ‌تاپ‌لند؟</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <span className="mx-auto mb-3 flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <item.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold">آماده انتخاب لپ‌تاپ مناسبت هستی؟</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm opacity-90">
          از گیمینگ تا اولترابوک، مجموعه متنوعی از محصولات را بررسی کن و با اطمینان خرید کن.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/contact">تماس با ما</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
