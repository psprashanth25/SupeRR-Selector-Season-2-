import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Download, 
  Search, 
  ArrowUpDown, 
  Info
} from 'lucide-react';
import type { V2BatterRecord, BatterRecord } from '../types/cricket';
import { formatNumber, formatPercent } from '../utils/formatters';
import { downloadCsv } from '../data/superrrLoader';

interface BatterLeaderboardProps {
  v2Batters: V2BatterRecord[];
  v1Batters: BatterRecord[];
  rawV2Csv: string;
  rawV1Csv: string;
  onSelectV2Batter: (batter: V2BatterRecord) => void;
  onSelectV1Batter: (batter: BatterRecord) => void;
}

type SortField = 
  | 'rank' 
  | 'score' 
  | 'hp_runs' 
  | 'hp_balls' 
  | 'hp_sr' 
  | 'hp_avg' 
  | 'hp_boundary_pct' 
  | 'hp_dot_pct' 
  | 'sr_retention' 
  | 'reliability';

export const BatterLeaderboardSection: React.FC<BatterLeaderboardProps> = ({
  v2Batters,
  v1Batters,
  rawV2Csv,
  rawV1Csv,
  onSelectV2Batter,
  onSelectV1Batter,
}) => {
  const [modelMode, setModelMode] = useState<'v2' | 'v1'>('v2');
  const [roleFilter, setRoleFilter] = useState<string>('all');
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

  const filteredV2Batters = useMemo(() => {
    let result = [...v2Batters];

    if (roleFilter !== 'all') {
      result = result.filter(b => b.role.toLowerCase() === roleFilter.toLowerCase());
    }

    if (searchTerm.trim()) {
      result = result.filter(b => 
        b.player.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    result.sort((a, b) => {
      let aVal = a[sortField as keyof V2BatterRecord] as number;
      let bVal = b[sortField as keyof V2BatterRecord] as number;

      if (sortField === 'hp_avg') {
        aVal = a.hp_avg ?? 0;
        bVal = b.hp_avg ?? 0;
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return result;
  }, [v2Batters, roleFilter, searchTerm, sortField, sortDirection]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-pink-100 text-pink-700 rounded-lg">
                <Flame className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Top 10 Batters Performing Under Pressure
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Ranked using Bayesian-shrunk multi-metric percentiles across pressure scoring rate, dismissal resistance, boundary generation, and dot-ball mitigation.
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

        {/* Analytical Note */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              {modelMode === 'v2' ? (
                <>
                  <strong>V2 High Pressure:</strong> Phase- &amp; innings-specific 70th percentile cutoff (min 35). Roles: Opener (1-2), Middle order (3-5), Finisher (6-7).
                </>
              ) : (
                <>
                  <strong>V1 High Pressure:</strong> Single fixed pre-delivery threshold &ge; 65 across all phases. Single undivided pool.
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => downloadCsv(
              modelMode === 'v2' ? 'v2_top10_batters.csv' : 'v1_ipl_top10_batters.csv',
              modelMode === 'v2' ? rawV2Csv : rawV1Csv
            )}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {modelMode === 'v2' ? (
        /* V2 LEADERBOARD */
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Filter Role:</span>
              {['all', 'opener', 'middle order', 'finisher'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize transition ${
                    roleFilter === role
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search player..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
              />
            </div>
          </div>

          {/* V2 Table */}
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
                    <th className="py-3 px-4">Player &amp; Role</th>
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
                      onClick={() => handleSort('hp_runs')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>HP Runs (Balls)</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('hp_sr')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>HP SR</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('hp_avg')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>HP Avg</span>
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
                      onClick={() => handleSort('hp_dot_pct')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>Dot %</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('sr_retention')} 
                      className="py-3 px-3 cursor-pointer hover:bg-slate-800 transition text-right"
                    >
                      <div className="flex items-center justify-end space-x-1">
                        <span>SR Retention</span>
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
                  {filteredV2Batters.map((batter) => {
                    return (
                      <tr
                        key={batter.player_id}
                        onClick={() => onSelectV2Batter(batter)}
                        className="hover:bg-blue-50/60 cursor-pointer transition"
                      >
                        <td className="py-3 px-3 font-mono font-bold">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                            batter.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                            batter.rank === 2 ? 'bg-slate-200 text-slate-800' :
                            batter.rank === 3 ? 'bg-amber-700 text-white' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {batter.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 text-sm">{batter.player}</div>
                          <div className="flex items-center space-x-1.5 mt-0.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {batter.role}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {batter.player_id}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                          {formatNumber(batter.score, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-800">
                          <span className="font-bold">{formatNumber(batter.hp_runs, 0)}</span>
                          <span className="text-slate-400 text-[11px] ml-1">({batter.hp_balls}b / {batter.hp_matches}m)</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {formatNumber(batter.hp_sr, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatNumber(batter.hp_avg, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatPercent(batter.hp_boundary_pct)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatPercent(batter.hp_dot_pct)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          <span className={`px-1.5 py-0.5 rounded font-bold ${
                            batter.sr_retention >= 85 ? 'bg-emerald-50 text-emerald-700' :
                            batter.sr_retention >= 70 ? 'bg-blue-50 text-blue-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {formatNumber(batter.sr_retention, 1)}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-600">
                          {formatNumber(batter.reliability, 3)}
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
        /* V1 LEADERBOARD (PRESERVED BASELINE) */
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800">
            <strong>Preserved V1 Baseline:</strong> Displaying the original Top 10 Batters evaluated under fixed high-pressure threshold &ge; 65 across an undivided pool of 37 candidates.
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-4">Player</th>
                    <th className="py-3 px-3 text-right">Score</th>
                    <th className="py-3 px-3 text-right">HP Runs (Balls)</th>
                    <th className="py-3 px-3 text-right">HP SR</th>
                    <th className="py-3 px-3 text-right">HP Avg</th>
                    <th className="py-3 px-3 text-right">Boundary %</th>
                    <th className="py-3 px-3 text-right">Dot %</th>
                    <th className="py-3 px-3 text-right">SR Retention</th>
                    <th className="py-3 px-3 text-right">Reliability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {v1Batters.map((batter) => (
                    <tr
                      key={batter.striker_id}
                      onClick={() => onSelectV1Batter(batter)}
                      className="hover:bg-blue-50/60 cursor-pointer transition"
                    >
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs bg-slate-100 text-slate-700">
                          {batter.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                        {batter.striker_name}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                        {formatNumber(batter.score, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-800">
                        {formatNumber(batter.hp_runs, 0)} ({batter.hp_balls}b)
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        {formatNumber(batter.hp_sr, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {formatNumber(batter.hp_avg, 2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {formatPercent(batter.hp_boundary_pct)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {formatPercent(batter.hp_dot_pct)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono">
                        {formatPercent(batter.sr_retention)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-600">
                        {formatNumber(batter.reliability, 3)}
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
