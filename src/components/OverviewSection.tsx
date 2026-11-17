import React from 'react';
import { 
  Flame, 
  Target, 
  ArrowRight, 
  Database, 
  Layers, 
  Users2, 
  Activity, 
  AlertTriangle,
  Award
} from 'lucide-react';
import type { SummaryJson, BatterRecord, BowlerRecord, ActiveSection } from '../types/cricket';
import { formatNumber } from '../utils/formatters';

interface OverviewSectionProps {
  summary: SummaryJson;
  topBatters: BatterRecord[];
  topBowlers: BowlerRecord[];
  onNavigate: (section: ActiveSection) => void;
  onSelectBatter: (batter: BatterRecord) => void;
  onSelectBowler: (bowler: BowlerRecord) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  summary,
  topBatters,
  topBowlers,
  onNavigate,
  onSelectBatter,
  onSelectBowler,
}) => {
  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        {/* Subtle decorative accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-pink-600 to-blue-800" />
        
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/30">
            <span>UNSTOP CHALLENGE: SUPER RR SELECTOR S2 – ROUND 1</span>
            <span className="text-slate-500">•</span>
            <span className="text-pink-300">EXPLORATORY ANALYSIS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            SUPER RR
          </h1>
          <p className="text-lg sm:text-xl font-medium text-blue-200">
            Pressure Performance Analysis | IPL 2022–2026
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            "An analytical study of batter and bowler performance in high-pressure match situations using ball-by-ball IPL data."
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('batters')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>View Top 10 Batters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('bowlers')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold uppercase tracking-wider border border-slate-700 transition-colors"
            >
              <span>View Top 10 Bowlers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('methodology')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold uppercase tracking-wider border border-slate-700/80 transition-colors"
            >
              <span>Read Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Blocks (Directly bound to summary JSON) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Matches Analysed</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
            {summary.matches.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">IPL 2022–2026 competitions</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Deliveries Analysed</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
            {summary.deliveries.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">Excluding super-overs</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Eligible Batter Pool</span>
            <Users2 className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
            {summary.eligible_batters}
          </div>
          <p className="text-xs text-slate-500 mt-1">≥100 balls, ≥20 HP balls, ≥4 HP matches</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Eligible Bowler Pool</span>
            <Activity className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
            {summary.eligible_bowlers}
          </div>
          <p className="text-xs text-slate-500 mt-1">≥60 legal balls, ≥24 HP balls, ≥4 HP matches</p>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Award className="w-5 h-5 text-blue-700" />
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            Executive Summary & Analytical Premise
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <p>
              This project evaluates player efficiency in high-pressure match states across <strong>367 IPL matches</strong> (2022–2026). Rather than assigning arbitrary leverage labels, every ball was mapped to an empirical match-state expectation derived from innings, match phase (powerplay, middle, death), and wickets in hand.
            </p>
            <p>
              Deliveries with a computed pressure index of <strong>≥65</strong> were classified as high-pressure situations. Batters were assessed on strike rate retention, pressure average, boundary rates, and dot-ball mitigation. Bowlers were evaluated on contextual runs saved per 6 legal balls against expectation, wicket-taking strike rate, dot percentage, and defensive economy.
            </p>
          </div>

          <div className="space-y-3 bg-slate-50 border border-slate-200 rounded p-4 text-xs sm:text-sm">
            <div className="flex items-start space-x-2 text-slate-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">Analytical Scope Clarification:</span>
                <p className="mt-1 text-slate-600">
                  This study is an analytical demonstration of historical data science methodology for Rajasthan Royals. It is <strong>NOT</strong> an auction purchasing recommendation or retention roadmap. All historical players who qualify under the empirical filters (including retired players like Kieron Pollard) remain preserved as analytical observations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Previews: Top 10 Batters & Top 10 Bowlers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Batters Preview */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-pink-600" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Top 10 Batters Preview (HP ≥ 65)
                </h3>
              </div>
              <button
                onClick={() => onNavigate('batters')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center space-x-1"
              >
                <span>Full Leaderboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {topBatters.slice(0, 5).map((b) => (
                <div 
                  key={b.striker_id}
                  onClick={() => onSelectBatter(b)}
                  className="px-5 py-3 flex items-center justify-between hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 font-mono font-bold text-xs flex items-center justify-center transition-colors">
                      {b.rank}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700">
                        {b.striker_name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {b.hp_runs} runs ({b.hp_balls}b) • HP SR: {formatNumber(b.hp_sr, 1)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-slate-900">
                      {formatNumber(b.score, 2)}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      SR Ret: {formatNumber(b.sr_retention, 1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('batters')}
              className="text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
            >
              +5 more candidates in top 10 (Pollard, Russell, Shepherd, Shahbaz, Powell) →
            </button>
          </div>
        </div>

        {/* Top 10 Bowlers Preview */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-700" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Top 10 Bowlers Preview (HP ≥ 65)
                </h3>
              </div>
              <button
                onClick={() => onNavigate('bowlers')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center space-x-1"
              >
                <span>Full Leaderboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {topBowlers.slice(0, 5).map((b) => (
                <div 
                  key={b.bowler_id}
                  onClick={() => onSelectBowler(b)}
                  className="px-5 py-3 flex items-center justify-between hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 font-mono font-bold text-xs flex items-center justify-center transition-colors">
                      {b.rank}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700">
                        {b.bowler_name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        {b.hp_legal} legal balls • HP Econ: {formatNumber(b.hp_econ, 2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-sm text-slate-900">
                      {formatNumber(b.score, 2)}
                    </div>
                    <div className="text-xs text-amber-600 font-mono">
                      Runs saved/6: {formatNumber(b.runs_saved_per6, 2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('bowlers')}
              className="text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
            >
              +5 more candidates in top 10 (Jansen, Shahbaz, Natarajan, Arshdeep, Nabi) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
