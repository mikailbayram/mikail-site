// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mikailbayram.com',

  // Matches the Worker's html_handling: pages live at /work/x, not /work/x/.
  trailingSlash: 'never',

  integrations: [sitemap()],
});