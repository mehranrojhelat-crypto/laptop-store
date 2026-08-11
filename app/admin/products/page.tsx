import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { formatPrice } from '@/lib/products'
import { deleteLaptop } from './actions'

export default async function AdminProductsPage() {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) redirect('/admin/login')

  const products = await prisma.laptop.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">محصولات</h1>
        <Button asChild>
          <Link href="/admin/products/new">افزودن محصول</Link>
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-right">نام</th>
              <th className="p-3 text-right">برند</th>
              <th className="p-3 text-right">دسته‌بندی</th>
              <th className="p-3 text-right">قیمت</th>
              <th className="p-3 text-right">موجودی</th>
              <th className="p-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  هنوز محصولی ثبت نشده
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{formatPrice(p.price)} تومان</td>
                  <td className="p-3">
                    {p.inStock ? (
                      <span className="text-green-600">موجود</span>
                    ) : (
                      <span className="text-red-600">ناموجود</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/products/${p.id}/edit`}>ویرایش</Link>
                      </Button>
                      <form action={deleteLaptop.bind(null, p.id)}>
                        <Button type="submit" size="sm" variant="destructive">
                          حذف
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
