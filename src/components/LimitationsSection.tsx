import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  TrendingDown, 
  FileSearch,
  Sliders
} from 'lucide-react';

export const LimitationsSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Limitations, Model Sensitivity &amp; Validation Review
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Transparent analytical disclosure for the Rajasthan Royals technical panel. 
          Neither Model V1 nor Model V2 is claimed to be an infallible or fully validated truth. 
          The findings demonstrate how model specifications shape conclusions.
        </p>
      </div>

      {/* Grid of Key Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Limitation 1: Exploratory Nature */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>1. V2 Is Exploratory, Not Objectively Superior</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Sensitivity Alternative Rather Than Proven Upgrade
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            While Model V2 addresses V1’s inability to capture early-phase pressure, the comparison does 
            <strong> not establish that V2 is objectively superior</strong>. Both models present defensible perspectives, 
            and their 80% turnover (only 2 overlapping players in each discipline) underscores that rankings are 
            fundamentally sensitive to mathematical definitions rather than absolute underlying player quality.
          </p>
        </div>

        {/* Limitation 2: Negative Bowling Runs Saved */}
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>2. Critical Interpretability Failure in Bowling</span>
          </div>
          <h3 className="text-sm font-bold text-rose-950">
            All 10 Top Bowlers Conceded Above Contextual Baselines
          </h3>
          <p className="text-xs text-rose-900 leading-relaxed">
            All 10 V2 top-ranked bowlers have negative runs-saved-per-six values (from -0.08 to -4.21). 
            They conceded more runs than an average bowler in identical match states. 
            Their high rankings are an artifact of <strong>relative percentiles within phase cohorts</strong>, 
            not evidence of objective run containment. This remains a major interpretability caveat before adopting V2.
          </p>
        </div>

        {/* Limitation 3: Percentile Thresholds != Equal Difficulty */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>3. Percentile Balancing vs Psychological Reality</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Mathematical Balance Does Not Equal Real-World Difficulty
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Using phase-specific 70th percentile cutoffs ensures that 20% of deliveries in each phase are classified as pressure. 
            However, this mathematical balance does not prove that facing Jasprit Bumrah in the 19th over with 20 needed off 6 
            is psychologically or tactically equivalent to facing the 3rd over of a run chase with 2 wickets down.
          </p>
        </div>

        {/* Limitation 4: Role Approximations */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>4. Role Categorisation Approximations</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Median Order and Predominant Phase Blur Dynamics
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Median batting order simplifies dynamic tactical deployments (pinch hitters, floaters, injury shifts). 
            Similarly, predominant bowling phase obscures multi-phase bowlers (e.g., pacers who bowl 2 overs in the Powerplay 
            and 2 at the Death). An all-phase bowler assigned to Powerplay is evaluated against specialists.
          </p>
        </div>

        {/* Limitation 5: Low Sample Reliability */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" />
            <span>5. Persistent Low Sample Sizes</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Minimum Ball Filters Do Not Guarantee Stability
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Despite eligibility floors (24–30 balls), several top-ten bowlers possess low reliability coefficients: 
            <strong> Mitchell Marsh (0.36)</strong>, <strong>Chris Jordan (0.48)</strong>, and <strong>Shivang Kumar (0.55)</strong>. 
            One anomalous over can swing a player's composite score significantly at these sample levels.
          </p>
        </div>

        {/* Limitation 6: Unperformed Validation Checks */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
          <div className="flex items-center space-x-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
            <FileSearch className="w-4 h-4 text-pink-600" />
            <span>6. Required Next Steps Before Production Adoption</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Season-Level, Bootstrap, &amp; Extras Auditing Still Required
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Before deploying these models for franchise decision-making, the following checks remain necessary: 
            (a) Season-by-season rank stability to detect multi-year consistency; 
            (b) Leave-one-season-out cross-validation; 
            (c) Match-level bootstrap resampling; and 
            (d) Detailed audit of extras attribution (byes vs wides) and run-out credit in the raw feeds.
          </p>
        </div>
      </div>

      {/* Strategic Recommendation */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Analytical Recommendation for SuperRR Challenge Submission</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          We recommend submitting both <strong>Model V1 and Model V2 as dual sensitivity alternatives</strong>. 
          Transparently presenting both models, highlighting their low overlap, explaining the Virat Kohli case study, 
          and honestly reporting the negative bowling runs-saved values demonstrates far higher analytical maturity and sports science rigor 
          than pretending either single model is flawless.
        </p>
      </div>
    </div>
  );
};
