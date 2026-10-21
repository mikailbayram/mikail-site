// Share images (1200×630) rendered at build time: satori lays out the card, resvg rasterizes it.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SOLID, kilimTile, portrait, size, toRects, type Grid } from './pixels';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFileSync(require.resolve(`${pkg}/files/${file}`));

const fonts = [
  { name: 'Bricolage', weight: 800 as const, data: font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff') },
  { name: 'Bricolage', weight: 800 as const, data: font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-ext-800-normal.woff') },
  { name: 'Bricolage', weight: 400 as const, data: font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-400-normal.woff') },
  { name: 'Bricolage', weight: 400 as const, data: font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-ext-400-normal.woff') },
  { name: 'Martian', weight: 400 as const, data: font('@fontsource/martian-mono', 'martian-mono-latin-400-normal.woff') },
];

const C = { paper: '#f3eadb', ink: '#1e2552', red: '#b3282d', ochre: '#d9a33a', soft: '#3b3f63' };

const pixelSvg = (rows: Grid, extra = '') => {
  const { w, h } = size(rows);
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${extra}${toRects(rows, SOLID)}</svg>`,
  )}`;
};

// The ćilim border, tiled to the card's width at 4px per woven pixel.
const band = (() => {
  const tile = kilimTile();
  const { w, h } = size(tile);
  const reps = Math.ceil(1200 / 4 / w);
  const rows = tile.map((r) => r.repeat(reps));
  return { src: pixelSvg(rows), width: w * reps * 4, height: h * 4 };
})();

const me = pixelSvg(portrait);

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (El | string)[]): El => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});
const img = (src: string, width: number, height: number, style: Record<string, unknown> = {}): El => ({
  type: 'img',
  props: { src, width, height, style },
});

export type Card = {
  prompt: string; // e.g. ~/work/fathom
  kicker: string;
  title: string;
  subtitle: string;
};

export async function renderCard(card: Card): Promise<Uint8Array<ArrayBuffer>> {
  const titleSize = card.title.length > 14 ? 84 : 112;

  const tree = h(
    'div',
    { width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: C.paper, color: C.ink, fontFamily: 'Bricolage' },
    img(band.src, band.width, band.height, { flexShrink: 0 }),
    h(
      'div',
      { display: 'flex', alignItems: 'center', height: 64, padding: '0 64px', borderBottom: `3px solid ${C.ink}`, fontFamily: 'Martian', fontSize: 22 },
      h('span', {}, 'mikail@sarajevo:'),
      h('span', { color: C.red }, card.prompt),
      h('span', {}, '$'),
    ),
    h(
      'div',
      { display: 'flex', flex: 1, alignItems: 'center', padding: '0 64px', gap: 56 },
      h(
        'div',
        { display: 'flex', flexDirection: 'column', flex: 1 },
        h('div', { fontFamily: 'Martian', fontSize: 22, color: C.red, letterSpacing: 2, marginBottom: 14 }, card.kicker),
        h('div', { fontSize: titleSize, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4 }, card.title),
        h('div', { fontSize: 34, color: C.soft, marginTop: 22, lineHeight: 1.3 }, card.subtitle),
      ),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', background: C.ochre, border: `5px solid ${C.ink}`, boxShadow: `12px 12px 0 ${C.red}` },
        h('div', { height: 14, borderBottom: `5px solid ${C.ink}`, backgroundImage: `repeating-linear-gradient(90deg, ${C.red} 0 16px, ${C.paper} 16px 32px)` }),
        img(me, 256, 256),
      ),
    ),
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());
}
