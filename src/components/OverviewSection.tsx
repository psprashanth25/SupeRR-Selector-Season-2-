import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Target, 
  AlertTriangle, 
  ArrowRight, 
  GitCompare, 
  UserCheck, 
  Layers, 
  Database, 
  Users, 
  History, 
  CheckCircle2 
} from 'lucide-react';
import type { 
  ActiveSection, 
  V2BatterRecord, 
  V2BowlerRecord,
  V2ValidationSummary
} from '../types/cricket';
import { formatNumber } from '../utils/formatters';

interface OverviewSectionProps {
  v2Summary: V2ValidationSummary;
  v2TopBatters: V2BatterRecord[];
  v2TopBowlers: V2BowlerRecord[];
  onNavigate: (section: ActiveSection) => void;
  onSelectBatter: (batter: V2BatterRecord) => void;
  onSelectBowler: (bowler: V2BowlerRecord) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  v2Summary,
  v2TopBatters,
  v2TopBowlers,
  onNavigate,
  onSelectBatter,
  onSelectBowler
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero / Executive Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Round 1 Challenge Submission
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              IPL 2022–2026 Analytical Study
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              V1 Baseline &amp; V2 Exploratory
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            IPL Pressure Performance Analytics
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
            An empirical investigation identifying historical top performers under extreme match pressure. 
            This release evaluates our original <strong>V1 Fixed-Threshold Model</strong> alongside the newly developed 
            <strong> V2 Context-Normalised Exploratory Model</strong>, demonstrating model sensitivity, role-based adjustments, 
            and critical interpretability warnings across 367 matches and 87,673 deliveries.
          </p>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => onNavigate('batters')}
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>V2 Top 10 Batters</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onNavigate('bowlers')}
              className="inline-flex items-center space-x-1.5 bg-blue-900/80 hover:bg-blue-800 text-blue-200 border border-blue-700/60 px-3.5 py-1.5 rounded-lg text-xs font-bold transition"
            >
              <Target className="w-3.5 h-3.5" />
              <span>V2 Top 10 Bowlers</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onNavigate('v1-baseline')}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <History className="w-3.5 h-3.5 text-slate-300" />
              <span>V1 Baseline Results</span>
            </button>
            <button
              onClick={() => onNavigate('comparison')}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <GitCompare className="w-3.5 h-3.5 text-pink-400" />
              <span>V1 vs V2 Comparison</span>
            </button>
            <button
              onClick={() => onNavigate('kohli')}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Virat Kohli Audit</span>
            </button>
            <button
              onClick={() => onNavigate('explorer')}
              className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Candidate Explorer</span>
            </button>
            <button
              onClick={() => onNavigate('conclusion')}
              className="inline-flex items-center space-x-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conclusion &amp; Synthesis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scope Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Matches</span>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            367
          </div>
          <p className="text-xs text-slate-500 mt-1">IPL 2022–2026 (Innings 1 &amp; 2)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Deliveries Analysed</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            87,673
          </div>
          <p className="text-xs text-slate-500 mt-1">Complete ball-by-ball records</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">V2 High Pressure Balls</span>
            <Flame className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {formatNumber(v2Summary.high_pressure_deliveries_v2)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <strong>20.07%</strong> of deliveries (vs 7.75% in V1)
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">V2 Eligible Candidates</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {v2Summary.eligible_batters_v2 + v2Summary.eligible_bowlers_v2}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            112 Batters, 129 Bowlers (vs 37 &amp; 32 in V1)
          </p>
        </div>
      </div>

      {/* Critical Analytical Warnings Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl border-y border-r border-amber-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
              Critical Analytical Caveats &amp; Validation Status
            </h3>
            <ul className="text-xs text-amber-800 space-y-1 leading-relaxed list-disc list-inside">
              <li>
                <strong>V2 is an exploratory sensitivity model:</strong> It addresses sample constraints of V1 but is <em>not</em> proven objectively superior.
              </li>
              <li>
                <strong>Only 2-player overlap per discipline:</strong> Between V1 and V2, only Krunal Pandya &amp; Shahbaz Ahmed overlap in Batters, and Mukesh Kumar &amp; Shahbaz Ahmed overlap in Bowlers. This proves extreme sensitivity to model specification.
              </li>
              <li>
                <strong>Critical Bowling Concern:</strong> All 10 top V2 bowlers conceded <em>more</em> runs than contextual expected baseline (negative contextual runs saved per 6 balls). Their ranking is relative within role groups, not evidence of positive absolute pressure suppression.
              </li>
              <li>
                <strong>Role Approximations:</strong> Batters are categorized by median batting order (1–2 Opener, 3–5 Middle, 6–7 Finisher) and bowlers by predominant phase. These are useful approximations, not dynamic in-match role tracking.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Side-by-Side Model Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model V2 Card */}
        <div className="bg-white rounded-xl border-2 border-blue-600 p-6 shadow-sm relative">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
              Primary Exploratory Model
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Model V2: Context-Normalised Model</span>
          </h3>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Applies phase- and innings-specific 70th percentile pressure cutoffs (floor of 35) to balance pressure selection across early, middle, and late overs. Normalises percentiles within role groups and shrinks scores via Bayesian shrinkage <code className="bg-slate-100 px-1 py-0.5 rounded">n/(n+60)</code>.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">High-Pressure Cutoff</span>
              <span className="font-bold text-slate-800 font-mono">Phase 70th %ile (Min 35)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">Pressure Deliveries</span>
              <span className="font-bold text-slate-800 font-mono">17,592 (20.07%)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">Eligible Candidate Pool</span>
              <span className="font-bold text-slate-800 font-mono">112 Batters / 129 Bowlers</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">Role Normalisation</span>
              <span className="font-bold text-slate-800 font-mono">3 Bat Roles / 3 Bowl Phases</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">Top Rankers: Ishan Kishan (Bat) / Shahbaz Ahmed (Bowl)</span>
            <button
              onClick={() => onNavigate('batters')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1"
            >
              <span>Explore V2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Model V1 Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative">
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
              Baseline Model (Preserved)
            </span>
          </div>
          <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span>Model V1: Fixed-Threshold Baseline</span>
          </h3>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Uses a single fixed absolute pre-delivery pressure threshold of &ge; 65 across all phases. Evaluates all qualified players in a single undivided pool, shrinking multi-metric percentiles via <code className="bg-slate-100 px-1 py-0.5 rounded">n/(n+60)</code>.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">High-Pressure Cutoff</span>
              <span className="font-bold text-slate-800 font-mono">Fixed &ge; 65 Score</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">Pressure Deliveries</span>
              <span className="font-bold text-slate-800 font-mono">6,799 / 6,800 (7.75%)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">Eligible Candidate Pool</span>
              <span className="font-bold text-slate-800 font-mono">37 Batters / 32 Bowlers</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-500 block">Role Normalisation</span>
              <span className="font-bold text-slate-800 font-mono">None (Single Pool)</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">Top Rankers: Abdul Samad (Bat) / Mukesh Kumar (Bowl)</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate('v1-baseline')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1"
              >
                <span>View V1 Baseline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('comparison')}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center space-x-1"
              >
                <span>Compare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Preview Tables (V2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* V2 Top 5 Batters Preview */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-pink-400" />
              <h3 className="font-bold text-sm tracking-tight">V2 Top Batters Under Pressure</h3>
            </div>
            <button
              onClick={() => onNavigate('batters')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>View Top 10</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {v2TopBatters.slice(0, 5).map((batter) => (
              <div 
                key={batter.player_id}
                onClick={() => onSelectBatter(batter)}
                className="px-5 py-3 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                    batter.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                    batter.rank === 2 ? 'bg-slate-300 text-slate-800' :
                    batter.rank === 3 ? 'bg-amber-700 text-white' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {batter.rank}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{batter.player}</div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium text-slate-700 text-[10px]">
                        {batter.role}
                      </span>
                      <span>{batter.hp_runs} runs ({batter.hp_balls} balls)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-blue-700 text-sm">
                    {formatNumber(batter.score, 2)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    SR: {formatNumber(batter.hp_sr, 1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* V2 Top 5 Bowlers Preview */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-400" />
              <h3 className="font-bold text-sm tracking-tight">V2 Top Bowlers Under Pressure</h3>
            </div>
            <button
              onClick={() => onNavigate('bowlers')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>View Top 10</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {v2TopBowlers.slice(0, 5).map((bowler) => (
              <div 
                key={bowler.player_id}
                onClick={() => onSelectBowler(bowler)}
                className="px-5 py-3 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs font-mono ${
                    bowler.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                    bowler.rank === 2 ? 'bg-slate-300 text-slate-800' :
                    bowler.rank === 3 ? 'bg-amber-700 text-white' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {bowler.rank}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{bowler.player}</div>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium text-slate-700 text-[10px]">
                        {bowler.role} Phase
                      </span>
                      <span>{bowler.hp_wickets} wkts ({bowler.hp_legal} legal balls)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-blue-700 text-sm">
                    {formatNumber(bowler.score, 2)}
                  </div>
                  <div className="text-[11px] text-red-600 font-mono">
                    Saved/6: {formatNumber(bowler.runs_saved_per6, 2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
