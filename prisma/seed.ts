import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const laptops = [
  {
    id: 'asus-zenbook-14-ultra',
    name: 'ASUS Zenbook 14 Ultra',
    brand: 'ASUS',
    category: 'اولترابوک',
    price: 92500000,
    oldPrice: 105000000,
    image: '/laptops/asus-zenbook-14-ultra.jpg',
    images: JSON.stringify([
      '/laptops/asus-zenbook-14-ultra.jpg',
      '/laptops/asus-zenbook-14-ultra-2.jpg',
      '/laptops/asus-zenbook-14-ultra-3.jpg',
    ]),
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
    highlights: JSON.stringify([
      'نمایشگر ۲.۸K OLED با نرخ نوسازی ۱۲۰ هرتز',
      'بدنه آلومینیوم CNC با وزن تنها ۱.۲ کیلوگرم',
      'شارژ سریع؛ ۵۰٪ در ۳۰ دقیقه',
    ]),
  },
  {
    id: 'msi-raider-ge68-hx',
    name: 'MSI Raider GE68 HX',
    brand: 'MSI',
    category: 'گیمینگ',
    price: 138000000,
    image: '/laptops/msi-raider-ge68-hx.jpg',
    images: JSON.stringify([
      '/laptops/msi-raider-ge68-hx.jpg',
      '/laptops/msi-raider-ge68-hx-2.jpg',
      '/laptops/msi-raider-ge68-hx-3.jpg',
    ]),
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
    highlights: JSON.stringify([
      'نمایشگر ۱۶ اینچ QHD با نرخ نوسازی ۲۴۰ هرتز',
      'کیبورد RGB با نورپردازی هر کلید',
      'سیستم خنک‌کننده مایع فلزی',
    ]),
  },
  {
    id: 'asus-vivobook-pro-14',
    name: 'ASUS Vivobook Pro 14',
    brand: 'ASUS',
    category: 'اداری',
    price: 61000000,
    oldPrice: 68000000,
    image: '/laptops/asus-vivobook-pro-14.jpg',
    images: JSON.stringify([
      '/laptops/asus-vivobook-pro-14.jpg',
      '/laptops/asus-vivobook-pro-14-2.jpg',
      '/laptops/asus-vivobook-pro-14-3.jpg',
    ]),
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
    highlights: JSON.stringify([
      'اسکنر اثر انگشت و دوربین IR',
      'درگاه‌های کامل شامل HDMI و USB-C',
      'استانداردهای نظامی مقاومت MIL-STD',
    ]),
  },
  {
    id: 'lenovo-yoga-9i-14',
    name: 'Lenovo Yoga 9i 14',
    brand: 'Lenovo',
    category: 'دانشجویی',
    price: 74000000,
    image: '/laptops/lenovo-yoga-9i-14.jpg',
    images: JSON.stringify([
      '/laptops/lenovo-yoga-9i-14.jpg',
      '/laptops/lenovo-yoga-9i-14-2.jpg',
      '/laptops/lenovo-yoga-9i-14-3.jpg',
    ]),
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
    highlights: JSON.stringify([
      'صفحه لمسی چرخشی ۳۶۰ درجه',
      'قلم دیجیتال با ۴۰۹۶ سطح فشار',
      'وزن سبک برای حمل روزانه',
    ]),
  },
  {
    id: 'msi-creator-z16',
    name: 'MSI Creator Z16',
    brand: 'MSI',
    category: 'مهندسی',
    price: 154000000,
    oldPrice: 169000000,
    image: '/laptops/msi-creator-z16.jpg',
    images: JSON.stringify([
      '/laptops/msi-creator-z16.jpg',
      '/laptops/msi-creator-z16-2.jpg',
      '/laptops/msi-creator-z16-3.jpg',
    ]),
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
    highlights: JSON.stringify([
      'نمایشگر ۴K با پوشش ۱۰۰٪ فضای رنگی DCI-P3',
      '۶۴ گیگابایت رم برای پروژه‌های سنگین',
      'دو اسلات SSD قابل ارتقا',
    ]),
  },
  {
    id: 'lenovo-ideapad-slim-3-13',
    name: 'Lenovo IdeaPad Slim 3 13',
    brand: 'Lenovo',
    category: 'دانشجویی',
    price: 43500000,
    image: '/laptops/lenovo-ideapad-slim-3-13.jpg',
    images: JSON.stringify([
      '/laptops/lenovo-ideapad-slim-3-13.jpg',
      '/laptops/lenovo-ideapad-slim-3-13-2.jpg',
      '/laptops/lenovo-ideapad-slim-3-13-3.jpg',
    ]),
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
    highlights: JSON.stringify([
      'وزن فوق‌سبک ۱.۱ کیلوگرم',
      'صفحه‌نمایش Full HD ضدبازتاب',
      'قیمت مناسب برای شروع',
    ]),
  },
  {
    id: 'hp-omen-16',
    name: 'HP Omen 16',
    brand: 'HP',
    category: 'گیمینگ',
    price: 119000000,
    oldPrice: 132000000,
    image: '/laptops/hp-omen-16.jpg',
    images: JSON.stringify([
      '/laptops/hp-omen-16.jpg',
      '/laptops/hp-omen-16-2.jpg',
      '/laptops/hp-omen-16-3.jpg',
    ]),
    rating: 4.6,
    reviews: 189,
    inStock: true,
    badge: 'تخفیف ویژه',
    cpu: 'Intel Core i7-14700HX',
    ram: 32,
    storage: 1024,
    gpu: 'NVIDIA RTX 4070',
    screen: 15.6,
    os: 'ویندوز ۱۱',
    weight: '۲.۳ کیلوگرم',
    battery: 'تا ۹ ساعت',
    description:
      'لپ‌تاپ گیمینگ متعادل با قدرت بالا و قیمت مناسب؛ ایده‌آل برای گیمرهایی که به دنبال بهترین نسبت عملکرد به قیمت هستند.',
    highlights: JSON.stringify([
      'نمایشگر ۱۵.۶ اینچ QHD 165Hz',
      'سیستم خنک‌کننده سه‌فن',
      'کیبورد مکانیکال با RGB',
    ]),
  },
  {
    id: 'dell-xps-13-plus',
    name: 'Dell XPS 13 Plus',
    brand: 'Dell',
    category: 'اولترابوک',
    price: 87500000,
    image: '/laptops/dell-xps-13-plus.jpg',
    images: JSON.stringify([
      '/laptops/dell-xps-13-plus.jpg',
      '/laptops/dell-xps-13-plus-2.jpg',
      '/laptops/dell-xps-13-plus-3.jpg',
    ]),
    rating: 4.7,
    reviews: 156,
    inStock: true,
    badge: 'جدید',
    cpu: 'AMD Ryzen AI 9',
    ram: 32,
    storage: 1024,
    gpu: 'AMD Radeon 890M',
    screen: 13.3,
    os: 'ویندوز ۱۱',
    weight: '۰.۹۹ کیلوگرم',
    battery: 'تا ۲۰ ساعت',
    description:
      'نازک‌ترین و سبک‌ترین اولترابوک سری XPS با پردازنده AI و عمر باتری فوق‌العاده برای سفرهای طولانی.',
    highlights: JSON.stringify([
      'وزن کمتر از یک کیلوگرم',
      'نمایشگر OLED 2.8K لمسی',
      'پشتیبانی از Wi-Fi 7',
    ]),
  },
  {
    id: 'acer-predator-helios-17',
    name: 'Acer Predator Helios 17',
    brand: 'Acer',
    category: 'گیمینگ',
    price: 165000000,
    image: '/laptops/acer-predator-helios-17.jpg',
    images: JSON.stringify([
      '/laptops/acer-predator-helios-17.jpg',
      '/laptops/acer-predator-helios-17-2.jpg',
      '/laptops/acer-predator-helios-17-3.jpg',
    ]),
    rating: 4.8,
    reviews: 98,
    inStock: true,
    badge: 'پرچمدار',
    cpu: 'Intel Core Ultra 9',
    ram: 64,
    storage: 2048,
    gpu: 'NVIDIA RTX 4090',
    screen: 17.3,
    os: 'ویندوز ۱۱',
    weight: '۲.۹ کیلوگرم',
    battery: 'تا ۷ ساعت',
    description:
      'هیولا‌ی گیمینگ ۱۷ اینچی با بالاترین مشخصات سخت‌افزاری موجود برای بازی‌های 4K و استریم حرفه‌ای.',
    highlights: JSON.stringify([
      'نمایشگر ۱۷.۳ اینچ Mini-LED 240Hz',
      'سیستم خنک‌کننده بخارچمبر',
      'پورت‌های کامل Thunderbolt 5',
    ]),
  },
  {
    id: 'asus-expertbook-b15',
    name: 'ASUS ExpertBook B15',
    brand: 'ASUS',
    category: 'اداری',
    price: 52000000,
    oldPrice: 58000000,
    image: '/laptops/asus-expertbook-b15.jpg',
    images: JSON.stringify([
      '/laptops/asus-expertbook-b15.jpg',
      '/laptops/asus-expertbook-b15-2.jpg',
      '/laptops/asus-expertbook-b15-3.jpg',
    ]),
    rating: 4.4,
    reviews: 203,
    inStock: true,
    cpu: 'Intel Core i5',
    ram: 16,
    storage: 512,
    gpu: 'Intel UHD Graphics',
    screen: 15.6,
    os: 'ویندوز ۱۱ پرو',
    weight: '۱.۷ کیلوگرم',
    battery: 'تا ۱۲ ساعت',
    description:
      'لپ‌تاپ اداری مقرون‌به‌صرفه با صفحه‌نمایش بزرگ و کیبورد راحت برای کارهای روزمره و جلسات طولانی.',
    highlights: JSON.stringify([
      'صفحه‌کلید عددی کامل',
      'وب‌کم Full HD با پرده حریم خصوصی',
      'گارانتی ۳ ساله سازمانی',
    ]),
  },
  {
    id: 'lenovo-ideapad-5-pro-14',
    name: 'Lenovo IdeaPad 5 Pro 14',
    brand: 'Lenovo',
    category: 'دانشجویی',
    price: 48900000,
    image: '/laptops/lenovo-ideapad-5-pro-14.jpg',
    images: JSON.stringify([
      '/laptops/lenovo-ideapad-5-pro-14.jpg',
      '/laptops/lenovo-ideapad-5-pro-14-2.jpg',
      '/laptops/lenovo-ideapad-5-pro-14-3.jpg',
    ]),
    rating: 4.5,
    reviews: 312,
    inStock: true,
    badge: 'پرفروش',
    cpu: 'AMD Ryzen 7',
    ram: 16,
    storage: 512,
    gpu: 'AMD Radeon Graphics',
    screen: 14,
    os: 'ویندوز ۱۱',
    weight: '۱.۳۵ کیلوگرم',
    battery: 'تا ۱۵ ساعت',
    description:
      'انتخاب محبوب دانشجویان با تعادل عالی بین عملکرد، باتری و قیمت مناسب برای کلاس و پروژه‌ها.',
    highlights: JSON.stringify([
      'رم ۱۶ گیگابایت قابل ارتقا',
      'صفحه‌نمایش ضدنور آبی',
      'شارژ سریع USB-C',
    ]),
  },
  {
    id: 'hp-zbook-firefly-16',
    name: 'HP ZBook Firefly 16',
    brand: 'HP',
    category: 'مهندسی',
    price: 142000000,
    image: '/laptops/hp-zbook-firefly-16.jpg',
    images: JSON.stringify([
      '/laptops/hp-zbook-firefly-16.jpg',
      '/laptops/hp-zbook-firefly-16-2.jpg',
      '/laptops/hp-zbook-firefly-16-3.jpg',
    ]),
    rating: 4.8,
    reviews: 87,
    inStock: true,
    badge: 'حرفه‌ای',
    cpu: 'AMD Ryzen 9 PRO',
    ram: 64,
    storage: 2048,
    gpu: 'NVIDIA RTX 4080',
    screen: 16,
    os: 'ویندوز ۱۱ پرو',
    weight: '۲.۲ کیلوگرم',
    battery: 'تا ۱۱ ساعت',
    description:
      'ورک‌استیشن قابل حمل برای مهندسان و طراحان با قدرت رندر بالا و پایداری در کارهای سنگین.',
    highlights: JSON.stringify([
      'نمایشگر ۱۶ اینچ 4K OLED',
      'پشتیبانی از ECC Memory',
      'دو اسلات M.2 قابل ارتقا',
    ]),
  },
  {
    id: 'dell-inspiron-14-plus',
    name: 'Dell Inspiron 14 Plus',
    brand: 'Dell',
    category: 'اولترابوک',
    price: 69500000,
    oldPrice: 76000000,
    image: '/laptops/dell-inspiron-14-plus.jpg',
    images: JSON.stringify([
      '/laptops/dell-inspiron-14-plus.jpg',
      '/laptops/dell-inspiron-14-plus-2.jpg',
      '/laptops/dell-inspiron-14-plus-3.jpg',
    ]),
    rating: 4.6,
    reviews: 145,
    inStock: true,
    cpu: 'Intel Core Ultra 5',
    ram: 16,
    storage: 512,
    gpu: 'Intel Arc Graphics',
    screen: 14,
    os: 'ویندوز ۱۱',
    weight: '۱.۱۵ کیلوگرم',
    battery: 'تا ۱۷ ساعت',
    description:
      'اولترابوک شیک و سبک با تمرکز روی بهره‌وری و طراحی مینیمال برای کاربران حرفه‌ای.',
    highlights: JSON.stringify([
      'بدنه منیزیمی فوق‌سبک',
      'کیبورد کم‌عمق با نور پس‌زمینه',
      'پشتیبانی از شارژ بی‌سیم',
    ]),
  },
  {
    id: 'acer-nitro-5-15',
    name: 'Acer Nitro 5 15',
    brand: 'Acer',
    category: 'گیمینگ',
    price: 98000000,
    image: '/laptops/acer-nitro-5-15.jpg',
    images: JSON.stringify([
      '/laptops/acer-nitro-5-15.jpg',
      '/laptops/acer-nitro-5-15-2.jpg',
      '/laptops/acer-nitro-5-15-3.jpg',
    ]),
    rating: 4.5,
    reviews: 167,
    inStock: true,
    badge: 'گیمینگ',
    cpu: 'AMD Ryzen 7',
    ram: 16,
    storage: 1024,
    gpu: 'NVIDIA RTX 4060',
    screen: 15.6,
    os: 'ویندوز ۱۱',
    weight: '۲.۱ کیلوگرم',
    battery: 'تا ۱۰ ساعت',
    description:
      'لپ‌تاپ گیمینگ میان‌رده با عملکرد عالی در بازی‌های Full HD و قابلیت حمل نسبتاً خوب.',
    highlights: JSON.stringify([
      'نمایشگر ۱۵.۶ اینچ 144Hz IPS',
      'سیستم خنک‌کننده دو فن',
      'نورپردازی RGB قابل تنظیم',
    ]),
  },
  {
    id: 'asus-zenbook-s-13',
    name: 'ASUS Zenbook S 13',
    brand: 'ASUS',
    category: 'اولترابوک',
    price: 78500000,
    image: '/laptops/asus-zenbook-s-13.jpg',
    images: JSON.stringify([
      '/laptops/asus-zenbook-s-13.jpg',
      '/laptops/asus-zenbook-s-13-2.jpg',
      '/laptops/asus-zenbook-s-13-3.jpg',
    ]),
    rating: 4.7,
    reviews: 129,
    inStock: false,
    badge: 'جدید',
    cpu: 'Intel Core Ultra 7',
    ram: 32,
    storage: 1024,
    gpu: 'Intel Arc Graphics',
    screen: 13.5,
    os: 'ویندوز ۱۱',
    weight: '۱.۰۵ کیلوگرم',
    battery: 'تا ۱۹ ساعت',
    description:
      'همراه ایده‌آل سفر با صفحه‌نمایش خاص ۳:۲ و عمر باتری بسیار بالا برای کار بدون دغدغه شارژ.',
    highlights: JSON.stringify([
      'نسبت تصویر ۳:۲ مناسب کار',
      'وزن فوق‌سبک ۱ کیلوگرم',
      'پورت‌های Thunderbolt 4',
    ]),
  },
  {
    id: 'lenovo-yoga-7-14',
    name: 'Lenovo Yoga 7 14',
    brand: 'Lenovo',
    category: 'دانشجویی',
    price: 67000000,
    oldPrice: 72000000,
    image: '/laptops/lenovo-yoga-7-14.jpg',
    images: JSON.stringify([
      '/laptops/lenovo-yoga-7-14.jpg',
      '/laptops/lenovo-yoga-7-14-2.jpg',
      '/laptops/lenovo-yoga-7-14-3.jpg',
    ]),
    rating: 4.4,
    reviews: 88,
    inStock: true,
    cpu: 'Intel Core i5',
    ram: 16,
    storage: 512,
    gpu: 'Intel Iris Xe',
    screen: 14,
    os: 'ویندوز ۱۱',
    weight: '۱.۴۵ کیلوگرم',
    battery: 'تا ۱۴ ساعت',
    description:
      'لپ‌تاپ ۲ در ۱ با قلم دیجیتال برای دانشجویان هنر، معماری و کسانی که به نوشتن و طراحی علاقه دارند.',
    highlights: JSON.stringify([
      'نمایشگر لمسی Full HD',
      'قلم با ۴۰۹۶ سطح فشار',
      'حالت‌های لپ‌تاپ، تبلت و چادر',
    ]),
  },
  {
    id: 'hp-elitebook-840-g11',
    name: 'HP EliteBook 840 G11',
    brand: 'HP',
    category: 'اداری',
    price: 81500000,
    image: '/laptops/hp-elitebook-840-g11.jpg',
    images: JSON.stringify([
      '/laptops/hp-elitebook-840-g11.jpg',
      '/laptops/hp-elitebook-840-g11-2.jpg',
      '/laptops/hp-elitebook-840-g11-3.jpg',
    ]),
    rating: 4.6,
    reviews: 112,
    inStock: true,
    badge: 'سازمانی',
    cpu: 'Intel Core Ultra 7',
    ram: 32,
    storage: 1024,
    gpu: 'Intel Arc Graphics',
    screen: 14,
    os: 'ویندوز ۱۱ پرو',
    weight: '۱.۳ کیلوگرم',
    battery: 'تا ۱۶ ساعت',
    description:
      'لپ‌تاپ سازمانی با امنیت بالا، مدیریت از راه دور و دوام عالی برای محیط‌های کاری حرفه‌ای.',
    highlights: JSON.stringify([
      'چیپ امنیتی TPM 2.0 و IR Camera',
      'گارانتی ۴ ساله on-site',
      'پشتیبانی از vPro',
    ]),
  },
  {
    id: 'acer-concept-d-16',
    name: 'Acer ConceptD 16',
    brand: 'Acer',
    category: 'مهندسی',
    price: 128000000,
    oldPrice: 139000000,
    image: '/laptops/acer-concept-d-16.jpg',
    images: JSON.stringify([
      '/laptops/acer-concept-d-16.jpg',
      '/laptops/acer-concept-d-16-2.jpg',
      '/laptops/acer-concept-d-16-3.jpg',
    ]),
    rating: 4.7,
    reviews: 76,
    inStock: true,
    cpu: 'AMD Ryzen 9',
    ram: 32,
    storage: 2048,
    gpu: 'NVIDIA RTX 4070',
    screen: 16,
    os: 'ویندوز ۱۱ پرو',
    weight: '۲.۰ کیلوگرم',
    battery: 'تا ۱۲ ساعت',
    description:
      'استودیوی قابل حمل برای تولید محتوا، ادیت ویدیو و طراحی سه‌بعدی با تعادل عالی قدرت و حمل‌پذیری.',
    highlights: JSON.stringify([
      'نمایشگر ۱۶ اینچ QHD+ 240Hz',
      'سیستم خنک‌کننده پیشرفته',
      'پشتیبانی از قلم و تبلت اکسترنال',
    ]),
  },
]

