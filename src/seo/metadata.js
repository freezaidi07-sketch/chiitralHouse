import { PRODUCTS, STORE } from '../data/store.js'

export function getPageMetadata(pathname, search = '') {
  const path = pathname.replace(/\/+$/, '') || '/'
  const hasQuery = new URLSearchParams(search).size > 0

  if (path === '/') {
    return {
      kind: 'home',
      title: 'Original Chitral Shilajit in Pakistan | Chitral House',
      description: 'Shop Chitral House shilajit resin and bundles online, with cash-on-delivery delivery across Pakistan. Compare available sizes and prices.',
      canonicalPath: '/',
      image: '/reports/photos/image.webp',
    }
  }

  if (path === '/shop') {
    return {
      kind: 'shop',
      title: 'Buy Shilajit Online in Pakistan | Chitral House',
      description: 'Browse Chitral House shilajit resin sizes and bundles. Compare product details and prices, with cash-on-delivery delivery across Pakistan.',
      canonicalPath: '/shop',
      noindex: hasQuery,
    }
  }

  const productMatch = path.match(/^\/product\/([^/]+)$/)
  if (productMatch) {
    const product = PRODUCTS.find((item) => item.slug === productMatch[1])
    if (product) {
      return {
        kind: 'product',
        product,
        title: `${product.name} ${product.size} Price in Pakistan | Chitral House`,
        description: `${product.desc} Order ${product.name.toLowerCase()} ${product.size} online from Chitral House, with cash-on-delivery delivery across Pakistan.`,
        canonicalPath: path,
      }
    }
  }

  if (path === '/faqs') {
    return {
      kind: 'faqs',
      title: 'Shilajit FAQs: Ordering, Use & Delivery | Chitral House',
      description: 'Answers about shilajit products, ordering, delivery, payment and returns from Chitral House Pakistan.',
      canonicalPath: path,
    }
  }

  if (path === '/contact') {
    return {
      kind: 'contact',
      title: 'Contact Chitral House | Shilajit Orders in Pakistan',
      description: 'Contact Chitral House with questions about shilajit products, an order, delivery or wholesale enquiries.',
      canonicalPath: path,
    }
  }

  if (path === '/lab-reports') {
    return {
      kind: 'lab-reports',
      title: 'Lab Reports and Certificates | Chitral House',
      description: 'Laboratory report and certificate downloads are not currently available on this site. Contact Chitral House for product documentation.',
      canonicalPath: path,
      noindex: true,
    }
  }

  if (path === '/checkout') {
    return {
      kind: 'checkout',
      title: 'Checkout | Chitral House',
      description: 'Complete your Chitral House order with cash on delivery.',
      canonicalPath: path,
      noindex: true,
    }
  }

  return {
    kind: 'not-found',
    title: 'Page Not Found | Chitral House',
    description: 'The requested Chitral House page could not be found.',
    noindex: true,
  }
}

export function getStructuredData(metadata, siteOrigin = '') {
  if (metadata.kind === 'home') {
    const onlineStore = {
      '@context': 'https://schema.org',
      '@type': 'OnlineStore',
      name: STORE.name,
      description: metadata.description,
    }
    if (siteOrigin) onlineStore.url = new URL('/', siteOrigin).href
    return [onlineStore]
  }

  if (metadata.kind !== 'product') return []

  const productUrl = siteOrigin ? new URL(metadata.canonicalPath, siteOrigin).href : undefined
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${metadata.product.name} ${metadata.product.size}`,
    description: metadata.product.desc,
    brand: { '@type': 'Brand', name: STORE.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      price: metadata.product.price,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: metadata.product.price >= STORE.freeShippingOver ? 0 : STORE.shippingFee,
          currency: 'PKR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'PK',
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'PK',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
      },
    },
  }
  if (productUrl) productSchema.offers.url = productUrl

  if (!siteOrigin) return [productSchema]

  return [productSchema, {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: new URL('/', siteOrigin).href },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: new URL('/shop', siteOrigin).href },
        { '@type': 'ListItem', position: 3, name: `${metadata.product.name} ${metadata.product.size}`, item: productUrl },
      ],
    }]
}