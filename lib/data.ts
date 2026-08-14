import { Product, Solution, BlogPost, DocNavGroup, IconKey } from "./types";

export const PRODUCTS: Product[] = [
  {
    slug: "cloud",
    key: "Cloud",
    name: "GPU Cloud",
    tagline: "clusters you can actually get",
    blurb: "On-demand and reserved accelerator clusters with InfiniBand fabric, managed Slurm and Kubernetes, and high-throughput parallel storage.",
    lede: "Reserved and on-demand accelerator capacity in Indian regions, with the fabric, storage and scheduling large training runs need, and a power position behind every rack.",
    kicker: "Product / Cloud",
    caps: [
      ["Reserved pools", "Contract capacity for six to thirty-six months, then carve clusters out of it yourself as projects start and finish.", "chip"],
      ["Bare metal or managed", "Take nodes raw, or take managed Slurm and Kubernetes with images, drivers and health checks maintained by us.", "grid"],
      ["Fabric built for collectives", "Non-blocking 400G InfiniBand within a hall, rail-optimised, with topology exposed to your scheduler.", "cloud"],
      ["Energy attribution per job", "The usage API returns kWh, carbon-free share and cost for any job id, so efficiency work has a number to chase.", "bolt"]
    ],
    spec: [
      ["Accelerators", "Current-generation NVIDIA HGX nodes, eight accelerators per node, NVLink within the node"],
      ["Regions", "Maharashtra and Western India at launch; further regions follow energisation"],
      ["Storage", "Parallel NVMe scratch, S3-compatible object storage, dataset cache at the fabric edge"],
      ["Access", "SSO, per-project RBAC, private link into your VPC, no public control-plane requirement"]
    ],
    related: ["inference", "energy"]
  },
  {
    slug: "inference",
    key: "Inference",
    name: "Managed Inference",
    tagline: "tokens without a cluster",
    blurb: "Token endpoints for open-weight models on dedicated Indian capacity. Autoscaled, priced per million tokens, no cluster to run.",
    lede: "Open-weight models served on dedicated Indian capacity, priced per million tokens and autoscaled by us. Bring your own weights when the catalogue is not enough.",
    kicker: "Product / Inference",
    caps: [
      ["Catalogue endpoints", "Popular open-weight text, vision and embedding models kept current, with a stable API surface across versions.", "cloud"],
      ["Bring your own weights", "Upload a checkpoint or an adapter and get a private endpoint on the same autoscaling path.", "chip"],
      ["Latency you can promise", "Regional routing, prefix caching and continuous batching, with p95 published per model and region.", "clock"],
      ["Residency by default", "Prompts, completions and logs stay inside Indian regions and are never used to train anything.", "shield"]
    ],
    spec: [
      ["Interface", "OpenAI-compatible REST and streaming, plus native batch"],
      ["Pricing", "Per million input and output tokens; committed throughput available"],
      ["Scaling", "Zero to burst in seconds on shared pools; dedicated replicas for steady load"],
      ["Controls", "Rate limits, spend caps, per-key routing, full request audit"]
    ],
    related: ["cloud", "ai-factories"]
  },
  {
    slug: "ai-factories",
    key: "Sites",
    name: "AI Factories",
    tagline: "halls built for the load, not retrofitted",
    blurb: "Liquid-cooled halls, managed racks and colocation built for high-density AI load, sited where power can actually be delivered.",
    lede: "Colocation, managed racks and private halls designed around high-density AI load: liquid cooling, heavy power per rack, and a build sequence tied to the energisation date.",
    kicker: "Product / Sites",
    caps: [
      ["High-density halls", "Direct-to-chip liquid cooling with rear-door heat exchange, engineered well beyond conventional enterprise rack density.", "grid"],
      ["Managed racks", "We rack, cable, burn in and monitor. You get IPMI, a fabric port and an SLA instead of a shipping crate.", "chip"],
      ["Sited on power", "Locations are chosen for interconnection position and renewable proximity first, real-estate economics second.", "bolt"],
      ["Bring your own hardware", "Own the accelerators, rent the hall. Same monitoring, same power profile, same attribution.", "cloud"]
    ],
    spec: [
      ["Cooling", "Direct-to-chip liquid loop, rear-door exchange, air for network and storage rows"],
      ["Resilience", "Concurrently maintainable electrical topology; storage and firm supply behind the meter"],
      ["Connectivity", "Carrier-neutral, diverse fibre paths, private interconnect to major clouds"],
      ["Assurance", "Independent commissioning; ISO 27001 and SOC 2 programmes in progress"]
    ],
    related: ["energy", "cloud"]
  },
  {
    slug: "energy",
    key: "Energy",
    name: "Energy",
    tagline: "a flat load deserves a firm supply",
    blurb: "Captive and group-captive renewables, storage and behind-the-meter supply contracted for a flat, always-on AI load.",
    lede: "Clean generation, storage and contracting arranged around AI's always-on demand curve: captive and group-captive renewables, behind-the-meter supply, and matching measured hour by hour.",
    kicker: "Product / Energy",
    caps: [
      ["Captive and group captive", "Structures that give a data centre a long-run cost of power instead of a tariff that reprices every year.", "bolt"],
      ["Storage that shapes the curve", "Battery storage sized to carry the load through evening ramps and low-wind nights, not to flatter an annual average.", "clock"],
      ["24×7 carbon-free matching", "Supply matched to demand hour by hour, reported per site and per customer, with residual grid draw shown honestly.", "grid"],
      ["Dispatch as software", "Forecasting and scheduling across generation, storage and grid import, run in the platform rather than in spreadsheets.", "cloud"]
    ],
    spec: [
      ["Sources", "Solar, wind and hybrid parks, plus battery storage co-located or contracted"],
      ["Structures", "Captive, group captive, open access and behind-the-meter supply"],
      ["Reporting", "Hourly matched share, residual import, and emissions factors per site"],
      ["Disclosure", "Measured figures are footnoted; modelled numbers are labelled as modelled"]
    ],
    related: ["ai-factories", "cloud"]
  }
];

