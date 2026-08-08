'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const { user, ready, logout } = useAuth()
  const router = useRouter()

  if (!ready) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center text-muted-foreground">
        در حال بارگذاری...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">وارد حساب نشده‌اید</h1>
        <p className="mt-2 text-muted-foreground">
          برای مشاهده پروفایل ابتدا وارد شوید.
        </p>
        <Button asChild className="mt-6">
          <Link href="/login">ورود</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold">حساب کاربری</h1>
      <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-5">
        <div>
          <p className="text-xs text-muted-foreground">نام</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">ایمیل</p>
          <p className="font-medium" dir="ltr">
            {user.email}
          </p>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          onClick={() => {
            logout()
            router.push('/')
          }}
        >
          خروج
        </Button>
        <Button asChild variant="secondary">
          <Link href="/products">ادامه خرید</Link>
        </Button>
      </div>
    </div>
  )
}
