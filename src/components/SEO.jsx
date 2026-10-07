import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMetadata, getStructuredData } from '../seo/metadata.js'

function setMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function SEO() {
  const location = useLocation()
  const metadata = getPageMetadata(location.pathname, location.search)
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL
  const siteOrigin = typeof window === 'undefined'
    ? configuredSiteUrl || ''
    : new URL(configuredSiteUrl || window.location.origin).origin
  const canonicalUrl = siteOrigin && metadata.canonicalPath ? new URL(metadata.canonicalPath, siteOrigin).href : ''
  const imageUrl = metadata.image && siteOrigin ? new URL(metadata.image, siteOrigin).href : undefined

  useEffect(() => {
    document.title = metadata.title
    setMeta('meta[name="description"]', { name: 'description' }, metadata.description)
    setMeta('meta[name="robots"]', { name: 'robots' }, metadata.noindex ? 'noindex,follow' : 'index,follow')
    setMeta('meta[property="og:type"]', { property: 'og:type' }, metadata.kind === 'product' ? 'product' : 'website')
    setMeta('meta[property="og:title"]', { property: 'og:title' }, metadata.title)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, metadata.description)
    setMeta('meta[property="og:locale"]', { property: 'og:locale' }, 'en_PK')
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, imageUrl ? 'summary_large_image' : 'summary')
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, metadata.description)

    if (imageUrl) {
      setMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl)
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl)
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove()
      document.head.querySelector('meta[name="twitter:image"]')?.remove()
    }

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = canonicalUrl
      setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    } else {
      canonical?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    document.head.querySelectorAll('script[data-seo-schema]').forEach((script) => script.remove())
    getStructuredData(metadata, siteOrigin).forEach((data) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoSchema = 'true'
      script.textContent = JSON.stringify(data).replace(/</g, '\\u003c')
      document.head.appendChild(script)
    })
  }, [canonicalUrl, imageUrl, location.pathname, location.search, metadata.description, metadata.kind, metadata.noindex, metadata.title, siteOrigin])

  return null
}