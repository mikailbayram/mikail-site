import type { CaseStudy } from '../case-study';
import gaps from '../../assets/work/fathom/gaps.png';
import pipeline from '../../assets/work/fathom/scan-pipeline.png';
import finding from '../../assets/work/fathom/finding.png';
import chatbot from '../../assets/work/fathom/chatbot.png';
import snippet from '../../assets/work/fathom/demo-snippet.png';
import widget from '../../assets/work/fathom/widget.png';
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
    { src: gaps, alt: 'Scan results for solution404.io: 30 URLs mapped, 21 pages analysed, 217 passages indexed, 7 ranked gaps', caption: 'A real scan of solution404.io, the studio I build with. 30 URLs mapped, 21 pages read and 217 passages indexed for $0.45. The gaps are ranked by friction score, highest first.', url: 'localhost:3000/leads/3' },
    { src: pipeline, alt: 'Scan tab showing each pipeline stage with its result, next to the crawl plan', caption: 'The Scan tab shows each stage and what it produced. The crawl plan on the right is why the scan is cheap: of 30 URLs found, 23 are eligible and 7 are skipped as low value before anything is fetched.', url: 'localhost:3000/leads/3' },
    { src: finding, alt: 'A finding comparing what the buyer-visible site says with what the deep content says, with the source page', caption: 'One finding, side by side: what the buyer-facing pages say against what the deeper content says, with the source page and how hard the answer is to find.', url: 'localhost:3000/findings/139' },
    { src: chatbot, alt: 'Public demo chatbot answering questions about Solution404 with linked sources', caption: 'The shareable chatbot. When the site doesn\'t publish an answer, it says so and offers to pass the question on, rather than guessing. Every answer links the pages it used.', url: 'localhost:3000/d/solution404-c0422d' },
    { src: snippet, alt: 'Demo tab with a one-line script snippet and a copy button, above a preview of the chatbot', caption: 'The Demo tab. Copy the one-line snippet, paste it into the browser console on the prospect\'s own site, and the chatbot appears there.', url: 'localhost:3000/leads/3' },
    { src: widget, alt: 'The Fathom chatbot widget open in the corner of the live solution404.io homepage', caption: 'The snippet running on the live solution404.io homepage. The widget is an iframe, so the host page\'s styles can\'t break it.', url: 'solution404.io' },
    { src: leads, alt: 'Leads list with scan status, pages crawled, claims tested and gaps found', caption: 'Each lead is one company. Paste a URL and the scan runs in the background.', url: 'localhost:3000/leads' },
  ],
};
