# SuperRR Selector Season 2 — Pressure Performance Analytics Dashboard
> **Analytical Presentation for Rajasthan Royals** | *Unstop Challenge: SuperRR Selector Season 2 – Round 1*  
> **Current Version:** V1 Developed Baseline  
> **Backup Branch:** `backup/current-developed-version`

---

## 1. Project Objective & Scope

This project is an advanced, transparent sports analytics study designed to evaluate historical player performance under high-pressure match situations across the modern Indian Premier League (IPL 2022–2026).

### Primary Challenge Objective
- Identify the **Top 10 Batters** performing best under pressure.
- Identify the **Top 10 Bowlers** performing best under pressure.
- Formulate a transparent, cricket-sound statistical definition of **situational pressure**.
- Establish candidate eligibility filters to avoid fleeting sample biases.
- Design an explainable multi-component composite ranking formula with **Empirical Bayes shrinkage**.
- Present the findings honestly through a professional, interactive React/TypeScript analytics dashboard.

> **Important Analytical Scope Notice:**  
> This project is strictly a historical pressure-performance evaluation. It is **NOT** an auction purchasing strategy, player-retention roadmap, or bidding recommendation. Historical players who qualify under empirical criteria (such as Kieron Pollard) remain preserved in the dataset to maintain data integrity.

---

## 2. Current V1 Methodology & Pressure Scoring Model

The V1 pressure model processes **367 matches** and **87,673 ball-by-ball delivery records** (2022–2026), excluding super-over innings to prevent 6-ball sample distortion.

### A. Match-State Reconstruction & Expected Scoring Baselines
Every delivery is dynamically mapped to its live match context across 18 discrete states:
- **Innings:** 1st Innings (Setting Target) vs. 2nd Innings (The Run Chase).
- **Match Phase:** Powerplay (Overs 1–6), Middle Overs (Overs 7–15), Death Overs (Overs 16–20).
- **Wicket Depletion Buckets:** 0–2 wickets down, 3–5 wickets down, 6–9 wickets down.

Expected runs per legal delivery were empirically calculated across the dataset. Sparse cells were smoothed toward the phase/innings global average to prevent baseline noise.

### B. Situational Pressure Classification ($\text{Index} \ge 65$)
- **1st Innings Pressure:** Driven by death overs (Overs 17–20), top-order collapses (3+ wickets lost), or team scoring rates trending significantly below par.
- **2nd Innings Pressure:** Governed by escalating Required Run Rate (RRR) relative to expected baseline, dwindling remaining balls, and exposed tail-end resources.
- **High-Pressure Cutoff:** Deliveries with a leverage index $\ge 65$ are classified as high pressure ($5,502$ batting and $2,728$ bowling deliveries).

### C. Candidate Eligibility Screening Filters
- **Batters:** $\ge 100$ total balls, $\ge 20$ high-pressure balls, participation in $\ge 4$ high-pressure matches, median batting order $\le 7$, and a defined pressure batting average ($37$ qualifiers).
- **Bowlers:** $\ge 60$ total legal balls, $\ge 24$ high-pressure legal balls, and participation in $\ge 4$ high-pressure matches ($32$ qualifiers).

### D. Composite Ranking Formulation & Component Weights
Percentiles are computed within the eligible candidate pool:

#### Batter Composite Formula:
$$\text{Raw Batter Score} = 0.25 \cdot p(\text{HP\_SR}) + 0.25 \cdot p(\text{HP\_Avg}) + 0.15 \cdot p(\text{Boundary\%}) + 0.10 \cdot p(1 - \text{Dot\%}) + 0.25 \cdot p(\text{SR\_Retention})$$

#### Bowler Composite Formula:
$$\text{Raw Bowler Score} = 0.40 \cdot p(\text{Runs\_Saved/6}) + 0.25 \cdot p(\text{Wkts/100b}) + 0.20 \cdot p(\text{Dot\%}) + 0.15 \cdot p(1 / \text{HP\_Econ})$$

### E. Reliability Adjustment (Empirical Bayes Shrinkage)
To protect against small-sample variance, raw percentile scores are regressed toward the candidate pool median ($50$):
$$\text{Final Composite Score} = 50 + (\text{Raw Score} - 50) \times \left[ \frac{n}{n + 60} \right]$$
*where $n$ is the number of high-pressure legal balls faced (batters) or bowled (bowlers).*

---

## 3. Current V1 Rankings & Analytical Deliverables

