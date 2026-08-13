'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
  Loader2,
} from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useAuth } from '@/components/auth-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/products'

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

type SearchResult = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export function SiteHeader() {
  const { count } = useCart()
  const { user, ready } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  // جستجوی زنده
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null)

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
    setShowSuggestions(false)
    setQuery('')
    setSuggestions([])
  }, [pathname])

  // قفل اسکرول بدن وقتی Drawer باز است + بستن با Escape
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
        setShowSuggestions(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  // بستن پیشنهادات با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        searchContainerRef.current?.contains(target) ||
        mobileSearchContainerRef.current?.contains(target)
      ) {
        return
      }
      setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounce جستجو
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const q = query.trim()
    if (q.length < 2) {
      setSuggestions([])
      setLoadingSuggestions(false)
      setShowSuggestions(false)
      return
    }

    setLoadingSuggestions(true)
    setShowSuggestions(true)

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        if (res.ok) {
          const data = await res.json()
          setSuggestions(data)
        } else {
          setSuggestions([])
        }
      } catch {
        setSuggestions([])
      } finally {
        setLoadingSuggestions(false)
      }
    }, 280)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setSearchOpen(false)
    setDrawerOpen(false)
    setShowSuggestions(false)
  }

  const goToProduct = (id: string) => {
    router.push(`/products/${id}`)
    setShowSuggestions(false)
    setSearchOpen(false)
    setDrawerOpen(false)
    setQuery('')
  }

  const closeDrawer = () => setDrawerOpen(false)

  // کامپوننت لیست پیشنهادات
  const SuggestionsList = ({ className }: { className?: string }) => {
    if (!showSuggestions || query.trim().length < 2) return null

    return (
      <div
        className={cn(
          'absolute z-[80] mt-2 w-full overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/10',
          className,
        )}
      >
        {loadingSuggestions ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            در حال جستجو...
          </div>
        ) : suggestions.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            نتیجه‌ای یافت نشد
          </div>
        ) : (
          <ul className="max-h-[min(70vh,420px)] overflow-y-auto py-2">
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goToProduct(item.id)}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-right transition-colors hover:bg-secondary"
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold leading-snug">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.brand} · {item.category}
                    </p>
                  </div>
                  <div className="shrink-0 text-left">
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(item.price)}
                    </p>
                    {!item.inStock && (
                      <p className="text-[10px] text-destructive">ناموجود</p>
                    )}
                  </div>
                </button>
              </li>
            ))}
            <li className="border-t border-border">
              <button
                type="button"
                onClick={handleSearch}
                className="flex w-full items-center justify-center gap-2 px-3 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                <Search className="size-4" />
                مشاهده همه نتایج برای «{query.trim()}»
              </button>
            </li>
          </ul>
        )}
      </div>
    )
  }

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
          <div
            ref={searchContainerRef}
            className="relative hidden w-full max-w-[220px] md:block lg:max-w-[280px]"
          >
            <form onSubmit={handleSearch}>
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی لپ‌تاپ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (query.trim().length >= 2) setShowSuggestions(true)
                }}
                className="h-10 rounded-2xl border-border/70 bg-secondary/60 pr-10 text-sm shadow-none focus-visible:bg-background"
                autoComplete="off"
              />
            </form>
            <SuggestionsList />
          </div>

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
              ? 'max-h-[28rem] opacity-100'
              : 'max-h-0 overflow-hidden border-t-0 opacity-0',
          )}
        >
          <div ref={mobileSearchContainerRef} className="relative px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="جستجوی لپ‌تاپ، برند، پردازنده..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => {
                    if (query.trim().length >= 2) setShowSuggestions(true)
                  }}
                  className="h-11 rounded-2xl pr-10"
                  autoFocus={searchOpen}
                  autoComplete="off"
                />
              </div>
              <Button type="submit" className="h-11 rounded-2xl px-5">
                جستجو
              </Button>
            </form>
            <SuggestionsList className="left-0 right-0" />
          </div>
        </div>
      </header>

      {/* ========== Drawer موبایل از کنار (راست) ========== */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
      />

      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-[70] flex w-[min(100vw-3rem,20rem)] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="منوی سایت"
      >
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

        <div className="flex-1 overflow-y-auto px-3 py-4">
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
                  <span className="absolute -left-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
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
