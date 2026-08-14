import type { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'سوالات متداول | لپ‌تاپ‌لند',
  description:
    'پاسخ سوالات رایج درباره خرید لپ‌تاپ، گارانتی، ارسال، پرداخت و بازگشت کالا در لپ‌تاپ‌لند.',
}

const faqs = [
  {
    category: 'خرید و سفارش',
    items: [
      {
        q: 'چطور سفارش ثبت کنم؟',
        a: 'محصول مورد نظر را به سبد اضافه کنید، وارد صفحه سبد شوید و روی «تسویه حساب» بزنید. اطلاعات گیرنده و روش پرداخت را وارد کنید تا سفارش ثبت شود.',
      },
      {
        q: 'آیا برای خرید نیاز به ثبت‌نام دارم؟',
        a: 'می‌توانید بدون حساب کاربری هم خرید را تا مرحله تسویه پیش ببرید. با این حال ساخت حساب، پیگیری سفارش و خریدهای بعدی را راحت‌تر می‌کند.',
      },
      {
        q: 'قیمت‌ها به تومان است؟',
        a: 'بله. تمام قیمت‌های سایت به تومان نمایش داده می‌شوند و در صفحه محصول و سبد خرید هم به همین صورت محاسبه می‌گردند.',
      },
    ],
  },
  {
    category: 'ارسال',
    items: [
      {
        q: 'هزینه و زمان ارسال چقدر است؟',
        a: 'هزینه ارسال در مرحله تسویه حساب نمایش داده می‌شود. زمان تحویل بسته به شهر مقصد معمولاً بین ۱ تا ۴ روز کاری است. برای شهرهای بزرگ اغلب سریع‌تر ارسال می‌شود.',
      },
      {
        q: 'آیا به همه شهرها ارسال دارید؟',
        a: 'بله، ارسال به سراسر ایران انجام می‌شود. پس از ثبت سفارش، کد پیگیری برای شما نمایش داده می‌شود.',
      },
    ],
  },
  {
    category: 'گارانتی و اصالت',
    items: [
      {
        q: 'گارانتی محصولات چند ماه است؟',
        a: 'محصولات با ۱۸ ماه گارانتی رسمی عرضه می‌شوند. جزئیات گارانتی هر کالا در صفحه همان محصول نیز قابل مشاهده است.',
      },
      {
        q: 'آیا کالاها اصل هستند؟',
        a: 'بله. فروشگاه روی اصالت کالا تأکید دارد و محصولات از مسیرهای معتبر تأمین می‌شوند. در صورت مغایرت، طبق شرایط بازگشت پیگیری می‌شود.',
      },
    ],
  },
  {
    category: 'پرداخت و بازگشت',
    items: [
      {
        q: 'چه روش‌های پرداختی دارید؟',
        a: 'در حال حاضر امکان انتخاب پرداخت آنلاین و پرداخت در محل (با توجه به شرایط سفارش) در صفحه تسویه حساب وجود دارد.',
      },
      {
        q: 'شرایط بازگشت کالا چیست؟',
        a: 'در صورت وجود مشکل فنی یا مغایرت با مشخصات اعلام‌شده، می‌توانید از طریق صفحه تماس با ما درخواست بررسی دهید. کالا باید در وضعیت اولیه و با لوازم همراه باشد.',
      },
      {
        q: 'اگر از خرید منصرف شوم چه می‌شود؟',
        a: 'قبل از ارسال، با پشتیبانی تماس بگیرید تا وضعیت سفارش بررسی شود. پس از ارسال، بازگشت تابع شرایط گارانتی و سلامت کالا است.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HelpCircle className="size-7" />
        </div>
        <h1 className="text-3xl font-bold">سوالات متداول</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          پاسخ رایج‌ترین سوالات درباره خرید، ارسال، گارانتی و پرداخت. اگر جوابت
          را پیدا نکردی، با پشتیبانی در تماس باش.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {faqs.map((group) => (
          <section key={group.category}>
            <h2 className="mb-4 text-lg font-bold text-primary">
              {group.category}
            </h2>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border bg-card open:shadow-sm open:ring-1 open:ring-primary/15"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm sm:text-base">{item.q}</span>
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-lg leading-none text-muted-foreground transition group-open:bg-primary group-open:text-primary-foreground">
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </div>
                  </summary>
                  <div className="border-t border-border px-5 py-4 text-sm leading-7 text-muted-foreground">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
        <MessageCircle className="mx-auto size-8 text-primary" />
        <h2 className="mt-3 text-xl font-bold">هنوز سوال داری؟</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          تیم پشتیبانی آماده راهنمایی برای انتخاب لپ‌تاپ و پیگیری سفارش است.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/contact">تماس با پشتیبانی</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
