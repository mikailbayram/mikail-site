import type { CaseStudy } from '../case-study';

export const brzafaktura: CaseStudy = {
  overview: [
    'Small firms in Bosnia and Herzegovina still retype supplier invoices into their books by hand. BrzaFaktura ("fast invoice") reads them for you. You upload a PDF or a photo, an AI model turns it into a structured draft, the app matches the supplier, and you post it to the books as a balanced double-entry journal entry.',
    'On the sales side it issues numbered invoices with PDFs, prints fiscal receipts on a local fiscal printer, and exports the monthly VAT ledgers in the format the tax authority expects. There is also a free trial that works without an account.',
  ],
  architecture: `  upload (PDF / photo)
        │
        ▼
  Rails 8 ──▶ Solid Queue ──▶ Gemini via RubyLLM
    │           │               structured JSON schema
    │           └─ PDF generation (Prawn)
    ▼
  PostgreSQL 17 ── journal entries, ledger, VAT records

  Hotwire (ERB + Stimulus) ── most screens
  Inertia + Svelte 5 ──────── invoice editing and booking

  browser ──▶ localhost:8086 ──▶ Go proxy ──▶ fiscal printer

  deploy: Kamal 2 · SES email · S3 storage`,
  highlights: [
    {
      title: 'AI invoice extraction you can check',
      body: [
        'Each upload goes to Gemini through RubyLLM with a strict JSON schema: supplier tax IDs (13-digit JIB and 12-digit VAT number), dates, currency, document type, and line items with their own VAT rate and discount. The prompt knows Bosnian invoices, for example which lines are VAT-exempt and how to spread an invoice-level discount across lines without counting it twice.',
        'Nothing the model returns is trusted blindly. Non-object responses fail, duplicate numbers get a suffix, bad dates become empty, currencies are normalized, and suppliers are matched by tax ID, then by name, or suggested for the user to confirm. Jobs retry on model errors and push live status to the page over Turbo Streams.',
      ],
    },
    {
      title: 'Real double-entry bookkeeping',
      body: [
        'Journal entries move from draft to posted to reversed, and can only be posted when debits equal credits. Posted entries are immutable; a correction creates a linked mirror-image reversal. Each line is either a debit or a credit, and money is stored as integer cents with banker\'s rounding.',
        'Every company gets its own chart of accounts, seeded from the official account plan, with validation that each account code fits under its parent and has the right normal balance.',
      ],
    },
    {
      title: 'VAT exports in the official format',
      body: [
        'The app generates the monthly incoming and outgoing VAT ledgers as the semicolon-separated files the tax authority specifies, with the required file names, header and footer rows. Document types that make VAT non-deductible are handled automatically, and deductibility can also be set per line.',
      ],
    },
    {
      title: 'A web app that drives a fiscal printer',
      body: [
        'Bosnian shops must print receipts on certified fiscal printers that only talk through files on a Windows PC. I wrote a small Go program that runs there on localhost, maps 17 printer commands to the printer\'s XML file interface, and waits for its response. The browser sends the receipt through it and saves the returned receipt number. It is built to run on Windows 7, without a window, and starts itself on boot.',
      ],
    },
    {
      title: 'From React to Svelte, where it mattered',
      body: [
        'Most of the app is server-rendered Hotwire, which is fast to build and easy to keep consistent. The invoice editor and booking screens need rich client-side state, so they run on Inertia. They started on React 19, and I migrated them to Svelte 5 in April 2026.',
      ],
    },
    {
      title: 'Multi-company, with permissions',
      body: [
        'One user can work for several companies. Every query is scoped to the current company, and each company has its own roles with per-action permissions (read, create, update, delete, book, reverse, pay, cancel) declared right on the controllers.',
      ],
    },
  ],
  screens: [],
};
