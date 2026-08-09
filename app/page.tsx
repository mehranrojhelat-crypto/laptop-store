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
      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="size-4" />
              فصل جدید لپ‌تاپ‌ها رسید
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.2] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              لپ‌تاپی برای{' '}
              <span className="text-primary">هر هدف</span>
              <br />
              انتخابی مطمئن برای تو
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground text-pretty">
              از گیمینگ حرفه‌ای تا اولترابوک‌های سبک؛ جدیدترین مدل‌ها با گارانتی
              رسمی و پرداخت امن را همین‌جا پیدا کن.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-xl px-6 shadow-md shadow-primary/20">
                <Link href="/products">
                  مشاهده محصولات
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-border/80 bg-background/70 backdrop-blur"
              >
                <Link href="/products?cat=گیمینگ">لپ‌تاپ‌های گیمینگ</Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border/70 pt-6">
              {features.map((f) => (
                <div key={f.title} className="text-center sm:text-right">
                  <div className="mx-auto mb-2 flex size-9 items-center justify-center rounded-lg bg-secondary text-primary sm:mx-0">
                    <f.icon className="size-4" />
                  </div>
                  <p className="text-xs font-bold sm:text-sm">{f.title}</p>
                  <p className="mt-0.5 hidden text-[11px] text-muted-foreground sm:block">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/50 p-4 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                <Image
                  src="/laptops/hero-laptop.png"
                  alt="لپ‌تاپ ویژه"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 drop-shadow-xl"
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
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border/80 bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary/60 hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold">{cat}</span>
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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary via-primary to-orange-600 px-5 py-10 text-primary-foreground sm:px-10">
          <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 right-10 size-52 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                پیشنهاد ویژه
              </p>
              <h2 className="text-2xl font-black sm:text-3xl">
                فروش ویژه لپ‌تاپ‌های منتخب
              </h2>
              <p className="mt-2 max-w-md text-sm leading-7 text-primary-foreground/90">
                تا سقف موجودی از تخفیف‌های شگفت‌انگیز روی مدل‌های محبوب بهره‌مند
                شوید.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl shadow-lg"
            >
              <Link href="/products">
                مشاهده تخفیف‌ها
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.slice(0, 3).map((laptop) => (
              <div
                key={laptop.id}
                className="rounded-2xl bg-background/95 p-1 text-foreground shadow-lg backdrop-blur"
              >
                <ProductCard laptop={laptop} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
