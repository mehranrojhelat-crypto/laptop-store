import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
} from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-bold">
              پنل ادمین
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link
                href="/admin"
                className="flex items-center gap-1 hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                داشبورد
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-1 hover:text-primary"
              >
                <Package className="h-4 w-4" />
                محصولات
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1 hover:text-primary"
              >
                <ShoppingBag className="h-4 w-4" />
                سفارش‌ها
              </Link>
            </nav>
          </div>
          <form action="/api/admin/logout" method="POST">
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="ml-1 h-4 w-4" />
              خروج
            </Button>
          </form>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">{children}</main>
    </div>
  )
}
