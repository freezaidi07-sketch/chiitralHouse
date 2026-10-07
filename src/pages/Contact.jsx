import { useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { STORE } from '../data/store.js'

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', message: '' })
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const send = (e) => {
    e.preventDefault()
    const text = `Hello Chitral House, I am ${f.name} (${f.phone}).\n\n${f.message}`
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
  }
  const info = [[Phone, 'Phone and WhatsApp', STORE.phone], [Mail, 'Email', STORE.email], [MapPin, 'Address', STORE.address]]

  return (
    <div className="container-x py-12 lg:py-16">
      <h1 className="text-4xl font-semibold">Contact us</h1>
      <p className="mt-3 max-w-xl text-ink/70">Questions about an order, a product or wholesale? Send us a message.</p>
      <div className="mt-12 grid gap-12 lg:grid-cols-5">
        <ul className="space-y-7 lg:col-span-2">
          {info.map(([Icon, t, v]) => (
            <li key={t} className="flex gap-4"><Icon size={22} className="mt-0.5 text-brass" /><div><p className="font-semibold">{t}</p><p className="text-ink/70">{v}</p></div></li>
          ))}
        </ul>
        <form onSubmit={send} className="space-y-4 rounded-sm border border-line bg-white p-6 sm:p-8 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1.5 block text-sm font-medium" htmlFor="n">Full name</label><input id="n" required value={f.name} onChange={on('name')} className="field" /></div>
            <div><label className="mb-1.5 block text-sm font-medium" htmlFor="p">Phone number</label><input id="p" required type="tel" value={f.phone} onChange={on('phone')} className="field" /></div>
          </div>
          <div><label className="mb-1.5 block text-sm font-medium" htmlFor="m">Message</label><textarea id="m" required rows={5} value={f.message} onChange={on('message')} className="field" /></div>
          <button className="btn-primary">Send on WhatsApp</button>
        </form>
      </div>
    </div>
  )
}
