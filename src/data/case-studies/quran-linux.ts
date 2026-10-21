import type { CaseStudy } from '../case-study';
import recitation from '../../assets/work/quran-linux/recitation.png';
import mushaf from '../../assets/work/quran-linux/mushaf.png';
import dark from '../../assets/work/quran-linux/mushaf-dark.png';

export const quranLinux: CaseStudy = {
  overview: [
    'There was no good native Quran app for the Linux desktop, so I built one, modelled on quran.com. It has a Mushaf reading view that looks like the printed page, a translation view with word-by-word meaning, and recitation that highlights each word as it is recited.',
    'It also has tafsir, search, bookmarks, light, sepia and dark themes, media keys through MPRIS, and an offline cache.',
  ],
  architecture: `  quran.com API v4 ──▶ quran-core (no UI)
  QDC audio + timings    reqwest · SQLite cache · WOFF2 → TTF
                              │
                              ▼
                        quran-desktop
                        GTK4 · libadwaita · Pango
                              │
              ┌───────────────┼────────────────┐
              ▼               ▼                ▼
        Mushaf view     translation view   GStreamer player
        one glyph/word  word by word       50 ms ticks → word`,
  highlights: [
    {
      title: 'Word-level highlighting during recitation',
      body: [
        'The audio API provides timing segments for each word. GStreamer reports the playback position every 50 ms, and a binary search over the timings finds the current verse and word, which the reader highlights.',
      ],
    },
    {
      title: 'Rendering the printed Mushaf page',
      body: [
        'The Mushaf fonts encode every word as a single glyph, page by page. Each printed line is one GTK label, with the gaps between words set exactly through Pango letter spacing so lines justify like the printed page. Hovering, tooltips and click-to-play work out which word is under the pointer from its position.',
      ],
    },
    {
      title: 'A core you could reuse on mobile',
      body: [
        'All data access, caching and font handling live in a UI-free core crate, separate from the GTK app. Page fonts are downloaded as WOFF2 and decompressed on the fly.',
      ],
    },
  ],
  screens: [
    { src: recitation, alt: 'Translation view during recitation, with the current verse highlighted and a player bar', caption: 'Recitation with the current verse highlighted, translation below and the player at the bottom.' },
    { src: mushaf, alt: 'Mushaf reading view with justified Arabic lines', caption: 'The Mushaf view, rendered line by line like the printed page.' },
    { src: dark, alt: 'Mushaf reading view in the dark theme', caption: 'The same page in the dark theme.' },
  ],
};
