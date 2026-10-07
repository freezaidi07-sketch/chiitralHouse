import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Zap } from 'lucide-react'
import ProductImage from './ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { pkr, discount } from '../data/store.js'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { add, buyNow } = useCart()
  return (
    <article className="flex flex-col">
      <Link to={`/product/${product.slug}`} aria-label={`${product.name} ${product.size}`} className="relative block overflow-hidden rounded-sm bg-white">
        <ProductImage product={product} className="aspect-square w-full" />
        <span className="absolute left-3 top-3 rounded-sm bg-brass-light px-2 py-1 text-xs font-semibold text-ink">Save {discount(product)}%</span>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="mt-1.5 text-lg font-semibold leading-snug">
          <Link to={`/product/${product.slug}`} className="hover:text-moss">{product.name}</Link>
        </h3>
        <p className="text-sm text-ink/60">{product.size}</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{pkr(product.price)}</span>
          <span className="text-sm text-ink/45 line-through">{pkr(product.oldPrice)}</span>
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <button onClick={() => add(product.id)} className="btn-outline w-full px-2 py-2.5 text-xs sm:text-sm"><ShoppingBag size={14} /> Add to cart</button>
          <button onClick={() => { buyNow(product.id); navigate('/checkout') }} className="btn-primary w-full px-2 py-2.5 text-xs sm:text-sm"><Zap size={14} /> Order now</button>
        </div>
      </div>
    </article>
  )
}
