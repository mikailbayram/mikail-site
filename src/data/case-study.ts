import type { ImageMetadata } from 'astro';

export type Screen = {
  src: ImageMetadata;
  alt: string;
  caption: string;
  url?: string; // shown in the frame's address bar
  narrow?: boolean; // portrait or small UI crops
};

export type CaseStudy = {
  overview: string[];
  architecture?: string; // monospace diagram
  highlights: { title: string; body: string[] }[];
  screens: Screen[];
  note?: string; // e.g. client-work disclaimer
};
