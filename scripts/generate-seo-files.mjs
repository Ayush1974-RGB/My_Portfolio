import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const publicDirectory = resolve(process.cwd(), 'public');
const generatedEnvFile = resolve(process.cwd(), '.env.production.local');
const mode = process.env.MODE || process.env.NODE_ENV || 'production';
const loadedEnv = loadEnv(mode, process.cwd(), '');
const buildDate = new Date().toISOString().split('T')[0];

function cleanUrlCandidate(value) {
  return value?.trim().replace(/\/+$/, '') || '';
}

function toAbsoluteUrl(value) {
  if (!value) {
    return '';
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const configuredSiteUrl = cleanUrlCandidate(
  loadedEnv.VITE_SITE_URL || loadedEnv.SITE_URL || process.env.VITE_SITE_URL || process.env.SITE_URL
);

const netlifyProductionUrl = cleanUrlCandidate(process.env.URL || loadedEnv.URL);
const netlifyDeployUrl = cleanUrlCandidate(
  process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || loadedEnv.DEPLOY_PRIME_URL || loadedEnv.DEPLOY_URL
);

const resolvedSiteUrlCandidate =
  configuredSiteUrl ||
  netlifyProductionUrl ||
  netlifyDeployUrl;

let siteUrl;

try {
  siteUrl = new URL(resolvedSiteUrlCandidate).toString().replace(/\/+$/, '');
} catch {
  throw new Error(
    '[seo] Missing a valid site URL. Set VITE_SITE_URL=https://your-domain.netlify.app, or set SITE_URL/URL in your hosting environment.'
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const robots = `# Generated from VITE_SITE_URL during build.
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const manifest = JSON.stringify(
  {
    name: 'Ayush Singhal Portfolio',
    short_name: 'Ayush Singhal',
    description:
      'Portfolio of Ayush Singhal, an AI-ML developer building intelligent web platforms, machine learning models, and data-driven applications.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    lang: 'en-IN',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  },
  null,
  2
);

await mkdir(publicDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(resolve(publicDirectory, 'robots.txt'), robots, 'utf8'),
  writeFile(resolve(publicDirectory, 'site.webmanifest'), manifest, 'utf8'),
  writeFile(
    generatedEnvFile,
    `# Generated during build for Vite HTML/meta replacement.\nVITE_SITE_URL=${siteUrl}\n`,
    'utf8'
  ),
]);

console.log(`[seo] Generated robots.txt, sitemap.xml, site.webmanifest, and build env for ${siteUrl}`);
