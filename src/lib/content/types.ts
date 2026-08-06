/* ------------------------------------------------------------------ *
 *  Content type definitions for Curiosity Cloud
 * ------------------------------------------------------------------ */

export interface Body {
  id: string;
  slug: string;
  name: string;
  orbit: number;
  period: number;
  phase: number;
  size: number;
  tint: string;
  text: string;
  glow: string;
  line: string;
  detail: string;
  facts: [string, string][];
}

export interface NewsItem {
  tag: string;
  title: string;
  body: string;
  to: string;
  cta: string;
}

export interface Pillar {
  k: string;
  t: string;
  to: string;
  d: string;
  tint: string;
  ink: string;
}

export interface WorkloadBlock {
  stat: string;
  label: string;
  head: string;
  points: string[];
}

export type Metric = [string, string, string];
export type Spec = [string, string, string];
export type Audience = [string, string];
export type Figure = [string, string];
export type PillarValue = [string, string];
export type ContactItem = [string, string];

export interface SpecGroup {
  group: string;
  rows: Spec[];
}

export interface TimelinePhase {
  year: string;
  when: string;
  items: string[];
}

export interface NavItem {
  name: string;
  slug: string;
  description: string;
}

export interface PageIntro {
  h: string;
  p: string[];
}

export interface PageData {
  parent?: [string, string];
  eyebrow?: string;
  title?: string;
  lede?: string;
  accent?: string;
  kind?: string;
  intro?: PageIntro;
  features?: [string, string][];
  steps?: [string, string][];
  specs?: Spec[];
  faq?: [string, string][];
  secondary?: [string, string] | null;
}
