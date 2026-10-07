import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Mountain,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS, pkr } from '../data/store.js'

const facts = [
  { icon: Mountain, title: 'Chitral House', text: 'Shilajit resin and bundle products.' },
  { icon: Truck, title: 'Delivery across Pakistan', text: 'Free shipping on orders over Rs. 3,000.' },
  { icon: ShoppingBag, title: 'Cash on delivery', text: 'Pay the courier when your order arrives.' },
  { icon: ShieldCheck, title: '30-day guarantee', text: 'Reach out for a refund or replacement.' },
]

const categories = [
  {
    title: 'Himalayan resin',
    text: 'Our signature mineral resin, available in 10g, 20g and 30g jars.',
    image: '/reports/photos/shilajeetm.webp',
    alt: 'Chitral House shilajit jars and box on a dark background',
    to: '/shop?category=resin',
  },
  {
    title: 'Bundles & savings',
    text: 'Pair your daily resin routine with convenient liquid drops.',
    image: '/reports/photos/shilajeetc.webp',
    alt: 'Spoon lifting dark shilajit resin from a bowl',
    to: '/shop?category=bundles',
  },
  {
    title: 'Product support',
    text: 'Ask questions about products, sizes or delivery.',
    image: '/reports/photos/shilajeetl.webp',
    alt: 'Chitral House shilajit jar and product box',
    to: '/contact',
  },
]

const benefits = [
  { icon: PackageCheck, title: 'Resin sizes', text: 'Compare the available 10g, 20g and 30g packs.' },
  { icon: ShoppingBag, title: 'Resin and drops bundle', text: 'Review the 60g resin and 30ml drops bundle details.' },
  { icon: Truck, title: 'Delivery and payment', text: 'Cash on delivery is available across Pakistan.' },
]

const questions = [
  ['What shilajit products can I order?', 'Browse the listed resin sizes and resin-and-drops bundle. Contact Chitral House if you have questions about a product before ordering.'],
  ['Where can I find product quality documents?', 'Verified report PDFs and certificates will be listed on our lab reports page when available. Contact us for current product information.'],
  ['How should I use shilajit?', 'Follow the directions on the product label. Ask a qualified healthcare professional before using a supplement if you are pregnant, taking medication or have a medical condition.'],
  ['How long does delivery take?', 'Orders ship across Pakistan by courier, usually arriving within 2 to 4 business days. Cash on delivery is available.'],
]

export default function Home() {
  const { add } = useCart()
  const hero = PRODUCTS.find((product) => product.featured) ?? PRODUCTS[0]
  const best = [
    ...PRODUCTS.filter((product) => product.category === 'bundles'),
    ...PRODUCTS.filter((product) => product.category === 'resin' && !product.featured),
  ].slice(0, 4)

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(112deg,#14211c_0%,#1f3d33_56%,#17251f_100%)] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#e6b44e_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="container-x relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brass-light/40 bg-white/5 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brass-light">
              <Mountain size={15} /> From the Hindukush & Karakoram
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              Authentic Himalayan <span className="text-brass-light">shilajit in Pakistan</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Shilajit resin and bundle products from Chitral House, available to order online across Pakistan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop-section" className="btn-gold px-7 py-3.5">Shop shilajit <ArrowRight size={17} /></a>
              <Link to="/contact" className="btn border border-white/35 text-white hover:border-brass-light hover:text-brass-light">Contact us</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={16} className="text-brass-light" /> Product sizes listed</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={16} className="text-brass-light" /> Cash on delivery</span>
              <span className="inline-flex items-center gap-1.5"><BadgeCheck size={16} className="text-brass-light" /> 30-day guarantee</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-3 rounded-2xl bg-brass-light/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/10 p-2.5 shadow-2xl">
              <img
                src="/reports/photos/image.webp"
                alt="Chitral House Shilajit resin jar and product box"
                className="h-[300px] w-full rounded-lg bg-white object-contain sm:h-[390px]"
              />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-3 rounded-lg border border-white/10 bg-ink/90 p-4 backdrop-blur sm:inset-x-8 sm:bottom-8 sm:p-5">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brass-light">Customer favourite</span>
                  <p className="mt-1 truncate text-base font-semibold sm:text-lg">{hero.name} · {hero.size}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold text-brass-light">{pkr(hero.price)}</p>
                  <button onClick={() => add(hero.id)} className="mt-1 text-xs font-semibold text-white/75 underline underline-offset-4 hover:text-white">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Store guarantees" className="border-y border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-3 py-6 sm:gap-5 sm:py-7 md:grid-cols-4 md:py-8">
          {facts.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex min-h-[82px] items-start gap-3 rounded-md border border-line/70 bg-white p-3 sm:min-h-0 sm:border-0 sm:bg-transparent sm:p-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-moss/10 text-moss"><Icon size={20} /></span>
              <div className="min-w-0"><h2 className="text-sm font-semibold leading-5">{title}</h2><p className="mt-1 text-[13px] leading-5 text-ink/65">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <div className="mx-auto mb-9 max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Explore Chitral House</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Find your daily ritual</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.title} to={category.to} className="group overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-lg">
              <div className="overflow-hidden bg-moss/5">
                <img src={category.image} alt={category.alt} loading="lazy" className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div><h3 className="text-lg font-semibold">{category.title}</h3><p className="mt-1 text-sm leading-5 text-ink/65">{category.text}</p></div>
                <ArrowRight size={19} className="shrink-0 text-brass transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="shop-section" className="scroll-mt-24 border-y border-line bg-[#efeee8] py-16 sm:py-20">
        <div className="container-x">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Best sellers</p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Shop shilajit resin and bundles</h2>
              <p className="mt-2 max-w-2xl text-sm text-ink/65">Compare available product sizes, bundle contents and prices.</p>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-moss hover:text-brass">View all products <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {best.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section id="labs" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Product information</p>
            <h2 className="mt-2 max-w-xl text-3xl font-semibold sm:text-4xl">Questions before you order?</h2>
            <p className="mt-4 max-w-xl leading-7 text-ink/70">Compare available product sizes and prices, or contact Chitral House with questions about a product or order.</p>
            <Link to="/shop" className="btn-primary mt-7">Browse products <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=700&auto=format&fit=crop" alt="Wellness products" loading="lazy" className="h-48 w-full rounded-lg object-cover sm:h-60" />
            <div className="mt-8 flex min-h-48 flex-col justify-between rounded-lg bg-moss p-5 text-white sm:mt-12 sm:min-h-60 sm:p-7">
              <PackageCheck size={29} className="text-brass-light" />
              <div><p className="text-xs font-bold uppercase tracking-widest text-brass-light">Customer support</p><p className="mt-2 text-xl font-semibold">Product details before purchase.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="scroll-mt-24 border-t border-line bg-bone py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto mb-9 max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Product guide</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Compare products before you order</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">Review product sizes, bundle contents, prices and delivery information to choose the option that suits your order.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border-t-2 border-brass-light bg-white p-6">
                <Icon size={23} className="text-moss" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line bg-white py-16 sm:py-20">
        <div className="container-x max-w-4xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Need to know</p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {questions.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold marker:hidden">
                  {question}<span className="text-xl font-normal text-brass transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pt-3 text-sm leading-6 text-ink/70">{answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ink/65">Still have questions? <Link to="/faqs" className="font-semibold text-moss underline underline-offset-4">Visit our help page</Link></p>
        </div>
      </section>
    </>
  )
}