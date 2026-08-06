import React, { useState, useEffect, useRef, useCallback } from "react";

/* ==================================================================== *
 *  CURIOSITY CLOUD — multi-page site
 *  Landing + 12 sub-pages, hash routed.
 *  Structure: CoreWeave. Pitch: Crusoe + Nebius.
 *  Palette — cool compute ramp, one warm accent reserved for energy:
 *    6D28D9 violet · 4F46E5 indigo · 2563EB blue
 *    0EA5E9 sky    · 0891B2 cyan   · 22D3EE cyan-bright
 *    F59E0B energy — ONLY the power core and the Energy layer
 * ==================================================================== */

/* ----------------------------- products ---------------------------- */

const BODIES = [
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

const byslug = (s) => BODIES.find((b) => b.slug === s);

/* ------------------------- landing content ------------------------- */

const NEWS = [
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
    body: "Solar is variable. Training loads are not. Storage is what turns one into the other — and what makes the PPA bankable.",
    to: "platform/energy",
    cta: "How the energy works",
  },
];

const PILLARS = [
  {
    k: "01",
    t: "Energy",
    to: "platform/energy",
    d: "We contract and firm our own clean power — utility-scale solar and wind, storage for round-the-clock delivery, and grid interconnection secured before a rack is ordered.",
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

const PILLAR_VALUES = [
  ["Faster time to capacity", "Powered land with contracted supply already in place, so deployment is measured in months rather than years."],
  ["Raw power, no surprises", "Non-virtualised accelerators on a non-blocking fabric, with the energy cost fixed under long-tenor contract."],
  ["Any workload, any tenancy", "Shared cloud, single-tenant private, or your own silicon in our halls — same campus, same control plane."],
  ["Elastic at every stage", "From a single node for a proof of concept to a dedicated hall, without renegotiating the whole stack."],
];

const WORKLOAD_BLOCKS = [
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
      "Deferrable work shifts into clean, low-tariff windows automatically — with per-workload attestation you can hand to an auditor.",
    ],
  },
];

const METRICS = [
  ["≥ 95%", "Cluster goodput", "Design target"],
  ["< 15 min", "Mean time to node recovery", "Design target"],
  ["24×7", "Contracted carbon-free supply", "Committed"],
  ["3", "Launch regions planned", "Planned"],
];

const SPECS = [
  ["Accelerators", "Current-generation NVIDIA class", "Placeholder"],
  ["Interconnect", "Non-blocking east–west fabric", "Placeholder"],
  ["Cooling", "Direct-to-chip liquid, RDHx fallback", "Placeholder"],
  ["Rack density", "Designed for high-density halls", "Placeholder"],
  ["Power", "24×7 carbon-free, contracted", "Curiosity Energy"],
  ["Storage", "Parallel filesystem, NVMe tier", "Placeholder"],
  ["Regions", "Mumbai · Chennai · Hyderabad", "Planned"],
  ["Access", "Bare metal, API, private link", "Placeholder"],
];

const AUDIENCES = [
  ["Enterprises", "Running production AI on data that cannot leave the country."],
  ["Model developers", "Training at scale, and paying attention to the power bill."],
  ["Sovereign AI", "National programmes that need capacity on domestic soil."],
  ["Research institutions", "Grant-funded work with fixed budgets and real deadlines."],
  ["Cloud providers", "Wholesale capacity without building the campus yourself."],
];

const ECOSYSTEM = [
  "Accelerator OEM",
  "Fabric vendor",
  "Transmission utility",
  "Storage partner",
  "EPC contractor",
  "Colocation host",
  "Infrastructure lender",
];

const TIMELINE = [
  {
    year: "Phase 1",
    when: "0–6 months",
    items: [
      "Secure anchor site control and interconnection grant",
      "Open anchor tenant conversations",
      "Fix control-plane architecture and the build-versus-buy line",
    ],
  },
  {
    year: "Phase 2",
    when: "6–12 months",
    items: [
      "Reference deployment on a leased, already-powered facility",
      "Control-plane MVP live across one energy asset and one cluster",
    ],
  },
  {
    year: "Phase 3",
    when: "12–24 months",
    items: [
      "PPA portfolio signed and credit enhancement in place",
      "First greenfield campus energised and commissioned",
    ],
  },
  {
    year: "Phase 4",
    when: "24–36 months",
    items: [
      "Programme facility closed; sites two and three on template",
      "Revenue mix shifting from colocation toward managed AI cloud",
    ],
  },
];

const FIGURES = [
  ["257 GW", "India peak demand crossed, 2026"],
  ["425 GW", "Projected peak demand, 2035"],
  ["1.5 TW", "Clean build needed over 10–12 years"],
];

/* --------------------------- sub-pages ----------------------------- */

