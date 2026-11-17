# SuperRR Selector Season 2 — Project Backup Manifest

- **Backup Date:** 2026-11-17 (Local time: 21:26 IST)
- **Current Project Version:** V1 Developed Baseline
- **GitHub Repository:** `https://github.com/psprashanth25/SupeRR-Selector-Season-2-`
- **Owner:** `psprashanth25`
- **Backup Branch:** `backup/current-developed-version`
- **Base Commit (from origin/main):** `327e9e38c09f99c35d63bdc3f7872cbd12fb38ea`

---

## 1. Scope & Preservation Intent

This backup captures the complete, verified, developed V1 version of the SuperRR Selector Season 2 project.

**Important Version Boundary:**
- **V1 (Included):** The complete empirical pressure performance model, all 7 core datasets, V1 rankings (Abdul Samad #1 batter, Mukesh Kumar #1 bowler), complete 37 batter and 32 bowler candidate evaluations, threshold sensitivity dataset, and the full interactive React 19/TypeScript analytics dashboard with unit tests.
- **V2 (Excluded):** V2 has **NOT** been developed yet and is explicitly excluded from this backup.

---

## 2. Included Directories & File Inventory

| Path | Description | Verification Status |
| :--- | :--- | :--- |
| `attached_data/` | Original preserved copies of all 7 analytical deliverables | Verified (Exact source files) |
| `attached_data/ipl_results_summary.json` | Core match counts, ball totals, top 10 previews | Verified (367 matches, 87,673 balls) |
| `attached_data/IPL_results_methodology_and_limitations.md` | Phase 7 methodology, weights, cautionary notice | Verified |
| `attached_data/ipl_top10_batters.csv` | Top 10 batters ranked by shrunk composite score | Verified (10 rows, Samad to Suryakumar) |
| `attached_data/ipl_top10_bowlers.csv` | Top 10 bowlers ranked by shrunk composite score | Verified (10 rows, Mukesh to Nabi) |
| `attached_data/ipl_batter_rankings_all.csv` | All 37 qualified batters with all model percentiles | Verified (37 candidate rows) |
| `attached_data/ipl_bowler_rankings_all.csv` | All 32 qualified bowlers with all model percentiles | Verified (32 candidate rows) |
| `attached_data/ipl_threshold_sensitivity.csv` | Delivery volumes across thresholds 60, 65, 70 | Verified (3 rows) |
| `src/data/superrr/` | Project copies used by dynamic data loaders | Verified (Identical to attached_data) |
| `src/data/superrrLoader.ts` | Robust client-side PapaParse CSV and JSON parser | Verified |
| `src/components/` | 11 React UI components for the interactive dashboard | Verified (Zero lint errors) |
| `src/types/cricket.ts` | Complete TypeScript interfaces for all data structures | Verified |
| `src/utils/formatters.ts` | Precision number, percentage, and economy formatters | Verified |
| `src/tests/dataIntegrity.test.ts` | 8 automated unit tests verifying data integrity | Verified (8/8 passing in vitest) |
| `src/App.tsx` | Main dashboard controller managing sections & modals | Verified |
| `src/index.css` | Tailwind directives and custom scrollbar styles | Verified |
| `src/main.tsx` | React 19 application entry point | Verified |
| `index.html` | Application HTML with Inter and JetBrains Mono fonts | Verified |
| `package.json` & `package-lock.json` | Dependency declarations and lockfile | Verified |
| `tailwind.config.js` | Rajasthan Royals-inspired color palette configuration | Verified |
| `vite.config.ts` | Vite bundler configuration | Verified |
| `tsconfig*.json` | TypeScript configuration files | Verified |
| `README.md` | Comprehensive project documentation and methodology | Verified |

---

## 3. Intentionally Excluded Files & Folders

| File / Pattern | Reason for Exclusion |
| :--- | :--- |
| `node_modules/` | Third-party dependency modules; reproducible via `npm install` |
| `dist/` | Production build artifacts; reproducible via `npm run build` |
| `.env*` | Environment configuration and potential credentials |
| `*.log` | Runtime debug logs |
| `.vscode/`, `.idea/` | IDE-specific local configuration |
| Unverified V2 files | V2 has not yet been developed; no planned files committed |

---

## 4. Recovery Instructions

To recover the exact V1 state from GitHub at any time:

### Step 1: Fetch Latest Remote References
```bash
git fetch origin
```

### Step 2: Switch to the Backup Branch
```bash
git switch backup/current-developed-version
```

### Step 3 (Recommended): Create an Isolated Working Branch
To make changes without modifying the backup reference:
```bash
git switch -c recovery/from-current-v1-backup backup/current-developed-version
```

### Step 4: Reinstall Dependencies & Run
```bash
npm install
npm run dev
```
