import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'تماس با ما',
  description:
    'تماس با پشتیبانی لپ‌تاپ‌لند؛ تلفن، ایمیل، آدرس فروشگاه و فرم ارسال پیام برای راهنمایی خرید و پیگیری سفارش.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