export const bySlug = (s: string): Product | undefined => PRODUCTS.find((p) => p.slug === s);

export const PROBLEMS: [string, string, IconKey][] = [
  ["Interconnection Queues", "Grid connection, not GPU lead time, sets the date a cluster goes live. A site without a power position is years from useful.", "bolt"],
  ["A Flat Load On A Variable Grid", "AI training draws a near-constant 24×7 load. Renewables do not supply one. Closing that gap takes storage and contracts, not annual averages.", "clock"],
  ["Four Vendors, No Owner", "Power, land, hardware and cloud usually sit with different parties, so nobody owns the number that matters: delivered compute per rupee.", "grid"],
  ["Capital Sitting Idle", "Accelerators bought ahead of a power and cooling plan wait unracked while depreciation runs against them.", "chip"]
];

export const COMMITMENTS: [string, string, IconKey][] = [
  ["A date, not a queue position", "Capacity offers name a site, an energisation schedule and a handover date.", "clock"],
  ["Energy shown per job", "Every cluster and endpoint reports kWh, carbon-free share and cost against the workload that caused it.", "bolt"],
  ["Data stays in India", "Regions, storage, backups and support operate inside Indian jurisdiction, with per-tenant key control.", "shield"],
  ["Exit without a rebuild", "Standard schedulers, S3-compatible storage, open-weight inference. Nothing in the stack exists to trap you.", "grid"]
];

export const PLANES: [string, string][] = [
  ["Experience", "Console, CLI, API and quotas: what your team touches every day."],
  ["Cloud management", "Tenancy, catalogue, entitlements, metering and multi-sided billing."],
  ["Federation control", "Placement and scheduling across sites and providers as one pool."],
  ["Energy intelligence", "Forecasting, dispatch, carbon-free matching and per-job attribution."],
  ["Site control", "Hall, rack, cooling and hardware lifecycle at each facility."],
  ["Resource & energy", "The physical layer: generation, storage, grid interface, accelerators, fabric."]
];

