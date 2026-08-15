
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  PackageOpen,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'بازگشت کالا | لپ‌تاپ‌لند',
  description:
    'شرایط و مراحل بازگشت کالا در فروشگاه لپ‌تاپ‌لند. مهلت ۷ روزه، نحوه درخواست و قوانین بازگشت لپ‌تاپ.',
}

const steps = [
  {
    icon: MessageCircle,
    title: '۱. ثبت درخواست',
    desc: 'از طریق صفحه تماس با ما یا پشتیبانی تلفنی، شماره سفارش و دلیل بازگشت را اعلام کنید.',
  },
  {
    icon: CheckCircle2,
    title: '۲. بررسی اولیه',
    desc: 'تیم پشتیبانی وضعیت سفارش و شرایط کالا را بررسی می‌کند و نتیجه را به شما اطلاع می‌دهد.',
  },
  {
    icon: PackageOpen,
    title: '۳. ارسال کالا',
    desc: 'در صورت تایید، کالا را با بسته‌بندی مناسب و تمام لوازم همراه به آدرس اعلام‌شده ارسال کنید.',
  },
  {
    icon: Truck,
    title: '۴. دریافت و بازپرداخت',
    desc: 'پس از دریافت و تایید سلامت کالا، مبلغ طی ۳ تا ۷ روز کاری به حساب شما بازگردانده می‌شود.',
  },
]

const allowed = [
  'کالا در مهلت ۷ روزه پس از تحویل باشد',
  'دستگاه روشن نشود یا مشکل فنی جدی داشته باشد',
  'مغایرت مشخصات با صفحه محصول وجود داشته باشد',
  'کالا آسیب‌دیده یا ناقص به دست شما رسیده باشد',
  'جعبه، کارتن، کابل‌ها و لوازم جانبی کامل باشد',
  'هیچ گونه خط و خش یا آسیب فیزیکی از سمت خریدار وجود نداشته باشد',
]

const notAllowed = [
  'انصراف شخصی بدون وجود مشکل فنی یا مغایرت',
  'آسیب فیزیکی، ضربه یا ورود مایعات توسط خریدار',
  'نصب نرم‌افزار غیرمجاز یا تغییر سخت‌افزاری',
  'استفاده بیش از حد یا کثیف شدن بیش از اندازه دستگاه',
  'گم شدن جعبه اصلی یا لوازم جانبی',
  'گذشتن از مهلت ۷ روزه بازگشت',
]

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* هدر */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PackageOpen className="size-7" />
        </div>
        <h1 className="text-3xl font-bold">بازگشت کالا</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          در لپ‌تاپ‌لند حق دارید از خرید خود راضی باشید. شرایط شفاف بازگشت کالا را
          در این صفحه مطالعه کنید.
        </p>
      </div>

      {/* مهلت بازگشت */}
      <div className="mb-12 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:flex-row sm:text-right">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Clock className="size-7" />
        </span>
        <div>
          <h2 className="text-lg font-bold">مهلت بازگشت: ۷ روز</h2>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">
            از لحظه تحویل کالا، ۷ روز فرصت دارید درخواست بازگشت ثبت کنید. پس از
            این مدت، فقط گارانتی ۱۸ ماهه شامل حال شما می‌شود.
          </p>
        </div>
      </div>

      {/* مراحل */}
      <div className="mb-14">
        <h2 className="mb-6 text-center text-2xl font-bold">مراحل بازگشت کالا</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5 text-center"
            >
              <span className="mx-auto mb-3 flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <step.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* شرایط مجاز و غیرمجاز */}
      <div className="mb-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-green-600" />
            <h2 className="text-lg font-bold">شرایط قابل پذیرش</h2>
          </div>
          <ul className="space-y-3">
            {allowed.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <XCircle className="size-5 text-destructive" />
            <h2 className="text-lg font-bold">موارد غیرقابل پذیرش</h2>
          </div>
          <ul className="space-y-3">
            {notAllowed.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* نکته گارانتی */}
      <div className="mb-12 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold">تفاوت بازگشت با گارانتی</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              بازگشت کالا مربوط به ۷ روز اول پس از تحویل است و معمولاً منجر به
              بازپرداخت کامل می‌شود. گارانتی ۱۸ ماهه بعد از این مدت فعال است و
              شامل تعمیر یا تعویض قطعات معیوب می‌شود (نه لزوماً بازپرداخت وجه).
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold">نیاز به ثبت درخواست بازگشت داری؟</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm opacity-90">
          با پشتیبانی تماس بگیر یا از طریق فرم تماس پیام بفرست تا سریع راهنمایی‌ات کنیم.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">تماس با پشتیبانی</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/faq">سوالات متداول</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}