import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Cpu,
  Gamepad2,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Truck,
  CreditCard,
} from 'lucide-react'
import { getFeaturedLaptops, getDealLaptops, categories } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

const categoryIcons: Record<string, typeof Cpu> = {
  گیمینگ: Gamepad2,
  اولترابوک: Sparkles,
  اداری: Briefcase,
  مهندسی: Cpu,
  دانشجویی: Cpu,
}

const features = [
  {
    icon: ShieldCheck,
    title: 'گارانتی رسمی',
    desc: '۱۸ ماه ضمانت اصالت کالا',
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    desc: 'تحویل در کمترین زمان',
  },
  {
    icon: CreditCard,
    title: 'پرداخت امن',
    desc: 'درگاه معتبر بانکی',
  },
]

export default async function HomePage() {
  const featured = await getFeaturedLaptops(4)
  const deals = await getDealLaptops()

  return (
    <div className="overflow-hidden">
      {/* Hero */}
<section className="relative overflow-hidden border-b border-border">
  {/* گرادیان متحرک */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
  <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
  <div className="pointer-events-none absolute -right-20 bottom-10 size-80 rounded-full bg-orange-500/10 blur-3xl" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
    {/* ... متن سمت چپ همون قبلی بمونه، فقط دکمه‌ها رو این‌طوری کن: */}
    <div className="mt-8 flex flex-wrap gap-3">
      <Button asChild size="lg" className="rounded-2xl px-7 shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5">
        <Link href="/products">
          مشاهده محصولات
          <ArrowLeft className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="rounded-2xl border-primary/30 bg-background/60 backdrop-blur hover:bg-primary/5">
        <Link href="/products?cat=گیمینگ">لپ‌تاپ‌های گیمینگ</Link>
      </Button>
    </div>

    {/* تصویر هیرو */}
    <div className="order-1 md:order-2">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
        <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/30 to-orange-600/20 blur-2xl animate-pulse" />
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-border/50 bg-card/40 p-6 shadow-2xl shadow-primary/20 backdrop-blur-md transition-transform duration-700 hover:scale-[1.02]">
          <Image
            src="/laptops/hero-laptop.png"
            alt="لپ‌تاپ ویژه"
            fill
            priority
            className="object-contain p-4 drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold sm:text-2xl">دسته‌بندی‌ها</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            بر اساس نیازت انتخاب کن
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
  const Icon = categoryIcons[cat] ?? Cpu
  return (
    <Link
      key={cat}
      href={`/products?cat=${encodeURIComponent(cat)}`}
      className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
        <Icon className="size-6" />
      </span>
      <span className="relative text-sm font-bold">{cat}</span>
    </Link>
  )
})}

        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">پرفروش‌ترین‌ها</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              محبوب‌ترین لپ‌تاپ‌ها میان مشتریان
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            مشاهده همه
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((laptop) => (
            <ProductCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </section>

{/* Deals */}
<section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary via-orange-500 to-orange-600 p-1 shadow-2xl shadow-primary/25">
    <div className="relative rounded-[1.4rem] bg-gradient-to-l from-primary via-primary to-orange-600 px-6 py-12 sm:px-12">
      {/* افکت‌های نور */}
      <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 size-72 rounded-full bg-black/20 blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            🔥 پیشنهاد ویژه محدود
          </span>
          <h2 className="text-3xl font-black sm:text-4xl">
            فروش ویژه لپ‌تاپ‌های منتخب
          </h2>
          <p className="mt-3 max-w-lg text-base leading-7 text-primary-foreground/90">
            تا سقف موجودی از تخفیف‌های شگفت‌انگیز بهره‌مند شو. فرصت محدوده!
          </p>
        </div>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="rounded-2xl px-8 text-base font-bold shadow-xl transition-transform hover:scale-105"
        >
          <Link href="/products">
            مشاهده همه تخفیف‌ها
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
      </div>

      {/* کارت‌ها */}
      <div className="relative mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {deals.slice(0, 3).map((laptop) => (
          <div
            key={laptop.id}
            className="rounded-2xl bg-background/95 p-1.5 shadow-xl backdrop-blur-sm ring-1 ring-white/20"
          >
            <ProductCard laptop={laptop} />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
