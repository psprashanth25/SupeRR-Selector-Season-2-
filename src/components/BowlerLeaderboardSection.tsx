import React, { useState, useMemo } from 'react';
import { 
  Target, 
  Download, 
  Search, 
  ArrowUpDown, 
  Info,
  ShieldAlert
} from 'lucide-react';
import type { V2BowlerRecord, BowlerRecord } from '../types/cricket';
import { formatNumber, formatPercent } from '../utils/formatters';
import { downloadCsv } from '../data/superrrLoader';

interface BowlerLeaderboardProps {
  v2Bowlers: V2BowlerRecord[];
  v1Bowlers: BowlerRecord[];
  rawV2Csv: string;
  rawV1Csv: string;
  onSelectV2Bowler: (bowler: V2BowlerRecord) => void;
  onSelectV1Bowler: (bowler: BowlerRecord) => void;
}

type SortField = 
  | 'rank' 
  | 'score' 
  | 'hp_conceded' 
  | 'hp_legal' 
  | 'hp_econ' 
  | 'runs_saved_per6' 
  | 'hp_wickets' 
  | 'wk_per100' 
  | 'hp_dot_pct' 
  | 'hp_boundary_pct' 
  | 'reliability';

export const BowlerLeaderboardSection: React.FC<BowlerLeaderboardProps> = ({
  v2Bowlers,
  v1Bowlers,
  rawV2Csv,
  rawV1Csv,
  onSelectV2Bowler,
  onSelectV1Bowler,
}) => {
  const [modelMode, setModelMode] = useState<'v2' | 'v1'>('v2');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'rank' ? 'asc' : 'desc');
    }
  };

  const filteredV2Bowlers = useMemo(() => {
    let result = [...v2Bowlers];

    if (phaseFilter !== 'all') {
      result = result.filter(b => b.role.toLowerCase() === phaseFilter.toLowerCase());
    }

    if (searchTerm.trim()) {
      result = result.filter(b => 
        b.player.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    result.sort((a, b) => {
      let aVal = a[sortField as keyof V2BowlerRecord] as number;
      let bVal = b[sortField as keyof V2BowlerRecord] as number;

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return result;
  }, [v2Bowlers, phaseFilter, searchTerm, sortField, sortDirection]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <Target className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Top 10 Bowlers Performing Under Pressure
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Ranked within predominant delivery phases using Bayesian-shrunk multi-metric percentiles across economy suppression, wicket frequency, and dot-ball generation.
            </p>
          </div>

          {/* Model Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setModelMode('v2')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                modelMode === 'v2'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Model V2 (Context-Normalised)
            </button>
            <button
              onClick={() => setModelMode('v1')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                modelMode === 'v1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Model V1 (Fixed-Threshold)
            </button>
          </div>
        </div>

        {/* Analytical Header Subtext */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              {modelMode === 'v2' ? (
                <>
                  <strong>V2 Grouping:</strong> Predominant Phase (Powerplay, Middle, Death). Percentiles shrunk toward 50 by <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">n/(n+60)</code>.
                </>
              ) : (
                <>
                  <strong>V1 Grouping:</strong> Undivided candidate pool of 32 qualified bowlers.
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => downloadCsv(
              modelMode === 'v2' ? 'v2_top10_bowlers.csv' : 'v1_ipl_top10_bowlers.csv',
              modelMode === 'v2' ? rawV2Csv : rawV1Csv
            )}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* CRITICAL BOWLING PERFORMANCE WARNING BOX */}
      {modelMode === 'v2' && (
        <div className="bg-rose-50 border-2 border-rose-400 p-5 rounded-xl shadow-sm">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 bg-rose-500 text-white rounded-lg flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded">
                  CRITICAL ANALYTICAL WARNING
                </span>
                <h3 className="text-sm font-bold text-rose-950">
                  All 10 V2 Top Bowlers Have Negative Contextual Runs Saved
                </h3>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                Every single bowler in the V2 Top 10 has a <strong>negative contextual runs-saved-per-six</strong> value 
                (ranging from <code className="bg-rose-100 font-mono font-bold px-1 py-0.5 rounded text-rose-950">-0.08</code> for Avesh Khan to <code className="bg-rose-100 font-mono font-bold px-1 py-0.5 rounded text-rose-950">-4.21</code> for Romario Shepherd). 
                A negative value means the bowler <strong>conceded more runs than expected</strong> for the phase, wickets lost, and innings context.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-[11px]">
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Shahbaz Ahmed</span>
                  <span className="font-bold text-rose-700">-2.26 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Romario Shepherd</span>
                  <span className="font-bold text-rose-700">-4.21 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Shivang Kumar</span>
                  <span className="font-bold text-rose-700">-3.61 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Washington Sundar</span>
                  <span className="font-bold text-rose-700">-1.53 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Ishant Sharma</span>
                  <span className="font-bold text-rose-700">-2.40 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Avesh Khan</span>
                  <span className="font-bold text-rose-700">-0.08 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Mukesh Kumar</span>
                  <span className="font-bold text-rose-700">-2.59 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Mayank Markande</span>
                  <span className="font-bold text-rose-700">-1.88 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Chris Jordan</span>
                  <span className="font-bold text-rose-700">-0.87 / 6b</span>
                </div>
                <div className="bg-white/80 p-2 rounded border border-rose-200">
                  <span className="text-slate-600 block text-[10px]">Mitchell Marsh</span>
                  <span className="font-bold text-rose-700">-3.86 / 6b</span>
                </div>
              </div>
              <p className="text-[11px] text-rose-800 italic pt-1">
                <strong>Interpretability Guideline:</strong> Do NOT describe these players as saving runs or as evidence of objectively excellent pressure bowling. Their composite score reflects relative ranking within their phase group, not positive absolute performance. Notice also low sample reliability: <strong>Mitchell Marsh (0.36)</strong>, <strong>Chris Jordan (0.48)</strong>, and <strong>Shivang Kumar (0.55)</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {modelMode === 'v2' ? (
        /* V2 BOWLER TABLE */
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Filter Predominant Phase:</span>
              {['all', 'powerplay', 'middle', 'death'].map((phase) => (
                <button
                  key={phase}
                  onClick={() => setPhaseFilter(phase)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize transition ${
                    phaseFilter === phase
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search bowler..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
              />
            </div>
          </div>

          {/* V2 Bowlers Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px] select-none">
                    <th 
                      onClick={() => handleSort('rank')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Rank</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Bowler &amp; Phase</th>
                    <th 
                      onClick={() => handleSort('score')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Score</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('runs_saved_per6')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right bg-rose-950/40"
                    >
                      <div className="flex items-center justify-end space-x-1 text-rose-300 font-bold">
                        <span>Saved / 6b</span>
                        <ArrowUpDown className="w-3 h-3 text-rose-300" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('hp_econ')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>HP Econ (Exp)</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('hp_wickets')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>HP Wkts (Balls)</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('wk_per100')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Wkts/100b</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('hp_dot_pct')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Dot %</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('hp_boundary_pct')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Boundary %</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('reliability')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Reliability</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredV2Bowlers.map((bowler) => {
                    const isLowReliability = bowler.reliability < 0.6;
                    return (
                      <tr
                        key={bowler.player_id}
                        onClick={() => onSelectV2Bowler(bowler)}
                        className="hover:bg-blue-50/60 cursor-pointer transition"
                      >
                        <td className="py-3 px-3 font-mono font-bold">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                            bowler.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                            bowler.rank === 2 ? 'bg-slate-200 text-slate-800' :
                            bowler.rank === 3 ? 'bg-amber-700 text-white' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {bowler.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 text-sm">{bowler.player}</div>
                          <div className="flex items-center space-x-1.5 mt-0.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {bowler.role} Phase
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {bowler.player_id}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                          {formatNumber(bowler.score, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold bg-rose-50/50 text-rose-700">
                          {formatNumber(bowler.runs_saved_per6, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-800">
                          <span className="font-bold">{formatNumber(bowler.hp_econ, 2)}</span>
                          <span className="text-slate-400 text-[11px] ml-1">({formatNumber(bowler.expected_econ, 2)})</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-800">
                          <span className="font-bold">{bowler.hp_wickets}</span>
                          <span className="text-slate-400 text-[11px] ml-1">({bowler.hp_legal}b / {bowler.hp_matches}m)</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {formatNumber(bowler.wk_per100, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatPercent(bowler.hp_dot_pct)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatPercent(bowler.hp_boundary_pct)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                            isLowReliability ? 'bg-amber-100 text-amber-800' : 'text-slate-600'
                          }`}>
                            {formatNumber(bowler.reliability, 3)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* V1 BOWLER TABLE (PRESERVED) */
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800">
            <strong>Preserved V1 Baseline:</strong> Displaying the original Top 10 Bowlers evaluated under fixed threshold &ge; 65 across an undivided pool of 32 candidates.
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-4">Bowler</th>
                    <th className="py-3 px-3 text-right">Score</th>
                    <th className="py-3 px-3 text-right">Saved / 6b</th>
                    <th className="py-3 px-3 text-right">HP Econ</th>
                    <th className="py-3 px-3 text-right">Exp Econ</th>
                    <th className="py-3 px-3 text-right">HP Wkts (Balls)</th>
                    <th className="py-3 px-3 text-right">Dot %</th>
                    <th className="py-3 px-3 text-right">Reliability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {v1Bowlers.map((bowler) => (
                    <tr
                      key={bowler.bowler_id}
                      onClick={() => onSelectV1Bowler(bowler)}
                      className="hover:bg-blue-50/60 cursor-pointer transition"
                    >
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs bg-slate-100 text-slate-700">
                          {bowler.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                        {bowler.bowler_name}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                        {formatNumber(bowler.score, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-rose-700">
                        {formatNumber(bowler.runs_saved_per6, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-900 font-bold">
                        {formatNumber(bowler.hp_econ, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-500">
                        {formatNumber(bowler.hp_expected_econ, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-800">
                        {bowler.hp_wickets} ({bowler.hp_legal}b)
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {formatPercent(bowler.hp_dot_pct)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-600">
                        {formatNumber(bowler.reliability, 3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
