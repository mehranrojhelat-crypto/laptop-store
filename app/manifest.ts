import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'لپ‌تاپ‌لند | فروشگاه تخصصی لپ‌تاپ',
    short_name: 'لپ‌تاپ‌لند',
    description:
      'خرید آنلاین لپ‌تاپ گیمینگ، اولترابوک، اداری و مهندسی با بهترین قیمت و گارانتی رسمی.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e8823d',
    lang: 'fa',
    dir: 'rtl',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
