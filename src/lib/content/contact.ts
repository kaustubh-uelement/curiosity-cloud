import type { ContactItem } from "./types";

export const CONTACT_CHECKLIST: ContactItem[] = [
  ["Workload shape", "Training, serving, or both — and roughly what model size."],
  ["Accelerator count", "How many, and whether that is a baseline or a peak."],
  ["Duration", "A fixed run length, a rolling term, or open-ended production."],
  ["Residency", "Whether data must stay in-country, and in which region."],
  ["Tenancy", "Shared, single-tenant, or your own hardware in our halls."],
  ["Timing", "When you need it live — this is usually the binding constraint."],
];
