import type { CaseStudy } from '../case-study';
import funnel from '../../assets/work/linkifunnels/campaign-funnel.png';
import editor from '../../assets/work/linkifunnels/post-editor.png';
import tracked from '../../assets/work/linkifunnels/tracked-post-editor.png';
import attribution from '../../assets/work/linkifunnels/attribution-dashboard.png';
import domain from '../../assets/work/linkifunnels/custom-domain.png';

export const linkifunnels: CaseStudy = {
  overview: [
    'B2B founders post on LinkedIn every week and have no idea which posts bring customers. LinkiFunnels connects the two. You write and schedule posts in the app, every link in them becomes a tracked short link, and each lead, booked call and sale is attributed back to the post that drove it.',
    'Around that core it has what you need to follow up: email sequences per campaign, a shared inbox, a booking page synced with Google Calendar, contacts, and a public API so your own site can report conversions. I built it alone, from the first commit to production, in about six months.',
  ],
  architecture: `  LinkedIn API ──── OAuth, publish, daily analytics
        │
        ▼
  React 19 ── Inertia ──▶ Rails 8.1 ──▶ PostgreSQL
                            │
                            ├─ Solid Queue   5 priority queues
                            │                13 recurring jobs
                            ├─ Solid Cable   8 live channels
                            └─ PostShiba     email out + inbound

  go.linkifunnels.com ─┐
  links.customer.com ──┴─▶ Cloudflare for SaaS ─▶ kamal-proxy

  deploy: Kamal 2 → one Hetzner host · R2 · Sentry`,
  highlights: [
    {
      title: 'Custom domains with automatic TLS',
      body: [
        'Customers can serve their short links from their own subdomain. Their hostnames go through Cloudflare for SaaS to a catch-all kamal-proxy service, while the app domain keeps a normal Let\'s Encrypt certificate.',
        'I picked this over on-demand TLS in Caddy because it keeps Kamal\'s zero-downtime deploys, and a Cloudflare outage can only affect customer redirects, never the app. Status changes from Cloudflare stream to the settings page over Action Cable.',
      ],
    },
    {
      title: 'Clicks you can trust',
      body: [
        'LinkedIn previews, bots and security scanners inflate click counts. Every click is classified once, when it is written, by a deterministic function with nine ordered rules: preview bots, known bots, non-browser clients, headless Chrome, client hints that contradict the user agent, outdated browsers, a curated list of datacenter networks, repeat clicks, and finally humans.',
        'The rules are documented with the reasoning behind each one, including the heuristics I tried and threw out because they mislabeled real people behind shared office IPs.',
      ],
    },
    {
      title: 'Integration docs written for AI coding agents',
      body: [
        'Most users connect their site by pasting a prompt into their coding agent. The prompt sets token rules first (use an env var, never echo or commit it), then has the agent classify the site into one of five setups and pick the right integration: a server-side API call, a small serverless "wedge" that records the lead and redirects, or the embed.js snippet that keeps the click ID in a first-party cookie for 90 days.',
      ],
    },
    {
      title: 'A design system in code instead of Figma',
      body: [
        'The design lives in the repo: tokens that mirror the app\'s CSS, HTML sheets for type, motion and components, and a dated log of 36 design decisions that my AI design agent must read before it mocks up a screen. Every mockup is checked with Playwright at desktop and phone widths, and approved tokens map straight into the Tailwind theme.',
      ],
    },
    {
      title: 'Real-time everywhere, on one host',
      body: [
        'Publishing status, imports, domain checks and the inbox all update live over Action Cable, with no polling allowed. Queue, cache and cable all run on Solid adapters, so production is a single host deployed with Kamal.',
        'Jobs run on five priority queues. Clicks are processed ahead of the default queue because a browser conversion is rejected if its click has not been recorded yet. A test fails if any job is sent to a queue that no worker polls.',
      ],
    },
    {
      title: 'A strict quality gate',
      body: [
        'bin/ci runs RuboCop, ESLint, Prettier, a TypeScript check, bundler-audit, Brakeman (failing on any warning), Vitest and the Rails suite, then signs off the commit on GitHub. About 2,100 Rails tests and 320 frontend tests run on every change.',
      ],
    },
  ],
  screens: [
    { src: funnel, alt: 'Campaign page with a funnel chart from clicks to leads to booked calls', caption: 'A campaign\'s funnel, from clicks to leads to booked calls.', url: 'app.linkifunnels.com/campaigns/linkedin-lead-engine' },
    { src: editor, alt: 'Post editor with a rich text field and a live LinkedIn preview', caption: 'Writing a post, with a live LinkedIn preview and publishing straight to LinkedIn.', url: 'app.linkifunnels.com/posts/new' },
    { src: tracked, alt: 'Post editor detecting a link and offering to track it', caption: 'Links in a post are detected and turned into tracked short links.', narrow: true },
    { src: attribution, alt: 'Dashboard with clicks, leads, booked calls and revenue', caption: 'Attribution: every lead and sale is tied back to the post that drove it.', narrow: true },
    { src: domain, alt: 'Dialog for adding a custom domain for short links', caption: 'Adding a custom domain. TLS is issued automatically through Cloudflare for SaaS.', url: 'app.linkifunnels.com/settings/custom_domains' },
  ],
};