const PAGES = {
  /* ---------------------------- PRODUCTS --------------------------- */
  "products": {
    eyebrow: "Products",
    title: "Four ways to take capacity",
    lede:
      "Same campus, same power, same control plane. What changes is how much of the stack you want to hold — and how much of the operating burden you want to hand over.",
    kind: "products-index",
  },

  "products/gpu-cloud": {
    parent: ["Products", "products"],
    eyebrow: "C-I",
    title: "GPU Cloud",
    lede:
      "On-demand and reserved accelerator capacity, billed by the hour, on bare metal you actually control.",
    intro: {
      h: "Compute without the abstraction tax",
      p: [
        "Most clouds hand you a virtual machine and keep the interesting parts to themselves. GPU Cloud gives you the node — the whole node, with direct access to the accelerators, the NICs and the local NVMe.",
        "That matters for training. A hypervisor layer costs you throughput you have already paid for, and it hides the failure signals you need to keep a multi-week run alive.",
      ],
    },
    features: [
      ["Bare metal, not virtualised", "Direct access to accelerators, network interfaces and local storage. No shared tenancy on the host."],
      ["Non-blocking fabric", "East–west bandwidth sized so the interconnect is never the bottleneck in a distributed run."],
      ["Automated node recovery", "Health checks drain and replace failing hosts, and the job resumes from checkpoint rather than from zero."],
      ["Carbon-aware scheduling", "Deferrable work can be placed into windows when the campus is running on its cleanest, cheapest supply."],
      ["Flexible commitment", "Hourly for experiments, reserved terms up to 36 months for production capacity you need guaranteed."],
      ["Transparent power cost", "Energy is contracted upstream, not passed through at spot — so the rate you sign is the rate you pay."],
    ],
    steps: [
      ["Tell us the shape", "Accelerator count, expected duration, residency requirement, and whether the workload is interruptible."],
      ["We confirm capacity", "You get a written commitment on what is available, when it lands, and at what rate for the term."],
      ["Provision and access", "Nodes are handed over with bare-metal credentials and API access. Bring your own orchestration or use ours."],
      ["Run and observe", "Cluster health, thermal state and power mix are visible in one place, per workload."],
    ],
    specs: [
      ["Access model", "Bare metal", "Placeholder"],
      ["Accelerators", "Current-generation NVIDIA class", "Placeholder"],
      ["Interconnect", "Non-blocking east–west fabric", "Placeholder"],
      ["Local storage", "NVMe tier per node", "Placeholder"],
      ["Shared storage", "Parallel filesystem", "Placeholder"],
      ["Commitment", "Hourly → 36 months", "Placeholder"],
      ["Power", "24×7 carbon-free, contracted", "Curiosity Energy"],
    ],
    faq: [
      ["Can I bring my own orchestration?", "Yes. The nodes are yours at the metal, so Slurm, Kubernetes or your own scheduler all work. We can also run the orchestration layer for you."],
      ["What happens when a node fails mid-run?", "Health monitoring drains the host, replaces it from the pool and resumes the job from your most recent checkpoint. You are not billed for the failed interval."],
      ["Is capacity guaranteed on hourly pricing?", "No — hourly is best-effort against available pool. If you need capacity guaranteed at a specific date, take a reserved term."],
    ],
  },

  "products/private-ai-cloud": {
    parent: ["Products", "products"],
    eyebrow: "C-II",
    title: "Private AI Cloud",
    lede:
      "A single-tenant environment inside our campus, operated by us and governed entirely by you.",
    intro: {
      h: "Isolation you can point at",
      p: [
        "For a lot of workloads, logical isolation is not the isolation the compliance team asked about. Private AI Cloud gives you physically separate racks in a defined hall, with your own network segment and your own key material.",
        "We run the operations. You keep the controls — identity, encryption keys, access policy and the audit trail.",
      ],
    },
    features: [
      ["Physical separation", "Dedicated racks in a defined hall, not a logical partition of shared hardware."],
      ["Your identity provider", "Access is federated to your IdP. We do not hold standing credentials into your environment."],
      ["Customer-held keys", "Encryption keys stay under your control. We operate the hardware without the ability to read the data on it."],
      ["In-country residency", "Data stays on Indian soil, in a named region, with the location written into the contract."],
      ["Private connectivity", "Dedicated link or private interconnect rather than transit over the public internet."],
      ["Auditable by design", "Per-workload logs, access records and clean-energy attestation, exportable for your own audit."],
    ],
    steps: [
      ["Scope the environment", "Rack count, network topology, residency and compliance requirements, and who governs what."],
      ["Design and contract", "We produce the physical and logical design, the operating responsibilities and the audit surface, and put it in writing."],
      ["Build and hand over", "The environment is built, connected to your IdP and key management, and handed over with the controls in your hands."],
      ["Operate together", "We run the infrastructure to an agreed SLA. You keep governance, access and the audit trail."],
    ],
    specs: [
      ["Tenancy", "Single tenant, physically isolated", "Placeholder"],
      ["Identity", "Federated to customer IdP", "Placeholder"],
      ["Key management", "Customer-held", "Placeholder"],
      ["Residency", "In-country, named region", "Planned"],
      ["Connectivity", "Private link / dedicated interconnect", "Placeholder"],
      ["Operations", "Curiosity-operated, 24×7", "Placeholder"],
      ["Power", "24×7 carbon-free, contracted", "Curiosity Energy"],
    ],
    faq: [
      ["Who can physically access the racks?", "Named Curiosity operations staff under logged access control. The access record is part of what you can audit."],
      ["Can we run our own security tooling inside?", "Yes. The environment is yours logically — agents, scanners and policy tooling are all supported."],
      ["What is the minimum size?", "Private tenancy is sized by hall, so there is a practical floor. If your requirement is smaller, managed infrastructure or GPU Cloud is usually the better fit."],
    ],
  },

  "products/managed-infrastructure": {
    parent: ["Products", "products"],
    eyebrow: "C-III",
    title: "Managed AI Infrastructure",
    lede:
      "You own the silicon. We provide the powered, cooled, connected space and run everything underneath it.",
    intro: {
      h: "Colocation, plus the operations that make it work",
      p: [
        "Plenty of providers will sell you space and power. Very few will keep a three-week training run alive through a failed host at three in the morning.",
        "Managed AI Infrastructure is colocation with the operations layer included: thermal management, node health, automated recovery and a support team that understands what a stalled all-reduce means.",
      ],
    },
    features: [
      ["Liquid-cooled halls", "Direct-to-chip cooling designed for current accelerator density, with rear-door heat exchangers as fallback."],
      ["24×7 operations", "Staffed operations with an escalation path to engineers, not to a ticket queue."],
      ["Node lifecycle management", "Health checks, drain, replace and return-to-service handled without you opening a ticket."],
      ["Your hardware, your refresh", "You control the silicon and the refresh cycle. We handle everything from the rack rail down."],
      ["Contracted clean power", "The same 24×7 carbon-free supply as the rest of the campus, at a rate fixed for the term."],
      ["Attested carbon reporting", "Per-rack clean-energy attestation you can put in front of an auditor or a board."],
    ],
    steps: [
      ["Share the deployment", "Rack count, power draw per rack, thermal profile and network requirements."],
      ["Space and power allocated", "We confirm the hall, the power envelope and the commissioning date in writing."],
      ["Install and commission", "Your hardware lands, gets racked and cabled, and is brought into monitoring before you run production on it."],
      ["We operate underneath", "Cooling, power, network and node health are ours. The workload stays yours."],
    ],
    specs: [
      ["Model", "Colocation with managed operations", "Placeholder"],
      ["Cooling", "Direct-to-chip liquid, RDHx fallback", "Placeholder"],
      ["Rack density", "Designed for high-density halls", "Placeholder"],
      ["Operations cover", "24×7 staffed", "Placeholder"],
      ["Recovery", "Automated drain and replace", "Placeholder"],
      ["Reporting", "Per-rack clean-energy attestation", "Placeholder"],
      ["Power", "24×7 carbon-free, contracted", "Curiosity Energy"],
    ],
    faq: [
      ["Do you support mixed-vendor hardware?", "Yes, subject to thermal and power envelope. Send the specification and we will confirm before you commit."],
      ["Who owns the network fabric?", "We do, up to your rack. Inside the rack the topology is yours."],
      ["Can we move to owned capacity later?", "Yes. Managed infrastructure and GPU Cloud share the same campus and control plane, so shifting the mix does not mean a migration."],
    ],
  },

  "products/inference-training": {
    parent: ["Products", "products"],
    eyebrow: "C-IV",
    title: "Inference & Training",
    lede:
      "Managed endpoints and training capacity for teams that want compute, not a datacentre.",
    intro: {
      h: "The highest layer of the stack",
      p: [
        "Not every team wants to think about racks. Inference & Training is a managed service: you point at an endpoint or submit a job, and the capacity underneath is ours to worry about.",
        "Because we own the generation as well as the compute, deferrable work can be scheduled into the cleanest and cheapest hours automatically — which is a saving you cannot make when you rent someone else's cloud.",
      ],
    },
    features: [
      ["Managed endpoints", "Serve a model behind a stable endpoint with autoscaling against real traffic, not a fixed reservation."],
      ["Submitted training jobs", "Queue a run against pooled capacity, with checkpointing and automatic resume on hardware failure."],
      ["Carbon-aware placement", "Interruptible and deferrable work moves into low-carbon, low-tariff windows without you managing the calendar."],
      ["Pooled scaling", "Burst beyond your baseline into shared capacity, then fall back, without renegotiating a contract."],
      ["Per-workload attestation", "Energy consumed and clean fraction, reported per job and per endpoint."],
      ["No infrastructure surface", "No racks, no capacity planning, no commissioning schedule to track."],
    ],
    steps: [
      ["Describe the workload", "Model size, expected traffic or run length, latency target, and how interruptible the work is."],
      ["Pick a service level", "Guaranteed capacity for latency-sensitive serving, or pooled and interruptible for training that can wait."],
      ["Deploy", "Push the model or submit the job. Endpoints come with monitoring and the attestation feed attached."],
      ["Scale and report", "Capacity flexes with demand. Energy and carbon are reported per workload for the whole period."],
    ],
    specs: [
      ["Workloads", "Training and serving", "Placeholder"],
      ["Scheduling", "Carbon-aware, interruptible tiers", "Placeholder"],
      ["Scaling", "Pooled capacity with burst", "Placeholder"],
      ["Checkpointing", "Automatic, with resume on failure", "Placeholder"],
      ["Reporting", "Per-workload energy and clean fraction", "Placeholder"],
      ["Access", "API endpoint / job submission", "Placeholder"],
      ["Power", "24×7 carbon-free, contracted", "Curiosity Energy"],
    ],
    faq: [
      ["Is my model isolated from other tenants?", "Serving runs in an isolated runtime. If you need physical isolation as well, that is Private AI Cloud."],
      ["What does interruptible actually mean?", "We may pause and resume the job to move it into a better power window. You get a cheaper rate; you do not get a fixed completion time."],
      ["Can I mix this with reserved capacity?", "Yes — a common pattern is reserved capacity for serving and pooled interruptible capacity for training."],
    ],
  },

  /* ---------------------------- PLATFORM --------------------------- */
  "platform/energy": {
    parent: ["Platform", "platform/energy"],
    eyebrow: "Platform · Layer 01",
    title: "Energy",
    accent: "#F59E0B",
    lede:
      "We contract and firm our own clean power. Every other layer of the platform depends on this one holding.",
    intro: {
      h: "The constraint everyone else passes through",
      p: [
        "India crossed 257 GW of peak demand in 2026 and is heading toward 425 GW by 2035. The clean capacity required to meet that is on the order of 1.5 TW over ten to twelve years. AI is arriving into the middle of it.",
        "Compute is procurable. Firm, clean, round-the-clock power in the corridors where AI demand actually lands is not. That is the constraint we built the company around.",
      ],
    },
    features: [
      ["Interconnection first", "Transmission connectivity and evacuation capacity secured before land is developed. Queue position is the real barrier to entry."],
      ["Complementary generation", "Utility-scale solar as the energy base, wind for a complementary profile, sited to smooth the combined curve."],
      ["Storage as the firming layer", "Batteries are what convert variable generation into a 24×7 product a customer can contract against. This is the cost centre and the differentiator."],
      ["Structured supply", "Captive, group captive, open access and third-party PPA each carry a different tariff and risk profile. The platform selects per site, per season."],
      ["Behind-the-meter delivery", "Generation sited at or adjacent to the campus, reducing wheeling exposure and transmission loss."],
      ["Contracted, not spot", "Power is bought on long-tenor terms so the landed cost we quote holds for the length of your contract."],
    ],
    specs: [
      ["Supply profile", "24×7 carbon-free", "Committed"],
      ["Generation", "Utility-scale solar + wind", "Placeholder"],
      ["Firming", "Battery energy storage", "Placeholder"],
      ["Structures", "Captive / group captive / open access / PPA", "Placeholder"],
      ["Interconnection", "Transmission connectivity secured pre-build", "Planned"],
      ["Corridors", "Mumbai · Chennai · Hyderabad", "Planned"],
    ],
    faq: [
      ["Is this genuinely 24×7 clean, or annual matching?", "The target is hourly matched round-the-clock supply, firmed with storage — not annual REC netting. Where a shortfall is covered from the grid, it is reported as such."],
      ["What happens if tariff regulation changes?", "Our models are stress-tested against removal of waivers and concessions. We build on the mechanism, not on the concession."],
      ["Do you sell energy separately?", "Curiosity Energy contracts clean supply to data centres as its own business. Curiosity Cloud is its largest customer."],
    ],
  },

  "platform/ai-factories": {
    parent: ["Platform", "platform/ai-factories"],
    eyebrow: "Platform · Layer 02",
    title: "AI factories",
    accent: "#4F46E5",
    lede:
      "The campuses: liquid-cooled halls, a non-blocking fabric, and a thermal design fixed before the first slab is poured.",
    intro: {
      h: "Density is a day-zero decision",
      p: [
        "Current-generation accelerator racks have already passed what air cooling supports. A hall designed for air and retrofitted later is not an upgrade — it is a write-off with extra steps.",
        "We design liquid-cooled from the start, and we specify the network fabric alongside the power design rather than after it, because a training run throttled at the interconnect wastes capacity you have already contracted.",
      ],
    },
    features: [
      ["Direct-to-chip liquid cooling", "Designed in from the first hall, with rear-door heat exchangers as fallback rather than as the primary strategy."],
      ["Explicit water strategy", "Water use is designed and disclosed, not discovered later. Siting in India makes this non-negotiable."],
      ["Non-blocking east–west fabric", "Sized so distributed training is never bottlenecked at the network, with topology fixed alongside the power envelope."],
      ["Powered land, not powered shell", "Interconnection and a contracted supply curve are in place before deployment starts."],
      ["Reference site shortcut", "First capacity lands on an existing powered facility taken on long lease, well ahead of the greenfield programme."],
      ["Commissioned before production", "Nodes enter monitoring and health checks before any customer workload runs on them."],
    ],
    specs: [
      ["Cooling", "Direct-to-chip liquid, RDHx fallback", "Placeholder"],
      ["Rack density", "Designed for high-density halls", "Placeholder"],
      ["Fabric", "Non-blocking east–west", "Placeholder"],
      ["Commissioning", "Full health validation pre-production", "Placeholder"],
      ["Regions", "Mumbai · Chennai · Hyderabad", "Planned"],
      ["Power feed", "Contracted 24×7 carbon-free", "Curiosity Energy"],
    ],
    faq: [
      ["When does the first campus energise?", "The reference deployment lands on a leased powered facility first; the first greenfield campus is targeted in the 12–24 month phase. See the roadmap."],
      ["Can you host our own hardware?", "Yes — that is Managed AI Infrastructure. Same halls, same power, same operations."],
      ["How is heat handled?", "Direct-to-chip capture with a designed rejection path. Heat reuse is under evaluation and not yet committed."],
    ],
  },

  "platform/control-plane": {
    parent: ["Platform", "platform/control-plane"],
    eyebrow: "Platform · Layer 03",
    title: "Control plane",
    accent: "#0EA5E9",
    lede:
      "One system spanning generation, storage, campus and compute — deciding what runs where, when, and at what carbon.",
    intro: {
      h: "The seam nobody else owns",
      p: [
        "Energy companies cannot orchestrate compute. Cloud companies cannot secure firm clean power. Colocation providers do neither and rent both.",
        "Our claim is the join between them: a single control plane that turns a unit of clean electricity into a unit of AI compute at the lowest landed cost and the highest verifiable clean fraction. That decision is the product.",
      ],
    },
    features: [
      ["Energy dispatch", "Storage charge and discharge optimised in real time against tariff, grid state and generation forecast."],
      ["Workload-to-power scheduling", "Deferrable training and inference placed into the windows when the campus is cleanest and cheapest."],
      ["Bare-metal provisioning", "Cluster stand-up, node health and automated recovery, so long runs survive hardware failure."],
      ["Thermal control loops", "Cooling and power state managed together rather than as independent systems."],
      ["Unified asset registry", "One inventory from generation plant to individual accelerator, with a single source of truth for capacity."],
      ["Attestation and billing", "Per-workload carbon reporting and one invoice reconciling the energy entity and the compute entity."],
    ],
    specs: [
      ["Scope", "Generation → storage → campus → compute", "Placeholder"],
      ["Dispatch", "Real-time, tariff and carbon aware", "Placeholder"],
      ["Provisioning", "Bare metal, API driven", "Placeholder"],
      ["Recovery", "Automated drain, replace, resume", "Placeholder"],
      ["Attestation", "Per workload, per tenant", "Placeholder"],
      ["Billing", "Single invoice across both entities", "Placeholder"],
    ],
    faq: [
      ["Did you build all of this yourselves?", "No. We partner or acquire for compute orchestration, where mature stacks already exist. We build proprietary at the energy–compute co-optimisation layer, because nobody else owns both sides of it."],
      ["Can I see the scheduling decisions?", "Yes. Placement, power mix and clean fraction are visible per workload, and exportable."],
      ["What if I do not want carbon-aware scheduling?", "Take guaranteed capacity instead of interruptible. You lose the discount and keep fixed placement."],
    ],
  },

  /* ---------------------------- COMPANY ---------------------------- */
  "company": {
    eyebrow: "Company",
    title: "Make clean power and AI compute abundant in India",
    lede:
      "Curiosity is vertically integrated by design. We find and contract the energy, build and operate the AI factories, and run a cloud platform on top.",
    kind: "company",
  },

  "why": { kind: "why" },
  "specification": { kind: "specification" },
  "roadmap": { kind: "roadmap" },
  "contact": { kind: "contact" },
};

