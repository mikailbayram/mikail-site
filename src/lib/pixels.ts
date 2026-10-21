// Pixel art drawn on a grid, like a kilim is woven on a loom.
// Each character is one pixel; colors resolve to CSS variables so dark mode just works.

export type Grid = string[];

const FILL: Record<string, string> = {
  I: 'var(--px-ink)',
  R: 'var(--px-red)',
  O: 'var(--px-ochre)',
  P: 'var(--px-paper)',
  S: 'var(--px-stone)',
  // Portrait colors are fixed: skin, hair and the hoodie shouldn't change with the theme.
  o: '#2a1a14',
  h: '#3a2619',
  k: '#efc9ad',
  s: '#d19c80',
  b: '#3b261a',
  m: '#b8746a',
  t: '#21708f',
  T: '#3b93b5',
  d: '#154a62',
  c: '#1b1b1b',
  C: '#e8e4dc',
};

// Fixed colors for places CSS variables can't reach, like the favicon.
export const SOLID: Record<string, string> = {
  I: '#1e2552',
  R: '#b3282d',
  O: '#d9a33a',
  P: '#f3eadb',
  S: '#c9b99a',
  o: '#2a1a14',
  h: '#3a2619',
  k: '#efc9ad',
  s: '#d19c80',
  b: '#3b261a',
  m: '#b8746a',
  t: '#21708f',
  T: '#3b93b5',
  d: '#154a62',
  c: '#1b1b1b',
  C: '#e8e4dc',
};

export function toRects(rows: Grid, fill: Record<string, string> = FILL): string {
  let out = '';
  rows.forEach((row, y) => {
    // Merge horizontal runs of the same color into one rect to keep the SVG small.
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run++;
      if (fill[ch]) {
        out += `<rect x="${x}" y="${y}" width="${run + 0.02}" height="1.02" fill="${fill[ch]}"/>`;
      }
      x += run;
    }
  });
  return out;
}

export function size(rows: Grid) {
  return { w: Math.max(...rows.map((r) => r.length)), h: rows.length };
}

// Sebilj: crescent finial, lead dome, wide wooden eaves, latticed arches, stone steps.
export const sebilj: Grid = [
  '.........O.O.........',
  '..........O..........',
  '..........O..........',
  '..........I..........',
  '.........III.........',
  '.......IIIIIII.......',
  '......IIIIIIIII......',
  '.....IIIIIIIIIII.....',
  '.....IIIIIIIIIII.....',
  '....RRRRRRRRRRRRR....',
  '..RRRRRRRRRRRRRRRRR..',
  'RRRRRRRRRRRRRRRRRRRRR',
  '.O.O.O.O.O.O.O.O.O.O.',
  '....OOOOOOOOOOOOO....',
  '....OOIOOOIOOOIOO....',
  '....OIIIOIIIOIIIO....',
  '....OIPIOIPIOIPIO....',
  '....OIIIOIIIOIIIO....',
  '....OIIIOIIIOIIIO....',
  '....OOOOOOOOOOOOO....',
  '...IIIIIIIIIIIIIII...',
  '..PPPPPPPPPPPPPPPPP..',
  '.IIIIIIIIIIIIIIIIIII.',
];

// Stari Most: a hump-backed single arch between two towers, over the Neretva.
export const BRIDGE = { W: 96, H: 34, water: 26, cx: 48, span: 26, from: 14, to: 81 } as const;

export function deckTop(x: number): number {
  const t = (x - BRIDGE.cx) / 30;
  return Math.min(16, Math.round(9 + 9 * t * t));
}

