import type { NavItem } from "./types";
import { BODIES } from "./bodies";

export const NAV_PRODUCTS: NavItem[] = BODIES.map((b) => ({
  name: b.name,
  slug: b.slug,
  description: b.line,
}));

export const NAV_PLATFORM: NavItem[] = [
  {
    name: "Energy",
    slug: "platform/energy",
    description: "Contracted, firmed, round-the-clock clean supply",
  },
  {
    name: "AI factories",
    slug: "platform/ai-factories",
    description: "Liquid-cooled halls and a non-blocking fabric",
  },
  {
    name: "Control plane",
    slug: "platform/control-plane",
    description: "One system across generation, campus and compute",
  },
];
