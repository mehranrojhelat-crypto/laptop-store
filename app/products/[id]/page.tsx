import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Check,
  ChevronLeft,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Star,
  Truck,
  ShieldCheck,
  Weight,
  BatteryCharging,
  MonitorSmartphone,
  ArrowLeft,
} from 'lucide-react'
import {
  getLaptop,
  getSimilarLaptops,
  formatPrice,
  getLaptops,
} from '@/lib/products'
import { getReviews } from '@/lib/reviews'
import { AddToCart } from '@/components/add-to-cart'
import { ProductCard } from '@/components/product-card'
import { ReviewForm } from '@/components/reviews/review-form'
import { ReviewList } from '@/components/reviews/review-list'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laptopland.ir'

export async function generateStaticParams() {
  try {
    const laptops = await getLaptops()
    return laptops.map((laptop) => ({ id: laptop.id }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const laptop = await getLaptop(id)

  if (!laptop) {
    return {
      title: 'محصول یافت نشد',
    }
  }

  const title = `${laptop.name} | ${laptop.brand}`
  const description =
    laptop.description?.slice(0, 160) ||
    `خرید ${laptop.name} با قیمت ${formatPrice(laptop.price)} تومان — گارانتی رسمی و ارسال سریع از لپ‌تاپ‌لند.`

  const imageUrl = laptop.image?.startsWith('http')
    ? laptop.image
    : `${siteUrl}${laptop.image || '/laptops/hero-laptop.png'}`

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${laptop.id}`,
    },
    openGraph: {
      type: 'website',
      title: `${laptop.name} | لپ‌تاپ‌لند`,
      description,
      url: `${siteUrl}/products/${laptop.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: laptop.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${laptop.name} | لپ‌تاپ‌لند`,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const laptop = await getLaptop(id)
  if (!laptop) notFound()

  const [suggestions, reviews] = await Promise.all([
    getSimilarLaptops(laptop, 4),
    getReviews(id),
  ])

  const specs = [
    { icon: Cpu, label: 'پردازنده', value: laptop.cpu },
    { icon: MemoryStick, label: 'حافظه رم', value: `${laptop.ram} گیگابایت` },
    {
      icon: HardDrive,
      label: 'حافظه ذخیره',
      value:
        laptop.storage >= 1024
          ? `${laptop.storage / 1024} ترابایت SSD`
          : `${laptop.storage} گیگابایت SSD`,
    },
    { icon: MonitorSmartphone, label: 'کارت گرافیک', value: laptop.gpu },
    { icon: Monitor, label: 'نمایشگر', value: `${laptop.screen} اینچ` },
    { icon: Weight, label: 'وزن', value: laptop.weight },
    { icon: BatteryCharging, label: 'باتری', value: laptop.battery },
    { icon: Cpu, label: 'سیستم‌عامل', value: laptop.os },
  ]

  const imageUrl = laptop.image?.startsWith('http')
    ? laptop.image
    : `${siteUrl}${laptop.image || '/placeholder.svg'}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: laptop.name,
    description: laptop.description,
    image: [imageUrl],
    brand: {
      '@type': 'Brand',
      name: laptop.brand,
    },
    sku: laptop.id,
    category: laptop.category,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${laptop.id}`,
      priceCurrency: 'IRR',
      price: laptop.price,
      availability: laptop.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'لپ‌تاپ‌لند',
      },
    },
    aggregateRating:
      laptop.reviews > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: laptop.rating,
            reviewCount: laptop.reviews,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        aria-label="مسیر صفحه"
      >
        <Link href="/" className="hover:text-foreground">
          خانه
        </Link>
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        <Link href="/products" className="hover:text-foreground">
          محصولات
        </Link>
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        <Link
          href={`/products?cat=${encodeURIComponent(laptop.category)}`}
          className="hover:text-foreground"
        >
          {laptop.category}
        </Link>
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        <span className="text-foreground line-clamp-1">{laptop.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
          <Image
            src={laptop.image || '/placeholder.svg'}
            alt={`${laptop.name} — ${laptop.brand} ${laptop.category}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
          {laptop.badge && (
            <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
              {laptop.badge}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="text-sm text-muted-foreground">
            {laptop.brand} · {laptop.category}
          </span>
          <h1 className="mt-1 text-3xl font-bold text-balance">{laptop.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-primary text-primary" />
              {laptop.rating.toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-muted-foreground">
              ({laptop.reviews.toLocaleString('fa-IR')} دیدگاه)
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span
              className={
                laptop.inStock
                  ? 'text-sm font-medium text-primary'
                  : 'text-sm font-medium text-muted-foreground'
              }
            >
              {laptop.inStock ? 'موجود در انبار' : 'ناموجود'}
            </span>
          </div>

          <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
            {laptop.description}
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {laptop.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="flex items-end gap-3">
              {laptop.oldPrice && (
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(laptop.oldPrice)}
                </span>
              )}
              <span className="text-3xl font-extrabold">
                {formatPrice(laptop.price)}
              </span>
              <span className="mb-1 text-sm text-muted-foreground">تومان</span>
            </div>
            <div className="mt-5">
              <AddToCart laptop={laptop} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Truck className="size-4" />
                ارسال سریع به سراسر کشور
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4" />
                ۱۸ ماه گارانتی رسمی
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-12">
        <h2 className="text-xl font-bold">مشخصات فنی</h2>
        <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 bg-card px-5 py-4"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <s.icon className="size-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-medium">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-bold">
          نظرات کاربران ({laptop.reviews.toLocaleString('fa-IR')})
        </h2>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ReviewForm laptopId={laptop.id} />
          </div>
          <div className="lg:col-span-3">
            <ReviewList laptopId={laptop.id} initialReviews={reviews} />
          </div>
        </div>
      </section>

      {/* Related / Similar products */}
      {suggestions.length > 0 && (
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">محصولات مشابه</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                پیشنهاد بر اساس دسته‌بندی، برند و محدوده قیمت
              </p>
            </div>
            <Link
              href={`/products?cat=${encodeURIComponent(laptop.category)}`}
              className="hidden items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 sm:flex"
            >
              مشاهده همه {laptop.category}
              <ArrowLeft className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {suggestions.map((l) => (
              <ProductCard key={l.id} laptop={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
