import React from 'react';
import { X, BarChart2, ShieldCheck, Info } from 'lucide-react';
import type { BatterRecord, BowlerRecord } from '../types/cricket';
import { formatNumber, formatPercent, formatRunsSaved } from '../utils/formatters';

interface PlayerDetailModalProps {
  player: BatterRecord | BowlerRecord | null;
  type: 'batter' | 'bowler';
  onClose: () => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ player, type, onClose }) => {
  if (!player) return null;

  const isBatter = type === 'batter';
  const batter = isBatter ? (player as BatterRecord) : null;
  const bowler = !isBatter ? (player as BowlerRecord) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy-900 text-white rounded-t-lg flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center border border-blue-400">
              #{player.rank || '-'}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold tracking-tight">
                  {isBatter ? batter?.striker_name : bowler?.bowler_name}
                </h3>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                  {isBatter ? 'Batter' : 'Bowler'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Player ID: {isBatter ? batter?.striker_id : bowler?.bowler_id} • Score: {formatNumber(player.score, 2)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Factual Data Narrative (Strictly Generated From Numbers) */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Statistical Profile Summary</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              {isBatter && batter && (
                <>
                  Scored <strong>{batter.hp_runs} runs</strong> from <strong>{batter.hp_balls} high-pressure balls</strong> across <strong>{batter.hp_matches} matches</strong> with {batter.hp_dismissals} dismissal{batter.hp_dismissals === 1 ? '' : 's'}, recording an HP strike rate of <strong>{formatNumber(batter.hp_sr, 2)}</strong> and an HP batting average of <strong>{formatNumber(batter.hp_avg, 2)}</strong>. In overall IPL 2022–2026 play, scored {batter.all_runs} runs from {batter.all_balls} balls (strike rate {formatNumber(batter.all_sr, 2)}), reflecting a strike-rate retention of <strong>{formatPercent(batter.sr_retention, 1)}</strong>. Hit {batter.hp_boundaries} high-pressure boundaries ({formatPercent(batter.hp_boundary_pct, 1)}) against {batter.hp_dots} dot balls ({formatPercent(batter.hp_dot_pct, 1)}). Median high-pressure batting position: {batter.hp_order}.
                </>
              )}
              {!isBatter && bowler && (
                <>
                  Conceded <strong>{bowler.hp_conceded} runs</strong> from <strong>{bowler.hp_legal} high-pressure legal deliveries</strong> across <strong>{bowler.hp_matches} matches</strong>, taking <strong>{bowler.hp_wickets} wicket{bowler.hp_wickets === 1 ? '' : 's'}</strong> ({formatNumber(bowler.hp_wk_per100, 2)} per 100 balls) and bowling <strong>{bowler.hp_dots} dot balls</strong> ({formatPercent(bowler.hp_dot_pct, 1)}). Pressure economy rate of <strong>{formatNumber(bowler.hp_econ, 2)}</strong> compared against an expected contextual baseline economy of <strong>{formatNumber(bowler.hp_expected_econ, 2)}</strong>, giving <strong>{formatRunsSaved(bowler.runs_saved_per6)} runs saved per 6 balls</strong>. Overall IPL 2022–2026 economy: {formatNumber(bowler.all_econ, 2)}.
                </>
              )}
            </p>
          </div>

          {/* Metric Comparison Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <BarChart2 className="w-4 h-4 text-slate-700" />
              <span>Observed Performance Metrics</span>
            </h4>

            {isBatter && batter && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Strike Rate</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{formatNumber(batter.hp_sr, 2)}</div>
                  <div className="text-[10px] text-slate-500">Overall SR: {formatNumber(batter.all_sr, 2)}</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">SR Retention %</div>
                  <div className="text-base font-bold font-mono text-blue-700 mt-0.5">{formatPercent(batter.sr_retention, 1)}</div>
                  <div className="text-[10px] text-slate-500">HP SR / All SR</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Batting Average</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{formatNumber(batter.hp_avg, 2)}</div>
                  <div className="text-[10px] text-slate-500">{batter.hp_dismissals} dismissals</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Boundary %</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{formatPercent(batter.hp_boundary_pct, 1)}</div>
                  <div className="text-[10px] text-slate-500">{batter.hp_boundaries} boundaries</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Dot Ball %</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{formatPercent(batter.hp_dot_pct, 1)}</div>
                  <div className="text-[10px] text-slate-500">{batter.hp_dots} dots in HP</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Volume & Matches</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{batter.hp_runs}r ({batter.hp_balls}b)</div>
                  <div className="text-[10px] text-slate-500">{batter.hp_matches} matches (pos: {batter.hp_order})</div>
                </div>
              </div>
            )}

            {!isBatter && bowler && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Economy</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{formatNumber(bowler.hp_econ, 2)}</div>
                  <div className="text-[10px] text-slate-500">Overall: {formatNumber(bowler.all_econ, 2)}</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">Contextual Expected Econ</div>
                  <div className="text-base font-bold font-mono text-blue-700 mt-0.5">{formatNumber(bowler.hp_expected_econ, 2)}</div>
                  <div className="text-[10px] text-slate-500">Model baseline</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">Runs Saved per 6 Balls</div>
                  <div className="text-base font-bold font-mono text-amber-700 mt-0.5">{formatRunsSaved(bowler.runs_saved_per6)}</div>
                  <div className="text-[10px] text-amber-600 font-sans">Below baseline expectation</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Wickets</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{bowler.hp_wickets} wkts</div>
                  <div className="text-[10px] text-slate-500">{formatNumber(bowler.hp_wk_per100, 2)} / 100 balls</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Dot Ball %</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{formatPercent(bowler.hp_dot_pct, 1)}</div>
                  <div className="text-[10px] text-slate-500">{bowler.hp_dots} dots in HP</div>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500 font-medium">HP Deliveries & Matches</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{bowler.hp_legal} legal balls</div>
                  <div className="text-[10px] text-slate-500">{bowler.hp_matches} matches ({bowler.hp_conceded} runs)</div>
                </div>
              </div>
            )}
          </div>

          {/* Model Percentiles & Reliability Shrinkage */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Model Percentiles & Empirical Bayes Shrinkage</span>
            </h4>

            {isBatter && batter && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(HP Strike Rate) [25% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(batter.p_hp_sr, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(HP Batting Average) [25% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(batter.p_hp_avg, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(HP Boundary Rate) [15% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(batter.p_hp_boundary_pct, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(HP Inverse Dot Rate) [10% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(batter.p_hp_dot_pct, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(Strike-Rate Retention) [25% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(batter.p_sr_retention, 1)}%ile</span>
                </div>
              </div>
            )}

            {!isBatter && bowler && (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(Runs Saved per 6) [40% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(bowler.p_runs_saved_per6, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(HP Wickets / 100 balls) [25% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(bowler.p_hp_wk_per100, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(HP Dot Ball %) [20% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(bowler.p_hp_dot_pct, 1)}%ile</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">p(Inverse HP Economy) [15% wt]:</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(bowler.p_hp_econ, 1)}%ile</span>
                </div>
              </div>
            )}

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Unshrunk Raw Score: <strong>{formatNumber(player.raw_score, 2)}</strong></span>
              <span className="text-slate-500">Reliability Factor (n/(n+60)): <strong>{formatNumber(player.reliability, 3)}</strong></span>
              <span className="text-blue-700 font-bold">Final Shrunk Score: {formatNumber(player.score, 2)}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-lg flex justify-between items-center text-xs text-slate-500">
          <span>Source: IPL 2022–2026 ball-by-ball analysis</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
