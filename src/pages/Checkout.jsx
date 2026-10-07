import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, CheckCircle2, ChevronRight, LockKeyhole, MapPin, PackageCheck, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import ProductImage from '../components/ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { pkr, STORE } from '../data/store.js'

export default function Checkout() {
  const { items, subtotal, shipping, total, clear } = useCart()
  const [f, setF] = useState({ name: '', phone: '', city: '', address: '', note: '' })
  const [done, setDone] = useState(null)
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const id = 'CH' + Date.now().toString().slice(-6)
    const lines = items.map((i) => `- ${i.name} ${i.size} x${i.qty}: ${pkr(i.price * i.qty)}`).join('\n')
    const text = `New order ${id}\n\n${lines}\n\nDelivery: ${shipping ? pkr(shipping) : 'Free'}\nTotal (COD): ${pkr(total)}\n\nName: ${f.name}\nPhone: ${f.phone}\nCity: ${f.city}\nAddress: ${f.address}${f.note ? `\nNote: ${f.note}` : ''}`
    setDone({ id, name: f.name, wa: `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}` })
    clear()
  }

  if (done) return (
    <div className="container-x max-w-xl py-16 sm:py-24">
      <div className="border border-line bg-white px-6 py-10 text-center sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss/10 text-moss"><CheckCircle2 size={32} /></span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brass">Order received</p>
        <h1 className="mt-2 text-3xl font-semibold">Thank you, {done.name}</h1>
        <p className="mt-3 text-sm leading-6 text-ink/70">Order <strong>{done.id}</strong> is ready for confirmation. Send the details on WhatsApp and our team will verify delivery with you.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={done.wa} target="_blank" rel="noreferrer" className="btn-primary"><Check size={16} /> Confirm on WhatsApp</a>
          <Link to="/shop" className="btn-outline">Continue shopping</Link>
        </div>
      </div>
    </div>
  )

  if (!items.length) return (
    <div className="container-x max-w-xl py-16 sm:py-24">
      <div className="border border-line bg-white px-6 py-10 text-center sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss/10 text-moss"><ShoppingBag size={27} /></span>
        <h1 className="mt-5 text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink/65">Browse the shop and add something to your order.</p>
        <Link to="/shop" className="btn-primary mt-6">Browse the shop <ArrowRight size={16} /></Link>
      </div>
    </div>
  )

  return (
    <div className="container-x max-w-6xl py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-xs text-ink/55 sm:text-sm" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-moss">Home</Link><ChevronRight size={14} /><Link to="/shop" className="hover:text-moss">Shop</Link><ChevronRight size={14} /><span className="text-ink">Checkout</span>
      </nav>

      <div className="mt-6 flex flex-col justify-between gap-6 border-b border-line pb-6 sm:mt-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Cash on delivery</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Complete your order</h1>
          <p className="mt-2 text-sm text-ink/65">Add your delivery details and review your items before confirming.</p>
        </div>
        <ol className="flex w-full max-w-sm items-center gap-2 text-xs font-semibold sm:w-auto" aria-label="Checkout progress">
          <li className="flex items-center gap-1.5 text-moss"><span className="grid h-6 w-6 place-items-center rounded-full bg-moss text-white"><Check size={13} /></span><span>Cart</span></li>
          <span className="h-px flex-1 bg-line sm:w-8 sm:flex-none" />
          <li aria-current="step" className="flex items-center gap-1.5 text-moss"><span className="grid h-6 w-6 place-items-center rounded-full border border-moss bg-white">2</span><span>Delivery</span></li>
          <span className="h-px flex-1 bg-line sm:w-8 sm:flex-none" />
          <li className="flex items-center gap-1.5 text-ink/45"><span className="grid h-6 w-6 place-items-center rounded-full border border-line bg-white">3</span><span>Confirmation</span></li>
        </ol>
      </div>

      <div className="grid items-start gap-8 pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:gap-12 lg:pt-9">
        <form onSubmit={submit} className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-moss/10 text-moss"><MapPin size={19} /></span>
            <div><h2 className="text-xl font-semibold">Delivery details</h2><p className="mt-0.5 text-xs text-ink/60">Where should we send your order?</p></div>
          </div>

          <div className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <div><label className="mb-1.5 block text-sm font-medium" htmlFor="cn">Full name</label><input id="cn" required value={f.name} onChange={on('name')} className="field" autoComplete="name" placeholder="Your full name" /></div>
            <div><label className="mb-1.5 block text-sm font-medium" htmlFor="cp">Phone number</label><input id="cp" required type="tel" pattern="[0-9+\s\-]{10,15}" title="Enter a valid phone number" placeholder="0300 1234567" value={f.phone} onChange={on('phone')} className="field" autoComplete="tel" /></div>
            <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium" htmlFor="cc">City</label><input id="cc" required value={f.city} onChange={on('city')} className="field" autoComplete="address-level2" placeholder="City" /></div>
            <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium" htmlFor="ca">Full address</label><textarea id="ca" required rows={3} placeholder="House number, street, area" value={f.address} onChange={on('address')} className="field resize-y" autoComplete="street-address" /></div>
            <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium" htmlFor="cm">Order note <span className="font-normal text-ink/50">(optional)</span></label><input id="cm" value={f.note} onChange={on('note')} className="field" placeholder="Delivery instructions" /></div>
          </div>

          <div className="mt-6 flex gap-3 border border-moss/15 bg-moss/[0.035] p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-moss"><PackageCheck size={19} /></span>
            <div><p className="text-sm font-semibold">Cash on delivery</p><p className="mt-1 text-xs leading-5 text-ink/65">Pay the courier when your order arrives. We’ll call to confirm your details.</p></div>
          </div>
          <button className="btn-gold mt-5 min-h-12 w-full sm:w-auto"><LockKeyhole size={16} /> Place order <ArrowRight size={16} /></button>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/50"><ShieldCheck size={14} /> Your details are only used to deliver and confirm this order.</p>
        </form>

        <aside className="h-fit border border-line bg-white p-5 sm:p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-brass">Review</p><h2 className="mt-1 text-xl font-semibold">Order summary</h2></div>
            <span className="rounded-full bg-bone px-2.5 py-1 text-xs font-semibold text-ink/70">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          </div>
          <ul className="divide-y divide-line">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-4">
                <ProductImage product={i} className="h-[68px] w-[68px] shrink-0 rounded-sm border border-line/70 bg-white object-contain" />
                <div className="min-w-0 flex-1 text-sm"><p className="font-semibold leading-snug">{i.name}</p><p className="mt-1 text-xs text-ink/60">{i.size} <span className="px-1">·</span> Qty {i.qty}</p></div>
                <span className="shrink-0 text-sm font-semibold">{pkr(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-ink/65">Subtotal</dt><dd>{pkr(subtotal)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink/65">Delivery</dt><dd>{shipping ? pkr(shipping) : <span className="font-medium text-moss">Free</span>}</dd></div>
            <div className="flex justify-between gap-4 border-t border-line pt-3 text-base font-bold"><dt>Total due on delivery</dt><dd className="text-moss">{pkr(total)}</dd></div>
          </dl>
          {shipping > 0 && <p className="mt-4 border border-brass/25 bg-[#fbf5e7] px-3 py-2.5 text-xs leading-5 text-ink/75">Add {pkr(STORE.freeShippingOver - subtotal)} more for free delivery.</p>}
          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink/55"><Truck size={15} className="shrink-0 text-moss" /> Delivery usually takes 2 to 4 working days.</div>
        </aside>
      </div>
    </div>
  )
}
