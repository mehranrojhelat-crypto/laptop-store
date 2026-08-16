import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/admin-auth'

const ALLOWED = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await req.json()
    const status = body?.status as string

    if (!ALLOWED.includes(status as (typeof ALLOWED)[number])) {
      return NextResponse.json(
        { ok: false, message: 'وضعیت نامعتبر است.' },
        { status: 400 },
      )
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ ok: true, order })
  } catch (error) {
    console.error('PATCH order status error:', error)
    return NextResponse.json(
      { ok: false, message: 'خطا در به‌روزرسانی وضعیت' },
      { status: 500 },
    )
  }
}