const CONTACT_CHECKLIST = [
  ["Workload shape", "Training, serving, or both — and roughly what model size."],
  ["Accelerator count", "How many, and whether that is a baseline or a peak."],
  ["Duration", "A fixed run length, a rolling term, or open-ended production."],
  ["Residency", "Whether data must stay in-country, and in which region."],
  ["Tenancy", "Shared, single-tenant, or your own hardware in our halls."],
  ["Timing", "When you need it live — this is usually the binding constraint."],
];

const FULL_SPECS = [
  {
    group: "Compute",
    rows: [
      ["Accelerators", "Current-generation NVIDIA class", "Placeholder"],
      ["Access model", "Bare metal, non-virtualised", "Placeholder"],
      ["Host CPU", "To be confirmed at deployment", "Placeholder"],
      ["Node health", "Automated drain, replace and resume", "Placeholder"],
    ],
  },
  {
    group: "Network",
    rows: [
      ["East–west fabric", "Non-blocking", "Placeholder"],
      ["North–south", "Redundant transit and private interconnect", "Placeholder"],
      ["Private link", "Dedicated connectivity available", "Placeholder"],
    ],
  },
  {
    group: "Storage",
    rows: [
      ["Local", "NVMe tier per node", "Placeholder"],
      ["Shared", "Parallel filesystem", "Placeholder"],
      ["Object", "Under evaluation", "Placeholder"],
    ],
  },
  {
    group: "Facility",
    rows: [
      ["Cooling", "Direct-to-chip liquid, RDHx fallback", "Placeholder"],
      ["Rack density", "Designed for high-density halls", "Placeholder"],
      ["Operations", "24×7 staffed", "Placeholder"],
      ["Water strategy", "Designed and disclosed per site", "Placeholder"],
    ],
  },
  {
    group: "Energy",
    rows: [
      ["Supply profile", "24×7 carbon-free, contracted", "Committed"],
      ["Generation", "Utility-scale solar and wind", "Placeholder"],
      ["Firming", "Battery energy storage", "Placeholder"],
      ["Attestation", "Per workload, per tenant", "Placeholder"],
    ],
  },
  {
    group: "Regions",
    rows: [
      ["Launch corridors", "Mumbai · Chennai · Hyderabad", "Planned"],
      ["Residency", "In-country, named region", "Planned"],
    ],
  },
];

/* =========================== primitives ============================ */

const go = (to) => `#/${to}`;

