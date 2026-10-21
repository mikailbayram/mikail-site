import type { APIRoute } from 'astro';
import { iconPng } from '../lib/favicon';

// iOS ignores SVG favicons and wants a 180px PNG.
export const GET: APIRoute = async () => new Response(await iconPng(180), { headers: { 'Content-Type': 'image/png' } });
