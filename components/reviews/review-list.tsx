'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns-jalali' // اگر نداری از toLocaleDateString استفاده کن
import { Pencil } from 'lucide-react'
import { StarRating } from './star-rating'
import { ReviewForm } from './review-form'
import type { ReviewData } from '@/lib/reviews'
import { Button } from '@/components/ui/button'

type Props = {
  laptopId: string
  initialReviews: ReviewData[]
}

export function ReviewList({ laptopId, initialReviews }: Props) {
  const [reviews, setReviews] = useState(initialReviews)
  const [editingId, setEditingId] = useState<string | null>(null)

  // بعد از ثبت/ویرایش صفحه رو رفرش می‌کنیم (به خاطر revalidatePath)
  // ولی برای UX بهتر می‌تونیم state رو آپدیت کنیم

  function canEdit(reviewId: string) {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem(`review-token-${reviewId}`)
  }

  function getToken(reviewId: string) {
    return localStorage.getItem(`review-token-${reviewId}`) ?? ''
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          هنوز نظری ثبت نشده. اولین نفر باشید!
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            {editingId === review.id ? (
              <ReviewForm
                laptopId={laptopId}
                editData={{
                  reviewId: review.id,
                  editToken: getToken(review.id),
                  authorName: review.authorName,
                  rating: review.rating,
                  comment: review.comment,
                }}
                onSuccess={() => {
                  setEditingId(null)
                  // صفحه را رفرش می‌کنیم تا داده جدید بیاد
                  window.location.reload()
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{review.authorName}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <StarRating value={review.rating} readonly size="sm" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                  </div>

                  {canEdit(review.id) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(review.id)}
                      className="gap-1 text-muted-foreground"
                    >
                      <Pencil className="size-3.5" />
                      ویرایش
                    </Button>
                  )}
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/90">
                  {review.comment}
                </p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}
