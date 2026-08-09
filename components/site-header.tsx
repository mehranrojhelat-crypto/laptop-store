'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Laptop,
  Menu,
  Search,
  ShoppingCart,
  User,
  LogIn,
  X,
  Gamepad2,
  Sparkles,
  Briefcase,
  Cpu,
} from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useAuth } from '@/components/auth-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'همه محصولات', href: '/products', icon: Laptop },
  { label: 'گیمینگ', href: '/products?cat=گیمینگ', icon: Gamepad2 },
  { label: 'اولترابوک', href: '/products?cat=اولترابوک', icon: Sparkles },
  { label: 'اداری', href: '/products?cat=اداری', icon: Briefcase },
  { label: 'مهندسی', href: '/products?cat=مهندسی', icon: Cpu },
]

export function SiteHeader() {
  const { count } = useCart()
  const { user, ready } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setSearchOpen(false)
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-border/80 bg-background/90 shadow-md shadow-black/5 backdrop-blur-xl'
          : 'border-border/40 bg-background/75 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* لوگو */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
            <Laptop className="size-5" />
          </span>
          <div className="leading-none">
            <p className="text-lg font-black tracking-tight">
              لپ‌تاپ<span className="text-primary">‌لند</span>
            </p>
            <p className="mt-1 hidden text-[10px] font-medium text-muted-foreground sm:block">
              فروشگاه تخصصی لپ‌تاپ
            </p>
          </div>
        </Link>

        {/* منوی دسکتاپ */}
        <nav className="mr-2 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* فاصله‌دهنده */}
        <div className="flex-1" />

        {/* جستجوی دسکتاپ */}
        <form
          onSubmit={handleSearch}
          className="relative hidden w-full max-w-[240px] md:block lg:max-w-[280px]"
        >
          <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="جستجوی لپ‌تاپ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-2xl border-border/70 bg-secondary/60 pr-10 text-sm shadow-none focus-visible:bg-background"
          />
        </form>

        {/* اکشن‌ها */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl md:hidden"
            aria-label="جستجو"
            onClick={() => {
              setSearchOpen((v) => !v)
              setOpen(false)
            }}
          >
            {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
          </Button>

          <ThemeToggle />

          {ready && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-xl"
              aria-label={user ? 'حساب کاربری' : 'ورود'}
            >
              <Link href={user ? '/profile' : '/login'}>
                {user ? <User className="size-5" /> : <LogIn className="size-5" />}
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-xl"
            aria-label="سبد خرید"
          >
            <Link href="/cart">
              <ShoppingCart className="size-5" />
              {count > 0 && (
                <span className="absolute -left-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow">
                  {count > 99 ? '۹۹+' : count.toLocaleString('fa-IR')}
                </span>
              )}
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl lg:hidden"
            aria-label="منو"
            onClick={() => {
              setOpen((v) => !v)
              setSearchOpen(false)
            }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* جستجوی موبایل */}
      <div
        className={cn(
          'border-t border-border/60 transition-all duration-300 md:hidden',
          searchOpen ? 'max-h-28 opacity-100' : 'max-h-0 overflow-hidden border-t-0 opacity-0',
        )}
      >
        <form onSubmit={handleSearch} className="flex gap-2 px-4 py-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="جستجوی لپ‌تاپ، برند، پردازنده..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 rounded-2xl pr-10"
              autoFocus={searchOpen}
            />
          </div>
          <Button type="submit" className="h-11 rounded-2xl px-5">
            جستجو
          </Button>
        </form>
      </div>

      {/* منوی موبایل */}
      <div
        className={cn(
          'border-t border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 overflow-hidden border-t-0 opacity-0',
        )}
      >
        <nav className="space-y-1 px-3 py-3">
          {nav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-4" />
                </span>
                {item.label}
              </Link>
            )
          })}

          <div className="my-2 h-px bg-border" />

          <Link
            href={user ? '/profile' : '/login'}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
              {user ? <User className="size-4" /> : <LogIn className="size-4" />}
            </span>
            {user ? `حساب من (${user.name})` : 'ورود / ثبت‌نام'}
          </Link>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
              <ShoppingCart className="size-4" />
            </span>
            سبد خرید
            {count > 0 && (
              <span className="mr-auto rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground">
                {count.toLocaleString('fa-IR')}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
