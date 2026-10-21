# mikail-site

Personal site for Mikail Bayram. Built with Astro and deployed as static assets on Cloudflare Workers.

The look combines a Bosnian ćilim (kilim) with a terminal. The pixel art (Sebilj, Stari Most) is drawn as character grids in `src/lib/pixels.ts`. Every color is a CSS variable, so dark mode re-dyes it.

## Commands

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `npm run dev`    | Dev server at `localhost:4321`                      |
| `npm run check`  | Type-check `.astro` and `.ts` files                 |
| `npm run build`  | Build the static site to `dist/`                    |
| `npm run cf:dev` | Build, then serve it locally through Wrangler       |
| `npm run deploy` | Build and deploy to Cloudflare Workers              |

## Where things live

- `src/data/projects.ts`: project content. Home tiles, project pages and the terminal all read from here.
- `src/styles/global.css`: design tokens, light and dark. The `/system` page renders them.
- `src/components/Terminal.astro`: the interactive terminal, including its commands and the prewritten `ask` answers.
- `src/components/Bridge.astro`: Stari Most and the walker that crosses it as you scroll.

Production is https://mikailbayram.com (set in `astro.config.mjs` and `wrangler.jsonc`).

`redirect/` is a separate Worker on www.mikailbayram.com that 301s to the bare domain. Deploy it with `npx wrangler deploy` from that folder; it rarely changes.
