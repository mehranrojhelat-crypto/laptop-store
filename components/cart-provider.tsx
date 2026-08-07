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

export type CartItem = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  quantity: number
}

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'ADD'; laptop: Laptop; quantity?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; state: CartState }

const STORAGE_KEY = 'laptopland-cart'

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state
    case 'ADD': {
      const qty = action.quantity ?? 1
      const existing = state.items.find((i) => i.id === action.laptop.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.laptop.id
              ? { ...i, quantity: Math.min(i.quantity + qty, 10) }
              : i,
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            id: action.laptop.id,
            name: action.laptop.name,
            brand: action.laptop.brand,
            price: action.laptop.price,
            image: action.laptop.image,
            quantity: qty,
          },
        ],
      }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) }
    case 'SET_QTY':
      return {
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, Math.min(action.quantity, 10)) }
            : i,
        ),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (laptop: Laptop, quantity?: number) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [hydrated, setHydrated] = useState(false)

  // Read the stored cart once on mount, then flip `hydrated` so the persist
  // effect below only runs for real user changes — never for the initial
  // empty state, which would otherwise clobber the saved cart.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartState
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: 'HYDRATE', state: parsed })
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

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    )
    return {
      items: state.items,
      count,
      subtotal,
      addItem: (laptop, quantity) => dispatch({ type: 'ADD', laptop, quantity }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      setQuantity: (id, quantity) =>
        dispatch({ type: 'SET_QTY', id, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
