# SuperRR Selector Season 2 — Pressure Performance Analytics Dashboard
> **Analytical Presentation for Rajasthan Royals** | *Unstop Challenge: SuperRR Selector Season 2 – Round 1*  
> **Development Branch:** `feature/v2-dashboard` (Unpushed local feature branch)  
> **Backup Branch (Preserved on GitHub):** `backup/current-developed-version`  
> **Repository:** `https://github.com/psprashanth25/SupeRR-Selector-Season-2-`  

---

## 1. Project Objective & Scope

This project is an advanced, transparent sports analytics application built to evaluate historical player performance under high-pressure match situations across the modern Indian Premier League (IPL 2022–2026).

### Primary Challenge Objective
- Identify the **Top 10 Batters** performing best under pressure.
- Identify the **Top 10 Bowlers** performing best under pressure.
- Formulate a transparent, cricket-sound statistical definition of **situational pressure**.
- Establish candidate eligibility filters to avoid fleeting sample biases.
- Design an explainable multi-component composite ranking formula with **Bayesian shrinkage**.
- Present the findings honestly through a professional, interactive React 19/TypeScript analytics dashboard.

> **Important Analytical Scope Notice:**  
> This project is strictly a historical pressure-performance evaluation. It is **NOT** an auction purchasing strategy, player-retention roadmap, or bidding recommendation. Historical players who qualify under empirical criteria remain preserved in the dataset to maintain data integrity.

---

## 2. Dual Analytical Models: V1 Baseline & V2 Exploratory

To ensure maximum analytical rigor and transparency, the dashboard presents both **Model V1** and **Model V2** side by side:

### A. Model V1 — Fixed-Threshold Baseline (Preserved)
- **Pressure Rule:** Single global pre-delivery pressure metric $\ge 65$ across all match phases.
- **Pressure Deliveries:** 6,799 / 6,800 balls (7.75% of tournament deliveries).
- **Candidate Pool:** 37 eligible batters, 32 eligible bowlers.
- **Role Normalisation:** None (Single undivided pool).
- **Key Characteristic:** Concentrates heavily on late-innings run chases (RRR > 10.5), resulting in zero openers in the Top 10.

### B. Model V2 — Context-Normalised Exploratory Model
- **Pressure Rule:** Innings- and phase-specific 70th percentile pressure cutoff (with absolute floor of 35).
- **Pressure Deliveries:** 17,592 balls (20.07% of tournament deliveries).
- **Candidate Pool:** 112 eligible batters, 129 eligible bowlers.
- **Role Normalisation:** Stratified percentiles within role groups:
  - *Batters:* Opener (median batting order 1–2), Middle Order (3–5), Finisher (6–7).
  - *Bowlers:* Predominant phase of legal deliveries (Powerplay, Middle, Death).
- **Shrinkage Formula:** Bayesian regression toward 50: $\text{Score} = 50 + (\text{Raw} - 50) \times \frac{n}{n + 60}$.

---

## 3. Top 10 Leaderboards Comparison

### Top 10 Batters

| Rank | Model V2 (Exploratory Context-Normalised) | Role | V2 Score | Model V1 (Baseline Fixed-Threshold) | V1 Score |
| :---: | :--- | :--- | :---: | :--- | :---: |
| **1** | Ishan Kishan | Opener | 80.80 | Abdul Samad | 72.58 |
| **2** | Krunal Pandya *(Overlap)* | Middle order | 76.96 | Krunal Pandya *(Overlap)* | 71.18 |
| **3** | Shahbaz Ahmed *(Overlap)* | Finisher | 76.05 | Lalit Yadav | 67.43 |
| **4** | Rahul Tewatia | Finisher | 73.78 | Axar Patel | 65.34 |
| **5** | Devdutt Padikkal | Middle order | 73.54 | Kieron Pollard | 65.00 |
| **6** | Wriddhiman Saha | Opener | 72.45 | Andre Russell | 64.29 |
| **7** | Abhinav Manohar | Finisher | 71.29 | Romario Shepherd | 64.24 |
| **8** | Aniket Verma | Middle order | 70.73 | Shahbaz Ahmed *(Overlap)* | 61.03 |
| **9** | Venkatesh Iyer | Middle order | 70.20 | Rovman Powell | 60.85 |
| **10** | Rahul Tripathi | Middle order | 69.32 | Suryakumar Yadav | 57.57 |

