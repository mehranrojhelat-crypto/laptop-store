'use client'

import { useState } from 'react'
import { StarRating } from './star-rating'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createReview, updateReview } from '@/lib/reviews'

type Props = {
  laptopId: string
  // اگر در حال ویرایش باشیم
  editData?: {
    reviewId: string
    editToken: string
    authorName: string
    rating: number
    comment: string
  }
  onSuccess?: () => void
  onCancel?: () => void
}

export function ReviewForm({ laptopId, editData, onSuccess, onCancel }: Props) {
  const [name, setName] = useState(editData?.authorName ?? '')
  const [rating, setRating] = useState(editData?.rating ?? 5)
  const [comment, setComment] = useState(editData?.comment ?? '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [editToken, setEditToken] = useState<string | null>(
    editData?.editToken ?? null,
  )

  const isEdit = !!editData

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (isEdit && editData) {
        const res = await updateReview({
          reviewId: editData.reviewId,
          editToken: editData.editToken,
          authorName: name,
          rating,
          comment,
        })
        if (!res.ok) {
          setMessage(res.message ?? 'خطا در ویرایش')
          return
        }
        setMessage('نظر با موفقیت ویرایش شد')
        onSuccess?.()
      } else {
        const res = await createReview({
          laptopId,
          authorName: name,
          rating,
          comment,
        })
        if (!res.ok) {
          setMessage(res.message ?? 'خطا در ثبت نظر')
          return
        }
        // توکن را در localStorage نگه می‌داریم تا بعداً بتونه ویرایش کنه
        if (res.editToken && res.reviewId) {
          const key = `review-token-${res.reviewId}`
          localStorage.setItem(key, res.editToken)
          setEditToken(res.editToken)
        }
        setMessage('نظر شما با موفقیت ثبت شد')
        setName('')
        setComment('')
        setRating(5)
        onSuccess?.()
      }
    } catch {
      setMessage('مشکلی پیش آمد. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-bold">
        {isEdit ? 'ویرایش نظر' : 'ثبت نظر جدید'}
      </h3>

      <div>
        <label className="mb-1.5 block text-sm font-medium">نام شما</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً علی رضایی"
          required
          maxLength={50}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">امتیاز</label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">نظر شما</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="تجربه‌تون از این لپ‌تاپ رو بنویسید..."
          rows={4}
          required
          minLength={5}
          maxLength={1000}
        />
      </div>

      {message && (
        <p className={`text-sm ${message.includes('موفقیت') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={loading} className="rounded-xl">
          {loading ? 'در حال ارسال...' : isEdit ? 'ذخیره تغییرات' : 'ثبت نظر'}
        </Button>
        {isEdit && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl">
            انصراف
          </Button>
        )}
      </div>
    </form>
  )
}
