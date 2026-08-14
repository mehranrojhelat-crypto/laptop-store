'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { Laptop } from '@/lib/products'

const STORAGE_KEY = 'laptopland-compare'
const MAX_ITEMS = 4

type CompareState = { items: Laptop[] }

type CompareAction =
  | { type: 'ADD'; laptop: Laptop }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: CompareState }

function reducer(state: CompareState, action: CompareAction): CompareState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state
    case 'ADD': {
      if (state.items.some((i) => i.id === action.laptop.id)) return state
      if (state.items.length >= MAX_ITEMS) return state
      return { items: [...state.items, action.laptop] }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

type CompareContextValue = {
  items: Laptop[]
  count: number
  max: number
  isInCompare: (id: string) => boolean
  addItem: (laptop: Laptop) => boolean
  removeItem: (id: string) => void
  clear: () => void
  canAdd: boolean
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CompareState
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({
            type: 'HYDRATE',
            state: { items: parsed.items.slice(0, MAX_ITEMS) },
          })
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state, hydrated])

  const value = useMemo<CompareContextValue>(() => {
    return {
      items: state.items,
      count: state.items.length,
      max: MAX_ITEMS,
      isInCompare: (id) => state.items.some((i) => i.id === id),
      canAdd: state.items.length < MAX_ITEMS,
      addItem: (laptop) => {
        if (state.items.some((i) => i.id === laptop.id)) return false
        if (state.items.length >= MAX_ITEMS) return false
        dispatch({ type: 'ADD', laptop })
        return true
      },
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
