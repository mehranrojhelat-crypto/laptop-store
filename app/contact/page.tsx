'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const contactInfo = [
  {
    icon: Phone,
    title: 'تلفن پشتیبانی',
    lines: ['۰۲۱-۹۱۰۰۰۰۰۰', '۰۹۱۲-۰۰۰-۰۰۰۰'],
    href: 'tel:+982191000000',
  },
  {
    icon: Mail,
    title: 'ایمیل',
    lines: ['support@laptopland.ir', 'info@laptopland.ir'],
    href: 'mailto:support@laptopland.ir',
  },
  {
    icon: MapPin,
    title: 'آدرس فروشگاه',
    lines: ['تهران، خیابان ولیعصر', 'بالاتر از میدان ونک، پلاک ۱۲۳'],
    href: 'https://maps.google.com/?q=Vanak+Square+Tehran',
  },
  {
    icon: Clock,
    title: 'ساعات کاری',
    lines: ['شنبه تا پنج‌شنبه: ۹ صبح تا ۹ شب', 'جمعه: ۱۰ صبح تا ۶ عصر'],
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast(data.error || 'خطا در ارسال پیام')
        return
      }

      setSuccess(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      toast(data.message || 'پیام شما ثبت شد')
    } catch {
      toast('ارتباط با سرور برقرار نشد. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
          <MessageSquare className="size-7" />
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">تماس با ما</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground leading-relaxed">
          سوال، پیشنهاد یا پیگیری سفارش داری؟ از طریق فرم زیر یا اطلاعات تماس با ما در ارتباط باش.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Info + Map */}
        <div className="space-y-5 lg:col-span-2">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <item.icon className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold">{item.title}</h3>
                {item.lines.map((line) =>
                  item.href ? (
                    <a
                      key={line}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="mt-1 text-sm text-muted-foreground">
                      {line}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}

          {/* Google Map Embed - میدان ونک تهران */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="موقعیت فروشگاه لپ‌تاپ‌لند"
              src="https://maps.google.com/maps?q=Vanak%20Square%20Tehran&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-64 w-full border-0 grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="border-t border-border bg-card px-4 py-3 text-center text-xs text-muted-foreground">
              تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-3">
          <h2 className="mb-1 text-xl font-bold">ارسال پیام</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            پیام شما در سیستم ذخیره می‌شود و تیم پشتیبانی پاسخ می‌دهد.
          </p>

          {success ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 px-6 py-16 text-center">
              <CheckCircle2 className="mb-4 size-14 text-primary" />
              <h3 className="text-xl font-bold">پیام شما ثبت شد</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                از تماس شما متشکریم. در اسرع وقت از طریق ایمیل یا تلفن با شما تماس می‌گیریم.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => setSuccess(false)}
              >
                ارسال پیام جدید
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="مثلاً علی محمدی"
                    required
                    minLength={2}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ali@email.com"
                    dir="ltr"
                    className="text-left"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تماس</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                    dir="ltr"
                    className="text-left"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">موضوع</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="مثلاً پیگیری سفارش"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">پیام شما *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="متن پیام خود را بنویسید..."
                  required
                  minLength={10}
                  maxLength={2000}
                  disabled={loading}
                  className={cn('resize-y')}
                />
                <p className="text-left text-xs text-muted-foreground" dir="ltr">
                  {form.message.length}/2000
                </p>
              </div>

              <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    ارسال پیام
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
