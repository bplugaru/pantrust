import { defineConfig } from 'astro/config';

// Canonical and social URLs need the public address. On Vercel it is taken from the project's
// production domain, so it follows a custom domain automatically; SITE_URL overrides it.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://www.pantrustromania.ro');

export default defineConfig({
  site,
  // URLs without a trailing slash: /produse/perete. Pages are built as perete.html and
  // vercel.json (cleanUrls) serves them without the extension.
  trailingSlash: 'never',
  build: { format: 'file' },
});
