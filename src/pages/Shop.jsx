import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { PRODUCTS, CATEGORIES } from '../data/store.js'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const sort = params.get('sort') || 'featured'
  const heading = category === 'bundles'
    ? 'Shilajit bundles in Pakistan'
    : category === 'resin'
      ? 'Shilajit resin in Pakistan'
      : 'Buy shilajit online in Pakistan'

  const set = (k, v) => {
    const p = new URLSearchParams(params)
    v === 'all' || v === 'featured' ? p.delete(k) : p.set(k, v)
    setParams(p)
  }

  let list = PRODUCTS.filter((p) => category === 'all' || p.category === category)
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <div className="container-x py-12 lg:py-16">
      <h1 className="text-4xl font-semibold">{heading}</h1>
      <p className="mt-2 max-w-xl text-ink/70">Pure shilajit resin and value bundles, all with cash on delivery across Pakistan.</p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => set('category', c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${category === c.id ? 'border-moss bg-moss text-white' : 'border-line hover:border-ink/40'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-ink/60">Sort by</span>
          <select value={sort} onChange={(e) => set('sort', e.target.value)} className="field !w-auto py-1.5">
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {list.length === 0 && <p className="py-20 text-center text-ink/60">No products in this category yet.</p>}
    </div>
  )
}
