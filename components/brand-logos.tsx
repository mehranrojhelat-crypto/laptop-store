import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

/** لوگوی ساده و خوانا برای هر برند — بدون نیاز به فایل تصویری */

export function AsusLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 80 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-auto', className)}
      aria-hidden
    >
      <path
        d="M4 22 L14 6 L24 22 H19.5 L17.2 17 H10.8 L8.5 22 H4 Z M12.2 13.5 H15.8 L14 9.5 L12.2 13.5 Z"
        fill="currentColor"
      />
      <path
        d="M26 22 V6 H31.2 C35.5 6 38 8.2 38 11.5 C38 14.8 35.5 17 31.2 17 H30.5 V22 H26 Z M30.5 13.2 H31 C32.8 13.2 33.8 12.4 33.8 11.5 C33.8 10.6 32.8 9.8 31 9.8 H30.5 V13.2 Z"
        fill="currentColor"
      />
      <path
        d="M41 22 V6 H52 V9.8 H45.5 V12.2 H51 V16 H45.5 V18.2 H52.2 V22 H41 Z"
        fill="currentColor"
      />
      <path
        d="M55 22 V6 H60.5 L66 14.5 V6 H70.5 V22 H65 L59.5 13.5 V22 H55 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function MsiLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 72 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-auto', className)}
      aria-hidden
    >
      <path
        d="M4 22 V6 H9.5 L14 14.5 L18.5 6 H24 V22 H19.5 V12 L15.5 19 H12.5 L8.5 12 V22 H4 Z"
        fill="currentColor"
      />
      <path
        d="M28 22 V6 H40 V10 H32.5 V11.8 H39 V15.5 H32.5 V18 H40.2 V22 H28 Z"
        fill="currentColor"
      />
      <path
        d="M44 22 V6 H49.5 C55 6 58 9 58 14 C58 19 55 22 49.5 22 H44 Z M48.5 18 H49.2 C52 18 53.5 16.5 53.5 14 C53.5 11.5 52 10 49.2 10 H48.5 V18 Z"
        fill="currentColor"
      />
      {/* نقطه قرمز MSI */}
      <circle cx="64" cy="9" r="3.2" fill="#FF0000" />
    </svg>
  )
}

export function LenovoLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 96 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-auto', className)}
      aria-hidden
    >
      <path
        d="M4 22 V6 H8.5 V17.5 H16 V22 H4 Z"
        fill="currentColor"
      />
      <path
        d="M20 22 V10.5 H24.2 V12.2 C25 11 26.5 10.2 28.5 10.2 C32.2 10.2 34.5 12.8 34.5 16.2 C34.5 19.6 32.2 22.2 28.5 22.2 C26.5 22.2 25 21.4 24.2 20.2 V22 H20 Z M24.3 16.2 C24.3 18 25.5 19.2 27.2 19.2 C28.9 19.2 30.1 18 30.1 16.2 C30.1 14.4 28.9 13.2 27.2 13.2 C25.5 13.2 24.3 14.4 24.3 16.2 Z"
        fill="currentColor"
      />
      <path
        d="M38 22 V10.5 H42.2 V12 C43 11 44.3 10.2 46 10.2 V14.2 C45.5 14 44.8 13.8 44 13.8 C42.2 13.8 41.2 14.9 41.2 16.8 V22 H38 Z"
        fill="currentColor"
      />
      <path
        d="M49 22 V10.5 H53.2 V12 C54 11 55.3 10.2 57 10.2 V14.2 C56.5 14 55.8 13.8 55 13.8 C53.2 13.8 52.2 14.9 52.2 16.8 V22 H49 Z"
        fill="currentColor"
      />
      <path
        d="M60.5 22.2 C56.8 22.2 54.2 19.6 54.2 16.2 C54.2 12.8 56.8 10.2 60.5 10.2 C64.2 10.2 66.8 12.8 66.8 16.2 C66.8 19.6 64.2 22.2 60.5 22.2 Z M60.5 19.2 C62.3 19.2 63.5 18 63.5 16.2 C63.5 14.4 62.3 13.2 60.5 13.2 C58.7 13.2 57.5 14.4 57.5 16.2 C57.5 18 58.7 19.2 60.5 19.2 Z"
        fill="currentColor"
      />
      <path
        d="M70 22 V6 H74.5 C79 6 81.8 8.5 81.8 12.5 C81.8 15.5 80 17.5 77.5 18.2 L82.5 22 H77.5 L73.2 18.5 H74.5 V22 H70 Z M74.5 14.8 H74.8 C76.8 14.8 77.8 13.8 77.8 12.5 C77.8 11.2 76.8 10.2 74.8 10.2 H74.5 V14.8 Z"
        fill="currentColor"
      />
      {/* خط قرمز Lenovo */}
      <rect x="4" y="24.5" width="78" height="2" rx="1" fill="#E2231A" />
    </svg>
  )
}

