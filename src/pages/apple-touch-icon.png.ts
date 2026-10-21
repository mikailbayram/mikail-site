import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { faviconSvg } from '../lib/favicon';

// iOS home-screen icon. 24px grid × 7.5 = 180px, upscaled without smoothing.
export const GET: APIRoute = async () => {
  const png = await sharp(new TextEncoder().encode(faviconSvg()), { density: 72 * 7.5 })
    .resize(180, 180, { kernel: 'nearest' })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
