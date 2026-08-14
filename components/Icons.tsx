import React from "react";
import { IconKey } from "@/lib/types";

export const Bolt = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M9 1.4 3.4 9h4l-.8 5.6L12.6 7h-4l.4-5.6Z" /></svg>
);

export const Chip = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="5" y="5" width="8" height="8" rx="1" /><rect x="2.4" y="2.4" width="13.2" height="13.2" rx="1.6" /><path d="M7 .8v1.6M11 .8v1.6M7 15.6v1.6M11 15.6v1.6M.8 7h1.6M.8 11h1.6M15.6 7h1.6M15.6 11h1.6" /></svg>
);

export const Cloud = () => (
  <svg width="18" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M5.6 13.4A4.6 4.6 0 0 1 6 4.3a5.4 5.4 0 0 1 10.2 2.3 3.4 3.4 0 0 1-.6 6.8H5.6Z" /></svg>
);

export const Grid = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="2" width="6" height="6" /><rect x="10" y="2" width="6" height="6" /><rect x="2" y="10" width="6" height="6" /><rect x="10" y="10" width="6" height="6" /></svg>
);

export const Clock = () => (
  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="9" cy="9" r="7.4" /><path d="M9 4.6V9l3 1.8" strokeLinecap="round" /></svg>
);

export const Shield = () => (
  <svg width="16" height="17" viewBox="0 0 16 18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M8 1.2 14.6 3.6v5.2c0 4-2.7 7-6.6 8.2C4.1 15.8 1.4 12.8 1.4 8.8V3.6L8 1.2Z" /><path d="M5.4 9 7.4 11l3.4-3.6" /></svg>
);

export const ICONS: Record<IconKey, React.ComponentType> = {
  bolt: Bolt,
  chip: Chip,
  cloud: Cloud,
  grid: Grid,
  clock: Clock,
  shield: Shield
};

export const Mark = () => (
  <svg className="mark" width="23" height="25" viewBox="0 0 23 25" fill="none" aria-hidden="true">
    <path d="M11.5 1.2 21.1 6.6v11.8l-9.6 5.4-9.6-5.4V6.6l9.6-5.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11.5 7.4 16.3 10v5.2l-4.8 2.6-4.8-2.6V10l4.8-2.6Z" fill="currentColor" />
  </svg>
);

export const Chev = () => (
  <svg className="chev" width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"><path d="M1 1.2 4.5 4.6 8 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
);

export const DocIcon = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true"><rect x=".6" y=".6" width="11.8" height="12.8" rx="1.4" stroke="currentColor" strokeWidth="1.2" /><path d="M3.4 4.3h6.2M3.4 7h6.2M3.4 9.7h3.6" stroke="currentColor" strokeWidth="1.2" /></svg>
);