const sampleReviews = [
  { name: 'علی رضایی', rating: 5, comment: 'لپ‌تاپ فوق‌العاده‌ایه، برای گیمینگ عالی کار می‌کنه و خنک‌کننده‌ش خیلی قویه.' },
  { name: 'سارا محمدی', rating: 4, comment: 'ظاهر شیک و سبک. باتری‌ش خوبه ولی کاش رم بیشتری داشت.' },
  { name: 'محمد حسینی', rating: 5, comment: 'خریدم و راضی‌ام. ارسال سریع بود و گارانتی رسمی داره.' },
  { name: 'فاطمه احمدی', rating: 3, comment: 'عملکردش خوبه ولی فن کمی صدا می‌ده. برای کارهای روزمره کافیه.' },
  { name: 'رضا کریمی', rating: 5, comment: 'بهترین انتخاب برای دانشجوها. قیمت مناسب و کیفیت عالی.' },
  { name: 'نرگس اکبری', rating: 4, comment: 'صفحه نمایشش خیلی واضحه. برای طراحی گرافیک پیشنهاد می‌کنم.' },
  { name: 'امیرحسین موسوی', rating: 5, comment: 'گرافیکش قوی‌تر از انتظارم بود. بازی‌های سنگین رو راحت اجرا می‌کنه.' },
  { name: 'مریم جعفری', rating: 4, comment: 'سبک و قابل حمل. فقط کمی گرم می‌شه زیر فشار.' },
  { name: 'حسین نوری', rating: 2, comment: 'بعد از دو ماه مشکل باتری پیدا کرد. پشتیبانی خوب نبود.' },
  { name: 'زهرا قاسمی', rating: 5, comment: 'فوق‌العاده! بسته‌بندی عالی و محصول اصل بود.' },
  { name: 'کیانوش مرادی', rating: 4, comment: 'برای کارهای اداری عالیه. سرعت بالا و نویز کم.' },
  { name: 'الهام صادقی', rating: 3, comment: 'قیمتش کمی بالاست نسبت به مشخصات. ولی کیفیت ساخت خوبه.' },
  { name: 'پویا فرهادی', rating: 5, comment: 'یکی از بهترین خریدهایی که تا حالا کردم. پیشنهاد می‌کنم.' },
  { name: 'مینا رستمی', rating: 4, comment: 'باتری واقعاً دوام داره. برای سفر عالیه.' },
  { name: 'آرمان کاظمی', rating: 5, comment: 'رندر سه‌بعدی رو بدون مشکل انجام می‌ده. ارزش خرید داره.' },
]

async function updateLaptopRating(laptopId: string) {
  const reviews = await prisma.review.findMany({ where: { laptopId } })
  const count = reviews.length
  const avg =
    count > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
      : 0

  await prisma.laptop.update({
    where: { id: laptopId },
    data: {
      rating: avg,
      reviews: count,
    },
  })
}

async function main() {
  console.log('شروع seed...')

  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.laptop.deleteMany()

  for (const laptop of laptops) {
    await prisma.laptop.create({ data: laptop })
  }
  console.log(`${laptops.length} لپ‌تاپ اضافه شد.`)

  const allLaptops = await prisma.laptop.findMany()

  for (const laptop of allLaptops) {
    const count = 3 + Math.floor(Math.random() * 4)
    const shuffled = [...sampleReviews].sort(() => Math.random() - 0.5)

    for (let i = 0; i < count; i++) {
      const r = shuffled[i % shuffled.length]
      await prisma.review.create({
        data: {
          laptopId: laptop.id,
          authorName: r.name,
          rating: r.rating,
          comment: r.comment,
          editToken: randomUUID(),
        },
      })
    }

    await updateLaptopRating(laptop.id)
  }

  console.log('نظرات نمونه با موفقیت اضافه شدند.')
  console.log('Seed کامل شد.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
