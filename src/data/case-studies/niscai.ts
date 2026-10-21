import type { CaseStudy } from '../case-study';

export const niscai: CaseStudy = {
  note: 'Client work through Thought and Function. The app is behind a login, so this page covers the architecture and my part in it rather than screens.',
  overview: [
    'Niscai measures the carbon footprint of commercial equipment such as refrigeration, heating and display products. Manufacturers record their product models and get a product carbon footprint for each one, either calculated on the platform or taken from an existing study. Buyers and specifiers compare products\' whole-life carbon side by side and request data from manufacturers.',
    'I joined in early 2025 and work across the API, the web app, the background services, infrastructure and CI.',
  ],
  architecture: `  Next.js 16 (Vercel) ── GraphQL ──▶ core-api
                                     NestJS · TypeORM
                                     PostgreSQL (Cloud SQL)
                                        │
                              Google Cloud Tasks
              ┌───────────────┬─────────┴──────┬─────────────┐
              ▼               ▼                ▼             ▼
       notifications     PDF reports      data insights   bulk export
       email, webhooks   Puppeteer

  qr-router ── QR scan ──▶ product page
  infra: Cloud Run · Terraform · GitHub Actions`,
  highlights: [
    {
      title: 'An AI-agent testing workflow',
      body: [
        'I led the move from Cypress to Playwright and set up three Claude Code agents to write the suite. A planner explores the running app and writes a test plan, a generator replays each step in a real browser and writes the spec, and a healer runs failing tests and fixes them.',
        'Every spec gets its own seeded, isolated tenant, and the run fails if two spec files would share one. The suite grew to 140 spec files across projects, models, carbon comparisons, auth, admin and billing entitlements.',
      ],
    },
    {
      title: 'Moving to Cloud Run with zero downtime',
      body: [
        'The backends moved from App Engine to Cloud Run behind a load balancer. The cutover was a single environment variable on the web app, so traffic switched at one request boundary and could be switched back instantly.',
      ],
    },
    {
      title: 'Safe migrations and rollbacks',
      body: [
        'I wrote the team\'s migration rules: schema changes are additive only (expand, then contract), and data migrations run separately with their own runner and tracking. That makes the rollback runbook simple: production rolls back the app, never the database, with a decision tree and a rollback workflow for both Vercel and Cloud Run.',
      ],
    },
    {
      title: 'A production domain migration',
      body: [
        'When the company renamed itself from Impact Loop to Niscai, I led the move to the new domain: 301 redirects from the old domains and a parallel load balancer, then every environment\'s web app, QR code targets and email senders.',
      ],
    },
    {
      title: 'Owning CI and security',
      body: [
        'I effectively own the CI/CD pipelines: releases per environment, rollbacks, end-to-end runs and a shared Turbo cache. I also cleared critical dependency advisories, added OIDC token checks to the internal task endpoints, and did the Node 24 and Next.js 16 upgrades.',
      ],
    },
  ],
  screens: [],
};
