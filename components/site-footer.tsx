import Link from 'next/link'
import { Laptop, ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react'

const features = [
  { icon: Truck, title: 'ارسال سریع', desc: 'ارسال به سراسر کشور' },
  { icon: ShieldCheck, title: 'گارانتی رسمی', desc: '۱۸ ماه ضمانت' },
  { icon: CreditCard, title: 'پرداخت امن', desc: 'درگاه معتبر بانکی' },
  { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در دسترس' },
]

const linkGroups = [
  {
    title: 'دسته‌بندی‌ها',
    links: ['گیمینگ', 'اولترابوک', 'اداری', 'مهندسی', 'دانشجویی'],
  },
  {
    title: 'خدمات مشتریان',
    links: ['پیگیری سفارش', 'شرایط گارانتی', 'بازگشت کالا', 'سوالات متداول'],
  },
  {
    title: 'درباره ما',
    links: ['معرفی فروشگاه', 'تماس با ما', 'فرصت‌های شغلی', 'وبلاگ'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 border-b border-border py-10 md:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <f.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Laptop className="size-5" />
              </span>
              <span className="text-lg font-bold">لپ‌تاپ‌لند</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              فروشگاه تخصصی لپ‌تاپ با بیش از یک دهه تجربه؛ ارائه بهترین برندها با
              قیمت مناسب و گارانتی معتبر.
            </p>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold">{group.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/products"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© ۱۴۰۴ لپ‌تاپ‌لند. تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده با دقت برای علاقه‌مندان تکنولوژی</p>
        </div>
      </div>
    </footer>
  )
}
