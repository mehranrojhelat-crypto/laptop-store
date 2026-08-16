import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getAllArticles } from '@/lib/articles'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'وبلاگ و مقالات | لپ‌تاپ‌لند',
  description:
    'بررسی و راهنمای خرید لپ‌تاپ‌های گیمینگ، اولترابوک و دانشجویی فروشگاه لپ‌تاپ‌لند.',
}

export default function BlogPage() {
  const posts = getAllArticles()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen className="size-7" />
        </div>
        <h1 className="text-3xl font-bold">وبلاگ لپ‌تاپ‌لند</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          بررسی محصولات واقعی فروشگاه، راهنمای خرید و نکات کاربردی.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] bg-secondary">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
                <span>{post.date}</span>
              </div>

              <h2 className="text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-[11px] text-muted-foreground"
                  >
                    <Tag className="size-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <Link href={`/blog/${post.slug}`} className="gap-2">
                    ادامه مطلب
                    <ArrowLeft className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
