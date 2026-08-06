import type { Spec, SpecGroup } from "./types";

export const SPECS: Spec[] = [
  ["Accelerators", "Current-generation NVIDIA class", "Placeholder"],
  ["Interconnect", "Non-blocking east–west fabric", "Placeholder"],
  ["Cooling", "Direct-to-chip liquid, RDHx fallback", "Placeholder"],
  ["Rack density", "Designed for high-density halls", "Placeholder"],
  ["Power", "24×7 carbon-free, contracted", "Curiosity Energy"],
  ["Storage", "Parallel filesystem, NVMe tier", "Placeholder"],
  ["Regions", "Mumbai · Chennai · Hyderabad", "Planned"],
  ["Access", "Bare metal, API, private link", "Placeholder"],
];

export const FULL_SPECS: SpecGroup[] = [
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
