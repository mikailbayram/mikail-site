// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mikailbayram.com',
  // Matches the Worker's html_handling: pages live at /work/x, not /work/x/.
  trailingSlash: 'never',
});
