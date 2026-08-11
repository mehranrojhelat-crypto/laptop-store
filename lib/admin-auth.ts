import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // بعداً تو .env بگذار

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  return token === 'authenticated'
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated()
  if (!ok) {
    throw new Error('Unauthorized')
  }
}