*Batter Top-10 Overlap:* Exactly 2 players (**Krunal Pandya** and **Shahbaz Ahmed**), showing 80% turnover due to phase stratification.

---

### Top 10 Bowlers & Critical Runs-Saved Warning

| Rank | Model V2 (Exploratory) | Phase | Runs Saved/6b | V2 Score | Reliability | Model V1 (Baseline) | V1 Score |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| **1** | Shahbaz Ahmed *(Overlap)* | Middle | **-2.26** | 77.95 | 0.665 | Mukesh Kumar *(Overlap)* | 65.43 |
| **2** | Romario Shepherd | Middle | **-4.21** | 74.07 | 0.610 | Jasprit Bumrah | 63.04 |
| **3** | Shivang Kumar | Middle | **-3.61** | 73.43 | 0.545 | Deepak Chahar | 61.80 |
| **4** | Washington Sundar | Middle | **-1.53** | 71.10 | 0.549 | Shardul Thakur | 61.27 |
| **5** | Ishant Sharma | Powerplay | **-2.40** | 70.87 | 0.600 | Harshal Patel | 60.97 |
| **6** | Avesh Khan | Death | **-0.08** | 70.73 | 0.781 | Marco Jansen | 59.13 |
| **7** | Mukesh Kumar *(Overlap)* | Powerplay | **-2.59** | 69.32 | 0.761 | Shahbaz Ahmed *(Overlap)* | 57.10 |
| **8** | Mayank Markande | Middle | **-1.88** | 69.12 | 0.647 | T Natarajan | 56.88 |
| **9** | Chris Jordan | Death | **-0.87** | 67.64 | 0.483 | Arshdeep Singh | 56.84 |
| **10** | Mitchell Marsh | Middle | **-3.86** | 67.45 | 0.362 | Auqib Nabi | 56.46 |

> **CRITICAL BOWLING WARNING:**  
> **All ten V2 top-ranked bowlers have negative contextual runs-saved-per-six values.**  
> A negative value means the bowler conceded *more runs than expected* for the phase and wicket conditions. Their composite ranking is purely relative within role groups and does *not* establish positive absolute pressure performance. In addition, low reliability values exist (Mitchell Marsh: 0.36, Chris Jordan: 0.48, Shivang Kumar: 0.55).

---

## 4. Dedicated Virat Kohli Audit Case Study

