// Edit store details, products and FAQs here. Pages update automatically.
export const STORE = {
  name: 'Chitral House',
  tagline: 'Pure Himalayan Shilajit',
  phone: '+92 300 1234567',
  whatsapp: '923001234567', // country code + number, no + or spaces
  email: 'support@chitralhouseshilajit.com',
  address: 'University Road, Peshawar, Pakistan',
  freeShippingOver: 3000,
  shippingFee: 200,
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Bundles', to: '/shop?category=bundles' },
  { label: 'Lab Reports', to: '/lab-reports' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]

export const CATEGORIES = [
  { id: 'all', label: 'All products' },
  { id: 'resin', label: 'Shilajit resin' },
  { id: 'bundles', label: 'Bundles' },
]

// Put product photos in /public/products and set the file name in `image`.
export const PRODUCTS = [
  { id: 1, slug: 'signature-gold-resin-60g', name: 'Signature Gold Resin', size: '50g + 10g free', category: 'resin', price: 3999, oldPrice: 9999, featured: true, image: '/reports/photos/Shilajit.webp', imageAlt: 'Shilajit resin jar and product box',
    desc: 'Our flagship resin, supplied as a 50g pack with 10g extra.' },
  { id: 2, slug: 'shilajit-resin-10g', name: 'Pure Shilajit Resin', size: '10g', category: 'resin', price: 1400, oldPrice: 1800, image: '/reports/photos/shilajeetc.webp', imageAlt: 'Dark shilajit resin lifted from a bowl with a spoon',
    desc: 'A starter jar to try pure Chitral shilajit before moving to a larger size.' },
  { id: 3, slug: 'shilajit-resin-20g', name: 'Pure Shilajit Resin', size: '20g', category: 'resin', price: 2400, oldPrice: 3500, image: '/reports/photos/shilajeett.webp', imageAlt: 'Shilajit drops bottle beside a cup of tea',
    desc: 'A 20g resin pack in the Chitral House product range.' },
  { id: 4, slug: 'shilajit-resin-30g', name: 'Pure Shilajit Resin', size: '30g', category: 'resin', price: 3200, oldPrice: 6200, image: '/reports/photos/shilajeetl.webp', imageAlt: 'Chitral House shilajit jar and product box',
    desc: 'A 30g shilajit resin jar in the Chitral House product range.' },
  { id: 5, slug: 'resin-and-drops-bundle', name: 'Resin and Drops Bundle', size: '60g resin + 30ml drops', category: 'bundles', price: 6500, oldPrice: 15000, image: '/reports/photos/shilajeetm.webp', imageAlt: 'Chitral House shilajit jar and product packaging',
    desc: 'Resin for your morning routine and liquid drops for on-the-go use, at a bundle price.' },
]

export const FAQS = [
  { q: 'What shilajit products can I order?', a: 'Browse the listed resin sizes and resin-and-drops bundle. Contact Chitral House if you have questions about a product before ordering.' },
  { q: 'Where can I find product quality documents?', a: 'Verified report PDFs and certificates will be listed on our lab reports page when available. Contact us for current product information.' },
  { q: 'How should I use shilajit?', a: 'Follow the directions on the product label. For questions about whether a supplement is appropriate for you, ask a qualified healthcare professional.' },
  { q: 'How long does delivery take?', a: 'We ship by courier with cash on delivery. Delivery usually takes 2 to 4 working days to major cities across Pakistan.' },
  { q: 'What is your return policy?', a: 'If you are not satisfied, contact us within 30 days of delivery and we will arrange a refund or replacement.' },
]

// Add verified entries only after the corresponding PDF files are available.
export const REPORTS = []

export const pkr = (n) => 'Rs. ' + n.toLocaleString('en-PK')
export const discount = (p) => Math.round((1 - p.price / p.oldPrice) * 100)
