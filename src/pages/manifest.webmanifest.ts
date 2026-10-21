import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'Mikail Bayram',
      short_name: 'Mikail',
      description: 'Full-stack AI engineer from Sarajevo.',
      start_url: '/',
      display: 'browser',
      background_color: '#f3eadb',
      theme_color: '#1e2552',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
