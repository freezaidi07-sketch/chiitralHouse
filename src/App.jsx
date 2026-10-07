import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SEO from './components/SEO.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import LabReports from './pages/LabReports.jsx'
import Faqs from './pages/Faqs.jsx'
import Contact from './pages/Contact.jsx'
import Checkout from './pages/Checkout.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <SEO />
      <ScrollToTop />
      <Header />
      <main className="min-h-[60vh]"><Outlet /></main>
      <Footer />
      <CartDrawer />
    </>
  )
}

function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-ink/70">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path="lab-reports" element={<LabReports />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
