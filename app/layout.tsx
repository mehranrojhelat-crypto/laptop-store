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
})

export const metadata: Metadata = {
  title: 'لپ‌تاپ‌لند | فروشگاه تخصصی لپ‌تاپ',
  description:
    'خرید آنلاین لپ‌تاپ گیمینگ، اولترابوک، لپ‌تاپ اداری و مهندسی با بهترین قیمت و گارانتی رسمی.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#e8823d',
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
