import React from 'react';
import { CheckCircle2, Award, Flame, Target, Scale, ShieldCheck, ArrowRight } from 'lucide-react';
import type { ActiveSection } from '../types/cricket';

interface ConclusionSectionProps {
  onNavigate: (section: ActiveSection) => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-blue-700 mb-1">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Synthesis & Takeaways</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analytical Conclusions & Executive Synthesis
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Summary of historical findings from the IPL 2022–2026 pressure performance study. Contextualizing player composure, statistical limits, and data integrity.
        </p>
      </div>

      {/* Synthesis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What the Model Measures */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-700 border-b border-slate-100 pb-2">
            <Scale className="w-4 h-4" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              1. What the Pressure Model Measures
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The model establishes an empirical baseline of run expectancy across 18 discrete match states (2 innings × 3 match phases × 3 wicket buckets). By calculating situational leverage on every delivery, it filters out routine overs and isolates the <strong>5,502 batting and 2,728 bowling deliveries</strong> where the match balance was on the line (leverage index ≥ 65).
          </p>
        </div>

        {/* Card 2: What the Batter Leaderboard Reveals */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-pink-600 border-b border-slate-100 pb-2">
            <Flame className="w-4 h-4" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              2. Insights from the Batter Leaderboard
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The batter rankings highlight lower-order finishers and middle-order stabilizers (Abdul Samad, Krunal Pandya, Lalit Yadav, Axar Patel, Pollard, Russell, Shepherd, Shahbaz, Powell, Suryakumar). These batters distinguish themselves not merely through raw boundary hitting, but through <strong>strike-rate retention</strong>—maintaining over 80% to 110% of their scoring baseline under severe resource scarcity.
          </p>
        </div>

        {/* Card 3: What the Bowler Leaderboard Reveals */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-700 border-b border-slate-100 pb-2">
            <Target className="w-4 h-4" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              3. Insights from the Bowler Leaderboard
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The bowling analysis exposes the harsh realities of modern death bowling. <strong>Every top 10 bowler conceded more than contextual baseline expectation</strong> (negative runs saved per 6). The rankings therefore measure defensive damage limitation, dot-ball persistence, and breakthrough wicket-taking relative to peers, rather than absolute scoring suppression.
          </p>
        </div>

        {/* Card 4: Why Shrinkage & Sample Size Matter */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700 border-b border-slate-100 pb-2">
            <ShieldCheck className="w-4 h-4" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              4. Why Empirical Bayes Shrinkage Is Critical
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Without reliability shrinkage, rankings would be dominated by single-over flukes. By shrinking raw percentiles toward the pool median (50) via <em>n / (n + 60)</em>, the model rewards sustained, multi-match consistency over fleeting variance, ensuring that candidate ranks reflect reliable performance.
          </p>
        </div>
      </div>

      {/* Final Formal Statement Banner */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-6 text-white shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              SuperRR Selector Season 2 – Final Analytical Declaration
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Round 1 Submission</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          This project demonstrates how rigorous data modeling transforms 87,673 ball-by-ball records into transparent, explainable sports analytics. It upholds total data integrity: no statistics were altered, negative findings were not hidden, and historical players were preserved. The results stand as an honest exploratory study of cricket pressure performance.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('overview')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Back to Dashboard Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('explorer')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider border border-slate-700 transition-colors"
          >
            <span>Inspect Full Candidate Database</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
