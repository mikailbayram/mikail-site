import { SOLID, portrait, size, toRects } from './pixels';

// Head and beard only, so it still reads at 16×16. Ochre tile like the hero frame.
const crop = portrait.slice(0, 24).map((row) => row.slice(4, 28));

export function faviconSvg(): string {
  const { w, h } = size(crop);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"><rect width="${w}" height="${h}" fill="#d9a33a"/>${toRects(crop, SOLID)}</svg>`;
}

// App icons at an exact pixel multiple, padded with the ochre tile so pixels stay crisp.
export async function iconPng(sizePx: number): Promise<Uint8Array<ArrayBuffer>> {
  const { default: sharp } = await import('sharp');
  const grid = size(crop).w;
  const scale = Math.floor(sizePx / grid);
  const inner = grid * scale;
  const pad = sizePx - inner;
  const png = await sharp(new TextEncoder().encode(faviconSvg()), { density: 72 * scale })
    .resize(inner, inner, { kernel: 'nearest' })
    .extend({ top: Math.floor(pad / 2), bottom: Math.ceil(pad / 2), left: Math.floor(pad / 2), right: Math.ceil(pad / 2), background: '#d9a33a' })
    .png()
    .toBuffer();
  return new Uint8Array(png);
}
