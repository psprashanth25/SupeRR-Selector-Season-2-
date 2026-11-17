# SuperRR Model V2 — Alternative Context-Normalised Pressure Model

## Scope
IPL 2022–2026 competitions in the supplied dataset; innings 1 and 2 only. This alternative model uses 367 IPL matches and 87,673 delivery rows.

## Pressure classification
Pressure is assessed using information available before each delivery:
- Innings phase: Powerplay (overs 1–6), Middle (7–15), Death (16–20).
- Wickets already lost.
- First-innings scoring below empirical expected scoring for the innings/phase/wicket band, or second-innings required run rate above the contextual expected rate.

Expected scoring baselines are estimated from IPL deliveries by innings, phase and wickets-lost band, with smoothing toward the innings/phase parent average. A phase- and innings-specific 70th percentile pressure-score cutoff is applied, with a floor of 35. This is intended to avoid one fixed absolute cutoff treating every phase identically.

## Batter comparison
Batters are grouped using median batting order: opener (1–2), middle order (3–5), finisher (6–7). Performance metrics include pressure strike rate, pressure average, boundary rate, dot-ball rate and pressure strike-rate retention. Percentile scores are calculated within the role group and shrunk toward 50 according to pressure-ball sample size: n/(n+60).

Eligibility: at least 100 overall legal balls, 30 high-pressure legal balls, 4 high-pressure matches, and median batting order no later than 7.

## Bowler comparison
Bowlers are grouped by their predominant phase of legal deliveries (Powerplay, Middle, Death). Metrics include contextual runs saved per six legal balls, wickets per 100 pressure legal balls, dot-ball rate and inverse pressure economy. Percentile scores are calculated within predominant-phase group and shrunk toward 50 using n/(n+60).

Eligibility: at least 60 overall legal balls, 24 high-pressure legal balls and 4 high-pressure matches. Bowler-conceded runs exclude byes and leg-byes; run-outs, retired dismissals and obstructing-the-field are excluded from bowler wickets.

## Virat Kohli audit
Virat Kohli now has 127 high-pressure legal batting balls across 34 matches under this alternative pressure classification. He is eligible for the V2 candidate pool, but his role-normalised composite score does not place him in the current V2 top 10. This demonstrates why we should investigate the pressure definition rather than manually insert a famous player.

## Critical limitations
- V2 is an alternative sensitivity model, not yet proven superior to V1.
- Percentile-based pressure cutoffs balance pressure selection across phases but do not prove equal real-world difficulty.
- Median batting order and predominant bowling phase are approximations of player roles.
- Composite scores are relative, not probabilities.
- Negative runs-saved-per-six values must remain visible; they indicate conceding above contextual expected runs.
- Before submission, inspect match-level stability, season stability, threshold sensitivity, and the original extras/dismissal data dictionary.

## Recommendation
Compare V1 and V2 on ranking stability, role fairness, sample size, and interpretability. Adopt V2 only if it demonstrates a meaningful improvement; otherwise retain V1 and disclose its limitations.
