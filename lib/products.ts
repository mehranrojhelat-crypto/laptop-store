export type Laptop = {
  id: string
  name: string
  brand: string
  category: 'گیمینگ' | 'اولترابوک' | 'اداری' | 'مهندسی' | 'دانشجویی'
  price: number
  oldPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
  cpu: string
  ram: number // GB
  storage: number // GB
  gpu: string
  screen: number // inch
  os: string
  weight: string
  battery: string
  description: string
  highlights: string[]
}

export const laptops: Laptop[] = [
  {
    id: 'pro-ultra-14',
    name: 'پرو اولترا ۱۴',
    brand: 'نکسوس',
    category: 'اولترابوک',
    price: 92500000,
    oldPrice: 105000000,
    image: '/laptops/pro-ultra.png',
    rating: 4.8,
    reviews: 214,
    inStock: true,
    badge: 'پرفروش',
    cpu: 'Intel Core Ultra 7',
    ram: 32,
    storage: 1024,
    gpu: 'Intel Arc Graphics',
    screen: 14,
    os: 'ویندوز ۱۱',
    weight: '۱.۲ کیلوگرم',
    battery: 'تا ۱۸ ساعت',
    description:
      'اولترابوک فوق‌سبک با بدنه آلومینیومی یکپارچه، نمایشگر OLED و عمر باتری استثنایی؛ همراه ایده‌آل برای کار و سفر.',
    highlights: [
      'نمایشگر ۲.۸K OLED با نرخ نوسازی ۱۲۰ هرتز',
      'بدنه آلومینیوم CNC با وزن تنها ۱.۲ کیلوگرم',
      'شارژ سریع؛ ۵۰٪ در ۳۰ دقیقه',
    ],
  },
  {
    id: 'raptor-x16',
    name: 'رپتور ایکس ۱۶',
    brand: 'والکان',
    category: 'گیمینگ',
    price: 138000000,
    image: '/laptops/gaming-rog.png',
    rating: 4.7,
    reviews: 331,
    inStock: true,
    badge: 'گیمینگ',
    cpu: 'AMD Ryzen 9',
    ram: 32,
    storage: 2048,
    gpu: 'NVIDIA RTX 4080',
    screen: 16,
    os: 'ویندوز ۱۱',
    weight: '۲.۵ کیلوگرم',
    battery: 'تا ۸ ساعت',
    description:
      'لپ‌تاپ گیمینگ قدرتمند با کارت گرافیک RTX 4080 و سیستم خنک‌کننده پیشرفته برای اجرای روان جدیدترین بازی‌ها.',
    highlights: [
      'نمایشگر ۱۶ اینچ QHD با نرخ نوسازی ۲۴۰ هرتز',
      'کیبورد RGB با نورپردازی هر کلید',
      'سیستم خنک‌کننده مایع فلزی',
    ],
  },
  {
    id: 'slim-book-pro',
    name: 'اسلیم بوک پرو',
    brand: 'نکسوس',
    category: 'اداری',
    price: 61000000,
    oldPrice: 68000000,
    image: '/laptops/business-slim.png',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    cpu: 'Intel Core i5',
    ram: 16,
    storage: 512,
    gpu: 'Intel Iris Xe',
    screen: 14,
    os: 'ویندوز ۱۱',
    weight: '۱.۴ کیلوگرم',
    battery: 'تا ۱۴ ساعت',
    description:
      'لپ‌تاپ اداری سبک و بادوام با امنیت سازمانی و صفحه‌کلید ارگونومیک؛ انتخابی مطمئن برای محیط کار.',
    highlights: [
      'اسکنر اثر انگشت و دوربین IR',
      'درگاه‌های کامل شامل HDMI و USB-C',
      'استانداردهای نظامی مقاومت MIL-STD',
    ],
  },
  {
    id: 'flip-studio-2in1',
    name: 'فلیپ استودیو ۲ در ۱',
    brand: 'آریا',
    category: 'دانشجویی',
    price: 74000000,
    image: '/laptops/convertible-flip.png',
    rating: 4.6,
    reviews: 96,
    inStock: true,
    badge: 'جدید',
    cpu: 'Intel Core Ultra 5',
    ram: 16,
    storage: 512,
    gpu: 'Intel Arc Graphics',
    screen: 13,
    os: 'ویندوز ۱۱',
    weight: '۱.۳ کیلوگرم',
    battery: 'تا ۱۶ ساعت',
    description:
      'لپ‌تاپ تبدیل‌شونده با نمایشگر لمسی و قلم اختصاصی؛ مناسب برای یادداشت‌برداری، طراحی و سرگرمی.',
    highlights: [
      'صفحه لمسی چرخشی ۳۶۰ درجه',
      'قلم دیجیتال با ۴۰۹۶ سطح فشار',
      'وزن سبک برای حمل روزانه',
    ],
  },
  {
    id: 'creator-studio-16',
    name: 'کریتور استودیو ۱۶',
    brand: 'والکان',
    category: 'مهندسی',
    price: 154000000,
    oldPrice: 169000000,
    image: '/laptops/creator-studio.png',
    rating: 4.9,
    reviews: 142,
    inStock: false,
    badge: 'حرفه‌ای',
    cpu: 'Intel Core Ultra 9',
    ram: 64,
    storage: 2048,
    gpu: 'NVIDIA RTX 4090',
    screen: 16,
    os: 'ویندوز ۱۱ پرو',
    weight: '۲.۱ کیلوگرم',
    battery: 'تا ۱۰ ساعت',
    description:
      'ورک‌استیشن قابل حمل برای ویرایش ویدیو، رندر سه‌بعدی و مدل‌سازی؛ با نمایشگر کالیبره‌شده رنگی.',
    highlights: [
      'نمایشگر ۴K با پوشش ۱۰۰٪ فضای رنگی DCI-P3',
      '۶۴ گیگابایت رم برای پروژه‌های سنگین',
      'دو اسلات SSD قابل ارتقا',
    ],
  },
  {
    id: 'everyday-air-13',
    name: 'اوری‌دی ایر ۱۳',
    brand: 'آریا',
    category: 'دانشجویی',
    price: 43500000,
    image: '/laptops/everyday-air.png',
    rating: 4.3,
    reviews: 267,
    inStock: true,
    badge: 'اقتصادی',
    cpu: 'AMD Ryzen 5',
    ram: 8,
    storage: 256,
    gpu: 'AMD Radeon Graphics',
    screen: 13,
    os: 'ویندوز ۱۱',
    weight: '۱.۱ کیلوگرم',
    battery: 'تا ۱۲ ساعت',
    description:
      'لپ‌تاپ سبک و مقرون‌به‌صرفه برای کارهای روزمره، مرور وب و کلاس‌های آنلاین؛ گزینه‌ای عالی برای دانشجویان.',
    highlights: [
      'وزن فوق‌سبک ۱.۱ کیلوگرم',
      'صفحه‌نمایش Full HD ضدبازتاب',
      'قیمت مناسب برای شروع',
    ],
  },
]

export const brands = ['نکسوس', 'والکان', 'آریا']
export const categories = [
  'گیمینگ',
  'اولترابوک',
  'اداری',
  'مهندسی',
  'دانشجویی',
] as const

export function getLaptop(id: string) {
  return laptops.find((l) => l.id === id)
}

export function formatPrice(price: number) {
  return price.toLocaleString('fa-IR')
}
