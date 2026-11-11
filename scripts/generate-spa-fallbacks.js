import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.log('dist directory does not exist, skipping fallback generation.');
  process.exit(0);
}

const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.log('dist/index.html does not exist.');
  process.exit(0);
}

const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

// List of top-level SPA routes
const routes = [
  'shop',
  'women',
  'men',
  'denim',
  'new-arrivals',
  'best-sellers',
  'lookbook',
  'about',
  'contact',
  'cart',
  'checkout',
  'account',
  'admin'
];

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtmlContent);
  console.log(`Generated fallback for /${route}/index.html`);
}

// Generate 404.html for any unhandled routes (e.g. /product/[slug])
// This serves the SPA index.html so client-side routing picks up the URL without a 404 error
fs.writeFileSync(path.join(distDir, '404.html'), indexHtmlContent);
console.log('Generated dist/404.html fallback.');
