import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SHIPPING = 500_000

type IncomingItem = {
  id: string
  quantity: number
}

type Body = {
  firstName: string
  lastName: string
  phone: string
  city: string
  address: string
  postalCode: string
  paymentMethod: 'online' | 'cod'
  note?: string
  items: IncomingItem[]
  userId?: string | null
  userEmail?: string | null
  userName?: string | null
}

function generateTrackingCode() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return n.toString()
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body

    const {
      firstName,
      lastName,
      phone,
      city,
      address,
      postalCode,
      paymentMethod,
      note,
      items,
      userId,
      userEmail,
      userName,
    } = body

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !phone?.trim() ||
      !city?.trim() ||
      !address?.trim() ||
      !postalCode?.trim()
    ) {
      return NextResponse.json(
        { ok: false, message: 'لطفاً همه فیلدهای ضروری را پر کنید.' },
        { status: 400 },
      )
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { ok: false, message: 'سبد خرید خالی است.' },
        { status: 400 },
      )
    }

    if (paymentMethod !== 'online' && paymentMethod !== 'cod') {
      return NextResponse.json(
        { ok: false, message: 'روش پرداخت نامعتبر است.' },
        { status: 400 },
      )
    }

    const laptopIds = items.map((i) => i.id)
    const laptops = await prisma.laptop.findMany({
      where: { id: { in: laptopIds } },
    })

    if (laptops.length !== laptopIds.length) {
      return NextResponse.json(
        { ok: false, message: 'یکی از محصولات سبد یافت نشد.' },
        { status: 400 },
      )
    }

    const laptopMap = new Map(laptops.map((l) => [l.id, l]))

    let subtotal = 0
    const orderItemsData: {
      laptopId: string
      name: string
      brand: string
      image: string
      price: number
      quantity: number
    }[] = []

    for (const item of items) {
      const qty = Math.max(1, Math.min(Number(item.quantity) || 1, 10))
      const laptop = laptopMap.get(item.id)

      if (!laptop) {
        return NextResponse.json(
          { ok: false, message: 'محصول نامعتبر در سبد وجود دارد.' },
          { status: 400 },
        )
      }

      if (!laptop.inStock) {
        return NextResponse.json(
          {
            ok: false,
            message: `محصول «${laptop.name}» موجود نیست.`,
          },
          { status: 400 },
        )
      }

      subtotal += laptop.price * qty

      orderItemsData.push({
        laptopId: laptop.id,
        name: laptop.name,
        brand: laptop.brand,
        image: laptop.image,
        price: laptop.price,
        quantity: qty,
      })
    }

    const shipping = SHIPPING
    const total = subtotal + shipping

    // تولید کد پیگیری یکتا
    let trackingCode = generateTrackingCode()
    for (let i = 0; i < 5; i++) {
      const exists = await prisma.order.findUnique({
        where: { trackingCode },
      })
      if (!exists) break
      trackingCode = generateTrackingCode()
    }

    const status = paymentMethod === 'online' ? 'PAID' : 'PENDING'

    const order = await prisma.order.create({
      data: {
        trackingCode,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim(),
        postalCode: postalCode.trim(),
        paymentMethod,
        status,
        subtotal,
        shipping,
        total,
        userId: userId || null,
        userEmail: userEmail || null,
        userName: userName || null,
        note: note?.trim() || null,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json({
      ok: true,
      order: {
        id: order.id,
        trackingCode: order.trackingCode,
        total: order.total,
        status: order.status,
        paymentMethod: order.paymentMethod,
      },
    })
  } catch (error) {
    console.error('POST /api/orders error:', error)
    return NextResponse.json(
      { ok: false, message: 'خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.' },
      { status: 500 },
    )
  }
}
