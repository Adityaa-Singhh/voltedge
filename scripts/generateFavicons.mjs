import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// ============================================================
// GOOGLE-COMPLIANT FAVICON (White background, volt bolt)
// Used for: favicon-48x48.png, favicon-96x96.png, favicon.ico
// Google Search requires high-contrast on a light background
// ============================================================
const googleFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <!-- White background for Google Search compliance -->
  <rect width="512" height="512" rx="80" fill="#ffffff"/>
  <!-- Bold volt-colored lightning bolt — high contrast on white -->
  <path d="M330 80 L195 300 h-40 l58 -110 H152 l128 -110 h50 z"
        fill="#CCFF00"
        stroke="#88BB00"
        stroke-width="10"
        stroke-linejoin="round"/>
</svg>`;

// ============================================================
// PWA / BROWSER TAB ICON (Dark background, volt bolt)
// Used for: favicon-192x192.png, favicon-512x512.png, apple-touch-icon.png
// Used in browser tabs, PWA homescreen, bookmarks
// ============================================================
const pwaIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="100%" stop-color="#050810"/>
    </linearGradient>
    <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#CCFF00"/>
      <stop offset="100%" stop-color="#88BB00"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  <rect width="504" height="504" x="4" y="4" rx="124" stroke="#CCFF00" stroke-width="6" stroke-opacity="0.4"/>
  <path d="M330 80 L195 300 h-40 l58 -110 H152 l128 -110 h50 z"
        fill="url(#boltGrad)"
        stroke="#CCFF00"
        stroke-width="4"
        stroke-linejoin="round"/>
</svg>`;

// ============================================================
// MASTER SVG for favicon.svg in the browser tab
// Uses dark background to match site theme
// ============================================================
const masterFaviconSvg = pwaIconSvg;

async function generate() {
  console.log('Generating crisp favicons for Google Search & Browsers...');

  const googleBuffer = Buffer.from(googleFaviconSvg);
  const pwaBuffer = Buffer.from(pwaIconSvg);

  // Write master favicon.svg (dark, for browser tab)
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterFaviconSvg);

  // -------------------------------------------------------
  // GOOGLE SEARCH FAVICONS — white background, small sizes
  // These are what Google indexes and shows in search results
  // -------------------------------------------------------
  const googleSizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
  ];

  for (const item of googleSizes) {
    const dest = path.join(publicDir, item.name);
    await sharp(googleBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(dest);
    console.log(`Generated ${item.name} (${item.size}x${item.size}) [Google Search]`);
  }

  // favicon.ico — must also be white-background for Google browser address bar
  const icoBuffer = await sharp(googleBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico [Google Search]');

  // -------------------------------------------------------
  // PWA / HOMESCREEN ICONS — dark background, large sizes
  // Used in Chrome tab, PWA install, Apple homescreen
  // -------------------------------------------------------
  const pwaSizes = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-512x512.png', size: 512 },
  ];

  for (const item of pwaSizes) {
    const dest = path.join(publicDir, item.name);
    await sharp(pwaBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(dest);
    console.log(`Generated ${item.name} (${item.size}x${item.size}) [PWA/Browser]`);
  }

  // Generate web manifest
  const manifest = {
    name: 'Sai Enterprises',
    short_name: 'Sai Enterprises',
    description: 'Sai Enterprises — Premier Electrical Products Supplier & Wholesale Distributor in Rourkela, Odisha.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050810',
    theme_color: '#CCFF00',
    icons: [
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated site.webmanifest');
  console.log('Done!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
