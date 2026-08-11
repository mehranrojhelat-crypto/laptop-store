import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { brands, categories } from '@/lib/products'
import { updateLaptop } from '../../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) redirect('/admin/login')

  const { id } = await params
  const product = await prisma.laptop.findUnique({ where: { id } })
  if (!product) notFound()

  const highlights = JSON.parse(product.highlights || '[]').join('\n')

  return (
    <div className="max-w-3xl space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold">ویرایش محصول</h1>

      <form action={updateLaptop.bind(null, id)} className="space-y-5 rounded-xl border p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">نام محصول *</Label>
            <Input id="name" name="name" defaultValue={product.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">برند *</Label>
            <select
              id="brand"
              name="brand"
              required
              defaultValue={product.brand}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">دسته‌بندی *</Label>
            <select
              id="category"
              name="category"
              required
              defaultValue={product.category}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">آدرس تصویر *</Label>
            <Input id="image" name="image" defaultValue={product.image} required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">قیمت (تومان) *</Label>
            <Input id="price" name="price" type="number" defaultValue={product.price} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="oldPrice">قیمت قبلی (اختیاری)</Label>
            <Input
              id="oldPrice"
              name="oldPrice"
              type="number"
              defaultValue={product.oldPrice ?? undefined}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cpu">پردازنده *</Label>
            <Input id="cpu" name="cpu" defaultValue={product.cpu} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gpu">کارت گرافیک *</Label>
            <Input id="gpu" name="gpu" defaultValue={product.gpu} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ram">رم (گیگ) *</Label>
            <Input id="ram" name="ram" type="number" defaultValue={product.ram} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storage">حافظه (گیگ) *</Label>
            <Input id="storage" name="storage" type="number" defaultValue={product.storage} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="screen">صفحه نمایش (اینچ) *</Label>
            <Input
              id="screen"
              name="screen"
              type="number"
              step="0.1"
              defaultValue={product.screen}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="os">سیستم‌عامل *</Label>
            <Input id="os" name="os" defaultValue={product.os} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">وزن *</Label>
            <Input id="weight" name="weight" defaultValue={product.weight} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="battery">باتری *</Label>
            <Input id="battery" name="battery" defaultValue={product.battery} required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="rating">امتیاز</Label>
            <Input id="rating" name="rating" type="number" step="0.1" defaultValue={product.rating} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reviews">تعداد نظرات</Label>
            <Input id="reviews" name="reviews" type="number" defaultValue={product.reviews} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="badge">برچسب</Label>
            <Input id="badge" name="badge" defaultValue={product.badge ?? ''} />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              defaultChecked={product.inStock}
              className="h-4 w-4"
            />
            <Label htmlFor="inStock">موجود در انبار</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">توضیحات *</Label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={product.description}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="highlights">ویژگی‌های برجسته (هر خط یک مورد)</Label>
          <textarea
            id="highlights"
            name="highlights"
            rows={4}
            defaultValue={highlights}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">ذخیره تغییرات</Button>
          <Button type="button" variant="outline" asChild>
            <a href="/admin/products">انصراف</a>
          </Button>
        </div>
      </form>
    </div>
  )
}
