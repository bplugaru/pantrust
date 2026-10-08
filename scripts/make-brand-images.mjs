// Regenerates the social sharing image and the favicons from src/assets. Run: node scripts/make-brand-images.mjs
import sharp from 'sharp';

const navy = '#101923';
const W = 1200, H = 630;

// Social card: hero photo on the right, fading into navy, with logo and headline on the left.
const photo = await sharp('src/assets/hero.png').resize(W, H, { fit: 'cover', position: 'right' }).toBuffer();
const shade = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="${navy}"/><stop offset="0.42" stop-color="${navy}"/>
    <stop offset="0.62" stop-color="${navy}" stop-opacity="0.75"/><stop offset="0.9" stop-color="${navy}" stop-opacity="0.05"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700">
    <text x="72" y="330" font-size="58" fill="#ffffff">Panouri sandwich</text>
    <text x="72" y="400" font-size="58" fill="#ffffff">și construcții</text>
    <text x="72" y="470" font-size="58" fill="#f2732a">industriale</text>
  </g>
  <text x="72" y="545" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" fill="#ffffff" fill-opacity="0.85">Panouri termoizolante · Structuri metalice · Accesorii</text>
</svg>`);
const logo = await sharp('src/assets/logo.png').resize({ width: 330 }).toBuffer();
await sharp(photo).composite([{ input: shade }, { input: logo, left: 72, top: 78 }]).jpeg({ quality: 88 }).toFile('public/og.jpg');

// Favicons: the roof mark from the logo (its top part, without the wordmark) on a navy tile.
const meta = await sharp('src/assets/logo.png').metadata();
const mark = await sharp('src/assets/logo.png').extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * 0.6) }).toBuffer();
for (const [file, size] of [['public/favicon.png', 96], ['public/apple-touch-icon.png', 180]]) {
  const inner = await sharp(mark).resize({ width: Math.round(size * 0.82) }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: navy } }).composite([{ input: inner, gravity: 'centre' }]).png().toFile(file);
}
