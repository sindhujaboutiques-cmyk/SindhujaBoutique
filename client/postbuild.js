import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, 'dist');
const indexHtml = path.join(distDir, 'index.html');

if (fs.existsSync(indexHtml)) {
  const content = fs.readFileSync(indexHtml, 'utf8');

  // 1. Create 404.html (Vercel & Netlify static SPA fallback)
  fs.writeFileSync(path.join(distDir, '404.html'), content);

  // 2. Create static HTML entry files for all application routes
  const routes = [
    'admin',
    'about',
    'collections',
    'products',
    'services',
    'gallery',
    'new-arrivals',
    'offers',
    'contact'
  ];

  routes.forEach((route) => {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), content);
    fs.writeFileSync(path.join(distDir, `${route}.html`), content);
  });

  console.log('✅ Generated static SPA fallbacks (404.html, admin/index.html, etc.) for Vercel deployment');
} else {
  console.warn('⚠️ dist/index.html not found to generate SPA fallbacks');
}
