import type { CaseStudy } from './case-study';
import { linkifunnels } from './case-studies/linkifunnels';
import { brzafaktura } from './case-studies/brzafaktura';
import { niscai } from './case-studies/niscai';
import { scalemate } from './case-studies/scalemate';
import { fathom } from './case-studies/fathom';
import { papirko } from './case-studies/papirko';
import { quranLinux } from './case-studies/quran-linux';

export type Motif = 'diamonds' | 'zigzag' | 'stripes' | 'bars';

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  role: string;
  where: string;
  period: string;
  url?: string;
  repo?: string;
  stack: string[];
  short: string; // tile code line
  motif: Motif;
  featured?: boolean;
  kind: 'shipped' | 'side';
  study: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: 'linkifunnels',
    name: 'LinkiFunnels',
    oneLiner: 'LinkedIn posts → leads and booked calls',
    role: 'Founder / CTO, sole engineer',
    where: 'Solution404',
    period: '2026 – now',
    url: 'https://linkifunnels.com',
    stack: ['Rails 8.1', 'Inertia', 'React 19', 'TypeScript', 'Tailwind 4', 'PostgreSQL', 'Solid Queue', 'Action Cable', 'Cloudflare for SaaS', 'Kamal', 'Astro'],
    short: 'rails 8 · react 19',
    motif: 'diamonds',
    featured: true,
    kind: 'shipped',
    study: linkifunnels,
  },
  {
    slug: 'brzafaktura',
    name: 'BrzaFaktura',
    oneLiner: 'AI-read invoices and bookkeeping for Bosnia',
    role: 'Founder & lead engineer',
    where: 'Solution404',
    period: '2025 – now',
    url: 'https://brzafaktura.com',
    stack: ['Rails 8', 'Hotwire', 'Inertia', 'Svelte 5', 'PostgreSQL', 'Gemini', 'RubyLLM', 'Go', 'Kamal'],
    short: 'rails 8 · svelte 5',
    motif: 'zigzag',
    featured: true,
    kind: 'shipped',
    study: brzafaktura,
  },
  {
    slug: 'niscai',
    name: 'Niscai',
    oneLiner: 'Carbon data for manufacturers',
    role: 'Senior full-stack engineer',
    where: 'Thought and Function',
    period: '2025 – now',
    url: 'https://www.niscai.com',
    stack: ['TypeScript', 'NestJS', 'GraphQL', 'TypeORM', 'Next.js 16', 'Tailwind', 'PostgreSQL', 'Cloud Run', 'Cloud Tasks', 'Terraform', 'Playwright'],
    short: 'nestjs · 140 e2e',
    motif: 'stripes',
    featured: true,
    kind: 'shipped',
    study: niscai,
  },
  {
    slug: 'scalemate',
    name: 'ScaleMate',
    oneLiner: 'B2B lead-generation SaaS',
    role: 'Main engineer',
    where: 'Thought and Function',
    period: '2025 – 2026',
    stack: ['NestJS', 'REST + OpenAPI', 'Prisma', 'PostgreSQL', 'Next.js', 'React Query', 'Stripe', 'Sanity', 'Firebase Auth', 'Terraform'],
    short: 'nestjs · stripe',
    motif: 'bars',
    kind: 'shipped',
    study: scalemate,
  },
  {
    slug: 'fathom',
    name: 'Fathom',
    oneLiner: 'AI sales research experiment',
    role: 'Side project',
    where: 'Personal',
    period: '2026',
    repo: 'https://github.com/mikailbayram/fathom',
    stack: ['Rails 8.1', 'React 19', 'pgvector', 'Hybrid search', 'RubyLLM', 'Solid Queue'],
    short: 'rag · pgvector',
    motif: 'diamonds',
    kind: 'side',
    study: fathom,
  },
  {
    slug: 'papirko',
    name: 'Papirko',
    oneLiner: 'Invoices and bank statements → Excel',
    role: 'Side project',
    where: 'Personal',
    period: '2026',
    stack: ['Tauri 2', 'Rust', 'React 19', 'Tesseract', 'Claude', 'Cloudflare Workers', 'D1'],
    short: 'tauri · rust',
    motif: 'zigzag',
    kind: 'side',
    study: papirko,
  },
  {
    slug: 'quran-linux',
    name: 'Quran for Linux',
    oneLiner: 'Native Quran app for the Linux desktop',
    role: 'Open source',
    where: 'Personal',
    period: '2026',
    repo: 'https://github.com/mikailbayram/quran',
    stack: ['Rust', 'GTK4', 'libadwaita', 'Pango', 'GStreamer', 'SQLite'],
    short: 'rust · gtk4',
    motif: 'stripes',
    kind: 'side',
    study: quranLinux,
  },
];

export const featured = projects.filter((p) => p.featured);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
