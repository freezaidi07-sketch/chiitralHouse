import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../data/store.js'

export default function Faqs() {
  const [open, setOpen] = useState(0)
  return (
    <div className="container-x max-w-3xl py-12 lg:py-16">
      <h1 className="text-4xl font-semibold">Frequently asked questions</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold">
              {f.q}
              <ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="pb-6 pr-10 leading-relaxed text-ink/75">{f.a}</p>}
          </div>
        ))}
      </div>
      <p className="mt-10 text-ink/70">Still have a question? <Link to="/contact" className="font-semibold text-moss underline underline-offset-4">Contact us</Link>.</p>
    </div>
  )
}