### Top 10 Batters Under Pressure (V1 Model)
| Rank | Player Name | Composite Score | HP Runs (Balls) | HP Strike Rate | All SR | SR Retention | HP Average | Boundary % | Dot % | Matches |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **#1** | **Abdul Samad** | **72.59** | 131 (101b) | 129.70 | 149.76 | 86.60% | 21.83 | 14.85% | 37.62% | 8 |
| **#2** | **Krunal Pandya** | **71.20** | 64 (55b) | 116.36 | 127.90 | 90.98% | 10.67 | 14.55% | 36.36% | 8 |
| **#3** | **Lalit Yadav** | **67.44** | 62 (52b) | 119.23 | 109.22 | 109.17% | 8.86 | 17.31% | 48.08% | 7 |
| **#4** | **Axar Patel** | **65.36** | 126 (86b) | 146.51 | 141.82 | 103.31% | 15.75 | 16.28% | 27.91% | 12 |
| **#5** | **Kieron Pollard** | **65.00** | 43 (37b) | 116.22 | 107.46 | 108.15% | 10.75 | 16.22% | 48.65% | 4 |
| **#6** | **Andre Russell** | **64.25** | 73 (47b) | 155.32 | 166.84 | 93.09% | 12.17 | 23.40% | 44.68% | 7 |
| **#7** | **Romario Shepherd** | **64.22** | 49 (34b) | 144.12 | 175.16 | 82.28% | 12.25 | 17.65% | 44.12% | 6 |
| **#8** | **Shahbaz Ahmed** | **61.08** | 61 (46b) | 132.61 | 124.83 | 106.23% | 20.33 | 10.87% | 26.09% | 6 |
| **#9** | **Rovman Powell** | **60.89** | 135 (85b) | 158.82 | 142.31 | 111.61% | 22.50 | 20.00% | 36.47% | 10 |
| **#10** | **Suryakumar Yadav** | **57.55** | 32 (20b) | 160.00 | 164.95 | 97.00% | 6.40 | 25.00% | 35.00% | 7 |

---

### Top 10 Bowlers Under Pressure (V1 Model)
> **Critical Analytical Finding:**  
> All 10 top bowlers conceded more runs than the model's empirical expected baseline in the pressure subset (runs saved per 6 balls ranges from $-1.54$ to $-5.21$). High composite ranks reflect *relative* damage mitigation within the screened pool, not absolute scoring denial.

| Rank | Player Name | Composite Score | HP Conceded (Balls) | HP Economy | Expected Econ | Runs Saved / 6 | HP Wickets | Dot % | Matches |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **#1** | **Mukesh Kumar** | **65.46** | 92 (43b) | 12.84 | 8.90 | -3.94 | 0 (0.0/100) | 27.91% | 9 |
| **#2** | **Jasprit Bumrah** | **63.02** | 111 (62b) | 10.74 | 8.97 | -1.77 | 0 (0.0/100) | 30.65% | 6 |
| **#3** | **Deepak Chahar** | **61.80** | 87 (35b) | 14.91 | 9.70 | -5.21 | 2 (5.7/100) | 25.71% | 7 |
| **#4** | **Shardul Thakur** | **61.21** | 81 (38b) | 12.79 | 9.76 | -3.03 | 1 (2.6/100) | 26.32% | 7 |
| **#5** | **Harshal Patel** | **60.98** | 84 (32b) | 15.75 | 10.60 | -5.15 | 2 (6.3/100) | 15.62% | 6 |
| **#6** | **Marco Jansen** | **59.13** | 91 (41b) | 13.32 | 9.10 | -4.22 | 1 (2.4/100) | 39.02% | 7 |
| **#7** | **Shahbaz Ahmed** | **57.10** | 55 (24b) | 13.75 | 8.72 | -5.03 | 2 (8.3/100) | 20.83% | 4 |
| **#8** | **T Natarajan** | **56.88** | 66 (33b) | 12.00 | 10.05 | -1.95 | 1 (3.0/100) | 33.33% | 7 |
| **#9** | **Arshdeep Singh** | **56.81** | 109 (57b) | 11.47 | 9.79 | -1.68 | 1 (1.8/100) | 45.61% | 18 |
| **#10** | **Auqib Nabi** | **56.42** | 51 (26b) | 11.77 | 10.22 | -1.54 | 0 (0.0/100) | 34.62% | 4 |

---

## 4. Analytics Dashboard Architecture

The dashboard is built as an interactive React/TypeScript single-page analytics application:

- **Technology Stack:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, PapaParse, Vitest.
- **Design Philosophy:** Restrained Rajasthan Royals color palette (Deep Navy `#0a1128`, Royal Blue `#1d4ed8`, subtle Pink accents `#d91b5c`, slate neutrals). Editorial typography, tabular numbers, clear dividers, no generic AI tropes.

