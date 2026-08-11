import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Package, LogOut } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuth = await isAdminAuthenticated()

  // صفحه لاگین ادمین جداگانه هست، اینجا فقط چک می‌کنیم
  // (صفحه لاگین رو جدا می‌سازیم)

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-lg">
              پنل ادمین
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/admin" className="flex items-center gap-1 hover:text-primary">
                <LayoutDashboard className="h-4 w-4" />
                داشبورد
              </Link>
              <Link href="/admin/products" className="flex items-center gap-1 hover:text-primary">
                <Package className="h-4 w-4" />
                محصولات
              </Link>
            </nav>
          </div>
          <form action="/api/admin/logout" method="POST">
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="h-4 w-4 ml-1" />
              خروج
            </Button>
          </form>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">{children}</main>
    </div>
  )
}
