import type { PageData } from "./types";

export const PAGES: Record<string, PageData> = {
  /* ----------------------------- PRODUCTS ----------------------------- */
  products: {
    eyebrow: "Products",
    title: "Four ways to take capacity",
    lede: "Same campus, same power, same control plane. What changes is how much of the stack you want to hold, and how much of the operating burden you want to hand over.",
    kind: "products-index",
  },

  "products/gpu-cloud": {
    parent: ["Products", "products"],
    eyebrow: "C-I",
    title: "GPU Cloud",
    lede: "On-demand and reserved accelerator capacity, billed by the hour, on bare metal you actually control.",
    intro: {
      h: "Compute without the abstraction tax",
      p: [
        "Most clouds hand you a virtual machine and keep the interesting parts to themselves. GPU Cloud gives you the node: the whole node, with direct access to the accelerators, the NICs and the local NVMe.",
        "That matters for training. A hypervisor layer costs you throughput you have already paid for, and it hides the failure signals you need to keep a multi-week run alive.",
      ],
    },
    features: [
      ["Bare metal, not virtualised", "Direct access to accelerators, network interfaces and local storage. No shared tenancy on the host."],
      ["Non-blocking fabric", "East–west bandwidth sized so the interconnect is never the bottleneck in a distributed run."],
      ["Automated node recovery", "Health checks drain and replace failing hosts, and the job resumes from checkpoint rather than from zero."],
      ["Carbon-aware scheduling", "Deferrable work can be placed into windows when the campus is running on its cleanest, cheapest supply."],
      ["Flexible commitment", "Hourly for experiments, reserved terms up to 36 months for production capacity you need guaranteed."],
      ["Transparent power cost", "Energy is contracted upstream, not passed through at spot; so the rate you sign is the rate you pay."],
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
      ["Is capacity guaranteed on hourly pricing?", "No. Hourly is best-effort against available pool. If you need capacity guaranteed at a specific date, take a reserved term."],
    ],
  },

  "products/private-ai-cloud": {
    parent: ["Products", "products"],
    eyebrow: "C-II",
    title: "Private AI Cloud",
    lede: "A single-tenant environment inside our campus, operated by us and governed entirely by you.",
    intro: {
      h: "Isolation you can point at",
      p: [
        "For a lot of workloads, logical isolation is not the isolation the compliance team asked about. Private AI Cloud gives you physically separate racks in a defined hall, with your own network segment and your own key material.",
        "We run the operations. You keep the controls: identity, encryption keys, access policy and the audit trail.",
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
      ["Can we run our own security tooling inside?", "Yes. The environment is yours logically: agents, scanners and policy tooling are all supported."],
      ["What is the minimum size?", "Private tenancy is sized by hall, so there is a practical floor. If your requirement is smaller, managed infrastructure or GPU Cloud is usually the better fit."],
    ],
  },

  "products/managed-infrastructure": {
    parent: ["Products", "products"],
    eyebrow: "C-III",
    title: "Managed AI Infrastructure",
    lede: "You own the silicon. We provide the powered, cooled, connected space and run everything underneath it.",
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
    lede: "Managed endpoints and training capacity for teams that want compute, not a datacentre.",
    intro: {
      h: "The highest layer of the stack",
      p: [
        "Not every team wants to think about racks. Inference & Training is a managed service: you point at an endpoint or submit a job, and the capacity underneath is ours to worry about.",
        "Because we own the generation as well as the compute, deferrable work can be scheduled into the cleanest and cheapest hours automatically, which is a saving you cannot make when you rent someone else's cloud.",
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
      ["Can I mix this with reserved capacity?", "Yes. A common pattern is reserved capacity for serving and pooled interruptible capacity for training."],
    ],
  },

  /* ----------------------------- PLATFORM ----------------------------- */
  "platform/energy": {
    parent: ["Platform", "platform/energy"],
    eyebrow: "Platform · Layer 01",
    title: "Energy",
    accent: "#F59E0B",
    lede: "We contract and firm our own clean power. Every other layer of the platform depends on this one holding.",
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
      ["Is this genuinely 24×7 clean, or annual matching?", "The target is hourly matched round-the-clock supply, firmed with storage, not annual REC netting. Where a shortfall is covered from the grid, it is reported as such."],
      ["What happens if tariff regulation changes?", "Our models are stress-tested against removal of waivers and concessions. We build on the mechanism, not on the concession."],
      ["Do you sell energy separately?", "Curiosity Energy contracts clean supply to data centres as its own business. Curiosity Cloud is its largest customer."],
    ],
  },

  "platform/ai-factories": {
    parent: ["Platform", "platform/ai-factories"],
    eyebrow: "Platform · Layer 02",
    title: "AI factories",
    accent: "#4F46E5",
    lede: "The campuses: liquid-cooled halls, a non-blocking fabric, and a thermal design fixed before the first slab is poured.",
    intro: {
      h: "Density is a day-zero decision",
      p: [
        "Current-generation accelerator racks have already passed what air cooling supports. A hall designed for air and retrofitted later is not an upgrade. It is a write-off with extra steps.",
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
      ["Can you host our own hardware?", "Yes. That is Managed AI Infrastructure. Same halls, same power, same operations."],
      ["How is heat handled?", "Direct-to-chip capture with a designed rejection path. Heat reuse is under evaluation and not yet committed."],
    ],
  },

  "platform/control-plane": {
    parent: ["Platform", "platform/control-plane"],
    eyebrow: "Platform · Layer 03",
    title: "Control plane",
    accent: "#0EA5E9",
    lede: "One system spanning generation, storage, campus and compute, deciding what runs where, when, and at what carbon.",
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

  /* ----------------------------- COMPANY ------------------------------ */
  company: {
    eyebrow: "Company",
    title: "Make clean power and AI compute abundant in India",
    lede: "Curiosity is vertically integrated by design. We find and contract the energy, build and operate the AI factories, and run a cloud platform on top.",
    kind: "company",
  },

  why: { kind: "why" },
  specification: { kind: "specification" },
  roadmap: { kind: "roadmap" },
  contact: { kind: "contact" },
};
