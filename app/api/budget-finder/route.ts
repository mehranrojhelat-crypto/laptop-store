import { NextRequest, NextResponse } from 'next/server'
import { getLaptops, type Laptop } from '@/lib/products'

type Body = {
  maxBudget: number
  useCase: string
  priorities: string[]
}

function scoreLaptop(laptop: Laptop, body: Body): number {
  let score = 0

  // فیلتر بودجه
  if (laptop.price > body.maxBudget) return -1

  // تطبیق دسته‌بندی / کاربرد
  if (laptop.category === body.useCase) score += 40
  else if (
    (body.useCase === 'گیمینگ' && laptop.category === 'مهندسی') ||
    (body.useCase === 'مهندسی' && laptop.category === 'گیمینگ')
  ) {
    score += 20
  }

  // اولویت‌ها
  const priorities = body.priorities

  if (priorities.includes('light')) {
    // وزن تقریبی (هرچه عدد کوچک‌تر بهتر)
    const weightNum = parseFloat(laptop.weight) || 2.5
    if (weightNum <= 1.5) score += 15
    else if (weightNum <= 1.8) score += 10
    else if (weightNum <= 2.2) score += 5
  }

  if (priorities.includes('battery')) {
    // اگر battery شامل عدد ساعت باشد
    const batteryMatch = laptop.battery.match(/(\d+)/)
    const hours = batteryMatch ? parseInt(batteryMatch[1]) : 0
    if (hours >= 10) score += 15
    else if (hours >= 8) score += 10
    else if (hours >= 6) score += 5
  }

  if (priorities.includes('screen')) {
    if (laptop.screen >= 16) score += 12
    else if (laptop.screen >= 15) score += 8
  }

  if (priorities.includes('gpu')) {
    const gpu = laptop.gpu.toLowerCase()
    if (gpu.includes('rtx') || gpu.includes('radeon')) score += 18
    else if (gpu.includes('gtx') || gpu.includes('mx')) score += 8
  }

  if (priorities.includes('performance')) {
    if (laptop.ram >= 32) score += 12
    else if (laptop.ram >= 16) score += 8
    if (laptop.storage >= 1000) score += 5
  }

  if (priorities.includes('value')) {
    // هرچه قیمت پایین‌تر نسبت به مشخصات بهتر
    const valueScore = Math.max(0, 20 - (laptop.price / body.maxBudget) * 15)
    score += valueScore
  }

  // امتیاز پایه از رتبه‌بندی و موجودی
  score += laptop.rating * 2
  if (laptop.inStock) score += 5

  return score
}

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json()

    if (!body.maxBudget || !body.useCase) {
      return NextResponse.json({ error: 'اطلاعات ناقص است' }, { status: 400 })
    }

    const allLaptops = await getLaptops()

    const scored = allLaptops
      .map((laptop) => ({
        laptop,
        score: scoreLaptop(laptop, body),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    return NextResponse.json({
      laptops: scored.map((s) => s.laptop),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 })
  }
}
