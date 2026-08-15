import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'
import { CartProvider } from '@/components/cart-provider'
import { CompareProvider } from '@/components/compare-provider'
import { ToastProvider } from '@/components/ui/toast'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CompareBar } from '@/components/compare-bar'
import ScrollToTop from '@/components/scroll-to-top'
import './globals.css'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
  display: 'swap',
  preload: true,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'لپ‌تاپ‌لند | فروشگاه تخصصی لپ‌تاپ',
    template: '%s | لپ‌تاپ‌لند',
  },
  description:
    'خرید آنلاین لپ‌تاپ گیمینگ، اولترابوک، اداری، مهندسی و دانشجویی با بهترین قیمت، گارانتی رسمی ۱۸ ماهه و ارسال سریع.',
  keywords: [
    'خرید لپ‌تاپ',
    'لپ‌تاپ گیمینگ',
    'اولترابوک',
    'لپ‌تاپ اداری',
    'لپ‌تاپ دانشجویی',
    'فروشگاه لپ‌تاپ',
    'لپ‌تاپ‌لند',
  ],
  authors: [{ name: 'لپ‌تاپ‌لند' }],
  creator: 'لپ‌تاپ‌لند',
  publisher: 'لپ‌تاپ‌لند',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteUrl,
    siteName: 'لپ‌تاپ‌لند',
    title: 'لپ‌تاپ‌لند | فروشگاه تخصصی لپ‌تاپ',
    description:
      'خرید آنلاین لپ‌تاپ گیمینگ، اولترابوک، اداری و مهندسی با بهترین قیمت و گارانتی رسمی.',
    images: [
      {
        url: '/laptops/hero-laptop.png',
        width: 1200,
        height: 630,
        alt: 'لپ‌تاپ‌لند — فروشگاه تخصصی لپ‌تاپ',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8823d' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body
        className="antialiased font-sans bg-background"
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <CompareProvider>
              <ToastProvider>
                <div className="flex min-h-screen flex-col">
                  <SiteHeader />
                  <main className="flex-1 pb-24">{children}</main>
                  <SiteFooter />
                </div>
                <CompareBar />
                <ScrollToTop />
              </ToastProvider>
            </CompareProvider>
          </CartProvider>
        </AuthProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
