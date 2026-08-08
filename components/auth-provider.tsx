'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type User = {
  id: string
  name: string
  email: string
}

type AuthContextValue = {
  user: User | null
  ready: boolean
  login: (email: string, password: string) => { ok: boolean; message?: string }
  register: (name: string, email: string, password: string) => {
    ok: boolean
    message?: string
  }
  logout: () => void
}

const STORAGE_KEY = 'laptopland-auth'
const USERS_KEY = 'laptopland-users'

type StoredUser = User & { password: string }

const AuthContext = createContext<AuthContextValue | null>(null)

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as User
        if (parsed?.id && parsed?.email) setUser(parsed)
      }
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      login: (email, password) => {
        const users = readUsers()
        const found = users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
        )
        if (!found || found.password !== password) {
          return { ok: false, message: 'ایمیل یا رمز عبور اشتباه است' }
        }
        const session: User = {
          id: found.id,
          name: found.name,
          email: found.email,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
        setUser(session)
        return { ok: true }
      },
      register: (name, email, password) => {
        const users = readUsers()
        const exists = users.some(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
        )
        if (exists) {
          return { ok: false, message: 'این ایمیل قبلاً ثبت شده است' }
        }
        if (password.length < 4) {
          return { ok: false, message: 'رمز عبور حداقل ۴ کاراکتر باشد' }
        }
        const newUser: StoredUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }
        writeUsers([...users, newUser])
        const session: User = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
        setUser(session)
        return { ok: true }
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY)
        setUser(null)
      },
    }),
    [user, ready],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
