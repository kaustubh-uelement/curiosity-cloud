import type {
  NewsItem,
  Pillar,
  PillarValue,
  WorkloadBlock,
  Metric,
  Audience,
  Figure,
} from "./types";

export const NEWS: NewsItem[] = [
  {
    tag: "Platform",
    title: "The control plane that schedules against the grid",
    body: "How workload-to-power scheduling moves deferrable training into the cleanest, cheapest hours of the day.",
    to: "platform/control-plane",
    cta: "See the control plane",
  },
  {
    tag: "Infrastructure",
    title: "Why we design liquid-cooled from day one",
    body: "Current accelerator density has already passed what air cooling supports. Retrofitting a hall is a write-off, not an upgrade.",
    to: "platform/ai-factories",
    cta: "Inside the factories",
  },
  {
    tag: "Energy",
    title: "Firming renewables into a contractable 24×7 product",
    body: "Solar is variable. Training loads are not. Storage is what turns one into the other, and what makes the PPA bankable.",
    to: "platform/energy",
    cta: "How the energy works",
  },
];

export const PILLARS: Pillar[] = [
  {
    k: "01",
    t: "Energy",
    to: "platform/energy",
    d: "We contract and firm our own clean power: utility-scale solar and wind, storage for round-the-clock delivery, and grid interconnection secured before a rack is ordered.",
    tint: "#F59E0B",
    ink: "#B45309",
  },
  {
    k: "02",
    t: "AI factories",
    to: "platform/ai-factories",
    d: "We build and operate the campuses: liquid-cooled halls designed for current accelerator density, with a non-blocking fabric sized so training never throttles at the network.",
    tint: "#4F46E5",
    ink: "#4338CA",
  },
  {
    k: "03",
    t: "Cloud",
    to: "platform/control-plane",
    d: "We run the platform on top: bare-metal clusters, managed inference and training, and one control plane that decides what runs where, when, and at what carbon.",
    tint: "#0EA5E9",
    ink: "#0369A1",
  },
];

export const PILLAR_VALUES: PillarValue[] = [
  [
    "Faster time to capacity",
    "Powered land with contracted supply already in place, so deployment is measured in months rather than years.",
  ],
  [
    "Raw power, no surprises",
    "Non-virtualised accelerators on a non-blocking fabric, with the energy cost fixed under long-tenor contract.",
  ],
  [
    "Any workload, any tenancy",
    "Shared cloud, single-tenant private, or your own silicon in our halls; same campus, same control plane.",
  ],
  [
    "Elastic at every stage",
    "From a single node for a proof of concept to a dedicated hall, without renegotiating the whole stack.",
  ],
];

export const WORKLOAD_BLOCKS: WorkloadBlock[] = [
  {
    stat: "12–18 mo",
    label: "Target time from land control to energised capacity",
    head: "Get to capacity faster",
    points: [
      "Interconnection, evacuation and a contracted clean supply curve are secured before deployment begins, not after.",
      "Reference sites take existing powered facilities on long lease, so the first cluster lands well ahead of the greenfield programme.",
    ],
  },
  {
    stat: "24×7",
    label: "Carbon-free energy delivered under contract",
    head: "Fix the largest line item",
    points: [
      "Power is the dominant operating cost of an AI cluster, and the one most providers pass through at market.",
      "We contract generation and firm it with storage, so your landed cost and your carbon number both hold up over the term.",
    ],
  },
  {
    stat: "One plane",
    label: "Across generation, storage, campus and compute",
    head: "Run the whole stack as one system",
    points: [
      "Dispatch, thermal control, cluster health and node recovery share a single control plane with the energy assets.",
      "Deferrable work shifts into clean, low-tariff windows automatically, with per-workload attestation you can hand to an auditor.",
    ],
  },
];

export const METRICS: Metric[] = [
  ["≥ 95%", "Cluster goodput", "Design target"],
  ["< 15 min", "Mean time to node recovery", "Design target"],
  ["24×7", "Contracted carbon-free supply", "Committed"],
  ["3", "Launch regions planned", "Planned"],
];

export const AUDIENCES: Audience[] = [
  ["Enterprises", "Running production AI on data that cannot leave the country."],
  ["Model developers", "Training at scale, and paying attention to the power bill."],
  ["Sovereign AI", "National programmes that need capacity on domestic soil."],
  ["Research institutions", "Grant-funded work with fixed budgets and real deadlines."],
  ["Cloud providers", "Wholesale capacity without building the campus yourself."],
];

export const ECOSYSTEM: string[] = [
  "Accelerator OEM",
  "Fabric vendor",
  "Transmission utility",
  "Storage partner",
  "EPC contractor",
  "Colocation host",
  "Infrastructure lender",
];

export const FIGURES: Figure[] = [
  ["257 GW", "India peak demand crossed, 2026"],
  ["425 GW", "Projected peak demand, 2035"],
  ["1.5 TW", "Clean build needed over 10–12 years"],
];
