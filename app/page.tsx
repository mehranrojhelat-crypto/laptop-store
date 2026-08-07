import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Cpu, Gamepad2, Briefcase, Sparkles } from 'lucide-react'
import { laptops, categories } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'

const categoryIcons: Record<string, typeof Cpu> = {
  گیمینگ: Gamepad2,
  اولترابوک: Sparkles,
  اداری: Briefcase,
  مهندسی: Cpu,
  دانشجویی: Cpu,
}

export default function HomePage() {
  const featured = laptops.slice(0, 4)
  const deals = laptops.filter((l) => l.oldPrice)

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-accent/40">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              فصل جدید لپ‌تاپ‌ها رسید
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-balance sm:text-5xl">
              لپ‌تاپی برای هر هدف، انتخابی مطمئن برای تو
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
              از گیمینگ حرفه‌ای تا اولترابوک‌های سبک؛ جدیدترین مدل‌ها با گارانتی
              رسمی و پرداخت امن را همین‌جا پیدا کن.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  مشاهده محصولات
                  <ArrowLeft className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products?cat=گیمینگ">لپ‌تاپ‌های گیمینگ</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/laptops/hero-laptop.png"
              alt="لپ‌تاپ ویژه"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] ?? Cpu
            return (
              <Link
                key={cat}
                href={`/products?cat=${cat}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-primary hover:bg-secondary"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-medium">{cat}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">پرفروش‌ترین‌ها</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              محبوب‌ترین لپ‌تاپ‌ها میان مشتریان
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            مشاهده همه
            <ArrowLeft className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((laptop) => (
            <ProductCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </section>

      {/* Deals banner */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                فروش ویژه لپ‌تاپ‌های منتخب
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed opacity-90">
                تا سقف موجودی از تخفیف‌های شگفت‌انگیز روی مدل‌های محبوب بهره‌مند
                شوید.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">
                مشاهده تخفیف‌ها
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {deals.slice(0, 3).map((laptop) => (
              <div
                key={laptop.id}
                className="rounded-xl bg-background p-1 text-foreground"
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
