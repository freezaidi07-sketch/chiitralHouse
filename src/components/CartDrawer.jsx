import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { pkr, STORE } from '../data/store.js'

export default function CartDrawer() {
  const { open, setOpen, items, subtotal, shipping, setQty } = useCart()
  const close = () => setOpen(false)
  const toFree = STORE.freeShippingOver - subtotal

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div onClick={close} className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside role="dialog" aria-label="Shopping cart" aria-hidden={!open}
        className={`pointer-events-auto absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-xl font-semibold">Your cart</h2>
          <button onClick={close} aria-label="Close cart" className="rounded p-1.5 hover:bg-black/5"><X size={20} /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="mt-1 text-sm text-ink/60">Add a product to get started.</p>
            <Link to="/shop" onClick={close} className="btn-primary mt-6">Browse the shop</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 py-5">
                  <ProductImage product={i} className="h-20 w-20 shrink-0 rounded-sm" />
                  <div className="flex-1">
                    <p className="font-semibold leading-snug">{i.name}</p>
                    <p className="text-xs text-ink/60">{i.size}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded border border-line">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="p-1.5" aria-label="Decrease quantity"><Minus size={14} /></button>
                        <span className="w-7 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="p-1.5" aria-label="Increase quantity"><Plus size={14} /></button>
                      </div>
                      <span className="font-semibold">{pkr(i.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-5">
              {toFree > 0 && <p className="mb-3 text-xs text-ink/65">Add {pkr(toFree)} more for free delivery.</p>}
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{pkr(subtotal)}</span></div>
              <div className="mt-1.5 flex justify-between text-sm"><span>Delivery</span><span>{shipping ? pkr(shipping) : 'Free'}</span></div>
              <Link to="/checkout" onClick={close} className="btn-gold mt-5 w-full">Checkout (cash on delivery)</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
