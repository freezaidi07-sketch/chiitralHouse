import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS, STORE } from '../data/store.js'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [lines, setLines] = useState([])
  const [storageReady, setStorageReady] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ch-cart'))
      if (Array.isArray(stored)) setLines(stored)
    } catch {}
    setStorageReady(true)
  }, [])

  useEffect(() => {
    if (!storageReady) return
    try {
      localStorage.setItem('ch-cart', JSON.stringify(lines))
    } catch {}
  }, [lines, storageReady])

  const add = (id, qty = 1, openDrawer = true) => {
    setLines((l) => l.some((x) => x.id === id)
      ? l.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x))
      : [...l, { id, qty }])
    if (openDrawer) setOpen(true)
  }
  const buyNow = (id, qty = 1) => {
    setLines([{ id, qty }])
    setOpen(false)
  }
  const setQty = (id, qty) => setLines((l) => (qty < 1 ? l.filter((x) => x.id !== id) : l.map((x) => (x.id === id ? { ...x, qty } : x))))
  const clear = () => setLines([])

  const value = useMemo(() => {
    const items = lines.map((x) => ({ ...PRODUCTS.find((p) => p.id === x.id), qty: x.qty })).filter((x) => x.id)
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
    const shipping = !items.length || subtotal >= STORE.freeShippingOver ? 0 : STORE.shippingFee
    return { items, subtotal, shipping, total: subtotal + shipping, count: items.reduce((s, i) => s + i.qty, 0), add, buyNow, setQty, clear, open, setOpen }
  }, [lines, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
