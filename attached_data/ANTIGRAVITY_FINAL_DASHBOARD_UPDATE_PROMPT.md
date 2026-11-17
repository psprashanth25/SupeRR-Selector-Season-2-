# SUPER RR — FINAL ANALYTICS DASHBOARD UPDATE (SINGLE MASTER PROMPT)

You are a senior sports analytics product designer and React/TypeScript engineer. Update my existing SuperRR dashboard using the attached final submission package. Do not start a new project unless the existing one is unusable.

## Files and data hierarchy
The package includes:
- Model V2: `v2_top10_batters.csv`, `v2_top10_bowlers.csv`, `v2_batter_rankings_all.csv`, `v2_bowler_rankings_all.csv`, `v2_threshold_sensitivity.csv`, `v2_validation_summary.json`, `V2_methodology_and_limitations.md`
- Model V1 comparison files prefixed with `v1_`
- `V1_V2_Validation_Review.md`

Use the V2 files as the primary exploratory shortlist and V1 files for a transparent model-comparison section. Never merge the two rankings or mix metrics across models. The V2 model is NOT proven objectively superior or fully validated. Label it “Alternative context-normalised model (exploratory)”. Label V1 “Original fixed-threshold model”.

## Analytical decisions that must be visible
1. Scope: IPL 2022–2026; 367 matches; 87,673 ball-by-ball rows; innings 1 and 2.
2. V1 uses fixed pressure threshold 65.
3. V2 uses phase- and innings-specific 70th percentile cutoffs with floor 35; pressure sample is 17,592 deliveries (20.07%). Sensitivity: 60th = 20,940 (23.88%); 65th = 19,564 (22.31%); 75th = 15,577 (17.77%); 80th = 13,927 (15.89%).
4. V2 batter role approximations: opener (median batting order 1–2), middle (3–5), finisher (6–7).
5. V2 bowler role approximations: predominant phase of legal deliveries.
6. V2 eligibility pools: 112 batters and 129 bowlers. V1 pools: 37 batters and 32 bowlers.
7. V1/V2 Top 10 overlap: 2 batters (Krunal Pandya, Shahbaz Ahmed), 2 bowlers (Mukesh Kumar, Shahbaz Ahmed). Low overlap demonstrates model sensitivity, not that one model is correct.
8. Virat Kohli: V2 eligible opener, 127 high-pressure legal balls across 34 matches, 195 runs, SR 153.54, average 32.5, overall SR 146.03, retention 105.15%; V2 score 35.01, not top 10. Do not manually insert him.
9. All 10 V2 top bowlers have negative contextual runs-saved-per-six. Explicitly display this warning. Their composite scores are relative within role groups and do not prove positive absolute pressure bowling.
10. V2 low reliability examples include Mitchell Marsh 0.36, Chris Jordan 0.48, Shivang Kumar 0.55. Show reliability and sample sizes.

## Required dashboard sections
- Executive overview with scope and KPI values from source JSON.
- V2 Top 10 batters leaderboard.
- V2 Top 10 bowlers leaderboard.
- V2 full candidate explorer.
- Pressure methodology and role normalisation explanation.
- V1 vs V2 comparison, overlap and sensitivity.
- Virat Kohli audit as a case study in model sensitivity, not as a forced selection.
- Bowling absolute-performance warning.
- Limitations and validation still required.

## Data integrity
- Use exact names and numbers from the supplied files.
- Do not invent, change, recalculate, or manually insert players into supplied rankings.
- Keep V1 and V2 results separate.
- Never describe V2 as validated or objectively fairer.
- Do not describe a negative runs-saved value as a positive result.
- Make all rankings explicitly exploratory.
- No auction recommendation, retention advice, availability filtering or retirement filtering.

## Visual design
Create a restrained, polished cricket analytics publication:
- Deep navy, royal blue, subtle pink accent, white/neutral surfaces.
- Editorial typography, generous spacing, crisp tables and legible charts.
- Professional data visualisation; mobile responsive.
- Avoid generic AI dashboard styling: no glassmorphism, neon, glowing gradients, random icons/emojis, fake player photos, decorative clutter, AI branding, or exaggerated marketing language.
- No official Rajasthan Royals logo or implied endorsement.

## Implementation
Inspect the existing project first. Preserve its stack and conventions. Add data files to an appropriate local data folder. Build reusable React/TypeScript components. Make search, sorting, tabs and player details functional. Provide CSV export if practical. Do not overwrite unrelated files. Run available type checks, tests and production build; report only commands actually run.

## Completion
Update the working dashboard, do not merely describe how. At the end list changed files, data checks, tests/build status, remaining analytical limitations, and exact local run command.