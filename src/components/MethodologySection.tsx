import React, { useState } from 'react';
import { 
  FileText, 
  Workflow, 
  Layers, 
  Compass, 
  Calculator, 
  Percent, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const pipelineSteps = [
    {
      step: 1,
      title: 'Ball-by-Ball Dataset',
      subtitle: '87,673 records',
      desc: 'Raw ball-level match events across 367 IPL fixtures from 2022 to 2026. Super-overs excluded to avoid small-sample distortion.',
    },
    {
      step: 2,
      title: 'Match-State Reconstruction',
      subtitle: 'Context variables',
      desc: 'Tracking innings, balls remaining, wickets fallen (0–2, 3–5, 6–9), current run rate, and target deficit on every delivery.',
    },
    {
      step: 3,
      title: 'Expected Scoring Baseline',
      subtitle: 'Empirical baselines',
      desc: 'Expected runs per legal ball partitioned by innings, match phase (Powerplay, Middle, Death), and wicket buckets with shrinkage smoothing.',
    },
    {
      step: 4,
      title: 'Pressure Classification',
      subtitle: 'Leverage index (0–100)',
      desc: 'Continuous situational intensity scale. Deliveries with leverage index ≥ 65 are classified as high-pressure match situations.',
    },
    {
      step: 5,
      title: 'Player Performance Metrics',
      subtitle: 'Observed vs expected',
      desc: 'Isolating high-pressure deliveries to compute strike rates, retention %, averages, contextual runs saved/6, and dot-ball ratios.',
    },
    {
      step: 6,
      title: 'Composite Ranking',
      subtitle: 'Weighted percentiles',
      desc: 'Combining candidate percentiles with empirical weights: Batters (25/25/15/10/25) & Bowlers (40/25/20/15).',
    },
    {
      step: 7,
      title: 'Top 10 Shortlist',
      subtitle: 'Shrinkage adjusted',
      desc: 'Applying Empirical Bayes reliability factor n / (n + 60) toward pool median 50 to prevent low-sample outliers from dominating.',
    },
  ];

  const methodologyPillars = [
    {
      id: 1,
      num: '01',
      title: 'Dataset Scope & Boundary Conditions',
      category: 'Data Foundation',
      summary: 'IPL 2022–2026 competitions encompassing 367 matches and 87,673 ball-by-ball delivery records.',
      details: 'The analysis evaluates contemporary T20 cricket in the expanded 10-team IPL era (2022–2026). Earlier IPL eras (pre-2022) had vastly different scoring baselines, tactical boundary expectations, and team compositions. This 5-season window captures modern batting tempos, impact-player evolution, and contemporary death-bowling dynamics.',
    },
    {
      id: 2,
      num: '02',
      title: 'IPL 2022–2026 Selection Rationale',
      category: 'Data Foundation',
      summary: 'Focusing on the modern franchise cycle to reflect current tactical baselines and meta.',
      details: 'Restricting the study to 2022–2026 ensures that match states reflect the 10-team structure, modern ground dimensions, and current batting strike rates. Earlier historical seasons would artificially depress expected baseline scoring rates, causing modern normal scoring to appear falsely heroic under pressure.',
    },
    {
      id: 3,
      num: '03',
      title: 'Exclusion of Super-Over Innings',
      category: 'Data Integrity',
      summary: 'All tie-breaker super-over innings are explicitly omitted from the analysis.',
      details: 'Super overs represent single-over, all-out boundary sprints with two wickets total, completely disconnecting delivery dynamics from regular 20-over tactical resource management. Including 6-ball super overs would introduce extreme statistical leverage and skew individual player averages and strike rates.',
    },
    {
      id: 4,
      num: '04',
      title: 'Match-State Reconstruction',
      category: 'State Modeling',
      summary: 'Dynamic state tracking for each ball: innings, phase, wickets down, current score, and target.',
      details: 'Every legal delivery is matched to its live match situation: Innings (1 or 2), Match Phase (Powerplay 1–6, Middle 7–15, Death 16–20), Wickets Lost bucket (0–2, 3–5, 6–9), balls remaining, and required run rate (for chases) or deficit below historical par (for 1st innings).',
    },
    {
      id: 5,
      num: '05',
      title: 'Expected Scoring Baselines',
      category: 'Empirical Modeling',
      summary: 'Empirical runs per legal ball partitioned across innings, phase, and wickets lost.',
      details: 'Expected runs per legal ball were estimated empirically from the full 87,673-delivery dataset across 18 discrete states (2 innings × 3 phases × 3 wicket buckets). Sparse sample cells (such as 8 wickets down in the powerplay) were mathematically smoothed toward the phase/innings global average to prevent unstable baseline artifacts.',
    },
    {
      id: 6,
      num: '06',
      title: 'Pressure-Score Construction: 1st Innings vs Chase',
      category: 'Leverage Metric',
      summary: 'Asymmetric formulation distinguishing defensive rebuilding from chasing scoreboard pressure.',
      details: 'In the 1st innings, pressure is high when late-phase overs arrive with multiple top-order wickets down, or when scoring has fallen substantially below expected par. In the 2nd innings (chase), pressure is governed by the Required Run Rate (RRR) exceeding expected phase rates, shrinking remaining balls, and dwindling batting resources.',
    },
    {
      id: 7,
      num: '07',
      title: 'High-Pressure Threshold (Index ≥ 65)',
      category: 'Leverage Metric',
      summary: 'Situations with computed leverage index ≥ 65 are classified as high pressure.',
      details: 'A leverage threshold of 65 was selected after evaluating 60, 65, and 70. Threshold 60 admits moderate-leverage deliveries, diluting clutch situations. Threshold 70 yields only 1,617 bowling deliveries across 367 matches, making bowler candidate pools statistically unviable. Threshold 65 provides 5,502 batting and 2,728 bowling high-pressure deliveries.',
    },
    {
      id: 8,
      num: '08',
      title: 'Batter Performance Metrics',
      category: 'Player Evaluation',
      summary: 'HP Strike Rate, HP Batting Average, Boundary Rate, Dot-Ball Rate, and Strike-Rate Retention.',
      details: 'Evaluates if a batter retains their scoring output when leverage escalates. Metrics include HP Runs, HP Balls, HP Dismissals, HP Strike Rate (runs/balls × 100), HP Average (runs/dismissals), Boundary % (boundaries/balls), Dot % (dots/balls), and Strike-Rate Retention % (HP SR / All SR × 100).',
    },
    {
      id: 9,
      num: '09',
      title: 'Bowler Performance Metrics',
      category: 'Player Evaluation',
      summary: 'Contextual Runs Saved per 6, Wickets per 100 balls, Dot-Ball %, and HP Economy.',
      details: 'Measures how effectively a bowler contains scoring and strikes under intense match leverage. Key metrics: HP Economy (runs conceded / legal overs), Contextual Expected Economy (hp_exp_runs / legal overs), Runs Saved per 6 ((Expected Runs - Conceded Runs) / Legal Balls × 6), Wickets per 100 Balls, and Dot %.',
    },
    {
      id: 10,
      num: '10',
      title: 'Candidate Eligibility Screening Criteria',
      category: 'Sample Eligibility',
      summary: 'Strict minimum volume thresholds to screen out fleeting appearances.',
      details: 'Batters: ≥100 total balls, ≥20 high-pressure balls, participation in ≥4 high-pressure matches, median batting order ≤ 7, and a defined pressure average (at least 1 dismissal in pressure states). Bowlers: ≥60 total legal balls, ≥24 high-pressure legal balls, and participation in ≥4 high-pressure matches. Resulted in 37 eligible batters and 32 eligible bowlers.',
    },
    {
      id: 11,
      num: '11',
      title: 'Composite Ranking Formulation & Weights',
      category: 'Scoring Formula',
      summary: 'Exact weights applied to within-pool percentiles for both roles.',
      details: 'Batter Composite Score = 0.25 × p(HP SR) + 0.25 × p(HP Avg) + 0.15 × p(Boundary %) + 0.10 × p(1 - Dot %) + 0.25 × p(SR Retention). Bowler Composite Score = 0.40 × p(Runs Saved per 6) + 0.25 × p(Wickets / 100b) + 0.20 × p(Dot %) + 0.15 × p(1 / HP Econ). Percentiles are ranked relative to eligible candidates.',
    },
    {
      id: 12,
      num: '12',
      title: 'Reliability Adjustment (Empirical Bayes Shrinkage)',
      category: 'Statistical Rigor',
      summary: 'Score = 50 + (RawScore - 50) × [n / (n + 60)] toward pool median 50.',
      details: 'A player with only 20 or 24 high-pressure balls exhibits extreme variance. To prevent small sample sizes from dominating top ranks, raw composite percentile scores are shrunk toward the pool median (50) using the factor n / (n + 60), where n is the number of high-pressure legal balls faced or bowled. Players with larger sample sizes retain greater weight.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-blue-700 mb-2">
          <Workflow className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Analytical Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Methodology & Pressure Model Construction
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          The Unstop SuperRR challenge evaluates analytical thinking and transparent methodology. This section details the complete analytical pipeline from raw ball-by-ball IPL records to the final reliability-shrunk ranking composite.
        </p>
      </div>

      {/* Visual Process Pipeline */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-6 text-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base uppercase tracking-wider text-white">
              End-to-End Analytical Pipeline
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Step {activeStep} of {pipelineSteps.length}
          </span>
        </div>

        {/* Process Flow Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {pipelineSteps.map((s) => {
            const isCurrent = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-3 rounded text-left transition-all border ${
                  isCurrent
                    ? 'bg-blue-600/90 border-blue-400 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold px-1.5 py-0.2 rounded ${
                    isCurrent ? 'bg-blue-800 text-blue-200' : 'bg-slate-700 text-slate-400'
                  }`}>
                    0{s.step}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">{s.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{s.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        {(() => {
          const current = pipelineSteps.find((s) => s.step === activeStep) || pipelineSteps[0];
          return (
            <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-5">
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 font-mono font-bold text-xs flex items-center justify-center border border-blue-500/40">
                  {current.step}
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">{current.title}</h4>
                  <span className="text-xs font-mono text-pink-400">{current.subtitle}</span>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                {current.desc}
              </p>
            </div>
          );
        })()}
      </div>

      {/* Pressure Construction: 1st Innings vs 2nd Innings Run Chase */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Compass className="w-5 h-5 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            Innings-Specific Pressure Mechanics
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <h4 className="font-bold text-slate-900 text-sm">1st Innings (Setting Target)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In the first innings, there is no fixed target score. Pressure is defined as a function of:
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>Phase Intensity:</strong> Overs 17–20 (death overs) demand maximal acceleration.</li>
              <li><strong>Resource Scarcity:</strong> Loss of 3+ top-order wickets creates rebuilding tension.</li>
              <li><strong>Scoring Deficit:</strong> Team scoring rate trending significantly below historical par for that venue/phase.</li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-pink-600"></span>
              <h4 className="font-bold text-slate-900 text-sm">2nd Innings (The Run Chase)</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In run chases, pressure is deterministic and acute, calculated directly via:
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>Required Run Rate (RRR):</strong> Rate demanded per 6 legal balls relative to expected baseline.</li>
              <li><strong>Balls Remaining:</strong> Shrinking delivery budget magnifies penalty for dot balls.</li>
              <li><strong>Wickets in Hand:</strong> Tail-end exposure sharply increases dismissal penalty.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Component Weights & Mathematical Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Batter Formula */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-pink-600" />
              <span>Batter Composite Formulation</span>
            </h4>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-pink-50 text-pink-700 rounded border border-pink-200">
              5 Parameters
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-slate-100 rounded font-mono text-xs overflow-x-auto custom-scrollbar">
            <code>
              Score = 0.25·p(HP_SR) + 0.25·p(HP_Avg) + 0.15·p(Boundary%) + 0.10·p(1 - Dot%) + 0.25·p(SR_Retention)
            </code>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Weight Breakdown:</div>
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              <div className="bg-blue-50 border border-blue-200 rounded p-1.5">
                <div className="font-bold text-blue-900 font-mono">25%</div>
                <div className="text-[10px] text-slate-500">HP SR</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-1.5">
                <div className="font-bold text-blue-900 font-mono">25%</div>
                <div className="text-[10px] text-slate-500">HP Avg</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-1.5">
                <div className="font-bold text-slate-800 font-mono">15%</div>
                <div className="text-[10px] text-slate-500">Boundary%</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-1.5">
                <div className="font-bold text-slate-800 font-mono">10%</div>
                <div className="text-[10px] text-slate-500">1 - Dot%</div>
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded p-1.5">
                <div className="font-bold text-pink-900 font-mono">25%</div>
                <div className="text-[10px] text-slate-500">SR Ret%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bowler Formula */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-700" />
              <span>Bowler Composite Formulation</span>
            </h4>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
              4 Parameters
            </span>
          </div>

          <div className="p-3 bg-slate-900 text-slate-100 rounded font-mono text-xs overflow-x-auto custom-scrollbar">
            <code>
              Score = 0.40·p(Runs_Saved/6) + 0.25·p(Wkts/100b) + 0.20·p(Dot%) + 0.15·p(1 / HP_Econ)
            </code>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Weight Breakdown:</div>
            <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
              <div className="bg-blue-100 border border-blue-300 rounded p-1.5">
                <div className="font-bold text-blue-900 font-mono">40%</div>
                <div className="text-[10px] text-slate-600">Saved/6</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-1.5">
                <div className="font-bold text-blue-900 font-mono">25%</div>
                <div className="text-[10px] text-slate-500">Wkts/100b</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-1.5">
                <div className="font-bold text-slate-800 font-mono">20%</div>
                <div className="text-[10px] text-slate-500">Dot %</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded p-1.5">
                <div className="font-bold text-slate-800 font-mono">15%</div>
                <div className="text-[10px] text-slate-500">1 / Econ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reliability Adjustment (Empirical Bayes Shrinkage) Explanation Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Percent className="w-5 h-5 text-blue-700" />
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            Reliability Adjustment: Empirical Bayes Shrinkage
          </h3>
        </div>
        <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
          <p>
            In sports analytics, ranking by raw small-sample percentages leads to the classic <strong>small-sample fallacy</strong> (e.g., a batter who hit 1 six off 2 balls having a 300 strike rate).
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded font-mono text-xs text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <strong>Shrunk Score Formula:</strong>
              <div className="text-sm font-bold text-blue-800 mt-1">
                Final Score = 50 + (Raw Composite Score - 50) × [ n / (n + 60) ]
              </div>
            </div>
            <div className="text-xs text-slate-500 text-right">
              where <em>n</em> = high-pressure legal balls faced or bowled
            </div>
          </div>
          <p className="text-xs text-slate-600">
            The prior is set to 50 (the candidate pool median). As sample volume <em>n</em> increases, the shrinkage multiplier approaches 1.0, preserving the observed score. For smaller sample sizes (e.g. <em>n = 24</em>), the score is pulled substantially toward 50, rewarding sustained multi-match consistency over fleeting variance.
          </p>
        </div>
      </div>

      {/* 12 Detailed Methodology Pillars Accordion */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Complete 12-Pillar Methodology Reference
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Click to expand any pillar</span>
        </div>

        <div className="divide-y divide-slate-100">
          {methodologyPillars.map((pillar) => {
            const isExpanded = expandedPillar === pillar.id;
            return (
              <div key={pillar.id} className="py-3">
                <button
                  onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {pillar.num}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                        {pillar.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors inline">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-700 transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="mt-3 pl-11 pr-4 py-3 bg-slate-50/80 rounded border border-slate-200/60 text-xs sm:text-sm text-slate-700 space-y-2">
                    <p className="font-semibold text-slate-900">{pillar.summary}</p>
                    <p className="text-slate-600 leading-relaxed">{pillar.details}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
