import type { CaseStudy } from '../case-study';
import invoice from '../../assets/work/papirko/verified-invoice.png';
import statement from '../../assets/work/papirko/bank-statement.png';

export const papirko: CaseStudy = {
  overview: [
    'Bookkeepers in Bosnia spend hours copying invoices and bank statements into Excel. Papirko is a desktop app that does it for them. You drop in PDFs, scans or photos, and it reads them offline first, checks its own work, and exports clean spreadsheets or a posting order for the books.',
    'Only when a document fails its checks does the user ask for a more precise cloud read by Claude, paid per page with credits.',
  ],
  architecture: `  PDF / scan / photo
        │
        ▼
  Tauri 2 (Rust) ── text layer? ── pdftotext
        │            otherwise ── pdftoppm → ImageMagick → Tesseract
        ▼
  parsers: invoices · bank statements (regex + layout)
        │
        ▼
  React 19 UI ── checks pass? ── "Verified"
        │            otherwise ── re-read ──▶ Cloudflare Worker ──▶ Claude
        ▼                                     credits in D1
  Excel export (rust_xlsxwriter) · posting order`,
  highlights: [
    {
      title: 'Offline OCR first',
      body: [
        'If a PDF has a text layer, Papirko uses it. Otherwise it renders each page, cleans it up with ImageMagick and runs Tesseract with Bosnian and Croatian language data, then rebuilds the page layout from Tesseract\'s word positions so the parsers see columns, not a jumble.',
      ],
    },
    {
      title: 'An app that checks its own work',
      body: [
        'A document only counts as verified when all the data is there, the arithmetic adds up, the values can be found on the document, and it isn\'t a duplicate. Anything else is flagged for review, and the user can ask for a cloud re-read that starts with a fast model and escalates to a stronger one if the checks still fail.',
      ],
    },
    {
      title: 'Bank statements that balance',
      body: [
        'Statements are detected by their wording in several languages. Amounts are assigned to debit, credit or balance by their column position, and the direction of each amount is then corrected with the running balance: previous balance plus or minus the amount must equal the new balance.',
      ],
    },
    {
      title: 'Credits metered at the edge',
      body: [
        'Cloud reads go through a Cloudflare Worker with a D1 database. It reserves credits atomically before the call, refunds them if the read fails, and returns a signed receipt.',
      ],
    },
  ],
  screens: [
    { src: invoice, alt: 'Papirko showing an invoice next to its extracted fields and line items', caption: 'A verified invoice: the original on the left, the extracted fields and line items on the right. The sample data is fictional.' },
    { src: statement, alt: 'Papirko showing a bank statement with its transactions and running balance', caption: 'A bank statement, with every transaction checked against the running balance.' },
  ],
};
