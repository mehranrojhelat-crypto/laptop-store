import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Package,
  CheckCircle,
  XCircle,
  Tag,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { formatPrice } from '@/lib/products'

export default async function AdminDashboard() {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) redirect('/admin/login')

  const total = await prisma.laptop.count()
  const inStock = await prisma.laptop.count({ where: { inStock: true } })
  const outOfStock = total - inStock
  const onSale = await prisma.laptop.count({
    where: { oldPrice: { not: null } },
  })

  const ordersCount = await prisma.order.count()
  const pendingOrders = await prisma.order.count({
    where: { status: 'PENDING' },
  })
  const shippedOrders = await prisma.order.count({
    where: { status: 'SHIPPED' },
  })
  const revenue = await prisma.order.aggregate({
    _sum: { total: true },
    where: {
      status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
    },
  })

  const stats = [
    { title: 'کل محصولات', value: total, icon: Package },
    { title: 'موجود', value: inStock, icon: CheckCircle },
    { title: 'ناموجود', value: outOfStock, icon: XCircle },
    { title: 'تخفیف‌دار', value: onSale, icon: Tag },
    { title: 'کل سفارش‌ها', value: ordersCount, icon: ShoppingBag },
    { title: 'در انتظار', value: pendingOrders, icon: ShoppingBag },
    { title: 'ارسال‌شده', value: shippedOrders, icon: Truck },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">داشبورد</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value.toLocaleString('fa-IR')}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">مجموع فروش تأییدشده</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {formatPrice(revenue._sum.total || 0)} تومان
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            فقط سفارش‌های پرداخت‌شده / ارسال‌شده / تحویل‌شده
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
