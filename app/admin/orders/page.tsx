import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { formatPrice } from '@/lib/products'
import { OrderStatusSelect } from './order-status-select'

const statusLabel: Record<string, string> = {
  PENDING: 'در انتظار',
  PAID: 'پرداخت‌شده',
  SHIPPED: 'ارسال‌شده',
  DELIVERED: 'تحویل‌شده',
  CANCELLED: 'لغوشده',
}

const paymentLabel: Record<string, string> = {
  online: 'آنلاین',
  cod: 'در محل',
}

export default async function AdminOrdersPage() {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) redirect('/admin/login')

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">سفارش‌ها</h1>
        <p className="text-sm text-muted-foreground">
          {orders.length.toLocaleString('fa-IR')} سفارش
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          هنوز سفارشی ثبت نشده است.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-bold">
                    کد پیگیری:{' '}
                    <span dir="ltr" className="font-mono">
                      {order.trackingCode}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.firstName} {order.lastName} · {order.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.city} — {order.address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString('fa-IR')} · پرداخت:{' '}
                    {paymentLabel[order.paymentMethod] || order.paymentMethod}
                  </p>
                  {order.userEmail && (
                    <p className="text-xs text-muted-foreground" dir="ltr">
                      کاربر: {order.userName} ({order.userEmail})
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-lg font-bold">
                    {formatPrice(order.total)} تومان
                  </p>
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                  <span className="text-xs text-muted-foreground">
                    وضعیت فعلی: {statusLabel[order.status] || order.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-sm font-medium">اقلام سفارش</p>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-secondary">
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${item.laptopId}`}
                          className="font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {item.brand} · {item.quantity.toLocaleString('fa-IR')}{' '}
                          عدد × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
