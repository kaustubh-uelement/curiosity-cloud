import type { Body } from "./types";

export const BODIES: Body[] = [
  {
    id: "C-I",
    slug: "products/gpu-cloud",
    name: "GPU Cloud",
    orbit: 34,
    period: 26,
    phase: 0,
    size: 15,
    tint: "#22D3EE",
    text: "#0E7490",
    glow: "rgba(34,211,238,",
    line: "On-demand and reserved accelerator capacity, billed by the hour.",
    detail:
      "Bare-metal access to dense accelerator nodes. No hypervisor tax, no noisy neighbours, and a scheduler that knows when the power is cleanest.",
    facts: [
      ["Access", "Bare metal"],
      ["Commit", "Hourly → 36 mo"],
      ["Fabric", "Non-blocking"],
    ],
  },
  {
    id: "C-II",
    slug: "products/private-ai-cloud",
    name: "Private AI Cloud",
    orbit: 54,
    period: 40,
    phase: -9,
    size: 21,
    tint: "#0EA5E9",
    text: "#0369A1",
    glow: "rgba(14,165,233,",
    line: "A single-tenant environment inside our campus, under your controls.",
    detail:
      "Physically isolated racks, your identity provider, your key management, your data residency. Operated by us, governed by you.",
    facts: [
      ["Tenancy", "Single tenant"],
      ["Residency", "In-country"],
      ["Keys", "Customer-held"],
    ],
  },
  {
    id: "C-III",
    slug: "products/managed-infrastructure",
    name: "Managed AI Infrastructure",
    orbit: 74,
    period: 58,
    phase: -22,
    size: 18,
    tint: "#4F46E5",
    text: "#4338CA",
    glow: "rgba(79,70,229,",
    line: "You own the silicon. We run everything underneath it.",
    detail:
      "Powered, cooled and connected space with 24×7 operations, node health monitoring and automated recovery, so a long training run survives a failed host.",
    facts: [
      ["Model", "Colocation + ops"],
      ["Cooling", "Direct-to-chip"],
      ["Recovery", "Automated"],
    ],
  },
  {
    id: "C-IV",
    slug: "products/inference-training",
    name: "Inference & Training",
    orbit: 94,
    period: 82,
    phase: -40,
    size: 13,
    tint: "#7C3AED",
    text: "#6D28D9",
    glow: "rgba(124,58,237,",
    line: "Managed endpoints for teams that want capacity, not a datacentre.",
    detail:
      "Serve a model or run a training job against pooled capacity. Deferrable work is scheduled into windows when the campus is running cleanest and cheapest.",
    facts: [
      ["Workloads", "Train + serve"],
      ["Scheduling", "Carbon-aware"],
      ["Scaling", "Pooled"],
    ],
  },
];

export const byslug = (s: string): Body | undefined =>
  BODIES.find((b) => b.slug === s);
