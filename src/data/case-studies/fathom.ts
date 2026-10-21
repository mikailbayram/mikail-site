import type { CaseStudy } from '../case-study';
import leads from '../../assets/work/fathom/leads.png';

export const fathom: CaseStudy = {
  overview: [
    'Companies often have their best answers buried in docs, help centers and PDFs, where buyers never look. Fathom finds them. You paste a prospect\'s URL, it crawls the site, pulls out specific claims from the deep content, and checks whether a buyer could find each one on the marketing pages.',
    'The gaps are ranked, and every scan gets a grounded chatbot on a shareable link, plus an embeddable widget. It is a sales tool: you show a prospect what their buyers can\'t find.',
  ],
  architecture: `  URL ──▶ site map ──▶ crawl plan (budgeted, 25% for buyer pages)
                          │
                          ▼
              chunks + embeddings ──▶ PostgreSQL + pgvector
                          │
          ┌───────────────┴────────────────┐
          ▼                                ▼
    claim extraction               hybrid search
    + friction score               vector ⊕ full-text (RRF)
          │                                │
          ▼                                ▼
     ranked gaps                grounded chat · widget.js`,
  highlights: [
    {
      title: 'Hybrid search with reciprocal rank fusion',
      body: [
        'Retrieval runs a cosine search over pgvector (HNSW index) and a Postgres full-text search side by side, 15 candidates each, then merges them with reciprocal rank fusion. Cosine distance and full-text rank aren\'t on comparable scales, so fusing ranks instead of scores avoids hand-tuned weights.',
      ],
    },
    {
      title: 'Citations that are actually checked',
      body: [
        'When the model answers, it must say which passages support the answer. Those IDs are intersected with the passages it was actually shown, and an answer with no surviving support is thrown away. In the chat, search is a tool the model calls when it needs a fact, and answers stream to the browser.',
      ],
    },
    {
      title: 'A deterministic friction score',
      body: [
        'Ranking doesn\'t use the LLM. A plain-Ruby score weighs how hard a claim is to find, how important it is, how obscure the source is, how technical it is and how confident the extraction was, with a penalty if the answer is already prominent. The same input always gives the same ranking.',
      ],
    },
    {
      title: 'Built so it can\'t spend money by accident',
      body: [
        'By default it runs in fake mode: outbound calls are blocked, and embeddings come from a deterministic hashing trick so vector search still really runs in tests. Live mode needs two explicit switches, and per-scan and daily spending limits apply.',
      ],
    },
  ],
  screens: [
    { src: leads, alt: 'Leads list with scan status, pages crawled and gaps found', caption: 'Each lead is one company. Scans run in the background and report pages crawled, claims tested and gaps found.', url: 'localhost:3000/leads' },
  ],
};
