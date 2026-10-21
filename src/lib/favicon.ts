import { SOLID, portrait, size, toRects } from './pixels';

// Head and beard only, so it still reads at 16×16. Ochre tile like the hero frame.
const crop = portrait.slice(0, 24).map((row) => row.slice(4, 28));

export function faviconSvg(): string {
  const { w, h } = size(crop);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"><rect width="${w}" height="${h}" fill="#d9a33a"/>${toRects(crop, SOLID)}</svg>`;
}
