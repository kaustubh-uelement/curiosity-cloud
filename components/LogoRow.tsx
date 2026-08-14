import React from "react";

const LOGOS = [
  {
    id: "logo-1",
    svg: (
      <svg width="150" height="26" viewBox="0 0 150 26" fill="currentColor" aria-label="Logoipsum">
        <path d="M2 4h7l5 8-5 8H2l5-8-5-8Zm11 0h7l5 8-5 8h-7l5-8-5-8Z" />
        <text x="32" y="19" fontFamily="Inter Tight, sans-serif" fontSize="17" fontWeight="600">Logoipsum</text>
      </svg>
    ),
  },
  {
    id: "logo-2",
    svg: (
      <svg width="176" height="30" viewBox="0 0 176 30" fill="currentColor" aria-label="Logoipsum">
        <path d="M14 1 27 5v9c0 6.6-5.2 12-13 15C6.2 26 1 20.6 1 14V5L14 1Z" />
        <path d="M9 13.5 12.6 17 20 9.8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <text x="32" y="22" fontFamily="Inter Tight, sans-serif" fontSize="21" fontWeight="700">Logoipsum</text>
      </svg>
    ),
  },
  {
    id: "logo-3",
    svg: (
      <svg width="168" height="28" viewBox="0 0 168 28" fill="currentColor" aria-label="Logoipsum">
        <path d="M14 1a13 13 0 1 0 0 26 13 13 0 0 0 0-26Zm0 6.5A6.5 6.5 0 1 1 7.5 14 6.5 6.5 0 0 1 14 7.5Z" />
        <path d="M14 7.5 20.6 4 24 10.5l-6.6 3.5L14 7.5Z" />
        <text x="32" y="21" fontFamily="Inter Tight, sans-serif" fontSize="20" fontWeight="600">Logoipsum</text>
      </svg>
    ),
  },
  {
    id: "logo-4",
    svg: (
      <svg width="148" height="26" viewBox="0 0 148 26" fill="currentColor" aria-label="Logoipsum">
        <rect x="0" y="3" width="118" height="19" rx="2" />
        <text x="7" y="18" fontFamily="Inter Tight, sans-serif" fontSize="15" fontWeight="700" fill="#fff" fontStyle="italic">logoipsum</text>
        <path d="M124 3h7l-4 7h5l-9 13 3-9h-5l3-11Z" />
      </svg>
    ),
  },
  {
    id: "logo-5",
    svg: (
      <svg width="158" height="28" viewBox="0 0 158 28" fill="currentColor" aria-label="Logoipsum">
        <circle cx="14" cy="14" r="12.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="14" cy="14" r="7.4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="14" cy="14" r="2.6" />
        <text x="32" y="18" fontFamily="Inter Tight, sans-serif" fontSize="17" fontWeight="500">logoipsum</text>
        <text x="32" y="26" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing=".08em">.com</text>
      </svg>
    ),
  },
  {
    id: "logo-6",
    svg: (
      <svg width="150" height="28" viewBox="0 0 150 28" fill="currentColor" aria-label="Logoipsum">
        <text x="0" y="21" fontFamily="Inter Tight, sans-serif" fontSize="21" fontWeight="500">logo</text>
        <path d="M46 6h20a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H46a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4Z" />
        <path d="M48 5l3 4M64 5l-3 4" stroke="currentColor" strokeWidth="2" />
        <circle cx="51" cy="14" r="2" fill="#fff" /><circle cx="61" cy="14" r="2" fill="#fff" />
        <text x="76" y="21" fontFamily="Inter Tight, sans-serif" fontSize="21" fontWeight="500">ipsum</text>
      </svg>
    ),
  },
];

export const LogoRow = () => (
  <div className="logo-carousel" aria-label="Partner and client logos">
    <div className="logo-track">
      <div className="logo-group">
        {LOGOS.map((item) => (
          <div key={item.id} className="logo-item">
            {item.svg}
          </div>
        ))}
      </div>
      <div className="logo-group" aria-hidden="true">
        {LOGOS.map((item) => (
          <div key={`dup-${item.id}`} className="logo-item">
            {item.svg}
          </div>
        ))}
      </div>
    </div>
  </div>
);

