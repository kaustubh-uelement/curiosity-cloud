export type IconKey = "bolt" | "chip" | "cloud" | "grid" | "clock" | "shield";

export interface Product {
  slug: "cloud" | "inference" | "ai-factories" | "energy";
  key: string;
  name: string;
  tagline: string;
  blurb: string;
  lede: string;
  kicker: string;
  caps: [string, string, IconKey][];
  spec: [string, string][];
  related: ("cloud" | "inference" | "ai-factories" | "energy")[];
}

export interface Solution {
  id: "training" | "inference" | "sovereign" | "wholesale";
  eyebrow: string;
  h: string;
  note: string;
  items: [string, string, IconKey][];
}

export interface BlogPost {
  slug: string;
  date: string;
  read: string;
  tag: string;
  title: string;
  excerpt: string;
}

export type DocNavLink = [id: string, label: string];
export type DocNavGroup = [groupTitle: string, links: DocNavLink[]];

export interface Founder {
  name: string;
  role: string;
  bio: string;
}

export interface CareerPosition {
  category: string;
  location: string;
  title: string;
  body: string;
  href: string;
}

export interface StatItem {
  k: string;
  val: string;
  desc: string;
}

export interface ProblemItem {
  title: string;
  body: string;
  icon: IconKey;
}

export interface CommitmentItem {
  title: string;
  body: string;
  icon: IconKey;
}
