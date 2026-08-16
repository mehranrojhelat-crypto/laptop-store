import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock, Tag, BookOpen, ShoppingCart } from 'lucide-react'
import { getAllArticles, getArticle } from '@/lib/articles'
import { Button } from '@/components/ui/button'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'مقاله یافت نشد' }
  return {
    title: `${article.title} | لپ‌تاپ‌لند`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const others = getAllArticles().filter((a) => a.slug !== slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowRight className="size-4" />
        بازگشت به وبلاگ
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {article.readTime}
          </span>
          <span>{article.date}</span>
        </div>
        <h1 className="text-3xl font-black leading-snug sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          {article.excerpt}
        </p>
      </header>

      <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="space-y-5 text-sm leading-8 text-foreground sm:text-[15px]">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
            >
              <Tag className="size-3" />
              {tag}
            </span>
          ))}
        </div>
      </article>

      {article.relatedProductId && (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">محصول مرتبط</p>
            <p className="mt-1 text-lg font-bold">{article.relatedProductName}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              مشاهده مشخصات، قیمت و خرید از فروشگاه
            </p>
          </div>
          <Button asChild className="rounded-xl">
            <Link href={`/products/${article.relatedProductId}`} className="gap-2">
              <ShoppingCart className="size-4" />
              مشاهده محصول
            </Link>
          </Button>
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-primary px-6 py-8 text-center text-primary-foreground">
        <h2 className="text-xl font-bold">آماده انتخاب لپ‌تاپ هستی؟</h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-90">
          محصولات گیمینگ، اولترابوک و دانشجویی را در فروشگاه ببین.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/blog">مقالات بیشتر</Link>
          </Button>
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <BookOpen className="size-5 text-primary" />
            مقالات مرتبط
          </h2>
          <div className="grid gap-3">
            {others.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-secondary/40"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">{post.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {post.category} · {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}