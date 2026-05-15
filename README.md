# Québec Procurement Analysis Framework

A decision-support web application for senior government procurement officials in Québec. The tool applies a structured two-tier evaluation framework to ten contested public procurement situations spanning transit, infrastructure, defence, digital systems, and energy sectors.

## Live Demo

[https://[your-username].github.io/procurement-framework/](https://[your-username].github.io/procurement-framework/)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/procurement-framework/](http://localhost:5173/procurement-framework/)

## Deploy to GitHub Pages

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys to GitHub Pages
3. Enable Pages in your repository settings: **Settings → Pages → Source: GitHub Actions**

## Framework Overview

The evaluation framework operates on two tiers:

- **Tier 1:** Five mandatory pass/fail thresholds (Integrity, Technical Minimum, Financial Viability, Legal/Regulatory Compliance, Scope Responsiveness). Failure on any threshold disqualifies the procurement from proceeding.
- **Tier 2:** Weighted scoring on eight criteria (A–H), 0–100 per criterion, yielding a composite 0–100 score. Weights vary by procurement category.

Six trade-off resolution protocols govern decisions when criteria conflict (e.g., cost vs. Quebec content, risk vs. speed, sovereignty vs. best-in-class).

The framework is legally compliant with CFTA, CETA, and CUSMA — achieving regional development objectives through evaluation weighting rather than explicit local content mandates.

## Scenarios

1. **STM MR-73 Metro Rolling Stock Replacement** — Landscape Assessment
2. **Projet Structurant de l'Est (PSE)** — Full Analysis (Composite: 44.65/100)
3. **Bus Fleet Electrification** — Landscape Assessment
4. **Troisième Lien Québec-Lévis** — Landscape Assessment (Deferred)
5. **MTQ Highway & Bridge Rehabilitation** — Landscape Assessment
6. **Davie Shipyard / National Shipbuilding Strategy** — Landscape Assessment
7. **NORAD Modernization / AEW&C Platform** — Landscape Assessment
8. **Government IT Modernization** — Landscape Assessment
9. **Santé Québec Health IT / EHR Platform** — Landscape Assessment
10. **Canadian Patrol Submarine Project (CPSP)** — Full Analysis (TKMS: 70.5/100)

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- react-router-dom v6 (HashRouter for GitHub Pages)
- Custom SVG radar chart (no external charting library)

## License

MIT
