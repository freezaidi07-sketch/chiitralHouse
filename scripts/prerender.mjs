import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { createServer, loadEnv } from 'vite'

const root = process.cwd()
const dist = join(root, 'dist')
const env = loadEnv('production', root, '')
const configuredSiteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''

function getSiteOrigin(value) {
  if (!value) return ''
  const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
  return url.origin
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function renderHead(html, metadata, siteOrigin, schemas) {
  const canonicalUrl = siteOrigin && metadata.canonicalPath ? new URL(metadata.canonicalPath, siteOrigin).href : ''
  const imageUrl = siteOrigin && metadata.image ? new URL(metadata.image, siteOrigin).href : ''
  const tags = [
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="robots" content="${metadata.noindex ? 'noindex,follow' : 'index,follow'}" />`,
    `<meta property="og:type" content="${metadata.kind === 'product' ? 'product' : 'website'}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    '<meta property="og:locale" content="en_PK" />',
    '<meta property="og:site_name" content="Chitral House" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
  ]

  if (canonicalUrl) {
    tags.push(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`)
    tags.push(`<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`)
  }
  if (imageUrl) {
    tags.push(`<meta property="og:image" content="${escapeHtml(imageUrl)}" />`)
    tags.push(`<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`)
  }
  for (const schema of schemas) {
    tags.push(`<script type="application/ld+json" data-seo-schema>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
  }

  const cleaned = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<meta\s+(?:name|property)="(?:description|robots|og:type|og:title|og:description|og:locale|og:site_name|og:url|og:image|twitter:card|twitter:title|twitter:description|twitter:image)"[^>]*\s*\/?\s*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*\s*\/?\s*>/i, '')

  return cleaned.replace('</head>', `${tags.join('\n    ')}\n  </head>`)
}

const vite = await createServer({
  root,
  mode: 'production',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const [{ default: App }, { CartProvider }, { PRODUCTS, STORE }, { getPageMetadata, getStructuredData }] = await Promise.all([
    vite.ssrLoadModule('/src/App.jsx'),
    vite.ssrLoadModule('/src/context/CartContext.jsx'),
    vite.ssrLoadModule('/src/data/store.js'),
    vite.ssrLoadModule('/src/seo/metadata.js'),
  ])
  const siteOrigin = getSiteOrigin(configuredSiteUrl)
  const template = await readFile(join(dist, 'index.html'), 'utf8')
  const routes = [
    '/',
    '/shop',
    ...PRODUCTS.map((product) => `/product/${product.slug}`),
    '/lab-reports',
    '/faqs',
    '/contact',
    '/checkout',
  ]

  for (const route of routes) {
    const element = React.createElement(
      StaticRouter,
      { location: route },
      React.createElement(CartProvider, null, React.createElement(App)),
    )
    const markup = renderToString(element)
    const metadata = getPageMetadata(route)
    const schemas = getStructuredData(metadata, siteOrigin)
    const html = renderHead(template, metadata, siteOrigin, schemas)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    const outputPath = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html')
    await mkdir(join(outputPath, '..'), { recursive: true })
    await writeFile(outputPath, html)
  }

  const notFoundMetadata = getPageMetadata('/__not_found__')
  const notFoundMarkup = renderToString(React.createElement(
    StaticRouter,
    { location: '/__not_found__' },
    React.createElement(CartProvider, null, React.createElement(App)),
  ))
  const notFoundSchemas = []
  const notFoundHtml = renderHead(template, notFoundMetadata, siteOrigin, notFoundSchemas)
    .replace('<div id="root"></div>', `<div id="root">${notFoundMarkup}</div>`)
  await writeFile(join(dist, '404.html'), notFoundHtml)

  const robots = ['User-agent: *', 'Allow: /']
  if (siteOrigin) robots.push(`Sitemap: ${siteOrigin}/sitemap.xml`)
  await writeFile(join(dist, 'robots.txt'), `${robots.join('\n')}\n`)

  if (siteOrigin) {
    const sitemapRoutes = ['/', '/shop', ...PRODUCTS.map((product) => `/product/${product.slug}`), '/faqs', '/contact']
    const urls = sitemapRoutes.map((route) => `  <url><loc>${escapeHtml(new URL(route, siteOrigin).href)}</loc></url>`)
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
    await writeFile(join(dist, 'sitemap.xml'), sitemap)
  } else {
    console.warn('SEO: VITE_SITE_URL is not configured; sitemap.xml and absolute canonical URLs were not generated. Set it to the production origin before deployment.')
  }

  console.log(`SEO: pre-rendered ${routes.length} routes and a 404 page for ${STORE.name}.`)
} finally {
  await vite.close()
}