export function HpLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-auto', className)}
      aria-hidden
    >
      <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path
        d="M8 20 V8 H11.2 V12.5 H15.5 V8 H18.7 V20 H15.5 V15.2 H11.2 V20 H8 Z"
        fill="currentColor"
      />
      <path
        d="M28 20 V8 H31.2 V12.8 H35.5 V8 H38.7 V20 H35.5 V15.5 H31.2 V20 H28 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function DellLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-auto', className)}
      aria-hidden
    >
      {/* دایره DELL */}
      <circle cx="32" cy="14" r="12.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path
        d="M18 20 V8 H23.5 C27.8 8 30.5 10.5 30.5 14 C30.5 17.5 27.8 20 23.5 20 H18 Z M21.5 16.8 H23.2 C25.5 16.8 27 15.6 27 14 C27 12.4 25.5 11.2 23.2 11.2 H21.5 V16.8 Z"
        fill="currentColor"
      />
      <path
        d="M33 20 V8 H37.5 C41.5 8 44 10.3 44 14 C44 17.7 41.5 20 37.5 20 H33 Z M36.5 16.8 H37.2 C39.2 16.8 40.5 15.6 40.5 14 C40.5 12.4 39.2 11.2 37.2 11.2 H36.5 V16.8 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AcerLogo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 72 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-auto', className)}
      aria-hidden
    >
      <path
        d="M8 22 L16 6 H22 L30 22 H24.5 L22.8 18 H15.2 L13.5 22 H8 Z M16.8 14.2 H21.2 L19 9.5 L16.8 14.2 Z"
        fill="currentColor"
      />
      <path
        d="M33 22 V10.5 H37 V12.2 C37.8 11.1 39.2 10.2 41.2 10.2 C44.8 10.2 47 12.8 47 16.2 C47 19.6 44.8 22.2 41.2 22.2 C39.2 22.2 37.8 21.4 37 20.3 V22 H33 Z M37.2 16.2 C37.2 18 38.4 19.2 40 19.2 C41.6 19.2 42.8 18 42.8 16.2 C42.8 14.4 41.6 13.2 40 13.2 C38.4 13.2 37.2 14.4 37.2 16.2 Z"
        fill="currentColor"
      />
      <path
        d="M50.5 22.2 C47 22.2 44.5 19.6 44.5 16.2 C44.5 12.8 47 10.2 50.5 10.2 C54 10.2 56.5 12.8 56.5 16.2 C56.5 19.6 54 22.2 50.5 22.2 Z M50.5 19.2 C52.2 19.2 53.3 18 53.3 16.2 C53.3 14.4 52.2 13.2 50.5 13.2 C48.8 13.2 47.7 14.4 47.7 16.2 C47.7 18 48.8 19.2 50.5 19.2 Z"
        fill="currentColor"
      />
      <path
        d="M59 22 V6 H63.2 V12.5 C64 11.3 65.4 10.2 67.5 10.2 V14.2 C66.8 14 65.9 13.9 65.2 13.9 C63.5 13.9 62.5 15 62.5 16.8 V22 H59 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** مپ برند فارسی → کامپوننت لوگو */
export const brandLogoMap: Record<
  string,
  React.ComponentType<LogoProps>
> = {
  ایسوس: AsusLogo,
  'ام‌اس‌آی': MsiLogo,
  لنوو: LenovoLogo,
  'اچ‌پی': HpLogo,
  دل: DellLogo,
  ایسر: AcerLogo,
}
