'use client'
import { User } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Laptop, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
const nav = [
  { label: 'همه محصولات', href: '/products' },
  { label: 'گیمینگ', href: '/products?cat=گیمینگ' },
  { label: 'اولترابوک', href: '/products?cat=اولترابوک' },
  { label: 'اداری', href: '/products?cat=اداری' },
  { label: 'مهندسی', href: '/products?cat=مهندسی' },
]

export function SiteHeader() {
  const { user, ready } = useAuth()
  const { count } = useCart()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/products')
    }
    setSearchOpen(false)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Laptop className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">لپ‌تاپ‌لند</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

       <div className="flex items-center gap-1">
        <ThemeToggle />

        <Button
         variant="ghost"
         size="icon"
         aria-label="جستجو"
         onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="سبد خرید"
          >
            <Link href="/cart">
              <ShoppingCart className="size-5" />
              {count > 0 && (
                <span className="absolute -left-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {count.toLocaleString('fa-IR')}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {ready && (
  <Button asChild variant="ghost" size="icon" aria-label="حساب کاربری">
    <Link href={user ? '/profile' : '/login'}>
      <User className="size-5" />
    </Link>
  </Button>
)}


      {/* باکس جستجوی هدر */}
      {searchOpen && (
        <div className="border-t border-border px-4 py-3 sm:px-6">
          <form onSubmit={handleSearch} className="mx-auto flex max-w-7xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی لپ‌تاپ، برند، پردازنده..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10"
                autoFocus
              />
            </div>
            <Button type="submit">جستجو</Button>
          </form>
        </div>
      )}

      {/* منوی موبایل */}
      <div
        className={cn(
          'overflow-hidden border-t border-border lg:hidden',
          open ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
