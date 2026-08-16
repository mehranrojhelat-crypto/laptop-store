
import Image from 'next/image'
import Link from 'next/link'
import {
  Laptop,
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
} from 'lucide-react'

const features = [
  { icon: Truck, title: 'ارسال سریع', desc: 'ارسال به سراسر کشور' },
  { icon: ShieldCheck, title: 'گارانتی رسمی', desc: '۱۸ ماه ضمانت' },
  { icon: CreditCard, title: 'پرداخت امن', desc: 'درگاه معتبر بانکی' },
  { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در دسترس' },
]

const linkGroups = [
  {
    title: 'دسته‌بندی‌ها',
    links: [
      { label: 'گیمینگ', href: '/products?cat=گیمینگ' },
      { label: 'اولترابوک', href: '/products?cat=اولترابوک' },
      { label: 'اداری', href: '/products?cat=اداری' },
      { label: 'مهندسی', href: '/products?cat=مهندسی' },
      { label: 'دانشجویی', href: '/products?cat=دانشجویی' },
    ],
  },
  {
    title: 'خدمات مشتریان',
    links: [
      { label: 'پیگیری سفارش', href: '/contact' },
      { label: 'شرایط گارانتی', href: '/about' },
      { label: 'بازگشت کالا', href: '/returns' },
      { label: 'سوالات متداول', href: '/faq' },
    ],
  },
  {
    title: 'درباره ما',
    links: [
      { label: 'معرفی فروشگاه', href: '/about' },
      { label: 'تماس با ما', href: '/contact' },
      { label: 'فرصت‌های شغلی', href: '/contact' },
      { label: 'وبلاگ', href: '/blog' },
    ],
  },
]

const socialLinks = [
  {
    name: 'اینستاگرام',
    href: 'https://instagram.com/yourpage',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'تلگرام',
    href: 'https://t.me/yourchannel',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  {
    name: 'واتساپ',
    href: 'https://wa.me/989123456789',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </svg>
    ),
  },
  {
    name: 'یوتیوب',
    href: 'https://youtube.com/@yourchannel',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
  {
    name: 'لینکدین',
    href: 'https://linkedin.com/company/yourpage',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'توییتر / X',
    href: 'https://x.com/yourpage',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path d="M4 4l11.733 16h4.267l-11.733-16z" />
        <path d="M4 20l6.768-6.768M15.232 10.232 20 4" />
      </svg>
    ),
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Features */}
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

        {/* Main footer content */}
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

            {/* Social Icons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold">{group.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar: کپی‌رایت راست | اینماد چپ */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© ۱۴۰۴ لپ‌تاپ‌لند. تمامی حقوق محفوظ است.</p>

          <Image
            src="/enamad.png"
            alt="نماد اعتماد الکترونیکی"
            width={125}
            height={125}
            className="h-[7.5rem] w-auto object-contain sm:ms-auto"
          />
        </div>
      </div>
    </footer>
  )
}
