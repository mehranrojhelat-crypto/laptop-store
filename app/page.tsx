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
  Search,
  Clock,
  BookOpen,
} from 'lucide-react'
import { getFeaturedLaptops, getDealLaptops, categories } from '@/lib/products'
import { getAllArticles } from '@/lib/articles'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { HeroCarousel } from '@/components/hero-carousel'

const categoryIcons: Record<string, typeof Cpu> = {
  گیمینگ: Gamepad2,
  اولترابوک: Sparkles,
  اداری: Briefcase,
  مهندسی: Cpu,
  دانشجویی: Cpu,
}

export default async function HomePage() {
  const featured = await getFeaturedLaptops(4)
  const deals = await getDealLaptops()
  const latestArticles = getAllArticles().slice(0, 3)

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="pointer-events-none absolute -left-40 top-10 size-[28rem] rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="order-2 flex flex-col items-start text-right lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              فروشگاه تخصصی لپ‌تاپ
            </div>

            <h1 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              بهترین لپ‌تاپ‌ها را
              <br />
              <span className="bg-gradient-to-l from-primary via-orange-500 to-orange-600 bg-clip-text text-transparent">
                با بهترین قیمت
              </span>
              <br />
              پیدا کن
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
              از گیمینگ قدرتمند تا اولترابوک‌های سبک و لپ‌تاپ‌های اداری؛
              همه چیز اینجا با گارانتی رسمی، ارسال سریع و پشتیبانی واقعی در
              انتظارته.
            </p>

            <form
              action="/products"
              method="get"
              className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-2xl border border-border/70 bg-card/80 p-1.5 shadow-sm backdrop-blur-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="search"
                  name="q"
                  placeholder="لپ‌تاپ مورد نظرت چیه؟"
                  autoComplete="off"
                  className="h-10 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button type="submit" size="sm" className="shrink-0 rounded-xl px-4">
                جستجو
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <p className="font-bold">۱۸ ماه</p>
                  <p className="text-xs text-muted-foreground">گارانتی رسمی</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Truck className="size-4" />
                </div>
                <div>
                  <p className="font-bold">ارسال سریع</p>
                  <p className="text-xs text-muted-foreground">در سراسر کشور</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CreditCard className="size-4" />
                </div>
                <div>
                  <p className="font-bold">پرداخت امن</p>
                  <p className="text-xs text-muted-foreground">درگاه معتبر</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-2xl px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
              >
                <Link href="/products">
                  مشاهده پرفروش‌ها
                  <ArrowLeft className="mr-1 size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-2xl border-primary/25 bg-background/50 px-7 text-base backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <Link href="#deals">پیشنهادهای ویژه</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <HeroCarousel />
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
      <section
        id="deals"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary via-orange-500 to-orange-600 p-1 shadow-2xl shadow-primary/25">
          <div className="relative rounded-[1.4rem] bg-gradient-to-l from-primary via-primary to-orange-600 px-6 py-12 sm:px-12">
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

      {/* Blog / Articles */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <BookOpen className="size-3.5" />
              وبلاگ لپ‌تاپ‌لند
            </div>
            <h2 className="text-2xl font-bold tracking-tight">آخرین مقالات</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              بررسی محصولات فروشگاه و راهنمای خرید
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            همه مقالات
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[16/10] bg-secondary">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-primary sm:text-lg">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  ادامه مطلب
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
