# Chitral House Shilajit - React storefront

    npm install
    npm run dev        # local
    npm run build      # production build (deploy on Vercel/Netlify)

- Store info, products, FAQs, lab reports: src/data/store.js
- Homepage photos: public/reports/photos/ (referenced from Home.jsx)
- Verified lab report PDFs, when available: public/reports/
- Replace phone, WhatsApp number and email in STORE before launch.

## SEO deployment

Set `VITE_SITE_URL` to the verified production origin (for example, `https://your-real-domain.com`) in the deployment environment. The production build pre-renders route-specific metadata and content, then writes absolute canonical URLs, `robots.txt`, and `sitemap.xml`. On Vercel, the prerender script also reads `VERCEL_PROJECT_PRODUCTION_URL` when `VITE_SITE_URL` is unset. Without a production origin, it deliberately omits the sitemap and absolute canonicals rather than guessing the domain.

The current lab-report route is noindex until verified report PDFs are added under `public/reports/`. The business phone, WhatsApp and email values in `src/data/store.js` are launch placeholders and must be confirmed before deployment.
