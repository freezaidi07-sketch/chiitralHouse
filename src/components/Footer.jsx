import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { STORE, NAV } from '../data/store.js'

export default function Footer() {
  return (
    <footer className="mt-24 bg-moss-dark text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold text-white">{STORE.name}</p>
          <p className="mt-3 text-sm leading-relaxed">Shilajit resin and bundle products from Chitral House, delivered across Pakistan.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => <li key={n.label}><Link to={n.to} className="hover:text-brass-light">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Customer care</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/faqs" className="hover:text-brass-light">Shipping and returns</Link></li>
            <li><Link to="/contact" className="hover:text-brass-light">Order enquiries</Link></li>
            <li><Link to="/faqs" className="hover:text-brass-light">Frequently asked questions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" />{STORE.address}</li>
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" />{STORE.phone}</li>
            <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0" />{STORE.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        &copy; {new Date().getFullYear()} {STORE.name} Shilajit. All rights reserved.
      </div>
    </footer>
  )
}
