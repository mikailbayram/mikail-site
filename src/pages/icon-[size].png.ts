import type { APIRoute, GetStaticPaths } from 'astro';
import { iconPng } from '../lib/favicon';

export const getStaticPaths = (() => [192, 512].map((s) => ({ params: { size: String(s) } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
  new Response(await iconPng(Number(params.size)), { headers: { 'Content-Type': 'image/png' } });
