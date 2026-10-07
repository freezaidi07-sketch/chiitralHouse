import { useState } from 'react'

export default function ProductImage({ product, className = '', loading = 'lazy', alt }) {
  const [failed, setFailed] = useState(false)
  if (failed || !product.image) {
    return (
      <div className={`flex flex-col items-center justify-center bg-moss/[0.06] text-moss ${className}`}>
        <span className="font-display text-2xl font-semibold">{product.size.split(' ')[0]}</span>
        <span className="mt-1 text-xs text-moss/60">Photo coming soon</span>
      </div>
    )
  }
  return <img src={product.image} alt={alt ?? product.imageAlt ?? `${product.name} ${product.size}`} loading={loading} decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
