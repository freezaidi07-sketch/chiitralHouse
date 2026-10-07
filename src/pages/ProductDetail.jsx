import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, MessageCircle, Minus, Mountain, PackageCheck, Plus, ShieldCheck, ShoppingBag, Truck, Zap } from 'lucide-react'
import ProductImage from '../components/ProductImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS, pkr, discount, STORE } from '../data/store.js'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = PRODUCTS.find((p) => p.slug === slug)
  const [qty, setQty] = useState(1)
  const { add, buyNow } = useCart()
  const nav = useNavigate()

  if (!product) return (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
    </div>
  )
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)
  const whatsappText = encodeURIComponent(`Hi, I would like to order ${product.name} (${product.size}) x${qty} for ${pkr(product.price * qty)}.`)
  const assurances = [
    { icon: ShieldCheck, text: '30-day money-back guarantee' },
    { icon: Truck, text: 'Cash on delivery' },
  ]
  const highlights = [
    { icon: Mountain, text: 'Chitral House product' },
    { icon: PackageCheck, text: `Size: ${product.size}` },
    { icon: Truck, text: 'Delivery across Pakistan' },
    { icon: ShoppingBag, text: 'Order online in PKR' },
  ]

  return (
    <div className="container-x py-10 lg:py-14">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink/55 sm:mb-8 sm:text-sm" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-moss">Home</Link><span>/</span><Link to="/shop" className="hover:text-moss">Shop</Link><span>/</span><span className="text-ink">{product.name} {product.size}</span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="relative overflow-hidden rounded-lg border border-line bg-white p-3 sm:p-5">
          <span className="absolute left-5 top-5 z-10 rounded-sm bg-red-500 px-2.5 py-1 text-xs font-bold text-white">Save {discount(product)}%</span>
          <ProductImage product={product} loading="eager" className="aspect-square w-full rounded-md bg-white !object-contain" />
        </div>

        <div className="lg:pt-2">
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-ink/60">{product.size}</p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-5">
            <span className="text-3xl font-bold text-moss">{pkr(product.price * qty)}</span>
            <span className="text-sm text-ink/45 line-through">{pkr(product.oldPrice * qty)}</span>
            <span className="text-sm font-semibold text-brass">Save {discount(product)}%</span>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">{product.desc}</p>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {assurances.map(({ icon: Icon, text }) => (
              <div key={text} className="flex min-h-11 items-center gap-2 rounded-md border border-brass/40 bg-moss px-3 py-2 text-xs font-semibold leading-4 text-white shadow-sm">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass-light text-moss"><Check size={14} strokeWidth={3} /></span>
                <Icon size={16} className="hidden text-brass-light sm:block" />{text}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex min-h-12 items-center gap-2.5 rounded-md border border-moss/20 bg-moss/[0.035] px-3 py-2 text-xs font-medium leading-4 text-ink/80">
                <Icon size={18} className="shrink-0 text-moss" />{text}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/65">Quantity</label>
              <div className="inline-flex h-10 items-center rounded border border-line bg-white">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-full w-10 place-items-center hover:bg-bone" aria-label="Decrease quantity"><Minus size={15} /></button>
                <span className="w-9 text-center text-sm font-medium" aria-live="polite">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-full w-10 place-items-center hover:bg-bone" aria-label="Increase quantity"><Plus size={15} /></button>
              </div>
            </div>
            <p className="pb-1 text-right text-xs text-ink/65">Subtotal <strong className="ml-1 text-ink">{pkr(product.price * qty)}</strong></p>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button onClick={() => add(product.id, qty)} className="btn-primary w-full"><ShoppingBag size={16} /> Add to cart</button>
            <button onClick={() => { buyNow(product.id, qty); nav('/checkout') }} className="btn-gold w-full"><Zap size={16} /> Buy it now</button>
            <a href={`https://wa.me/${STORE.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#20c66b] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#16ad5b] sm:col-span-2"><MessageCircle size={17} /> Order on WhatsApp</a>
          </div>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-moss hover:text-brass">Ask us about this product <ArrowRight size={14} /></Link>
          <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-ink/55">Follow the product label for directions. If you are pregnant, taking medication or have a medical condition, consult a qualified healthcare professional before using a supplement.</p>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-2xl font-semibold">You may also like</h2>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