### Dashboard Sections
1. **Overview:** Dynamic KPIs directly parsed from `ipl_results_summary.json`, executive summary, and top 5 previews.
2. **Methodology:** 7-step process diagram, 12 expandable methodology pillars, and formula cards.
3. **Top 10 Batters:** Interactive leaderboard, sorting, search, horizontal benchmark charts, and metric definitions.
4. **Top 10 Bowlers:** Leaderboard with prominent Analytical Warning Banner, side-by-side economy comparison charts, and negative runs-saved explanations.
5. **Candidate Explorer:** Tabbed views for all 37 qualified batters and 32 qualified bowlers, with search, multi-column sorting, and CSV export.
6. **Threshold Sensitivity:** Dual-bar delivery volume comparisons across thresholds 60, 65, and 70, detailing sample drop-off trade-offs.
7. **Limitations:** 8 detailed methodological constraints and pre-submission validation checklist.
8. **Conclusion:** Executive analytical synthesis of model findings.
9. **Player Detail Modal:** Generates an accurate factual breakdown from exact numbers when clicking any player across the dataset.

---

## 5. Directory Structure

```
d:\Rajasthan Royals\
├── attached_data\                               # Original source files preserved
│   ├── ipl_results_summary.json                 # Dataset summary & top 10 previews
│   ├── IPL_results_methodology_and_limitations.md # V1 methodology & caution note
│   ├── ipl_top10_batters.csv                    # Top 10 batters CSV
│   ├── ipl_top10_bowlers.csv                    # Top 10 bowlers CSV
│   ├── ipl_batter_rankings_all.csv              # 37 candidate batters CSV
│   ├── ipl_bowler_rankings_all.csv              # 32 candidate bowlers CSV
│   └── ipl_threshold_sensitivity.csv           # Threshold sensitivity observations
├── src\
│   ├── data\
│   │   ├── superrr\                             # Active application dataset copies
│   │   └── superrrLoader.ts                     # Dynamic PapaParse CSV/JSON loader
│   ├── components\
│   │   ├── Navbar.tsx                           # Top navigation with mobile drawer
│   │   ├── OverviewSection.tsx                  # SECTION A: Dashboard Overview
│   │   ├── MethodologySection.tsx               # SECTION B: 12-Pillar Methodology
│   │   ├── BatterLeaderboardSection.tsx         # SECTION C: Top 10 Batters
│   │   ├── BowlerLeaderboardSection.tsx         # SECTION D: Top 10 Bowlers
│   │   ├── CandidateExplorerSection.tsx         # SECTION E: Full Candidate Explorer
│   │   ├── ThresholdSensitivitySection.tsx      # SECTION F: Threshold Sensitivity
│   │   ├── LimitationsSection.tsx               # SECTION G: Limitations & Boundaries
│   │   ├── ConclusionSection.tsx                # SECTION H: Analytical Conclusion
│   │   ├── PlayerDetailModal.tsx                # Factual player detail inspection modal
│   │   └── Footer.tsx                           # Footer with competition disclaimer
│   ├── types\
│   │   └── cricket.ts                           # TypeScript interfaces
│   ├── utils\
│   │   └── formatters.ts                        # Precision stat formatters
│   ├── tests\
│   │   └── dataIntegrity.test.ts                # 8 automated data verification tests
│   ├── App.tsx                                  # Root dashboard controller
│   ├── index.css                                # Tailwind directives & custom scrollbars
│   ├── main.tsx                                 # Application entry point
│   └── vite-env.d.ts                            # Module declarations
├── index.html                                   # Inter & JetBrains Mono typography
├── package.json                                 # Project dependencies & scripts
├── tailwind.config.js                           # Rajasthan Royals color configuration
├── vite.config.ts                               # Vite configuration
└── BACKUP_MANIFEST.md                          # Comprehensive backup manifest
```

---

## 6. How to Run the Project Locally

### 1. Install Dependencies
```powershell
npm.cmd install
```

### 2. Start Vite Development Server
```powershell
npm.cmd run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Run Automated Tests
```powershell
npm.cmd test
```

### 4. Create Production Build
```powershell
npm.cmd run build
npm.cmd run preview
```

---

## 7. How to Restore or Recover this Backup

This project state is permanently preserved on GitHub in the dedicated backup branch:  
**`backup/current-developed-version`**

### To Inspect / Switch to the Backup Branch
```bash
git fetch origin
git switch backup/current-developed-version
```

### To Create a Separate Recovery Branch (Safe Isolation)
```bash
git fetch origin
git switch -c recovery/from-current-v1-backup backup/current-developed-version
```

> **Note:** Never overwrite `main` merely to recover or inspect past files. Use a dedicated recovery branch.
