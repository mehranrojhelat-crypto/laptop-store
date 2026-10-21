'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ProductCard } from '@/components/product-card'
import type { Laptop } from '@/lib/products'
import { Loader2 } from 'lucide-react'

const USE_CASES = [
  { value: 'گیمینگ', label: 'گیمینگ' },
  { value: 'اداری', label: 'کار اداری و روزمره' },
  { value: 'دانشجویی', label: 'دانشجویی' },
  { value: 'مهندسی', label: 'مهندسی و کارهای سنگین' },
  { value: 'اولترابوک', label: 'اولترابوک و حمل‌ونقل زیاد' },
]

const PRIORITIES = [
  { id: 'light', label: 'سبک بودن' },
  { id: 'battery', label: 'باتری قوی' },
  { id: 'screen', label: 'صفحه بزرگ' },
  { id: 'gpu', label: 'قدرت گرافیک بالا' },
  { id: 'performance', label: 'قدرت پردازشی بالا' },
  { id: 'value', label: 'ارزش خرید بالا (قیمت مناسب)' },
]

type FormData = {
  maxBudget: number
  useCase: string
  priorities: string[]
}

export function BudgetFinder() {
  const [form, setForm] = useState<FormData>({
    maxBudget: 40000000,
    useCase: 'گیمینگ',
    priorities: [],
  })
  const [results, setResults] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const togglePriority = (id: string) => {
    setForm((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(id)
        ? prev.priorities.filter((p) => p !== id)
        : [...prev.priorities, id],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch('/api/budget-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResults(data.laptops || [])
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>اطلاعات خود را وارد کنید</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* بودجه */}
            <div className="space-y-2">
              <Label htmlFor="budget">حداکثر بودجه (تومان)</Label>
              <Input
                id="budget"
                type="number"
                value={form.maxBudget}
                onChange={(e) =>
                  setForm({ ...form, maxBudget: Number(e.target.value) })
                }
                min={5000000}
                step={1000000}
                className="text-left"
                dir="ltr"
              />
              <p className="text-sm text-muted-foreground">
                {form.maxBudget.toLocaleString('fa-IR')} تومان
              </p>
            </div>

            {/* کاربرد اصلی */}
            <div className="space-y-3">
              <Label>کاربرد اصلی</Label>
              <RadioGroup
                value={form.useCase}
                onValueChange={(value) => setForm({ ...form, useCase: value })}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {USE_CASES.map((item) => (
                  <div key={item.value} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value} className="cursor-pointer font-normal">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* اولویت‌ها */}
            <div className="space-y-3">
              <Label>اولویت‌های شما (اختیاری - چند مورد انتخاب کنید)</Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PRIORITIES.map((p) => (
                  <div key={p.id} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={p.id}
                      checked={form.priorities.includes(p.id)}
                      onCheckedChange={() => togglePriority(p.id)}
                    />
                    <Label htmlFor={p.id} className="cursor-pointer font-normal">
                      {p.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="ml-2 size-4 animate-spin" />
                  در حال پیدا کردن...
                </>
              ) : (
                'پیدا کردن بهترین گزینه‌ها'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* نتایج */}
      {searched && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            {results.length > 0
              ? `${results.length} گزینه مناسب پیدا شد`
              : 'متأسفانه گزینه‌ای با این شرایط پیدا نشد'}
          </h2>

          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((laptop) => (
                <ProductCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
