'use client'

import { useState, useRef, useEffect } from 'react'
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Headphones,
  Bot,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Message = {
  id: number
  text: string
  from: 'user' | 'bot'
  time: string
}

const QUICK_REPLIES = [
  'ساعات کاری پشتیبانی چقدره؟',
  'چطور سفارش ثبت کنم؟',
  'وضعیت گارانتی محصولات چطوره؟',
  'هزینه ارسال چقدره؟',
  'می‌خوام با پشتیبان صحبت کنم',
]

const BOT_RESPONSES: Record<string, string> = {
  'ساعات کاری پشتیبانی چقدره؟':
    'پشتیبانی ما همه روزه از ساعت ۹ صبح تا ۲۲ شب پاسخگو هست. روزهای تعطیل هم از ۱۰ تا ۱۸ فعالیم 😊',
  'چطور سفارش ثبت کنم؟':
    'کافیه محصول مورد نظرت رو به سبد خرید اضافه کنی، بعد از طریق صفحه سبد خرید به مرحله پرداخت بری. پرداخت امن و سریع انجام می‌شه.',
  'وضعیت گارانتی محصولات چطوره؟':
    'تمام لپ‌تاپ‌های فروشگاه دارای ۱۸ ماه گارانتی رسمی هستن. جزئیات گارانتی هر محصول در صفحه خودش نوشته شده.',
  'هزینه ارسال چقدره؟':
    'ارسال به سراسر کشور انجام می‌شه. برای سفارش‌های بالای ۵۰ میلیون تومان ارسال رایگانه. جزئیات دقیق در صفحه پرداخت نشون داده می‌شه.',
  'می‌خوام با پشتیبان صحبت کنم':
    'حتماً! می‌تونی از طریق واتساپ یا تلگرام با پشتیبان واقعی صحبت کنی. دکمه‌های زیر رو بزن.',
  default:
    'ممنون از پیامت! یکی از همکاران پشتیبانی به زودی پاسخ می‌ده. در ضمن می‌تونی از گزینه‌های سریع پایین استفاده کنی یا مستقیم با واتساپ/تلگرام در ارتباط باشی.',
}

function getTime() {
  return new Date().toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'سلام! 👋 به پشتیبانی لپ‌تاپ‌لند خوش اومدی. چطور می‌تونم کمکت کنم؟',
      from: 'bot',
      time: getTime(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, messages, isTyping])

  const addBotReply = (userText: string) => {
    setIsTyping(true)
    setTimeout(() => {
      const reply =
        BOT_RESPONSES[userText] || BOT_RESPONSES.default
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: reply,
          from: 'bot',
          time: getTime(),
        },
      ])
      setIsTyping(false)
    }, 900 + Math.random() * 600)
  }

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const newMsg: Message = {
      id: Date.now(),
      text: trimmed,
      from: 'user',
      time: getTime(),
    }
    setMessages((prev) => [...prev, newMsg])
    setInput('')
    addBotReply(trimmed)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* دکمه شناور */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'fixed bottom-6 left-6 z-50 flex size-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300',
          'bg-primary text-primary-foreground hover:scale-110 hover:shadow-primary/40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isOpen && 'rotate-90 scale-90'
        )}
        aria-label={isOpen ? 'بستن چت پشتیبانی' : 'باز کردن چت پشتیبانی'}
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            ۱
          </span>
        )}
      </button>

      {/* پنجره چت */}
      <div
        className={cn(
          'fixed bottom-24 left-6 z-50 flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl transition-all duration-300 origin-bottom-left',
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'pointer-events-none scale-95 opacity-0 translate-y-4'
        )}
      >
        {/* هدر */}
        <div className="flex items-center gap-3 bg-gradient-to-l from-primary to-orange-600 px-4 py-3.5 text-primary-foreground">
          <div className="flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Headphones className="size-5" />
          </div>
          <div className="flex-1">
            <p className="font-bold">پشتیبانی لپ‌تاپ‌لند</p>
            <p className="flex items-center gap-1.5 text-xs text-white/90">
              <span className="size-2 rounded-full bg-green-400 animate-pulse" />
              آنلاین — معمولاً زیر ۲ دقیقه پاسخ می‌دیم
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 transition hover:bg-white/20"
            aria-label="بستن"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* پیام‌ها */}
        <div className="flex h-[340px] flex-col gap-3 overflow-y-auto bg-secondary/30 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex max-w-[85%] flex-col gap-1',
                msg.from === 'user' ? 'mr-auto items-end' : 'ml-auto items-start'
              )}
            >
              <div
                className={cn(
                  'flex items-start gap-2',
                  msg.from === 'user' && 'flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full',
                    msg.from === 'bot'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {msg.from === 'bot' ? (
                    <Bot className="size-3.5" />
                  ) : (
                    <User className="size-3.5" />
                  )}
                </div>
                <div
                  className={cn(
                    'rounded-2xl px-3.5 py-2.5 text-sm leading-6 shadow-sm',
                    msg.from === 'bot'
                      ? 'rounded-tr-md bg-card border border-border/60'
                      : 'rounded-tl-md bg-primary text-primary-foreground'
                  )}
                >
                  {msg.text}
                </div>
              </div>
              <span className="px-9 text-[10px] text-muted-foreground">
                {msg.time}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="ml-auto flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Bot className="size-3.5" />
              </div>
              <div className="flex gap-1 rounded-2xl rounded-tr-md border border-border/60 bg-card px-4 py-3">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* پاسخ‌های سریع */}
        <div className="flex gap-2 overflow-x-auto border-t border-border/50 bg-card px-3 py-2.5 scrollbar-none">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => sendMessage(reply)}
              className="shrink-0 rounded-full border border-border/70 bg-secondary/50 px-3 py-1.5 text-xs font-medium transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* ورودی پیام */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border/60 bg-card p-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیامت رو بنویس..."
            className="h-10 flex-1 rounded-xl border border-border/70 bg-secondary/40 px-3.5 text-sm outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
          <Button
            type="submit"
            size="icon"
            className="size-10 shrink-0 rounded-xl"
            disabled={!input.trim()}
          >
            <Send className="size-4" />
          </Button>
        </form>

        {/* دکمه‌های ارتباط مستقیم */}
        <div className="flex gap-2 border-t border-border/50 bg-secondary/20 px-3 py-2.5">
          <a
            href="https://wa.me/989123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/15 py-2 text-xs font-semibold text-[#128C7E] transition hover:bg-[#25D366]/25"
          >
            <Phone className="size-3.5" />
            واتساپ
          </a>
          <a
            href="https://t.me/laptopland_support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0088cc]/15 py-2 text-xs font-semibold text-[#0088cc] transition hover:bg-[#0088cc]/25"
          >
            <Send className="size-3.5" />
            تلگرام
          </a>
        </div>
      </div>
    </>
  )
}
