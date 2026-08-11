import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, CheckCircle, XCircle, Tag } from 'lucide-react'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'

export default async function AdminDashboard() {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) redirect('/admin/login')

  const total = await prisma.laptop.count()
  const inStock = await prisma.laptop.count({ where: { inStock: true } })
  const outOfStock = total - inStock
  const onSale = await prisma.laptop.count({ where: { oldPrice: { not: null } } })

  const stats = [
    { title: 'کل محصولات', value: total, icon: Package },
    { title: 'موجود', value: inStock, icon: CheckCircle },
    { title: 'ناموجود', value: outOfStock, icon: XCircle },
    { title: 'تخفیف‌دار', value: onSale, icon: Tag },
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
              <div className="text-2xl font-bold">{stat.value.toLocaleString('fa-IR')}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
