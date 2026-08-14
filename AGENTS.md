# Curiosity Cloud — Development Rules

## Source of Truth

original/curiosity-cloud.jsx is the authoritative source for:
- UI
- copy
- data
- interactions
- visual design
- responsive behavior

Never redesign the source during migration.

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- No UI component library unless explicitly approved

## Design Rule

Pixel fidelity > architectural elegance.

Do not change:
- colors
- typography
- spacing
- copy
- layout
- animations
- breakpoints

unless the original source explicitly requires it.

## Navigation

Use Next.js routing.
Never recreate hash-based navigation.

## Components

Prefer reusable components.
Do not create unnecessary micro-components.

## Client Components

Use "use client" only when browser interactivity requires it.

## Data

Do not duplicate large datasets across components.

## Verification

Every implementation task must finish with:

npm run build

and browser verification when UI is involved.

## Important

Do not say an implementation is complete merely because TypeScript compiles.

The running browser application is the final authority.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
