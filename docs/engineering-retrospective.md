# Engineering Retrospective

This document captures the main lessons from the current Texas Reaper web port so future work can move faster and avoid repeating known mistakes.

## What Worked

- Keeping the original prototype untouched reduced scope creep and made comparison easier.
- Splitting the game into data, logic, hook, and component layers made UI iteration much safer.
- Shipping through GitHub Pages early exposed deployment issues before the project became larger.
- Mobile-first layout decisions produced a clearer visual direction than trying to satisfy desktop and mobile independently.

## Lessons Learned

### 1. Protect the reference implementation

Do not keep rewriting the original prototype while building the new app.

Why it mattered:

- it preserved a stable behavioral reference
- it kept refactor risk isolated to the new frontend
- it made side-by-side verification possible

Rule:

- keep original assets in orogin/ as read-only reference material

### 2. Separate pure game logic from UI state early

Hand evaluation, reward calculation, swap logic, and other rules should stay independent from React.

Why it mattered:

- easier debugging
- easier regression checking
- less coupling when changing layout or animation

Rule:

- game rules belong in frontend/src/game/logic, not inside components

### 3. GitHub Pages has a small but strict deployment surface

The Pages workflow failed because dependency state and tracked files were not clean.

Key pitfalls encountered:

- package-lock.json must stay aligned with package.json for npm ci
- node_modules must never be tracked
- Vite base must match the repository path

Rule:

- before pushing deployment changes, always verify build locally with cd frontend && npm run build

### 4. Responsive layout should be mobile-first, not desktop-first rescue work

Trying to make the desktop version feel like a separate large-screen UI created layout drift and visual inconsistency.

What worked better:

- treat the phone layout as the primary design
- emulate that layout on desktop inside a constrained frame
- only add desktop-specific behavior when it materially improves usability

Rule:

- preserve one canonical visual language across devices unless there is a strong gameplay reason not to

### 5. Fixed full-screen layouts need a complete flex chain

Several visual issues came from mixing min-height-based containers with children that expected a fixed-height parent.

Observed failure mode:

- content collapsed toward the top
- sections stopped distributing leftover height correctly
- cards and labels started overlapping on smaller screens

Rule:

- when a screen relies on flex height distribution, the entire parent chain must explicitly support it with h-[100dvh], flex-1, and min-h-0 where appropriate

### 6. Avoid hard-coded height assumptions on small screens

Large fixed paddings, minimum heights, and over-sized cards caused stacking and collision on mobile devices.

What helped:

- smaller mobile card dimensions
- tighter spacing on action panels
- allowing controlled vertical scrolling where necessary

Rule:

- mobile spacing should be designed from the smallest realistic viewport upward, not scaled down from desktop

### 7. Be cautious with bulk automated class rewrites

Attempts to strip responsive classes programmatically created noisy changes and avoidable cleanup work.

Rule:

- for UI refactors, prefer targeted edits over broad regex-based rewrites unless there is a reliable codemod and a clean rollback plan

## Working Agreement Going Forward

- keep the original reference read-only
- validate every layout change on both mobile and desktop
- run a production build before pushing
- prefer targeted visual adjustments over broad rewrites
- move internal notes to docs/ instead of expanding README