import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, ShieldCheck, Truck } from 'lucide-react'
import { STORE, NAV } from '../data/store.js'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const [menu, setMenu] = useState(false)
  const { count, setOpen } = useCart()
  const loc = useLocation()
  const cur = loc.pathname + loc.search
  const link = (n) => `text-sm font-medium transition-colors hover:text-brass ${cur === n.to ? 'text-brass' : 'text-ink'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="bg-moss-dark px-4 py-2 text-center text-xs text-white/90 sm:text-sm">
        <span className="font-semibold text-brass-light">Signature pack:</span> 50g shilajit with 10g extra.
        <Link to="/shop" className="ml-2 inline-flex items-center font-bold text-brass-light underline underline-offset-2">Shop now</Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-b border-brass-light/30 bg-[#fbf5e7] px-3 py-2 text-[11px] font-semibold text-ink sm:gap-8 sm:py-2.5 sm:text-xs">
        <span className="inline-flex items-center gap-2 whitespace-nowrap"><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-moss shadow-sm"><ShieldCheck size={14} /></span>30-day money-back guarantee</span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap"><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-moss shadow-sm"><ShoppingBag size={14} /></span>Cash on delivery</span>
        <span className="inline-flex items-center gap-2 whitespace-nowrap"><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-moss shadow-sm"><Truck size={14} /></span>Free delivery over Rs. {STORE.freeShippingOver.toLocaleString()}</span>
      </div>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 leading-none sm:gap-3" onClick={() => setMenu(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-brass-light to-moss text-lg font-bold text-white shadow-sm">CH</span>
          <span>
            <span className="block font-display text-xl font-semibold uppercase tracking-wide text-moss sm:text-2xl">{STORE.name}</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.16em] text-brass sm:text-[10px]">{STORE.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => <Link key={n.label} to={n.to} className={`${link(n)} text-xs font-semibold uppercase tracking-wide`}>{n.label}</Link>)}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <span className="hidden rounded-md bg-bone px-2.5 py-1.5 text-[11px] font-semibold text-ink/70 sm:inline">PK&nbsp; | &nbsp;PKR</span>
          <button onClick={() => setOpen(true)} className="relative flex items-center gap-1.5 rounded-full p-2.5 text-sm font-medium hover:bg-bone" aria-label={`Open cart, ${count} items`}>
            <ShoppingBag size={22} />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-[11px] font-semibold text-white">{count}</span>
          </button>
          <button onClick={() => setMenu(!menu)} className="rounded p-2.5 hover:bg-black/5 lg:hidden" aria-label="Toggle menu" aria-expanded={menu}>
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-line bg-bone px-4 py-3 lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} onClick={() => setMenu(false)} className="block border-b border-line/60 py-3 text-base font-medium last:border-0">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  )
}
