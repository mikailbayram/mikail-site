import type { APIRoute, GetStaticPaths } from 'astro';
import { renderCard, type Card } from '../../lib/og';
import { projects } from '../../data/projects';

const cards: { path: string; card: Card }[] = [
  {
    path: 'home',
    card: {
      prompt: '~',
      kicker: 'FULL-STACK AI ENGINEER',
      title: 'Mikail Bayram',
      subtitle: 'From first prototype to production, design included. Based in Sarajevo.',
    },
  },
  {
    path: 'system',
    card: {
      prompt: '~/system',
      kicker: 'DESIGN SYSTEM',
      title: 'The design system',
      subtitle: 'Tokens, type, woven motifs and pixel art, all in code.',
    },
  },
  ...projects.map((p) => ({
    path: `work/${p.slug}`,
    card: {
      prompt: `~/work/${p.slug}`,
      kicker: p.kind === 'side' ? 'SIDE PROJECT' : p.where.toUpperCase(),
      title: p.name,
      subtitle: p.oneLiner,
    },
  })),
];

export const getStaticPaths = (() => cards.map(({ path, card }) => ({ params: { path }, props: { card } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await renderCard(props.card as Card), { headers: { 'Content-Type': 'image/png' } });
