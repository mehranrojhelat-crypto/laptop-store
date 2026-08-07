'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)

    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
    setDark(isDark)
    setReady(true)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  if (!ready) {
    return (
      <Button variant="ghost" size="icon" aria-label="تغییر تم" disabled>
        <Sun className="size-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? 'حالت روشن' : 'حالت تاریک'}
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  )
}
