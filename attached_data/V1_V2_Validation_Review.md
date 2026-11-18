# SuperRR V1 vs V2 validation review

## Executive decision
Do not silently replace V1 with V2 yet. V2 is a useful alternative sensitivity model and addresses a real limitation of V1, but the current comparison does not establish that V2 is objectively superior. Keep both model outputs available and label V2 as an alternative model until match-level and season-level validation is completed.

## What the comparison establishes
- V1 and V2 use the same supplied IPL 2022–2026 dataset scope (367 matches, 87,673 delivery rows, innings 1 and 2).
- V1 uses a fixed high-pressure score threshold of 65.
- V2 uses phase- and innings-specific pressure cutoffs based on the 70th percentile, with a floor of 35.
- V2's 70th-percentile setting classifies 17,592 deliveries (20.07%) as high pressure. Sensitivity: 60th percentile = 20,940 (23.88%); 65th = 19,564 (22.31%); 75th = 15,577 (17.77%); 80th = 13,927 (15.89%).
- V2 batter roles are approximated by median batting position: opener (1–2), middle (3–5), finisher (6–7).
- V2 bowler roles are approximated by predominant phase of legal deliveries.
- V2 candidate pool: 112 batters and 129 bowlers. V1 candidate pool was 37 batters and 32 bowlers.
- Only 2 names overlap between the V1 and V2 batter top tens: Krunal Pandya and Shahbaz Ahmed.
- Only 2 names overlap between the V1 and V2 bowler top tens: Mukesh Kumar and Shahbaz Ahmed.
- The low overlap means rankings are highly sensitive to model specification. It is not evidence by itself that either model is correct.

## Virat Kohli audit
Under V2, Virat Kohli is classified as an opener and has 127 high-pressure legal balls across 34 matches; 195 runs; strike rate 153.54; average 32.5; overall strike rate 146.03; retention 105.15%. He is eligible for the V2 pool but his V2 role-normalised score is 35.01 and he is not in the V2 top ten. This is a legitimate outcome; do not manually add him.

Under V1, Kohli had no qualifying deliveries at the fixed threshold of 65 (as recorded in the prior audit). V2's more inclusive phase-normalised threshold changes his pressure sample substantially. This is evidence that V1's single fixed cutoff is sensitive to phase/context.

## Bowler top-ten warning
All ten V2 bowlers have negative contextual runs-saved-per-six values:
- Shahbaz Ahmed: -2.26
- Romario Shepherd: -4.21
- Shivang Kumar: -3.61
- Washington Sundar: -1.53
- Ishant Sharma: -2.40
- Avesh Khan: -0.08
- Mukesh Kumar: -2.59
- Mayank Markande: -1.88
- Chris Jordan: -0.87
- Mitchell Marsh: -3.86

Therefore, V2's bowler composite is a relative score within role groups, not evidence that these players saved runs against expected conditions. This is a serious interpretability limitation. The final dashboard must show the negative values and avoid calling these bowlers objectively excellent under pressure.

## Important methodological concerns
1. Role groups are approximations. A batter's median position can hide role changes; a bowler's predominant phase can hide multi-phase responsibilities.
2. V2 pressure thresholds are phase/innings-specific percentiles. This balances the volume of classified pressure situations but does not prove equal difficulty across contexts.
3. Candidate pools differ sharply (37 to 112 batters; 32 to 129 bowlers), so rank shifts are partly driven by eligibility and pressure-sample definition.
4. V2 bowler top-ten includes low reliability values (e.g. Mitchell Marsh 0.36, Chris Jordan 0.48, Shivang Kumar 0.55). Minimum balls/matches alone do not guarantee stable rankings.
5. A relative percentile composite can produce high ranks even when absolute contextual performance is negative. This is especially problematic for the bowler list.
6. Need season-by-season rank stability, match-level bootstrap or leave-one-season-out validation, and a careful audit of extras/wicket attribution before claiming a final validated model.

## Recommended decision for submission
- Use V2 as the primary *candidate exploration* model only if clearly labelled exploratory.
- Do not claim V2 is validated or objectively fairer.
- Do not manually force famous or retired players into lists.
- Before selecting the final Top 10, run a season-level stability check and consider making absolute contextual runs prevented the primary bowler performance criterion, with role-normalised percentiles only as a secondary descriptor.
- If time does not permit further validation, present V1 and V2 as sensitivity alternatives and explicitly explain why the rankings differ. This is more defensible than hiding model sensitivity.
