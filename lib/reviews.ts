'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

export type ReviewData = {
  id: string
  authorName: string
  rating: number
  comment: string
  createdAt: Date
  updatedAt: Date
  editToken: string
}

export async function getReviews(laptopId: string): Promise<ReviewData[]> {
  const data = await prisma.review.findMany({
    where: { laptopId },
    orderBy: { createdAt: 'desc' },
  })
  return data
}

async function recalculateRating(laptopId: string) {
  const reviews = await prisma.review.findMany({ where: { laptopId } })
  const count = reviews.length
  const avg =
    count > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
      : 0

  await prisma.laptop.update({
    where: { id: laptopId },
    data: { rating: avg, reviews: count },
  })
}

export async function createReview(data: {
  laptopId: string
  authorName: string
  rating: number
  comment: string
}) {
  if (!data.authorName.trim() || data.comment.trim().length < 5) {
    return { ok: false, message: 'نام و نظر باید حداقل ۵ کاراکتر باشد' }
  }
  if (data.rating < 1 || data.rating > 5) {
    return { ok: false, message: 'امتیاز نامعتبر است' }
  }

  const editToken = randomUUID()

  const review = await prisma.review.create({
    data: {
      laptopId: data.laptopId,
      authorName: data.authorName.trim(),
      rating: data.rating,
      comment: data.comment.trim(),
      editToken,
    },
  })

  await recalculateRating(data.laptopId)
  revalidatePath(`/products/${data.laptopId}`)

  return { ok: true, editToken, reviewId: review.id }
}

export async function updateReview(data: {
  reviewId: string
  editToken: string
  authorName: string
  rating: number
  comment: string
}) {
  const existing = await prisma.review.findUnique({
    where: { id: data.reviewId },
  })

  if (!existing || existing.editToken !== data.editToken) {
    return { ok: false, message: 'اجازه ویرایش ندارید' }
  }

  if (!data.authorName.trim() || data.comment.trim().length < 5) {
    return { ok: false, message: 'نام و نظر باید حداقل ۵ کاراکتر باشد' }
  }

  await prisma.review.update({
    where: { id: data.reviewId },
    data: {
      authorName: data.authorName.trim(),
      rating: data.rating,
      comment: data.comment.trim(),
    },
  })

  await recalculateRating(existing.laptopId)
  revalidatePath(`/products/${existing.laptopId}`)

  return { ok: true }
}