- **Under Model V1:** 0 qualifying balls at fixed threshold $\ge 65$ (structural bias against openers).
- **Under Model V2:** 127 high-pressure legal balls across 34 matches (195 runs, strike rate 153.54, average 32.50, retention 105.15%).
- **V2 Candidate Status:** Qualified for candidate pool (Rank #95 / 112, Composite Score 35.01).
- **Analytical Takeaway:** Phase normalisation corrects the structural omission of openers, but empirical percentiles within the Opener group (moderate 38.58% dot-ball rate, 23.62% boundary rate) correctly rank him at #95 without manual distortion.

---

## 5. Threshold Sensitivity Analysis

### Model V2 Quantiles (Floor: 35)
| Quantile Cutoff | High-Pressure Deliveries | Share of Total Deliveries |
| :---: | :---: | :---: |
| **60th Percentile** | 20,940 | 23.88% |
| **65th Percentile** | 19,564 | 22.31% |
| **70th Percentile (Default V2)** | **17,592** | **20.07%** |
| **75th Percentile** | 15,577 | 17.77% |
| **80th Percentile** | 13,927 | 15.89% |

### Model V1 Absolute Thresholds
| Fixed Threshold | High-Pressure Deliveries | Share of Total Deliveries |
| :---: | :---: | :---: |
| **Score $\ge 60$** | 10,839 | 12.36% |
| **Score $\ge 65$ (Default V1)** | **6,799** | **7.75%** |
| **Score $\ge 70$** | 4,048 | 4.62% |

---

## 6. Project Architecture & File Inventory

```text
D:\Rajasthan Royals\
├── attached_data/                  # Preserved copies of all analytical source files
│   ├── v1_ipl_top10_batters.csv
│   ├── v1_ipl_top10_bowlers.csv
│   ├── v1_ipl_batter_rankings_all.csv
│   ├── v1_ipl_bowler_rankings_all.csv
│   ├── v1_ipl_results_summary.json
│   ├── v1_ipl_threshold_sensitivity.csv
│   ├── v1_IPL_results_methodology_and_limitations.md
│   ├── v2_top10_batters.csv
│   ├── v2_top10_bowlers.csv
│   ├── v2_batter_rankings_all.csv
│   ├── v2_bowler_rankings_all.csv
│   ├── v2_threshold_sensitivity.csv
│   ├── v2_validation_summary.json
│   ├── V2_methodology_and_limitations.md
│   └── V1_V2_Validation_Review.md
├── src/
│   ├── components/                 # Modular React 19 UI components
│   │   ├── Navbar.tsx              # Sticky header with multi-section tabs
│   │   ├── OverviewSection.tsx     # Section A: Executive overview & scope cards
│   │   ├── BatterLeaderboardSection.tsx # Section B: V2 & V1 Top 10 Batters
│   │   ├── BowlerLeaderboardSection.tsx # Section C: V2 & V1 Top 10 Bowlers + Warning
│   │   ├── CandidateExplorerSection.tsx # Section D: Full 112 Batters / 129 Bowlers
│   │   ├── ModelComparisonSection.tsx   # Section E: V1 vs V2 architectural comparison
│   │   ├── ViratKohliAuditSection.tsx   # Section F: Dedicated Kohli case study
│   │   ├── MethodologySection.tsx       # Section G: Technical methodology & formulas
│   │   ├── LimitationsSection.tsx       # Section H: Sensitivity, caveats & review
│   │   ├── PlayerDetailModal.tsx   # Granular modal for V1 & V2 players
│   │   └── Footer.tsx              # Footer with disclaimer & navigation
│   ├── data/
│   │   ├── superrr/                # Active data directory parsed by PapaParse
│   │   └── superrrLoader.ts        # Client-side data parser and loader
│   ├── types/
│   │   └── cricket.ts              # Full TypeScript interfaces for V1 and V2
│   ├── utils/
│   │   └── formatters.ts           # Number, percentage, and economy formatters
│   ├── tests/
│   │   └── dataIntegrity.test.ts   # 13 automated Vitest unit tests
│   ├── App.tsx                     # Main layout and view state controller
│   ├── index.css                   # Tailwind styling
│   └── main.tsx                    # React application entry point
├── BACKUP_MANIFEST.md              # Complete GitHub backup record
└── README.md                       # Comprehensive analytical report
```

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Startup
```powershell
# 1. Clone repository (or navigate to directory)
cd "D:\Rajasthan Royals"

# 2. Install dependencies
npm.cmd install

# 3. Run automated tests (13/13 passing)
npm.cmd test

# 4. Run linter (0 errors, 0 warnings)
npm.cmd run lint

# 5. Build for production (TypeScript + Vite)
npm.cmd run build

# 6. Start local development server
npm.cmd run dev
```

---

## 8. Git Branching & Version Control Status

- **Current Working Branch:** `feature/v2-dashboard`
- **GitHub Origin Default Branch:** `main` (Untouched)
- **GitHub Origin Backup Branch:** `backup/current-developed-version` (Committed at `a57937f`, untouched)
- **GitHub Push Status:** **No remote push performed.** All changes remain strictly on local branch `feature/v2-dashboard`.
