# Texas Reaper

Texas Reaper is a fast-paced poker-flavored score attack game rebuilt for the web with React, Vite, and Tailwind CSS.

The current version focuses on three things:

- preserving the core game loop and hand-evaluation rules
- delivering a polished mobile-first presentation
- supporting direct deployment to GitHub Pages

## Live Demo

- GitHub Pages: https://onovich.github.io/TexasReaper/

## Highlights

- Mobile-first interface with desktop phone-frame presentation
- React-based game state orchestration with separated data, logic, and UI layers
- GitHub Pages deployment workflow included
- Original reference prototype kept in the repository for comparison during iteration

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- GitHub Actions + GitHub Pages

## Local Development

Requirements:

- Node.js 18+
- npm

Install dependencies:

```bash
cd frontend
npm install
```

Start the dev server:

```bash
cd frontend
npm run dev
```

Build for production:

```bash
cd frontend
npm run build
```

Preview the production build locally:

```bash
cd frontend
npm run preview
```

## Deployment

This repository is configured for GitHub Pages deployment through GitHub Actions.

- workflow: .github/workflows/deploy.yml
- production base path: /TexasReaper/
- deployment is triggered on push to main

If Pages is not enabled yet, set the repository Pages source to GitHub Actions.

## Project Structure

- frontend/: web application
- frontend/src/game/data: static game data and configuration
- frontend/src/game/logic: pure game rules and score calculation
- frontend/src/game/hooks: state orchestration and timing
- frontend/src/components: UI components and screens
- orogin/: archived reference materials from the original prototype

## Maintainer Notes

Internal project notes have been moved out of the public-facing README:

- docs/engineering-retrospective.md
- docs/roadmap.md
