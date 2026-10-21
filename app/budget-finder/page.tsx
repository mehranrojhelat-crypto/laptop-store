import { BudgetFinder } from '@/components/budget-finder'

export const metadata = {
  title: 'بودجه من چقدر می‌ارزد؟ | لپ‌تاپ‌لند',
  description: 'با وارد کردن بودجه و نیازهایتان، بهترین لپ‌تاپ‌ها را پیدا کنید',
}

export default function BudgetFinderPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          بودجه من چقدر می‌ارزد؟
        </h1>
        <p className="mt-3 text-muted-foreground">
          بودجه، کاربرد و اولویت‌هایت را بگو تا بهترین گزینه‌ها را برات پیدا کنیم
        </p>
      </div>

      <BudgetFinder />
    </div>
  )
}