export const SOLUTIONS: Solution[] = [
  {
    id: "training",
    eyebrow: "Frontier training",
    h: "Long Runs, Fixed Cost, No Surprises",
    note: "Reserved pools with a named site and a fixed power profile, so a ninety-day run has a known cost on day one.",
    items: [
      ["Capacity", "Reserved nodes for six to thirty-six months, expandable in blocks as the run scales.", "chip"],
      ["Resilience", "Checkpoint-aware scheduling, spare-node pools and automatic drain on hardware faults.", "shield"],
      ["Reporting", "Throughput, utilisation and energy per run, so efficiency work pays for itself.", "bolt"]
    ]
  },
  {
    id: "inference",
    eyebrow: "Production inference",
    h: "Spiky Demand, Predictable Latency",
    note: "Dedicated replicas for the baseline, shared pools for the peaks, both inside Indian regions.",
    items: [
      ["Shape", "Committed throughput for steady traffic, burst capacity billed per token above it.", "cloud"],
      ["Placement", "Regional routing with private interconnect to wherever your application already runs.", "grid"],
      ["Controls", "Spend caps, per-key rate limits and a full audit trail for every request.", "shield"]
    ]
  },
  {
    id: "sovereign",
    eyebrow: "Sovereign & regulated",
    h: "Jurisdiction You Can Point At",
    note: "For government, BFSI, healthcare and public research: single-tenant halls, Indian operations, and an audit trail that survives a regulator's questions.",
    items: [
      ["Isolation", "Single-tenant halls or private cages with dedicated fabric and storage.", "grid"],
      ["Key control", "Customer-managed keys, hardware security modules, and no offshore support path.", "shield"],
      ["Evidence", "Access logs, change records and energy disclosures exportable on demand.", "clock"]
    ]
  },
  {
    id: "wholesale",
    eyebrow: "Wholesale capacity",
    h: "For Cloud Providers And Aggregators",
    note: "Take halls, racks or whole pools and resell them under your own brand, with the platform's metering underneath.",
    items: [
      ["Offtake", "Multi-year commitments on power and space, priced against a known supply position.", "bolt"],
      ["Multi-sided billing", "Meter your customers through the same plane that meters you, with your margin intact.", "grid"],
      ["White label", "Your console, our control plane, one operations rota that answers the phone.", "cloud"]
    ]
  }
];

export const POSTS: BlogPost[] = [
  {
    slug: "interconnection-queue",
    date: "11 Aug 2026",
    read: "8 min read",
    tag: "Energy",
    title: "The interconnection queue is the real GPU shortage",
    excerpt: "Accelerator lead times are measured in months. The queue to energise the site that would hold them is measured in years."
  },
  {
    slug: "hourly-matching",
    date: "30 Jul 2026",
    read: "7 min read",
    tag: "Energy",
    title: "Matching a flat AI load hour by hour",
    excerpt: "Annual averages make any renewable portfolio look carbon-free. Hourly matching is where the storage bill shows up."
  },
  {
    slug: "rack-density",
    date: "18 Jul 2026",
    read: "6 min read",
    tag: "Sites",
    title: "What changes at very high rack density",
    excerpt: "Liquid cooling is the easy part. Floor loading, loop chemistry and the service model are where builds go wrong."
  },
  {
    slug: "group-captive",
    date: "02 Jul 2026",
    read: "5 min read",
    tag: "Energy",
    title: "Group captive, explained for AI teams",
    excerpt: "Why the structure behind your power contract determines your cost of compute for the next decade."
  },
  {
    slug: "six-planes",
    date: "14 Jun 2026",
    read: "9 min read",
    tag: "Platform",
    title: "Six planes: running energy and cloud as one system",
    excerpt: "The control-plane design that lets a training job report the kilowatt-hours it consumed."
  },
  {
    slug: "evening-ramp",
    date: "29 May 2026",
    read: "6 min read",
    tag: "Platform",
    title: "Scheduling around the evening ramp",
    excerpt: "Flexible batch work can move. Inference cannot. Splitting the two is worth more than any tariff negotiation."
  }
];

export const DOC_NAV: DocNavGroup[] = [
  ["Start", [["quickstart", "Quickstart"], ["concepts", "Core concepts"]]],
  ["Guides", [["clusters", "Launch a cluster"], ["storage", "Storage and data"], ["inference", "Serve a model"], ["energy", "Energy attribution"]]],
  ["Reference", [["regions", "Regions"], ["api", "API"], ["changelog", "Changelog"]]]
];
