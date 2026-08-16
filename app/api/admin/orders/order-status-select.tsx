'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const OPTIONS = [
  { value: 'PENDING', label: 'در انتظار' },
  { value: 'PAID', label: 'پرداخت‌شده' },
  { value: 'SHIPPED', label: 'ارسال‌شده' },
  { value: 'DELIVERED', label: 'تحویل‌شده' },
  { value: 'CANCELLED', label: 'لغوشده' },
]

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string
  status: string
}) {
  const router = useRouter()
  const [value, setValue] = useState(status)
  const [loading, setLoading] = useState(false)

  const onChange = async (next: string) => {
    setValue(next)
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      if (!res.ok) {
        setValue(status)
        alert('خطا در تغییر وضعیت')
      } else {
        router.refresh()
      }
    } catch {
      setValue(status)
      alert('خطای شبکه')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        value={value}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