function useRoute() {
  const parse = () => (window.location.hash || "#/").replace(/^#\/?/, "").replace(/\/$/, "");
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

const FLARES = [
  { c: "124,58,237", x: "-8%", y: "-12%", s: "46vw", d: 46, delay: 0, o: 0.42 },
  { c: "34,211,238", x: "62%", y: "-18%", s: "52vw", d: 58, delay: -8, o: 0.44 },
  { c: "79,70,229", x: "72%", y: "22%", s: "34vw", d: 40, delay: -20, o: 0.38 },
  { c: "37,99,235", x: "-14%", y: "34%", s: "40vw", d: 64, delay: -30, o: 0.34 },
  { c: "245,158,11", x: "34%", y: "48%", s: "38vw", d: 52, delay: -12, o: 0.24 },
  { c: "124,58,237", x: "68%", y: "62%", s: "42vw", d: 70, delay: -44, o: 0.34 },
  { c: "14,165,233", x: "6%", y: "72%", s: "36vw", d: 48, delay: -26, o: 0.4 },
  { c: "79,70,229", x: "44%", y: "86%", s: "44vw", d: 60, delay: -5, o: 0.32 },
  { c: "34,211,238", x: "80%", y: "92%", s: "32vw", d: 38, delay: -17, o: 0.36 },
];

function FlareField() {
  return (
    <div className="flarefield" aria-hidden="true">
      {FLARES.map((f, i) => (
        <span
          key={i}
          className={`flare flare-${i % 3}`}
          style={{
            "--c": f.c,
            "--o": f.o,
            left: f.x,
            top: f.y,
            width: f.s,
            height: f.s,
            animationDuration: `${f.d}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function StarChart() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, stars = [], w = 0, h = 0;
    const palette = ["#7C3AED", "#4F46E5", "#2563EB", "#0EA5E9", "#22D3EE"];
    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(300, Math.round((w * h) / 4600));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3, a: Math.random() * 0.22 + 0.06,
        s: Math.random() * 0.8 + 0.25, t: Math.random() * Math.PI * 2,
        col: Math.random() > 0.62 ? palette[(Math.random() * 5) | 0] : "#1B2440",
      }));
    };
    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = reduce ? 1 : 0.68 + 0.32 * Math.sin((time / 1000) * st.s + st.t);
        ctx.globalAlpha = st.a * tw;
        ctx.fillStyle = st.col;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    build(); draw(0);
    const onResize = () => { build(); if (reduce) draw(0); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="starchart" aria-hidden="true" />;
}

function Orrery({ activeId, onSelect }) {
  return (
    <div className="orrery" role="group" aria-label="Curiosity Cloud services, shown as an orbital system">
      <div className="corona" aria-hidden="true" />
      <div className="star" aria-hidden="true"><div className="star-core" /></div>
      <div className="star-label" aria-hidden="true">
        <span className="mono">CORE</span>
        <span>24×7 clean power</span>
      </div>
      {BODIES.map((b) => {
        const active = b.id === activeId;
        return (
          <div key={b.id} className="orbit-wrap"
            style={{ "--d": `${b.orbit}%`, "--t": `${b.period}s`, "--phase": `${b.phase}s` }}>
            <div className={`ring${active ? " ring-active" : ""}`} />
            <div className="spinner">
              <div className="body-slot">
                <button type="button" className={`body${active ? " body-active" : ""}`}
                  style={{ "--sz": `${b.size}px`, "--tint": b.tint, "--glow": `${b.glow}0.42)`, "--glow-hi": `${b.glow}0.8)` }}
                  onMouseEnter={() => onSelect(b.id)} onFocus={() => onSelect(b.id)} onClick={() => onSelect(b.id)}
                  aria-label={`${b.name} — ${b.line}`} aria-pressed={active}>
                  <span className="body-dot" />
                  <span className="body-tag mono">{b.id}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Status = ({ s }) => (
  <span className={`status ${s === "Placeholder" || s === "Design target" ? "status-open" : "status-set"}`}>{s}</span>
);

function SpecTable({ rows, caption }) {
  return (
    <div className="instrument-shell glass">
      <table className="instrument">
        <caption className="sr-only">{caption || "Specification"}</caption>
        <thead><tr><th scope="col">Parameter</th><th scope="col">Value</th><th scope="col">Status</th></tr></thead>
        <tbody>
          {rows.map(([k, v, s]) => (
            <tr key={k}><th scope="row">{k}</th><td>{v}</td><td><Status s={s} /></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="inner cta-inner">
        <p className="eyebrow mono">Next step</p>
        <h2>Tell us what you need to run,<br />and when you need it live.</h2>
        <p className="cta-lede">
          Send the shape of the workload — accelerator count, duration, residency requirement — and
          we will come back with what we can commit and when.
        </p>
        <div className="cta-actions">
          <a className="btn btn-primary" href={go("contact")}>Request capacity</a>
          <a className="btn btn-ghost" href="mailto:hello@curiositycloud.in">Talk to an engineer</a>
        </div>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, lede, parent, accent, secondary }) {
  return (
    <header className="page-hero" style={accent ? { "--accent": accent } : undefined}>
      <StarChart />
      <div className="inner page-hero-in">
        {parent && (
          <nav className="crumb mono" aria-label="Breadcrumb">
            <a href={go("")}>Home</a>
            <span aria-hidden="true">/</span>
            <a href={go(parent[1])}>{parent[0]}</a>
          </nav>
        )}
        <p className="eyebrow mono">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="page-lede">{lede}</p>}
        <div className="hero-actions">
          <a className="btn btn-primary" href={go("contact")}>Request capacity</a>
          {secondary !== null && (
            <a className="btn btn-ghost" href={(secondary && secondary[1]) || go("specification")}>
              {(secondary && secondary[0]) || "See the specification"}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============================= pages =============================== */

function Home() {
  const [activeId, setActiveId] = useState("C-I");
  const [openBlock, setOpenBlock] = useState(0);
  const active = BODIES.find((b) => b.id === activeId) || BODIES[0];
  const select = useCallback((id) => setActiveId(id), []);

  return (
    <>
      <section className="hero">
        <StarChart />
        <div className="hero-grid inner">
          <div className="hero-copy">
            <p className="eyebrow mono">Curiosity · Energy · AI · Cloud</p>
            <h1>The AI cloud that starts at the <em>power plant</em></h1>
            <p className="lede">
              India&apos;s AI buildout is not short of chips. It is short of firm, clean,
              round-the-clock power. Curiosity contracts the energy, builds the campuses, and runs
              the cloud on top — one company, one stack, one invoice.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={go("contact")}>Request capacity</a>
              <a className="btn btn-ghost" href={go("why")}>Why Curiosity</a>
            </div>
            <div className="readout glass" aria-live="polite">
              <div className="readout-head">
                <span className="mono readout-id" style={{ color: active.text }}>{active.id}</span>
                <h2>{active.name}</h2>
              </div>
              <p>{active.detail}</p>
              <dl className="readout-facts">
                {active.facts.map(([k, v]) => (
                  <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <a className="inline-link" href={go(active.slug)}>
                Explore {active.name} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="hero-orrery">
            <Orrery activeId={activeId} onSelect={select} />
            <p className="orrery-hint mono">Choose a body to read its brief</p>
          </div>
        </div>
      </section>

      <section className="news">
        <div className="inner news-grid">
          {NEWS.map((n) => (
            <a key={n.title} className="news-card glass" href={go(n.to)}>
              <span className="chip mono">{n.tag}</span>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
              <span className="news-cta">{n.cta} <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="section mission">
        <div className="inner">
          <p className="eyebrow mono">Our mission</p>
          <h2 className="mission-claim">Make clean power and AI compute <em>abundant</em> in India.</h2>
          <p className="mission-sub">
            Curiosity is vertically integrated by design. We find and contract the energy, build and
            operate the AI factories, and run a cloud platform on top. Owning all three is what lets
            us commit to a price and a carbon number that hold for the length of a contract.
          </p>
          <div className="pillars">
            {PILLARS.map((p) => (
              <a key={p.k} className="pillar glass" href={go(p.to)} style={{ "--tint": p.tint, "--tint-ink": p.ink }}>
                <span className="pillar-k mono">{p.k}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className="news-cta">Read more <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
          <ul className="figures">
            {FIGURES.map(([n, l]) => (
              <li key={n}><span className="fig-n">{n}</span><span className="fig-l">{l}</span></li>
            ))}
          </ul>
          <p className="fine">
            Demand and clean-capacity figures carried from Curiosity&apos;s 2026 market note;
            re-verify against current CEA data before publication.
          </p>
        </div>
      </section>

      <section className="ecosystem">
        <div className="inner">
          <p className="eco-head">Built with partners across the stack</p>
          <ul className="eco-strip">{ECOSYSTEM.map((e) => <li key={e} className="mono">{e}</li>)}</ul>
          <p className="fine">Partner slots — to be replaced with named logos once agreements are signed.</p>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Products</p>
            <h2>Four ways to take capacity</h2>
            <p className="section-lede">
              Same campus, same power, same control plane. What changes is how much of the stack you
              want to hold.
            </p>
          </div>
          <div className="svc-grid">
            {BODIES.map((b) => (
              <a key={b.id} className="svc glass" href={go(b.slug)}
                style={{ "--tint": b.tint, "--tint-ink": b.text }} onMouseEnter={() => select(b.id)}>
                <span className="svc-id mono">{b.id}</span>
                <h3>{b.name}</h3>
                <p>{b.line}</p>
                <dl className="svc-facts">
                  {b.facts.map(([k, v]) => (
                    <div key={k}><dt className="mono">{k}</dt><dd className="mono">{v}</dd></div>
                  ))}
                </dl>
                <span className="news-cta">Explore <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section workloads">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Why Curiosity</p>
            <h2>Designed for AI workloads, priced on our own power</h2>
            <p className="section-lede">
              Most providers start where the rack begins. We start where the electron does — which is
              why the number on the contract holds.
            </p>
          </div>
          <div className="wl-layout">
            <ul className="wl-list">
              {WORKLOAD_BLOCKS.map((w, i) => (
                <li key={w.head}>
                  <button type="button" className={`wl-btn${i === openBlock ? " wl-open" : ""}`}
                    onClick={() => setOpenBlock(i)} aria-expanded={i === openBlock}>
                    <span className="wl-head">{w.head}</span>
                    <span className="wl-mark" aria-hidden="true" />
                  </button>
                  {i === openBlock && (
                    <div className="wl-body">{w.points.map((p) => <p key={p}>{p}</p>)}</div>
                  )}
                </li>
              ))}
            </ul>
            <aside className="wl-stat glass">
              <span className="wl-stat-n">{WORKLOAD_BLOCKS[openBlock].stat}</span>
              <span className="wl-stat-l">{WORKLOAD_BLOCKS[openBlock].label}</span>
            </aside>
          </div>
          <ul className="values">
            {PILLAR_VALUES.map(([t, d]) => (
              <li key={t} className="glass"><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="metrics">
        <div className="inner">
          <h2>Operating targets, stated plainly</h2>
          <ul className="metric-grid">
            {METRICS.map(([n, l, s]) => (
              <li key={l}>
                <span className="metric-n">{n}</span>
                <span className="metric-l">{l}</span>
                <Status s={s} />
              </li>
            ))}
          </ul>
          <p className="fine">
            Targets are design commitments for the first campus, not measured production figures.
            They will be restated as observed numbers once capacity is live.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Specification</p>
            <h2>What you are actually buying</h2>
            <p className="section-lede">
              Written plainly, with the unconfirmed parts marked. We would rather you check these
              than assume them.
            </p>
          </div>
          <SpecTable rows={SPECS} caption="Curiosity Cloud platform specification" />
          <p className="fine">
            <a className="inline-link" href={go("specification")}>
              See the full specification <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Who builds here</p>
            <h2>For people with a training run to finish</h2>
          </div>
          <ul className="who-grid">
            {AUDIENCES.map(([t, d]) => (
              <li key={t} className="glass"><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ProductsIndex() {
  const p = PAGES["products"];
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
      <section className="section">
        <div className="inner">
          <div className="svc-grid svc-grid-2">
            {BODIES.map((b) => (
              <a key={b.id} className="svc svc-lg glass" href={go(b.slug)}
                style={{ "--tint": b.tint, "--tint-ink": b.text }}>
                <span className="svc-id mono">{b.id}</span>
                <h3>{b.name}</h3>
                <p>{b.detail}</p>
                <dl className="svc-facts">
                  {b.facts.map(([k, v]) => (
                    <div key={k}><dt className="mono">{k}</dt><dd className="mono">{v}</dd></div>
                  ))}
                </dl>
                <span className="news-cta">Explore {b.name} <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function DetailPage({ slug }) {
  const p = PAGES[slug];
  const body = byslug(slug);
  const accent = p.accent || (body && body.tint);
  const others = BODIES.filter((b) => b.slug !== slug);
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lede={p.lede} parent={p.parent} accent={accent} />

      {p.intro && (
        <section className="section">
          <div className="inner prose">
            <h2>{p.intro.h}</h2>
            {p.intro.p.map((t) => <p key={t}>{t}</p>)}
          </div>
        </section>
      )}

      {p.features && (
        <section className="section">
          <div className="inner">
            <div className="section-head"><p className="eyebrow mono">What you get</p><h2>Capabilities</h2></div>
            <ul className="feat-grid">
              {p.features.map(([t, d]) => (
                <li key={t} className="glass" style={{ "--tint": accent }}>
                  <span className="feat-dot" aria-hidden="true" />
                  <h3>{t}</h3><p>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {p.steps && (
        <section className="section">
          <div className="inner">
            <div className="section-head"><p className="eyebrow mono">How it works</p><h2>From conversation to capacity</h2></div>
            <ol className="steps">
              {p.steps.map(([t, d], i) => (
                <li key={t}>
                  <span className="step-n mono">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {p.specs && (
        <section className="section">
          <div className="inner">
            <div className="section-head"><p className="eyebrow mono">Specification</p><h2>Stated plainly</h2>
              <p className="section-lede">Unconfirmed values are marked. We would rather you check them than assume them.</p>
            </div>
            <SpecTable rows={p.specs} caption={`${p.title} specification`} />
          </div>
        </section>
      )}

      {p.faq && (
        <section className="section">
          <div className="inner">
            <div className="section-head"><p className="eyebrow mono">Questions</p><h2>Asked often</h2></div>
            <div className="faq">
              {p.faq.map(([q, a]) => (
                <details key={q} className="glass">
                  <summary><span>{q}</span><span className="faq-mark" aria-hidden="true" /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {body && (
        <section className="section">
          <div className="inner">
            <div className="section-head"><p className="eyebrow mono">Also available</p><h2>Other ways to take capacity</h2></div>
            <div className="svc-grid">
              {others.map((b) => (
                <a key={b.id} className="svc glass" href={go(b.slug)} style={{ "--tint": b.tint, "--tint-ink": b.text }}>
                  <span className="svc-id mono">{b.id}</span>
                  <h3>{b.name}</h3><p>{b.line}</p>
                  <span className="news-cta">Explore <span aria-hidden="true">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function CompanyPage() {
  const p = PAGES["company"];
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">How we are built</p>
            <h2>Three layers, one company</h2>
            <p className="section-lede">
              Each layer is a business in its own right. Owning all three is what removes the
              pass-through risk that sits between them.
            </p>
          </div>
          <div className="pillars">
            {PILLARS.map((pl) => (
              <a key={pl.k} className="pillar glass" href={go(pl.to)} style={{ "--tint": pl.tint, "--tint-ink": pl.ink }}>
                <span className="pillar-k mono">{pl.k}</span>
                <h3>{pl.t}</h3><p>{pl.d}</p>
                <span className="news-cta">Read more <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">The market</p>
            <h2>Why this company exists now</h2>
            <p className="section-lede">
              India&apos;s grid is absorbing a demand curve and an AI buildout at the same time. The
              company that solves firmness captures the margin; the company that only procures
              silicon does not.
            </p>
          </div>
          <ul className="figures">
            {FIGURES.map(([n, l]) => (
              <li key={n}><span className="fig-n">{n}</span><span className="fig-l">{l}</span></li>
            ))}
          </ul>
          <p className="fine">
            Figures carried from Curiosity&apos;s 2026 market note; re-verify against current CEA
            data before publication.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">How we work</p>
            <h2>What we hold ourselves to</h2>
          </div>
          <ul className="values">
            <li className="glass"><h3>Say what is confirmed</h3><p>Unconfirmed values on this site are marked as such. We would rather lose a deal than win one on a number that does not hold.</p></li>
            <li className="glass"><h3>Own the constraint</h3><p>We contract the power ourselves rather than passing energy risk through to the customer at market rates.</p></li>
            <li className="glass"><h3>Operate, do not just host</h3><p>Keeping a three-week run alive is the job. Space and power alone is not a service.</p></li>
            <li className="glass"><h3>Build for the second site</h3><p>Every decision on the first campus is made so the fourth one does not start from zero.</p></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Leadership</p>
            <h2>Who is building this</h2>
            <p className="section-lede">Leadership profiles are being prepared for publication.</p>
          </div>
          <ul className="who-grid">
            {["Founder & CEO", "Co-founder & CBO", "Head of Energy", "Head of Infrastructure", "Head of Platform"].map((r) => (
              <li key={r} className="glass placeholder-card">
                <span className="ph-avatar" aria-hidden="true" />
                <h3>{r}</h3>
                <p className="mono ph-note">Profile pending</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function WhyPage() {
  const [openBlock, setOpenBlock] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="Why Curiosity"
        title="We start where the electron does"
        lede="Most providers begin at the rack. Beginning at the generator is what lets us commit to a price and a carbon number that survive the length of a contract."
      />
      <section className="section workloads">
        <div className="inner">
          <div className="wl-layout">
            <ul className="wl-list">
              {WORKLOAD_BLOCKS.map((w, i) => (
                <li key={w.head}>
                  <button type="button" className={`wl-btn${i === openBlock ? " wl-open" : ""}`}
                    onClick={() => setOpenBlock(i)} aria-expanded={i === openBlock}>
                    <span className="wl-head">{w.head}</span><span className="wl-mark" aria-hidden="true" />
                  </button>
                  {i === openBlock && <div className="wl-body">{w.points.map((p) => <p key={p}>{p}</p>)}</div>}
                </li>
              ))}
            </ul>
            <aside className="wl-stat glass">
              <span className="wl-stat-n">{WORKLOAD_BLOCKS[openBlock].stat}</span>
              <span className="wl-stat-l">{WORKLOAD_BLOCKS[openBlock].label}</span>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head"><p className="eyebrow mono">The difference</p><h2>Nobody else owns both sides</h2></div>
          <ul className="compare">
            <li className="glass"><h3>Energy players</h3><p>Own generation. Cannot orchestrate compute.</p></li>
            <li className="glass"><h3>Cloud players</h3><p>Orchestrate compute. Cannot secure firm clean power.</p></li>
            <li className="glass"><h3>Colocation players</h3><p>Do neither. Rent both.</p></li>
            <li className="glass compare-us"><h3>Curiosity</h3><p>Owns the join — and the software that operates it.</p></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <div className="section-head"><p className="eyebrow mono">In practice</p><h2>What that buys you</h2></div>
          <ul className="values">
            {PILLAR_VALUES.map(([t, d]) => (<li key={t} className="glass"><h3>{t}</h3><p>{d}</p></li>))}
          </ul>
        </div>
      </section>

      <section className="metrics">
        <div className="inner">
          <h2>Operating targets, stated plainly</h2>
          <ul className="metric-grid">
            {METRICS.map(([n, l, s]) => (
              <li key={l}><span className="metric-n">{n}</span><span className="metric-l">{l}</span><Status s={s} /></li>
            ))}
          </ul>
          <p className="fine">
            Targets are design commitments for the first campus, not measured production figures.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function SpecificationPage() {
  return (
    <>
      <PageHero
        eyebrow="Specification"
        title="What you are actually buying"
        lede="The full platform specification, with every unconfirmed value marked. We would rather you check these than assume them."
        secondary={["Talk to an engineer", "mailto:hello@curiositycloud.in"]}
      />
      <section className="section">
        <div className="inner spec-stack">
          {FULL_SPECS.map((g) => (
            <div key={g.group}>
              <h2 className="spec-group">{g.group}</h2>
              <SpecTable rows={g.rows} caption={`${g.group} specification`} />
            </div>
          ))}
          <p className="fine">
            Values marked Placeholder are illustrative and pending confirmation. Values marked
            Planned describe committed intent with a date still to be fixed. Nothing on this page
            should be treated as a contractual commitment until it appears in a signed agreement.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title="The build, in order"
        lede="Each phase is gated by a commercial milestone, not an engineering one. Nothing in phase three is financeable without the anchor tenant secured in phase one."
      />
      <section className="section roadmap">
        <div className="inner">
          <ol className="tl">
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <div className="tl-mark" aria-hidden="true"><span /></div>
                <div className="tl-body">
                  <p className="tl-when mono">{t.when}</p>
                  <h3>{t.year}</h3>
                  <ul>{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="inner">
          <div className="section-head">
            <p className="eyebrow mono">Open items</p>
            <h2>What is not settled yet</h2>
            <p className="section-lede">
              Stated here rather than buried, because these are the things a serious counterparty
              will ask about first.
            </p>
          </div>
          <ul className="values">
            <li className="glass"><h3>Anchor tenant</h3><p>Conversations are open. Every financial structure in the plan assumes one, so this is the load-bearing item.</p></li>
            <li className="glass"><h3>Grid position</h3><p>Interconnection queues are the real barrier to entry. Site control and connectivity grants are phase-one work.</p></li>
            <li className="glass"><h3>Control plane build line</h3><p>Orchestration is partner or acquire; the energy–compute co-optimisation layer is proprietary. The boundary is being fixed now.</p></li>
            <li className="glass"><h3>Credit enhancement</h3><p>Non-hyperscaler AI infrastructure does not clear a risk committee without it. Counterparty conversations are in progress.</p></li>
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to run"
        lede="Send the shape of the workload and we will come back with what we can commit, when it lands, and at what rate for the term."
        secondary={null}
      />
      <section className="section">
        <div className="inner contact-grid">
          <div>
            <div className="section-head">
              <p className="eyebrow mono">What to include</p>
              <h2>Six things that get you a real answer</h2>
              <p className="section-lede">
                With these, we can usually come back with a written position rather than a
                discovery call.
              </p>
            </div>
            <ol className="steps">
              {CONTACT_CHECKLIST.map(([t, d], i) => (
                <li key={t}>
                  <span className="step-n mono">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="contact-card glass">
            <h3>Get in touch</h3>
            <dl className="contact-dl">
              <div><dt className="mono">Capacity</dt><dd><a className="inline-link" href="mailto:hello@curiositycloud.in">hello@curiositycloud.in</a></dd></div>
              <div><dt className="mono">Engineering</dt><dd><a className="inline-link" href="mailto:hello@curiositycloud.in">hello@curiositycloud.in</a></dd></div>
              <div><dt className="mono">Partnerships</dt><dd><a className="inline-link" href="mailto:hello@curiositycloud.in">hello@curiositycloud.in</a></dd></div>
              <div><dt className="mono">Regions</dt><dd>Mumbai · Chennai · Hyderabad <Status s="Planned" /></dd></div>
            </dl>
            <a className="btn btn-primary contact-btn" href="mailto:hello@curiositycloud.in">Request capacity</a>
            <p className="fine">
              Contact addresses are placeholders pending domain setup.
            </p>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page is not here"
        lede="The link may be old, or the page may not have been built yet. The products and platform pages below are the best places to start."
        secondary={["Back to home", "#/"]}
      />
      <section className="section">
        <div className="inner">
          <div className="svc-grid">
            {BODIES.map((b) => (
              <a key={b.id} className="svc glass" href={go(b.slug)} style={{ "--tint": b.tint, "--tint-ink": b.text }}>
                <span className="svc-id mono">{b.id}</span><h3>{b.name}</h3><p>{b.line}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================== chrome ============================= */

const NAV_PRODUCTS = BODIES.map((b) => [b.name, b.slug, b.line]);
const NAV_PLATFORM = [
  ["Energy", "platform/energy", "Contracted, firmed, round-the-clock clean supply"],
  ["AI factories", "platform/ai-factories", "Liquid-cooled halls and a non-blocking fabric"],
  ["Control plane", "platform/control-plane", "One system across generation, campus and compute"],
];

function Nav({ route }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [route]);
  const on = (s) => (route === s ? " is-active" : "");
  return (
    <header className="nav glass">
      <a className="wordmark" href={go("")}>
        <span className="mark" aria-hidden="true" />
        <span>Curiosity <em>Cloud</em></span>
      </a>

      <nav className="nav-main" aria-label="Primary">
        <div className="menu">
          <a className={`menu-top${route.startsWith("products") ? " is-active" : ""}`} href={go("products")}>Products</a>
          <div className="menu-panel glass">
            {NAV_PRODUCTS.map(([n, s, d]) => (
              <a key={s} href={go(s)}><strong>{n}</strong><span>{d}</span></a>
            ))}
          </div>
        </div>
        <div className="menu">
          <a className={`menu-top${route.startsWith("platform") ? " is-active" : ""}`} href={go("platform/energy")}>Platform</a>
          <div className="menu-panel glass">
            {NAV_PLATFORM.map(([n, s, d]) => (
              <a key={s} href={go(s)}><strong>{n}</strong><span>{d}</span></a>
            ))}
          </div>
        </div>
        <a className={`menu-top${on("why")}`} href={go("why")}>Why Curiosity</a>
        <a className={`menu-top${on("specification")}`} href={go("specification")}>Specification</a>
        <a className={`menu-top${on("company")}`} href={go("company")}>Company</a>
        <a className={`menu-top${on("roadmap")}`} href={go("roadmap")}>Roadmap</a>
      </nav>

      <div className="nav-actions">
        <a className="nav-link" href={go("contact")}>Contact sales</a>
        <a className="btn btn-primary nav-cta" href={go("contact")}>Request capacity</a>
        <button type="button" className="burger" aria-expanded={open} aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <p className="mm-head mono">Products</p>
          {NAV_PRODUCTS.map(([n, s]) => <a key={s} href={go(s)}>{n}</a>)}
          <p className="mm-head mono">Platform</p>
          {NAV_PLATFORM.map(([n, s]) => <a key={s} href={go(s)}>{n}</a>)}
          <p className="mm-head mono">Company</p>
          <a href={go("why")}>Why Curiosity</a>
          <a href={go("specification")}>Specification</a>
          <a href={go("company")}>Company</a>
          <a href={go("roadmap")}>Roadmap</a>
          <a href={go("contact")}>Contact</a>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="inner foot-grid">
        <div className="foot-brand-col">
          <div className="foot-brand">
            <span className="mark" aria-hidden="true" />
            <span>Curiosity <em>Cloud</em></span>
          </div>
          <p className="foot-note">
            Part of Curiosity — Energy, AI and Cloud. The infrastructure layer for India&apos;s AI
            economy.
          </p>
        </div>
        <div className="foot-col">
          <h4>Products</h4>
          <ul>{BODIES.map((b) => <li key={b.id}><a href={go(b.slug)}>{b.name}</a></li>)}</ul>
        </div>
        <div className="foot-col">
          <h4>Platform</h4>
          <ul>
            {NAV_PLATFORM.map(([n, s]) => <li key={s}><a href={go(s)}>{n}</a></li>)}
            <li><a href={go("specification")}>Specification</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <ul>
            <li><a href={go("company")}>About</a></li>
            <li><a href={go("why")}>Why Curiosity</a></li>
            <li><a href={go("roadmap")}>Roadmap</a></li>
            <li><a href={go("contact")}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="inner foot-base">
        <p className="mono">© 2026 Curiosity Cloud</p>
        <p className="mono foot-fine">
          Values marked <span className="status status-open">Placeholder</span> or{" "}
          <span className="status status-open">Design target</span> are illustrative and pending
          confirmation.
        </p>
      </div>
    </footer>
  );
}

/* ============================== app ================================ */

export default function CuriosityCloud() {
  const route = useRoute();

  let page;
  if (route === "") page = <Home />;
  else if (route === "products") page = <ProductsIndex />;
  else if (route === "company") page = <CompanyPage />;
  else if (route === "why") page = <WhyPage />;
  else if (route === "specification") page = <SpecificationPage />;
  else if (route === "roadmap") page = <RoadmapPage />;
  else if (route === "contact") page = <ContactPage />;
  else if (PAGES[route] && PAGES[route].features) page = <DetailPage slug={route} />;
  else page = <NotFound />;

  return (
    <div className="cc">
      <style>{CSS}</style>
      <FlareField />
      <a href="#main" className="skip">Skip to content</a>

      <div className="announce">
        <span className="announce-tag mono">New</span>
        <p>Curiosity Cloud opens capacity conversations for 2027 deployments.</p>
        <a href={go("contact")}>Talk to us <span aria-hidden="true">→</span></a>
      </div>

      <Nav route={route} />
      <main id="main" key={route}>{page}</main>
      <Footer />
    </div>
  );
}

/* =============================== css =============================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.cc {
  --paper:#F4F6FC;
  --ink:#0C1226;
  --ink-soft:#1E2740;
  --slate:#556077;
  --slate-light:#8A93A8;
  --hair:rgba(12,18,38,0.10);
  --hair-soft:rgba(12,18,38,0.06);

  --purple:#6D28D9;
  --magenta:#4F46E5;
  --terra:#2563EB;
  --orange:#0EA5E9;
  --amber:#0891B2;
  --cyan:#22D3EE;
  --energy:#F59E0B;
  --accent:#4F46E5;

  --glass-bg:rgba(255,255,255,0.56);
  --glass-bg-strong:rgba(255,255,255,0.78);
  --glass-line:rgba(255,255,255,0.9);
  --glass-shadow:0 1px 2px rgba(12,18,38,0.04), 0 14px 36px -14px rgba(12,18,38,0.16);

  position:relative;background:var(--paper);color:var(--ink);
  font-family:'Manrope',system-ui,sans-serif;font-size:16px;line-height:1.62;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
.cc *,.cc *::before,.cc *::after{box-sizing:border-box;}
.cc h1,.cc h2,.cc h3,.cc h4{font-family:'Poppins',system-ui,sans-serif;font-weight:600;letter-spacing:-0.025em;line-height:1.14;margin:0;}
.cc h1{letter-spacing:-0.035em;line-height:1.08;}
.cc em{font-style:normal;background:linear-gradient(100deg,var(--purple),var(--magenta) 32%,var(--terra) 62%,var(--amber) 100%);-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc p{margin:0;}
.cc a{color:inherit;text-decoration:none;}
.cc .mono{font-family:'JetBrains Mono',ui-monospace,monospace;}
.cc ul,.cc ol,.cc dl{margin:0;padding:0;list-style:none;}
.cc .inner{max-width:1280px;margin:0 auto;width:100%;}
.cc .fine{margin-top:18px;font-size:11.5px;color:var(--slate-light);max-width:70ch;}
.cc .inline-link{font-weight:700;color:var(--purple);}
.cc .inline-link:hover{color:var(--terra);}

.cc .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
.cc .skip{position:absolute;left:-9999px;top:0;z-index:99;background:var(--ink);color:#fff;padding:10px 16px;border-radius:8px;}
.cc .skip:focus{left:12px;top:12px;}
.cc a:focus-visible,.cc button:focus-visible,.cc summary:focus-visible{outline:2px solid var(--purple);outline-offset:3px;border-radius:6px;}

/* ---------------------------- flares ------------------------------ */
.cc .flarefield{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.cc .flare{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(var(--c),var(--o)),rgba(var(--c),0) 68%);filter:blur(58px);will-change:transform;}
.cc .flare-0{animation:drift0 linear infinite;}
.cc .flare-1{animation:drift1 linear infinite;}
.cc .flare-2{animation:drift2 linear infinite;}
@keyframes drift0{0%{transform:translate3d(0,0,0) scale(1);}33%{transform:translate3d(6vw,-4vh,0) scale(1.12);}66%{transform:translate3d(-3vw,5vh,0) scale(0.94);}100%{transform:translate3d(0,0,0) scale(1);}}
@keyframes drift1{0%{transform:translate3d(0,0,0) scale(1.04);}40%{transform:translate3d(-7vw,4vh,0) scale(0.9);}75%{transform:translate3d(4vw,-6vh,0) scale(1.16);}100%{transform:translate3d(0,0,0) scale(1.04);}}
@keyframes drift2{0%{transform:translate3d(0,0,0) scale(0.96);}50%{transform:translate3d(5vw,6vh,0) scale(1.2);}100%{transform:translate3d(0,0,0) scale(0.96);}}
.cc > *:not(.flarefield){position:relative;z-index:1;}

.cc .glass{background:var(--glass-bg);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);border:1px solid var(--glass-line);box-shadow:var(--glass-shadow);}

/* --------------------------- announce ----------------------------- */
.cc .announce{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:9px 20px;font-size:13px;
  background:linear-gradient(90deg,var(--purple),var(--magenta) 30%,var(--terra) 62%,var(--orange) 100%);color:#fff;}
.cc .announce-tag{font-size:10px;letter-spacing:0.16em;text-transform:uppercase;background:rgba(255,255,255,0.22);padding:3px 8px;border-radius:999px;}
.cc .announce a{font-weight:700;text-decoration:underline;text-underline-offset:3px;}

/* ------------------------------ nav ------------------------------- */
.cc .nav{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:26px;padding:12px clamp(14px,2.4vw,26px);
  margin:14px clamp(14px,3vw,40px);border-radius:18px;background:var(--glass-bg-strong);}
.cc .wordmark{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:700;letter-spacing:-0.025em;white-space:nowrap;font-family:'Poppins',sans-serif;}
.cc .mark{width:15px;height:15px;border-radius:50%;flex:none;
  background:conic-gradient(from 200deg,var(--purple),var(--magenta),var(--terra),var(--orange),var(--cyan),var(--purple));
  box-shadow:0 0 0 3px rgba(109,40,217,0.14);}
.cc .nav-main{display:flex;align-items:center;gap:6px;margin-left:auto;}
.cc .menu{position:relative;}
.cc .menu-top{display:inline-block;padding:8px 12px;border-radius:9px;font-size:13.5px;font-weight:600;color:var(--slate);transition:color .2s,background .2s;}
.cc .menu-top:hover{color:var(--ink);background:rgba(109,40,217,0.06);}
.cc .menu-top.is-active{color:var(--purple);}
.cc .menu-panel{position:absolute;top:calc(100% + 10px);left:-8px;width:330px;padding:9px;border-radius:15px;
  display:flex;flex-direction:column;gap:2px;opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .18s,transform .18s,visibility .18s;
  background:#FFFFFF;box-shadow:0 18px 44px -16px rgba(12,18,38,0.26);}
.cc .menu:hover .menu-panel,.cc .menu:focus-within .menu-panel{opacity:1;visibility:visible;transform:translateY(0);}
.cc .menu-panel a{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border-radius:10px;transition:background .18s;}
.cc .menu-panel a:hover{background:rgba(109,40,217,0.07);}
.cc .menu-panel strong{font-family:'Poppins',sans-serif;font-size:13.5px;font-weight:600;letter-spacing:-0.01em;}
.cc .menu-panel span{font-size:12px;color:var(--slate);line-height:1.4;}
.cc .nav-actions{display:flex;align-items:center;gap:14px;}
.cc .nav-link{font-size:13.5px;font-weight:600;color:var(--ink);white-space:nowrap;}
.cc .nav-link:hover{color:var(--purple);}
.cc .nav-cta{padding:9px 17px;font-size:13px;white-space:nowrap;}
.cc .burger{display:none;flex-direction:column;gap:4px;background:none;border:0;padding:8px 4px;cursor:pointer;}
.cc .burger span{display:block;width:20px;height:2px;border-radius:2px;background:var(--ink);}
.cc .mobile-menu{position:absolute;top:calc(100% + 8px);left:0;right:0;padding:16px 18px 20px;border-radius:16px;
  background:#FFFFFF;border:1px solid var(--hair);box-shadow:0 20px 48px -16px rgba(12,18,38,0.3);
  display:flex;flex-direction:column;gap:3px;max-height:72vh;overflow:auto;z-index:50;}
.cc .mm-head{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--slate-light);margin:12px 0 4px;}
.cc .mm-head:first-child{margin-top:0;}
.cc .mobile-menu a{padding:9px 6px;font-size:14.5px;font-weight:600;border-radius:8px;}
.cc .mobile-menu a:hover{background:rgba(109,40,217,0.07);}

/* ---------------------------- buttons ----------------------------- */
.cc .btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 28px;border-radius:12px;font-size:14.5px;font-weight:600;
  font-family:'Poppins',sans-serif;letter-spacing:-0.005em;transition:transform .18s,box-shadow .2s,color .2s,border-color .2s;}
.cc .btn-primary{background:linear-gradient(100deg,var(--purple),var(--magenta) 40%,var(--terra) 72%,var(--orange) 100%);color:#fff;
  border:1px solid rgba(109,40,217,0.32);box-shadow:0 1px 2px rgba(79,70,229,0.22),0 12px 26px -12px rgba(37,99,235,0.85);}
.cc .btn-primary:hover{transform:translateY(-1px);box-shadow:0 2px 5px rgba(79,70,229,0.26),0 18px 34px -12px rgba(14,165,233,0.9);}
.cc .btn-ghost{border:1px solid var(--hair);color:var(--ink);background:rgba(255,255,255,0.62);}
.cc .btn-ghost:hover{border-color:var(--purple);color:var(--purple);transform:translateY(-1px);}

.cc .eyebrow{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--slate-light);}
.cc .chip{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:rgba(109,40,217,0.09);color:var(--purple);display:inline-block;}
.cc .status{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;padding:4px 10px;border-radius:999px;}
.cc .status-set{color:#047857;background:rgba(4,120,87,0.09);border:1px solid rgba(4,120,87,0.22);}
.cc .status-open{color:var(--slate-light);background:rgba(12,18,38,0.04);border:1px solid var(--hair);}

/* --------------------------- home hero ---------------------------- */
.cc .hero{position:relative;padding:clamp(30px,4.5vw,64px) clamp(20px,5vw,64px) clamp(44px,5vw,80px);}
.cc .starchart{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
.cc .hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.06fr) minmax(0,0.94fr);gap:clamp(30px,4vw,64px);align-items:center;}
.cc .hero-copy h1{font-size:clamp(38px,5vw,68px);font-weight:600;margin:16px 0 20px;max-width:15ch;}
.cc .lede{max-width:48ch;color:var(--slate);font-size:clamp(15px,1.15vw,17.5px);line-height:1.65;}
.cc .hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px;}
.cc .readout{margin-top:30px;padding:20px 22px 18px;border-radius:16px;max-width:540px;}
.cc .readout-head{display:flex;align-items:baseline;gap:12px;margin-bottom:9px;}
.cc .readout-id{font-size:11.5px;font-weight:500;letter-spacing:0.12em;}
.cc .readout-head h2{font-size:22px;}
.cc .readout > p{font-size:14px;color:var(--slate);line-height:1.6;}
.cc .readout-facts{display:flex;flex-wrap:wrap;gap:8px 26px;margin-top:14px;padding-top:13px;border-top:1px solid var(--hair-soft);}
.cc .readout-facts dt{font-size:9.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--slate-light);}
.cc .readout-facts dd{margin:2px 0 0;font-size:13px;font-weight:700;color:var(--ink-soft);}
.cc .readout .inline-link{display:inline-block;margin-top:14px;font-size:13px;}

/* --------------------------- page hero ---------------------------- */
.cc .page-hero{position:relative;padding:clamp(36px,5vw,72px) clamp(20px,5vw,64px) clamp(30px,4vw,56px);}
.cc .page-hero-in{position:relative;z-index:2;max-width:1280px;}
.cc .crumb{display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:0.08em;color:var(--slate-light);margin-bottom:20px;}
.cc .crumb a:hover{color:var(--purple);}
.cc .page-hero h1{font-size:clamp(36px,4.8vw,62px);margin:14px 0 18px;max-width:17ch;}
.cc .page-lede{max-width:58ch;color:var(--slate);font-size:clamp(15px,1.15vw,18px);line-height:1.62;}
.cc .page-hero .hero-actions{margin-top:26px;}

/* ----------------------------- orrery ----------------------------- */
.cc .hero-orrery{display:flex;flex-direction:column;align-items:center;gap:14px;}
.cc .orrery{position:relative;width:min(100%,520px);aspect-ratio:1;}
.cc .corona{position:absolute;top:50%;left:50%;width:44%;height:44%;transform:translate(-50%,-50%);border-radius:50%;
  background:radial-gradient(circle,rgba(245,158,11,0.32),rgba(124,58,237,0.16) 48%,transparent 74%);filter:blur(12px);animation:breathe 7s ease-in-out infinite;}
.cc .star{position:absolute;top:50%;left:50%;width:12.5%;height:12.5%;transform:translate(-50%,-50%);border-radius:50%;
  background:radial-gradient(circle at 36% 30%,#FFF6E4,#FFD27A 26%,var(--energy) 60%,#D97706 88%,#B45309 100%);
  box-shadow:0 0 34px rgba(245,158,11,0.48),0 8px 28px -8px rgba(180,83,9,0.5);}
.cc .star-core{position:absolute;inset:14%;border-radius:50%;background:radial-gradient(circle at 40% 32%,rgba(255,255,255,0.92),transparent 62%);}
.cc .star-label{position:absolute;top:calc(50% + 9%);left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;margin-top:26px;text-align:center;}
.cc .star-label .mono{font-size:9.5px;letter-spacing:0.22em;color:#B45309;}
.cc .star-label span:last-child{font-size:12px;font-weight:700;color:var(--ink-soft);}
.cc .orbit-wrap{position:absolute;top:50%;left:50%;width:var(--d);height:var(--d);margin-left:calc(var(--d) / -2);margin-top:calc(var(--d) / -2);}
.cc .ring{position:absolute;inset:0;border-radius:50%;border:1px solid var(--hair-soft);transition:border-color .3s;}
.cc .ring-active{border-color:rgba(79,70,229,0.24);}
.cc .spinner{position:absolute;inset:0;animation:orbit var(--t) linear infinite;animation-delay:var(--phase);}
.cc .body-slot{position:absolute;top:0;left:50%;transform:translate(-50%,-50%);}
.cc .body{display:flex;align-items:center;gap:8px;background:none;border:0;padding:6px;cursor:pointer;animation:orbit var(--t) linear infinite reverse;animation-delay:var(--phase);}
.cc .body-dot{width:var(--sz);height:var(--sz);border-radius:50%;flex:none;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,0.75),transparent 56%),var(--tint);
  box-shadow:0 2px 9px var(--glow);transition:transform .22s,box-shadow .22s;}
.cc .body-tag{font-size:10px;font-weight:500;letter-spacing:0.1em;color:var(--slate-light);white-space:nowrap;transition:color .22s;}
.cc .body:hover .body-dot,.cc .body-active .body-dot{transform:scale(1.42);box-shadow:0 4px 18px var(--glow-hi);}
.cc .body:hover .body-tag,.cc .body-active .body-tag{color:var(--ink);}
.cc .orrery-hint{font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--slate-light);}
@keyframes orbit{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes breathe{0%,100%{opacity:.82;}50%{opacity:1;}}

/* ------------------------------ news ------------------------------ */
.cc .news{padding:0 clamp(20px,5vw,64px);}
.cc .news-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(272px,1fr));gap:14px;}
.cc .news-card{padding:24px 24px 26px;border-radius:18px;display:flex;flex-direction:column;gap:11px;transition:transform .22s,box-shadow .22s;}
.cc .news-card:hover{transform:translateY(-3px);box-shadow:0 2px 5px rgba(12,18,38,0.05),0 22px 44px -18px rgba(79,70,229,0.34);}
.cc .news-card .chip{align-self:flex-start;}
.cc .news-card h3{font-size:19px;}
.cc .news-card p{font-size:13.5px;color:var(--slate);flex:1;}
.cc .news-cta{font-size:13px;font-weight:600;color:var(--purple);font-family:'Poppins',sans-serif;}

/* ---------------------------- sections ---------------------------- */
.cc .section{padding:clamp(48px,6vw,92px) clamp(20px,5vw,64px);}
.cc .page-hero + .section,.cc .page-hero + .metrics{padding-top:clamp(18px,2.4vw,36px);}
.cc .section-head{max-width:62ch;margin-bottom:clamp(26px,3.2vw,42px);}
.cc .section-head h2{font-size:clamp(27px,3.4vw,42px);margin:12px 0 14px;}
.cc .section-lede{color:var(--slate);font-size:16px;max-width:56ch;}
.cc .prose{max-width:70ch;margin-left:0;margin-right:auto;display:flex;flex-direction:column;gap:16px;}
.cc .prose h2{font-size:clamp(25px,3vw,36px);margin-bottom:4px;}
.cc .prose p{color:var(--slate);font-size:16.5px;line-height:1.7;}

/* ---------------------------- mission ----------------------------- */
.cc .mission-claim{font-size:clamp(30px,4.2vw,54px);margin:14px 0 20px;max-width:18ch;}
.cc .mission-sub{color:var(--slate);font-size:17px;max-width:62ch;margin-bottom:clamp(30px,3.5vw,46px);}
.cc .pillars{display:grid;grid-template-columns:repeat(auto-fit,minmax(258px,1fr));gap:14px;margin-bottom:clamp(30px,3.5vw,46px);}
.cc .pillar{padding:26px 26px 28px;border-radius:18px;position:relative;overflow:hidden;transition:transform .22s,box-shadow .22s;display:flex;flex-direction:column;gap:9px;}
.cc .pillar::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--tint);}
.cc .pillar:hover{transform:translateY(-3px);box-shadow:0 2px 5px rgba(12,18,38,0.05),0 22px 46px -18px rgba(79,70,229,0.34);}
.cc .pillar-k{font-size:11px;letter-spacing:0.18em;color:var(--tint-ink);}
.cc .pillar h3{font-size:24px;}
.cc .pillar p{font-size:14px;color:var(--slate);flex:1;}
.cc .figures{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:20px 40px;}
.cc .figures li{border-top:1px solid var(--hair);padding-top:14px;}
.cc .fig-n{display:block;font-family:'Poppins',sans-serif;font-weight:600;font-size:clamp(26px,2.9vw,37px);letter-spacing:-0.035em;line-height:1.1;
  background:linear-gradient(100deg,var(--purple),var(--terra) 58%,var(--amber));-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc .fig-l{display:block;margin-top:6px;font-size:13px;color:var(--slate);}

/* --------------------------- ecosystem ---------------------------- */
.cc .ecosystem{padding:clamp(28px,3.6vw,48px) clamp(20px,5vw,64px);}
.cc .eco-head{font-size:13px;font-weight:600;color:var(--slate-light);margin-bottom:16px;}
.cc .eco-strip{display:flex;flex-wrap:wrap;gap:10px;}
.cc .eco-strip li{font-size:12px;letter-spacing:0.05em;padding:9px 16px;border-radius:999px;border:1px dashed var(--hair);color:var(--slate-light);background:rgba(255,255,255,0.42);}

/* ---------------------------- services ---------------------------- */
.cc .svc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:14px;}
.cc .svc-grid-2{grid-template-columns:repeat(2,minmax(0,1fr));}
.cc .svc{padding:26px 24px 26px;border-radius:18px;position:relative;overflow:hidden;transition:transform .22s,box-shadow .22s;display:flex;flex-direction:column;gap:8px;}
.cc .svc::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 100% 0%,var(--tint),transparent 62%);opacity:.10;pointer-events:none;}
.cc .svc:hover{transform:translateY(-3px);box-shadow:0 2px 5px rgba(12,18,38,0.05),0 22px 46px -18px rgba(79,70,229,0.34);}
.cc .svc-id{font-size:11px;letter-spacing:0.16em;color:var(--tint-ink);}
.cc .svc h3{font-size:21px;}
.cc .svc > p{font-size:13.5px;color:var(--slate);flex:1;}
.cc .svc-lg{padding:30px 28px;}
.cc .svc-lg h3{font-size:25px;}
.cc .svc-lg > p{font-size:14.5px;}
.cc .svc-facts{display:flex;flex-direction:column;gap:7px;margin-top:8px;padding-top:14px;border-top:1px solid var(--hair-soft);}
.cc .svc-facts > div{display:flex;justify-content:space-between;gap:12px;}
.cc .svc-facts dt{font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--slate-light);}
.cc .svc-facts dd{margin:0;font-size:11.5px;font-weight:500;color:var(--ink-soft);}

/* ---------------------------- features ---------------------------- */
.cc .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;}
.cc .feat-grid li{padding:24px 24px 26px;border-radius:16px;transition:transform .22s;}
.cc .feat-grid li:hover{transform:translateY(-3px);}
.cc .feat-dot{display:block;width:10px;height:10px;border-radius:50%;background:var(--tint,var(--accent));margin-bottom:14px;box-shadow:0 0 0 4px rgba(79,70,229,0.1);}
.cc .feat-grid h3{font-size:18px;margin-bottom:8px;}
.cc .feat-grid p{font-size:14px;color:var(--slate);}

/* ------------------------------ steps ----------------------------- */
.cc .steps{display:flex;flex-direction:column;gap:2px;}
.cc .steps > li{display:grid;grid-template-columns:56px minmax(0,1fr);gap:18px;padding:22px 0;border-top:1px solid var(--hair);}
.cc .steps > li:last-child{border-bottom:1px solid var(--hair);}
.cc .step-n{font-size:13px;letter-spacing:0.08em;color:var(--purple);padding-top:3px;}
.cc .steps h3{font-size:19px;margin-bottom:6px;}
.cc .steps p{font-size:14.5px;color:var(--slate);max-width:64ch;}

/* ------------------------------- faq ------------------------------ */
.cc .faq{display:flex;flex-direction:column;gap:10px;}
.cc .faq details{border-radius:14px;overflow:hidden;}
.cc .faq summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:19px 22px;cursor:pointer;list-style:none;
  font-family:'Poppins',sans-serif;font-weight:600;font-size:16px;letter-spacing:-0.015em;}
.cc .faq summary::-webkit-details-marker{display:none;}
.cc .faq-mark{position:relative;width:12px;height:12px;flex:none;}
.cc .faq-mark::before,.cc .faq-mark::after{content:"";position:absolute;background:var(--purple);border-radius:2px;transition:transform .2s;}
.cc .faq-mark::before{top:5px;left:0;width:12px;height:2px;}
.cc .faq-mark::after{top:0;left:5px;width:2px;height:12px;}
.cc .faq details[open] .faq-mark::after{transform:scaleY(0);}
.cc .faq details p{padding:0 22px 22px;font-size:14.5px;color:var(--slate);max-width:72ch;}

/* ---------------------------- workloads --------------------------- */
.cc .wl-layout{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,0.75fr);gap:clamp(20px,3vw,48px);align-items:start;margin-bottom:clamp(28px,3.5vw,44px);}
.cc .wl-list > li{border-bottom:1px solid var(--hair);}
.cc .wl-list > li:first-child{border-top:1px solid var(--hair);}
.cc .wl-btn{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;padding:20px 4px;background:none;border:0;cursor:pointer;text-align:left;font-family:inherit;}
.cc .wl-head{font-family:'Poppins',sans-serif;font-weight:600;letter-spacing:-0.025em;font-size:clamp(18px,1.9vw,24px);color:var(--slate);transition:color .2s;}
.cc .wl-btn:hover .wl-head,.cc .wl-open .wl-head{color:var(--ink);}
.cc .wl-mark{width:11px;height:11px;border-radius:50%;flex:none;border:1px solid var(--hair);transition:background .25s,border-color .25s;}
.cc .wl-open .wl-mark{background:linear-gradient(120deg,var(--purple),var(--orange));border-color:transparent;}
.cc .wl-body{padding:0 4px 22px;display:flex;flex-direction:column;gap:11px;}
.cc .wl-body p{font-size:14.5px;color:var(--slate);max-width:62ch;}
.cc .wl-stat{padding:32px 28px;border-radius:20px;display:flex;flex-direction:column;gap:8px;}
.cc .wl-stat-n{font-family:'Poppins',sans-serif;font-weight:600;letter-spacing:-0.04em;font-size:clamp(36px,4.4vw,55px);line-height:1.05;
  background:linear-gradient(100deg,var(--purple),var(--terra) 56%,var(--amber));-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc .wl-stat-l{font-size:13.5px;color:var(--slate);}
.cc .values{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;}
.cc .values li{padding:24px 22px 26px;border-radius:16px;transition:transform .22s;}
.cc .values li:hover{transform:translateY(-3px);}
.cc .values h3{font-size:18px;margin-bottom:8px;}
.cc .values p{font-size:13.5px;color:var(--slate);}

/* ---------------------------- compare ----------------------------- */
.cc .compare{display:flex;flex-direction:column;gap:10px;}
.cc .compare li{display:grid;grid-template-columns:minmax(0,240px) minmax(0,1fr);gap:20px;align-items:center;padding:20px 24px;border-radius:14px;}
.cc .compare h3{font-size:17px;}
.cc .compare p{font-size:14.5px;color:var(--slate);}
.cc .compare-us{background:linear-gradient(100deg,rgba(109,40,217,0.1),rgba(14,165,233,0.1));border-color:rgba(109,40,217,0.22);}
.cc .compare-us h3{color:var(--purple);}
.cc .compare-us p{color:var(--ink-soft);}

/* ----------------------------- metrics ---------------------------- */
.cc .metrics{padding:clamp(40px,5vw,76px) clamp(20px,5vw,64px);}
.cc .metrics h2{font-size:clamp(25px,2.9vw,36px);margin-bottom:clamp(24px,2.8vw,38px);}
.cc .metric-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px 34px;}
.cc .metric-grid li{border-top:2px solid var(--hair);padding-top:16px;display:flex;flex-direction:column;gap:7px;align-items:flex-start;}
.cc .metric-n{font-family:'Poppins',sans-serif;font-weight:600;letter-spacing:-0.04em;font-size:clamp(28px,3.2vw,42px);line-height:1.1;
  background:linear-gradient(100deg,var(--purple),var(--terra) 55%,var(--amber));-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc .metric-l{font-size:13.5px;color:var(--slate);}

/* --------------------------- instrument --------------------------- */
.cc .instrument-shell{border-radius:20px;overflow:hidden;}
.cc .instrument{width:100%;border-collapse:collapse;font-size:14px;}
.cc .instrument th,.cc .instrument td{text-align:left;padding:15px 22px;border-bottom:1px solid var(--hair-soft);vertical-align:middle;}
.cc .instrument tbody tr:last-child th,.cc .instrument tbody tr:last-child td{border-bottom:0;}
.cc .instrument thead th{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--slate-light);font-weight:400;border-bottom:1px solid var(--hair);}
.cc .instrument tbody th{font-weight:700;color:var(--ink);width:26%;font-family:'Manrope',sans-serif;}
.cc .instrument tbody td:first-of-type{color:var(--slate);font-family:'JetBrains Mono',monospace;font-size:12.5px;}
.cc .instrument tbody tr:hover{background:rgba(255,255,255,0.55);}
.cc .spec-stack{display:flex;flex-direction:column;gap:clamp(26px,3vw,40px);}
.cc .spec-group{font-size:20px;margin-bottom:12px;color:var(--ink-soft);}

/* ------------------------------- who ------------------------------ */
.cc .who-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;}
.cc .who-grid li{padding:24px 22px 26px;border-radius:16px;transition:transform .22s;}
.cc .who-grid li:hover{transform:translateY(-3px);}
.cc .who-grid h3{font-size:18px;margin-bottom:8px;}
.cc .who-grid p{font-size:13.5px;color:var(--slate);}
.cc .placeholder-card{display:flex;flex-direction:column;gap:6px;}
.cc .ph-avatar{width:44px;height:44px;border-radius:50%;margin-bottom:8px;background:linear-gradient(135deg,rgba(109,40,217,0.16),rgba(14,165,233,0.16));border:1px dashed var(--hair);}
.cc .ph-note{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--slate-light);}

/* ---------------------------- roadmap ----------------------------- */
.cc .tl{display:flex;flex-direction:column;}
.cc .tl > li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:20px;padding-bottom:34px;position:relative;}
.cc .tl > li:last-child{padding-bottom:0;}
.cc .tl-mark{display:flex;justify-content:center;position:relative;}
.cc .tl-mark span{width:13px;height:13px;border-radius:50%;margin-top:6px;background:linear-gradient(120deg,var(--purple),var(--orange));box-shadow:0 0 0 4px rgba(79,70,229,0.12);z-index:1;}
.cc .tl > li:not(:last-child) .tl-mark::after{content:"";position:absolute;top:18px;bottom:-36px;width:1px;background:var(--hair);}
.cc .tl-when{font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--magenta);}
.cc .tl-body h3{font-size:22px;margin:5px 0 10px;}
.cc .tl-body > ul{display:flex;flex-direction:column;gap:6px;}
.cc .tl-body > ul li{font-size:14.5px;color:var(--slate);padding-left:16px;position:relative;}
.cc .tl-body > ul li::before{content:"";position:absolute;left:0;top:10px;width:5px;height:5px;border-radius:50%;background:var(--hair);}

/* ---------------------------- contact ----------------------------- */
.cc .contact-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,0.65fr);gap:clamp(24px,3.5vw,56px);align-items:start;}
.cc .contact-card{padding:30px 28px;border-radius:20px;position:sticky;top:96px;}
.cc .contact-card h3{font-size:22px;margin-bottom:18px;}
.cc .contact-dl{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
.cc .contact-dl dt{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--slate-light);}
.cc .contact-dl dd{margin:3px 0 0;font-size:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.cc .contact-btn{width:100%;}

/* ---------------------------- cta band ---------------------------- */
.cc .cta-band{padding:clamp(16px,3vw,40px) clamp(20px,5vw,64px) clamp(48px,5.5vw,86px);}
.cc .cta-inner{border-radius:28px;padding:clamp(42px,5.5vw,80px) clamp(28px,4.5vw,64px);
  background:linear-gradient(118deg,#5B21B6,var(--purple) 22%,var(--magenta) 46%,var(--terra) 74%,var(--orange) 100%);
  color:#fff;box-shadow:0 24px 60px -26px rgba(79,70,229,0.62);}
.cc .cta-inner .eyebrow{color:rgba(255,255,255,0.75);}
.cc .cta-band h2{font-size:clamp(28px,3.8vw,50px);margin:14px 0 18px;color:#fff;}
.cc .cta-lede{color:rgba(255,255,255,0.9);max-width:50ch;font-size:16px;margin-bottom:28px;}
.cc .cta-actions{display:flex;flex-wrap:wrap;gap:12px;}
.cc .cta-band .btn-primary{background:#fff;color:var(--purple);border-color:#fff;box-shadow:0 10px 26px -12px rgba(0,0,0,0.45);}
.cc .cta-band .btn-primary:hover{background:#fff;color:var(--magenta);}
.cc .cta-band .btn-ghost{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.55);color:#fff;}
.cc .cta-band .btn-ghost:hover{background:rgba(255,255,255,0.22);border-color:#fff;color:#fff;}

/* ----------------------------- footer ----------------------------- */
.cc .foot{padding:0 clamp(20px,5vw,64px) 44px;}
.cc .foot-grid{display:grid;grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,1fr));gap:30px;padding-top:38px;border-top:1px solid var(--hair);}
.cc .foot-brand{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:700;letter-spacing:-0.025em;margin-bottom:12px;font-family:'Poppins',sans-serif;}
.cc .foot-note{color:var(--slate);font-size:13.5px;max-width:42ch;}
.cc .foot-col h4{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--slate-light);font-weight:600;margin-bottom:12px;}
.cc .foot-col ul{display:flex;flex-direction:column;gap:9px;}
.cc .foot-col a{font-size:13.5px;color:var(--slate);transition:color .2s;}
.cc .foot-col a:hover{color:var(--purple);}
.cc .foot-base{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-top:34px;padding-top:20px;border-top:1px solid var(--hair-soft);font-size:11px;color:var(--slate-light);}
.cc .foot-fine{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}

/* --------------------------- responsive --------------------------- */
@media (max-width:1180px){
  .cc .nav-link{display:none;}
  .cc .menu-top{padding:8px 9px;font-size:13px;}
}
@media (max-width:1080px){
  .cc .hero-grid{grid-template-columns:1fr;}
  .cc .hero-orrery{order:-1;}
  .cc .orrery{width:min(100%,420px);}
  .cc .wl-layout{grid-template-columns:1fr;}
  .cc .contact-grid{grid-template-columns:1fr;}
  .cc .contact-card{position:static;}
  .cc .foot-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media (max-width:860px){
  .cc .svc-grid-2{grid-template-columns:1fr;}
}
@media (max-width:920px){
  .cc .nav-main{display:none;}
  .cc .burger{display:flex;}
  .cc .nav-actions{margin-left:auto;}
  .cc .compare li{grid-template-columns:1fr;gap:6px;}
}
@media (max-width:640px){
  .cc .nav{gap:10px;margin:10px 12px;padding:11px 14px;border-radius:15px;}
  .cc .wordmark{font-size:15px;}
  .cc .nav-cta{padding:8px 13px;font-size:12px;}
  .cc .announce{font-size:12px;gap:8px;padding:8px 14px;}
  .cc .instrument tbody th{width:38%;}
  .cc .instrument th,.cc .instrument td{padding:13px 14px;}
  .cc .body-tag{display:none;}
  .cc .foot-grid{grid-template-columns:1fr;}
  .cc .steps > li{grid-template-columns:40px minmax(0,1fr);gap:12px;}
  .cc .svc-grid-2{grid-template-columns:1fr;}
}

@media (prefers-reduced-motion:reduce){
  .cc .spinner,.cc .body,.cc .corona,.cc .flare{animation:none !important;}
  .cc *{transition-duration:.01ms !important;}
}
`;
