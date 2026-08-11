'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastData = {
  id: number
  message: string
  actionHref?: string
  actionLabel?: string
}

type ToastContextValue = {
  toast: (message: string, options?: { actionHref?: string; actionLabel?: string }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastData[]>([])

  const toast = useCallback(
    (message: string, options?: { actionHref?: string; actionLabel?: string }) => {
      const id = Date.now()
      setItems((prev) => [
        ...prev,
        {
          id,
          message,
          actionHref: options?.actionHref,
          actionLabel: options?.actionLabel,
        },
      ])
      // بعد از ۳ ثانیه حذف
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    [],
  )

  const dismiss = (id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-[100] flex flex-col items-center gap-2 sm:left-auto sm:right-4 sm:items-end">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg',
              'animate-in slide-in-from-bottom-4 fade-in duration-300',
            )}
            role="status"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-4" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.message}</p>
              {item.actionHref && (
                <Link
                  href={item.actionHref}
                  className="mt-0.5 inline-block text-xs font-semibold text-primary hover:underline"
                  onClick={() => dismiss(item.id)}
                >
                  {item.actionLabel ?? 'مشاهده سبد'}
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => dismiss(item.id)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="بستن"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
