import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Search, 
  ArrowUpDown, 
  RotateCcw, 
  HelpCircle, 
  BarChart3, 
  Eye
} from 'lucide-react';
import type { BatterRecord } from '../types/cricket';
import { formatNumber, formatPercent } from '../utils/formatters';

interface BatterLeaderboardSectionProps {
  batters: BatterRecord[];
  onSelectBatter: (batter: BatterRecord) => void;
}

type SortField = 'rank' | 'score' | 'hp_runs' | 'hp_balls' | 'hp_sr' | 'hp_avg' | 'all_sr' | 'sr_retention' | 'hp_boundary_pct' | 'hp_dot_pct' | 'hp_matches';

export const BatterLeaderboardSection: React.FC<BatterLeaderboardSectionProps> = ({
  batters,
  onSelectBatter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [selectedChartMetric, setSelectedChartMetric] = useState<'score' | 'hp_sr' | 'sr_retention'>('score');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      // For score and strike rate, default to descending
      setSortAsc(field === 'rank' ? true : false);
    }
  };

  const resetSort = () => {
    setSortField('rank');
    setSortAsc(true);
    setSearchTerm('');
  };

  const filteredBatters = useMemo(() => {
    let result = [...batters];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((b) => b.striker_name.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const valA: number = (a[sortField] as number) ?? 0;
      const valB: number = (b[sortField] as number) ?? 0;
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return result;
  }, [batters, searchTerm, sortField, sortAsc]);

  const maxChartVal = useMemo(() => {
    if (selectedChartMetric === 'score') return 80;
    if (selectedChartMetric === 'hp_sr') return 180;
    return 130;
  }, [selectedChartMetric]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-pink-600 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Top 10 Rankings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top 10 Batters Under Pressure
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Screened candidates meeting minimum criteria (≥100 balls, ≥20 HP balls, ≥4 HP matches, median order ≤7). Ranked by multi-component composite score with Empirical Bayes shrinkage.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-pink-50 text-pink-700 rounded border border-pink-200">
              Threshold: HP ≥ 65
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
              N = 10 Batters
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Composite Score Comparison Chart */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Leaderboard Benchmark Chart
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Metric:</span>
            <div className="inline-flex rounded-md shadow-sm border border-slate-200 p-0.5 bg-slate-50 text-xs">
              <button
                onClick={() => setSelectedChartMetric('score')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedChartMetric === 'score'
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Composite Score
              </button>
              <button
                onClick={() => setSelectedChartMetric('hp_sr')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedChartMetric === 'hp_sr'
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                HP Strike Rate
              </button>
              <button
                onClick={() => setSelectedChartMetric('sr_retention')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedChartMetric === 'sr_retention'
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SR Retention %
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          {batters.map((b) => {
            let currentVal = b.score;
            let displayVal = formatNumber(b.score, 2);
            let barColor = 'bg-blue-600';

            if (selectedChartMetric === 'hp_sr') {
              currentVal = b.hp_sr;
              displayVal = formatNumber(b.hp_sr, 1);
              barColor = 'bg-pink-600';
            } else if (selectedChartMetric === 'sr_retention') {
              currentVal = b.sr_retention;
              displayVal = `${formatNumber(b.sr_retention, 1)}%`;
              barColor = b.sr_retention >= 100 ? 'bg-emerald-600' : 'bg-blue-600';
            }

            const pctWidth = Math.min(100, Math.max(10, (currentVal / maxChartVal) * 100));

            return (
              <div 
                key={b.striker_id} 
                onClick={() => onSelectBatter(b)}
                className="flex items-center space-x-3 group cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
              >
                <div className="w-6 font-mono font-bold text-xs text-slate-500 text-right shrink-0">
                  #{b.rank}
                </div>
                <div className="w-36 sm:w-44 font-semibold text-xs sm:text-sm text-slate-900 truncate group-hover:text-blue-700">
                  {b.striker_name}
                </div>
                <div className="flex-1 bg-slate-100 h-6 rounded overflow-hidden relative flex items-center">
                  <div 
                    className={`h-full ${barColor} transition-all duration-500 rounded`}
                    style={{ width: `${pctWidth}%` }}
                  />
                  <span className="absolute right-2 font-mono font-bold text-xs text-slate-700">
                    {displayVal}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Leaderboard Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {/* Table Search & Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by batter name..."
              className="w-full pl-9 pr-3 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-500 font-mono">
              Showing {filteredBatters.length} of {batters.length}
            </span>
            <button
              onClick={resetSort}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors font-medium"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Reset Sort</span>
            </button>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 w-12 text-center cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('rank')}>
                  <div className="flex items-center justify-center space-x-1">
                    <span>Rank</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">
                  <span>Player Name</span>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('score')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Composite</span>
                    <ArrowUpDown className="w-3 h-3 text-blue-600" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_runs')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>HP Runs (Balls)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_sr')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>HP SR</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('all_sr')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>All SR</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('sr_retention')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>SR Ret %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_avg')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>HP Avg</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_boundary_pct')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Boundary %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_dot_pct')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Dot %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_matches')}>
                  <div className="flex items-center justify-center space-x-1">
                    <span>Matches</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBatters.map((b) => (
                <tr 
                  key={b.striker_id}
                  onClick={() => onSelectBatter(b)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                    <span className="w-6 h-6 rounded bg-slate-100 group-hover:bg-blue-600 group-hover:text-white inline-flex items-center justify-center transition-colors">
                      {b.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 group-hover:text-blue-700">
                    <div className="flex items-center space-x-1.5">
                      <span>{b.striker_name}</span>
                      {b.rank && b.rank <= 3 && (
                        <span className="text-[10px] px-1 rounded bg-amber-100 text-amber-800 font-mono font-bold">
                          Podium
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 bg-slate-50/50">
                    {formatNumber(b.score, 2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {b.hp_runs} <span className="text-slate-400">({b.hp_balls}b)</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatNumber(b.hp_sr, 1)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">
                    {formatNumber(b.all_sr, 1)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold">
                    <span className={b.sr_retention >= 100 ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
                      {formatNumber(b.sr_retention, 1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {formatNumber(b.hp_avg, 1)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {formatPercent(b.hp_boundary_pct, 1)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {formatPercent(b.hp_dot_pct, 1)}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    {b.hp_matches}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBatter(b);
                      }}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-medium transition-colors inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metric Definitions Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <HelpCircle className="w-4 h-4 text-slate-700" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Batter Metric Definitions & Interpretation
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600 leading-relaxed">
          <div>
            <strong className="text-slate-900 block mb-0.5">HP Strike Rate:</strong>
            Total runs scored divided by legal balls faced in deliveries with leverage index ≥ 65, multiplied by 100.
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5">Strike-Rate Retention %:</strong>
            Ratio of High-Pressure SR to Overall IPL SR (HP SR / All SR × 100). Measures ability to maintain or exceed normal tempo under severe match stress.
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5">High-Pressure Average:</strong>
            High-pressure runs scored divided by high-pressure dismissals. High values signify lower wicket volatility in crunch moments.
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5">Reliability Shrinkage:</strong>
            Empirical Bayes weight n / (n + 60) applied toward pool median (50) to protect against small-sample noise.
          </div>
        </div>
      </div>
    </div>
  );
};
