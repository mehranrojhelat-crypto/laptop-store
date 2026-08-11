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
  GraduationCap,
  Home,
  Info,
  Phone,
  Package,
} from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useAuth } from '@/components/auth-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const categories = [
  { label: 'همه محصولات', href: '/products', icon: Package },
  { label: 'گیمینگ', href: '/products?cat=گیمینگ', icon: Gamepad2 },
  { label: 'اولترابوک', href: '/products?cat=اولترابوک', icon: Sparkles },
  { label: 'اداری', href: '/products?cat=اداری', icon: Briefcase },
  { label: 'مهندسی', href: '/products?cat=مهندسی', icon: Cpu },
  { label: 'دانشجویی', href: '/products?cat=دانشجویی', icon: GraduationCap },
]

const pages = [
  { label: 'صفحه اصلی', href: '/', icon: Home },
  { label: 'درباره ما', href: '/about', icon: Info },
  { label: 'تماس با ما', href: '/contact', icon: Phone },
]

export function SiteHeader() {
  const { count } = useCart()
  const { user, ready } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  // اسکرول هدر
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // بستن با تغییر صفحه
  useEffect(() => {
    setDrawerOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // قفل اسکرول بدن وقتی Drawer باز است + بستن با Escape
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setSearchOpen(false)
    setDrawerOpen(false)
  }

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-border/80 bg-background/95 shadow-lg shadow-black/5 backdrop-blur-xl'
            : 'border-border/40 bg-background/80 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-3 px-4 sm:px-6">
          {/* لوگو */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
              <Laptop className="size-5.5" />
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
          <nav className="mr-2 hidden items-center gap-0.5 lg:flex">
            {categories.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* جستجوی دسکتاپ */}
          <form
            onSubmit={handleSearch}
            className="relative hidden w-full max-w-[220px] md:block lg:max-w-[260px]"
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
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-xl md:hidden"
              aria-label="جستجو"
              onClick={() => {
                setSearchOpen((v) => !v)
                setDrawerOpen(false)
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
                className="hidden rounded-xl sm:inline-flex"
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

            {/* دکمه باز کردن Drawer */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-xl lg:hidden"
              aria-label="منو"
              aria-expanded={drawerOpen}
              onClick={() => {
                setDrawerOpen(true)
                setSearchOpen(false)
              }}
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>

        {/* جستجوی موبایل */}
        <div
          className={cn(
            'border-t border-border/60 transition-all duration-300 md:hidden',
            searchOpen
              ? 'max-h-28 opacity-100'
              : 'max-h-0 overflow-hidden border-t-0 opacity-0',
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
      </header>

      {/* ========== Drawer موبایل از کنار (راست) ========== */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
      />

      {/* پنل Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[70] flex w-[min(100vw-3rem,20rem)] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="منوی سایت"
      >
        {/* هدر Drawer */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Link href="/" onClick={closeDrawer} className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Laptop className="size-4.5" />
            </span>
            <span className="text-base font-black">
              لپ‌تاپ<span className="text-primary">‌لند</span>
            </span>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={closeDrawer}
            aria-label="بستن منو"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* محتوای اسکرول‌پذیر */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* صفحات اصلی */}
          <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            صفحات
          </p>
          <nav className="mb-5 space-y-1">
            {pages.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-secondary',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-xl',
                      active ? 'bg-primary/15 text-primary' : 'bg-secondary text-primary',
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mx-3 mb-5 h-px bg-border" />

          {/* دسته‌بندی‌ها */}
          <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            دسته‌بندی‌ها
          </p>
          <nav className="mb-5 space-y-1">
            {categories.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-4" />
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mx-3 mb-5 h-px bg-border" />

          {/* حساب و سبد */}
          <nav className="space-y-1">
            <Link
              href={user ? '/profile' : '/login'}
              onClick={closeDrawer}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                {user ? <User className="size-4" /> : <LogIn className="size-4" />}
              </span>
              {user ? 'حساب کاربری' : 'ورود / ثبت‌نام'}
            </Link>

            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span className="relative flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                <ShoppingCart className="size-4" />
                {count > 0 && (
                  <span className="absolute -left-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {count > 99 ? '۹۹+' : count.toLocaleString('fa-IR')}
                  </span>
                )}
              </span>
              سبد خرید
            </Link>
          </nav>
        </div>
      </aside>
    </>
  )
}