export function bridge(): Grid {
  const { W, H, water, cx, span, from, to } = BRIDGE;
  const g = Array.from({ length: H }, () => Array<string>(W).fill('.'));
  const set = (x: number, y: number, c: string) => {
    if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c;
  };

  for (let x = 0; x < W; x++) {
    const leftBank = x < 22;
    const rightBank = x >= 74;
    if (leftBank || rightBank) {
      const edge = leftBank ? 22 - x : x - 73;
      const top = 18 + Math.max(0, 4 - Math.floor(edge / 2));
      for (let y = top; y < H; y++) set(x, y, (x + y) % 7 === 0 ? 'S' : 'R');
    }
    if (x >= from && x <= to) {
      const deck = deckTop(x);
      set(x, deck, 'O');
      set(x, deck + 1, 'O');
      set(x, deck - 1, x % 2 ? 'I' : '.'); // parapet
      const a = (x - cx) / span;
      const inArch = Math.abs(a) < 1;
      const archTop = inArch ? Math.round(water - (water - 12) * Math.sqrt(1 - a * a)) : water;
      for (let y = deck + 2; y < archTop; y++) set(x, y, (x * 3 + y) % 11 === 0 ? 'S' : 'O');
      if (inArch) {
        set(x, archTop, 'I');
        set(x, archTop - 1, 'I');
      }
    }
  }

  const tower = (x0: number) => {
    for (let x = x0; x < x0 + 9; x++) for (let y = 6; y < 20; y++) set(x, y, 'P');
    for (let x = x0; x < x0 + 9; x++) {
      set(x, 6, 'I');
      set(x, 19, 'I');
    }
    for (let y = 6; y < 20; y++) {
      set(x0, y, 'I');
      set(x0 + 8, y, 'I');
    }
    for (let i = 0; i < 5; i++) for (let x = x0 - 1 + i; x < x0 + 10 - i; x++) set(x, 5 - i, 'R');
    [[3, 10], [5, 10], [3, 14], [5, 14]].forEach(([dx, y]) => set(x0 + dx, y, 'I'));
  };
  tower(6);
  tower(81);

  for (let y = water + 1; y < H; y++)
    for (let x = 0; x < W; x++) if (g[y][x] === '.') set(x, y, (x + y * 3) % 8 < 2 ? 'P' : 'I');

  return g.map((r) => r.join(''));
}

// Me, in pixels. Hand-drawn on a 32×32 grid from a photo.
export const portrait: Grid = [
  '............oooooooooo..........',
  '..........oohhhhhhhhhho.........',
  '.........ohhhhhhhhhhhho.........',
  '.........ohhhhhhhhhhhho.........',
  '.........oshhhhhhhhhhso.........',
  '.........oshkkkkkkkkhso.........',
  '.........oskkkkkkkkkkso.........',
  '.........oskkkkkkkkkkso.........',
  '.........oskoookkoookso.........',
  '........osskkkkkkkkkksso........',
  '........oskkookkkkookkso........',
  '........oskksskkskksskso........',
  '........oskkkkkkskkkkkso........',
  '.........obkkkkssskkkbo.........',
  '.........obbkkbbbbbkbbo.........',
  '.........obbbbbbbbbbbboTTT......',
  '.....TTTTobbbbmmmmbbbboTTTT.....',
  '.....TTTTobbbbbbbbbbbbottttd....',
  '....dttttdobbbbbbbbbbodttttd....',
  '....dttttdobbbbbbbbbbodtttttd...',
  '...dtttttdtobbbbbbbbotdtttttd...',
  '...dtttttdttobbbbbbottdtCttttd..',
  '..dttttttdtttoCCCCotttdtctttttd.',
  '.dtttttttdTTTTTTTTTTTTdtCttttttt',
  'dttttttttttCttttttttttttcttttttt',
  'dtttttttttdctttttttttdttCttttttt',
  'dttttttttttCttttdtttttttcttttttt',
  'dttttttttttcttttdtttttttCttttttt',
  'dttttttttttCttttdtttttttcttttttt',
  'dtttttttttttctttdtttttttCttttttt',
  'dtttttttttttCtttdtttttttcttttttt',
  'dtttttttttttctttdtttttttCttttttt',
];

// A tiny me carrying a project across the bridge.
export const walker: Grid = [
  '..hhh..',
  '.hhhhh.',
  '.kkkkk.',
  '.kokok.',
  '.bkkkb.',
  '.bbmbb.',
  '..bbb..',
  'ttttOO.',
  'ttttOO.',
  '.ttt...',
  '.I.I...',
];

// Ćilim border, "lozenge chain" (ðulovi): stepped red lozenges with small ochre lozenges
// between them, framed by dashed guard stripes. One 16×23 tile, repeated.
export function kilimTile(): Grid {
  const W = 16;
  const H = 15;
  const cx = 8;
  const cy = 7;
  const corners = [[0, 0], [W, 0], [0, H - 1], [W, H - 1], [0, cy], [W, cy]];
  const body: string[] = [];
  for (let y = 0; y < H; y++) {
    let row = '';
    for (let x = 0; x < W; x++) {
      const d = Math.abs(x - cx) + Math.abs(y - cy);
      const dc = Math.min(...corners.map(([a, b]) => Math.abs(x - a) + Math.abs(y - b)));
      row +=
        d <= 1 ? 'O' : d === 2 ? 'I' : d <= 4 ? 'R' : d === 5 ? 'P' : d === 6 ? 'R' : dc <= 1 ? 'O' : dc === 2 ? 'P' : 'I';
    }
    body.push(row);
  }
  const guard = 'PPRR'.repeat(W / 4);
  const line = (c: string) => c.repeat(W);
  return [line('I'), guard, line('P'), ...body, line('P'), guard, line('I')];
}
