import React from 'react';
import { X, BarChart2, ShieldAlert, Info } from 'lucide-react';
import type { 
  BatterRecord, 
  BowlerRecord, 
  V2BatterRecord, 
  V2BowlerRecord 
} from '../types/cricket';
import { formatNumber, formatPercent, formatRunsSaved } from '../utils/formatters';

export type AnyPlayerRecord = 
  | BatterRecord 
  | BowlerRecord 
  | V2BatterRecord 
  | V2BowlerRecord;

interface PlayerDetailModalProps {
  player: AnyPlayerRecord | null;
  type: 'batter' | 'bowler';
  onClose: () => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({ player, type, onClose }) => {
  if (!player) return null;

  const isBatter = type === 'batter';

  // Detect whether it's a V2 record (has 'player' string property) or V1 record
  const isV2 = 'player' in player;

  const playerName = isV2 
    ? (player as V2BatterRecord | V2BowlerRecord).player 
    : (isBatter ? (player as BatterRecord).striker_name : (player as BowlerRecord).bowler_name);

  const playerId = isV2
    ? (player as V2BatterRecord | V2BowlerRecord).player_id
    : (isBatter ? (player as BatterRecord).striker_id : (player as BowlerRecord).bowler_id);

  const rank = player.rank ?? '-';
  const score = player.score;
  const role = isV2 ? (player as V2BatterRecord | V2BowlerRecord).role : undefined;

  // Specific casts
  const v2Batter = isV2 && isBatter ? (player as V2BatterRecord) : null;
  const v2Bowler = isV2 && !isBatter ? (player as V2BowlerRecord) : null;
  const v1Batter = !isV2 && isBatter ? (player as BatterRecord) : null;
  const v1Bowler = !isV2 && !isBatter ? (player as BowlerRecord) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white rounded-t-xl flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center border border-blue-400">
              #{rank}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black tracking-tight">{playerName}</h3>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                  {isBatter ? 'Batter' : 'Bowler'}
                </span>
                {role && (
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {role} {isBatter ? '' : 'Phase'}
                  </span>
                )}
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {isV2 ? 'Model V2' : 'Model V1'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ID: {playerId} &bull; Composite Score: {formatNumber(score, 2)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Narrative Overview */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Statistical Profile Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
              {v2Batter && (
                <>
                  Classified in the <strong>{v2Batter.role}</strong> role (median batting order: {v2Batter.med_order}). 
                  Accumulated <strong>{v2Batter.hp_runs} runs</strong> from <strong>{v2Batter.hp_balls} high-pressure balls</strong> across <strong>{v2Batter.hp_matches} matches</strong>, 
                  recording a pressure strike rate of <strong>{formatNumber(v2Batter.hp_sr, 2)}</strong> and an average of <strong>{formatNumber(v2Batter.hp_avg, 2)}</strong>. 
                  Maintained a strike-rate retention of <strong>{formatNumber(v2Batter.sr_retention, 1)}%</strong> compared to tournament strike rate ({formatNumber(v2Batter.all_sr, 2)}). 
                  Boundary rate: {formatPercent(v2Batter.hp_boundary_pct)}, Dot ball rate: {formatPercent(v2Batter.hp_dot_pct)}. 
                  Total tournament volume: {v2Batter.all_balls} balls. Bayesian reliability factor: {formatNumber(v2Batter.reliability, 3)}.
                </>
              )}
              {v2Bowler && (
                <>
                  Assigned to the <strong>{v2Bowler.role} Phase</strong> group by predominant volume. 
                  Conceded <strong>{v2Bowler.hp_conceded} runs</strong> across <strong>{v2Bowler.hp_legal} high-pressure legal balls</strong> ({v2Bowler.hp_matches} matches), 
                  taking <strong>{v2Bowler.hp_wickets} wickets</strong> ({formatNumber(v2Bowler.wk_per100, 2)} per 100 balls) with a dot-ball rate of {formatPercent(v2Bowler.hp_dot_pct)}. 
                  Recorded a pressure economy of <strong>{formatNumber(v2Bowler.hp_econ, 2)}</strong> against a contextual expected economy of <strong>{formatNumber(v2Bowler.expected_econ, 2)}</strong>, 
                  yielding <strong>{formatNumber(v2Bowler.runs_saved_per6, 2)} contextual runs saved per 6 balls</strong>. 
                  Bayesian sample reliability: {formatNumber(v2Bowler.reliability, 3)}.
                </>
              )}
              {v1Batter && (
                <>
                  Under V1 fixed threshold (&ge; 65), scored <strong>{v1Batter.hp_runs} runs</strong> from <strong>{v1Batter.hp_balls} balls</strong> ({v1Batter.hp_matches} matches) with {v1Batter.hp_dismissals} dismissals. 
                  Recorded an HP strike rate of <strong>{formatNumber(v1Batter.hp_sr, 2)}</strong>, HP average of <strong>{formatNumber(v1Batter.hp_avg, 2)}</strong>, and strike-rate retention of <strong>{formatPercent(v1Batter.sr_retention)}</strong>. 
                  Boundary rate: {formatPercent(v1Batter.hp_boundary_pct)}, Dot rate: {formatPercent(v1Batter.hp_dot_pct)}. Reliability: {formatNumber(v1Batter.reliability, 3)}.
                </>
              )}
              {v1Bowler && (
                <>
                  Under V1 fixed threshold (&ge; 65), conceded <strong>{v1Bowler.hp_conceded} runs</strong> from <strong>{v1Bowler.hp_legal} legal balls</strong> ({v1Bowler.hp_matches} matches), 
                  taking <strong>{v1Bowler.hp_wickets} wickets</strong> ({formatNumber(v1Bowler.hp_wk_per100, 2)} per 100 balls). 
                  Economy rate of <strong>{formatNumber(v1Bowler.hp_econ, 2)}</strong> vs expected {formatNumber(v1Bowler.hp_expected_econ, 2)}, yielding <strong>{formatRunsSaved(v1Bowler.runs_saved_per6)} runs saved per 6 balls</strong>.
                </>
              )}
            </p>
          </div>

          {/* Bowler Warning if V2 Bowler with Negative Runs Saved */}
          {v2Bowler && v2Bowler.runs_saved_per6 < 0 && (
            <div className="bg-rose-50 border border-rose-300 p-3 rounded-lg flex items-start space-x-2 text-xs text-rose-900">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Contextual Baseline Note:</strong> Conceded {formatNumber(Math.abs(v2Bowler.runs_saved_per6), 2)} more runs per 6 balls than expected baseline. Composite score reflects relative within-phase performance rather than positive absolute run prevention.
              </div>
            </div>
          )}

          {/* Grid of Key Analytical Metrics */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <BarChart2 className="w-4 h-4 text-slate-700" />
              <span>Granular Metric Breakdown</span>
            </h4>

            {isBatter && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">HP Strike Rate</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatNumber(isV2 ? (v2Batter?.hp_sr ?? 0) : (v1Batter?.hp_sr ?? 0), 2)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Overall SR: {formatNumber(isV2 ? (v2Batter?.all_sr ?? 0) : (v1Batter?.all_sr ?? 0), 2)}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">SR Retention</div>
                  <div className="text-base font-bold font-mono text-blue-700 mt-0.5">
                    {formatNumber(isV2 ? (v2Batter?.sr_retention ?? 0) : (v1Batter?.sr_retention ?? 0), 1)}%
                  </div>
                  <div className="text-[10px] text-slate-500">HP SR / All SR</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">HP Batting Average</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatNumber(isV2 ? (v2Batter?.hp_avg ?? 0) : (v1Batter?.hp_avg ?? 0), 2)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {isV2 ? `${v2Batter?.hp_matches} matches` : `${v1Batter?.hp_dismissals} dismissals`}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Boundary Rate</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatPercent(isV2 ? (v2Batter?.hp_boundary_pct ?? 0) : (v1Batter?.hp_boundary_pct ?? 0))}
                  </div>
                  <div className="text-[10px] text-slate-500">Of high-pressure balls</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Dot Ball Rate</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatPercent(isV2 ? (v2Batter?.hp_dot_pct ?? 0) : (v1Batter?.hp_dot_pct ?? 0))}
                  </div>
                  <div className="text-[10px] text-slate-500">Lower is better</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Bayesian Reliability</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatNumber(player.reliability, 3)}
                  </div>
                  <div className="text-[10px] text-slate-500">Sample weight factor</div>
                </div>
              </div>
            )}

            {!isBatter && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Runs Saved / 6b</div>
                  <div className="text-base font-bold font-mono text-rose-700 mt-0.5">
                    {formatNumber(isV2 ? (v2Bowler?.runs_saved_per6 ?? 0) : (v1Bowler?.runs_saved_per6 ?? 0), 2)}
                  </div>
                  <div className="text-[10px] text-slate-500">Expected vs Actual</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">HP Economy Rate</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatNumber(isV2 ? (v2Bowler?.hp_econ ?? 0) : (v1Bowler?.hp_econ ?? 0), 2)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Exp: {formatNumber(isV2 ? (v2Bowler?.expected_econ ?? 0) : (v1Bowler?.hp_expected_econ ?? 0), 2)}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Wickets / 100 Balls</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatNumber(isV2 ? (v2Bowler?.wk_per100 ?? 0) : (v1Bowler?.hp_wk_per100 ?? 0), 2)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {isV2 ? `${v2Bowler?.hp_wickets} wkts` : `${v1Bowler?.hp_wickets} wkts`}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Dot Ball %</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatPercent(isV2 ? (v2Bowler?.hp_dot_pct ?? 0) : (v1Bowler?.hp_dot_pct ?? 0))}
                  </div>
                  <div className="text-[10px] text-slate-500">Pressure dots</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">High-Pressure Legal Balls</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {isV2 ? v2Bowler?.hp_legal : v1Bowler?.hp_legal}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Across {isV2 ? v2Bowler?.hp_matches : v1Bowler?.hp_matches} matches
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 font-medium">Bayesian Reliability</div>
                  <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                    {formatNumber(player.reliability, 3)}
                  </div>
                  <div className="text-[10px] text-slate-500">n / (n + 60)</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
