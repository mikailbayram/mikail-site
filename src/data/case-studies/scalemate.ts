import type { CaseStudy } from '../case-study';

export const scalemate: CaseStudy = {
  note: 'Client work through Thought and Function. This page covers the architecture and my part in it rather than screens.',
  overview: [
    'ScaleMate helps B2B sales teams find leads. A customer defines their ideal customer profile, launches lead-sourcing campaigns, and uploads a list of existing customers to exclude. Matching leads come back into the app, where the customer reviews, filters and picks the ones they want, then exports them.',
    'I was the main engineer, working across the dashboard, the API, the database schema, payments and infrastructure.',
  ],
  architecture: `  Next.js 15 ── typed React Query hooks ──▶ NestJS REST API
  (generated from the API's OpenAPI spec)       │
                                                ├─ Prisma ─▶ PostgreSQL
                                                ├─ Stripe webhooks
                                                ├─ Cloud Storage uploads
                                                └─ domain events ─▶ email

  Sanity Studio ──▶ marketing pages
  auth: Firebase · infra: Cloud Run, Cloud SQL, Terraform`,
  highlights: [
    {
      title: 'Migrating billing from Paddle to Stripe',
      body: [
        'Billing launched on Paddle and moved to Stripe in mid-2025. I reworked the plan, price, subscription and payment tables and rewrote the webhook handling. Webhooks are verified against the raw request body, and only events for this product are processed, so a Stripe account shared with other products doesn\'t interfere. Product and price changes in Stripe sync the plans automatically.',
      ],
    },
    {
      title: 'An event-driven lead pipeline',
      body: [
        'Campaigns move through clear steps: created, paid, leads uploaded, leads submitted. Each step emits a domain event that triggers the right email to the customer or the operators. Lead imports parse CSV or Excel files and write everything in one transaction, and exports escape fields properly.',
      ],
    },
    {
      title: 'A type-safe frontend from the API spec',
      body: [
        'The API documents itself with OpenAPI, and the frontend\'s data hooks are generated from that spec. A changed endpoint becomes a type error in the dashboard instead of a runtime bug.',
      ],
    },
    {
      title: 'Subscription-gated access',
      body: [
        'Requests are checked by a Firebase token guard and a role guard. Paid features sit behind a decorator that only lets active or trialing subscribers through, so access rules live next to the endpoints they protect.',
      ],
    },
    {
      title: 'Infrastructure as code',
      body: [
        'Dev, staging and production are defined in Terraform on GCP: Cloud Run for the API, Cloud SQL Postgres, storage, a global load balancer with managed certificates, deployed from GitHub Actions.',
      ],
    },
  ],
  screens: [],
};
