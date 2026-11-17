import React, { useState, useMemo } from 'react';
import { 
  Target, 
  Search, 
  ArrowUpDown, 
  RotateCcw, 
  AlertTriangle, 
  HelpCircle, 
  BarChart3, 
  Eye, 
  TrendingDown
} from 'lucide-react';
import type { BowlerRecord } from '../types/cricket';
import { formatNumber, formatPercent, formatRunsSaved } from '../utils/formatters';

interface BowlerLeaderboardSectionProps {
  bowlers: BowlerRecord[];
  onSelectBowler: (bowler: BowlerRecord) => void;
}

type SortField = 'rank' | 'score' | 'hp_conceded' | 'hp_legal' | 'hp_econ' | 'hp_expected_econ' | 'runs_saved_per6' | 'hp_wickets' | 'hp_dot_pct' | 'hp_matches';

export const BowlerLeaderboardSection: React.FC<BowlerLeaderboardSectionProps> = ({
  bowlers,
  onSelectBowler,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [chartView, setChartView] = useState<'econ_compare' | 'score'>('econ_compare');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'rank' ? true : false);
    }
  };

  const resetSort = () => {
    setSortField('rank');
    setSortAsc(true);
    setSearchTerm('');
  };

  const filteredBowlers = useMemo(() => {
    let result = [...bowlers];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((b) => b.bowler_name.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const valA: number = (a[sortField] as number) ?? 0;
      const valB: number = (b[sortField] as number) ?? 0;
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return result;
  }, [bowlers, searchTerm, sortField, sortAsc]);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-700 mb-1">
              <Target className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Top 10 Rankings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top 10 Bowlers Under Pressure
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Screened candidates meeting minimum criteria (≥60 total legal balls, ≥24 HP balls, ≥4 HP matches). Evaluated on runs saved against contextual expectation, dot balls, strike rate, and economy.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200">
              Threshold: HP ≥ 65
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
              N = 10 Bowlers
            </span>
          </div>
        </div>
      </div>

      {/* CRITICAL ANALYTICAL WARNING BANNER */}
      <div className="bg-amber-50/80 border-l-4 border-amber-500 rounded-r-lg p-5 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm uppercase tracking-wide">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>IMPORTANT ANALYTICAL WARNING: Universal Negative Contextual Runs Saved</span>
        </div>
        <p className="text-sm font-medium text-amber-950 leading-relaxed">
          "Every bowler in this exploratory top 10 conceded more than the model's contextual expected baseline in the selected high-pressure deliveries. Composite scores are relative within the eligible candidate pool and should not be interpreted as proof of objectively strong pressure bowling."
        </p>
        <div className="text-xs text-amber-800 pt-1 border-t border-amber-200/60 leading-normal">
          <strong>Key Takeaway:</strong> In modern IPL death and crunch leverage deliveries, batters attack aggressively. As a result, all top 10 qualifiers yielded higher runs than the empirical state expectation (runs saved/6 ranges from -1.54 to -5.21). Ranks indicate <em>relative</em> standing inside this candidate pool, not absolute defensive suppression.
        </div>
      </div>

      {/* Pressure Economy vs Expected Economy Comparison Visual */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {chartView === 'econ_compare' 
                ? 'Pressure Economy vs Contextual Expected Economy Benchmark' 
                : 'Composite Ranking Score Benchmark'}
            </h3>
          </div>
          <div className="inline-flex rounded-md shadow-sm border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => setChartView('econ_compare')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                chartView === 'econ_compare'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Economy vs Expected
            </button>
            <button
              onClick={() => setChartView('score')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                chartView === 'score'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Composite Score
            </button>
          </div>
        </div>

        {chartView === 'econ_compare' && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center space-x-6 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-slate-800"></span>
                <span>Actual HP Economy Rate</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-blue-500"></span>
                <span>Contextual Expected Economy Baseline</span>
              </div>
              <div className="flex items-center space-x-1.5 text-amber-700 font-semibold">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Difference = Runs Conceded Above Expectation</span>
              </div>
            </div>

            <div className="space-y-3">
              {bowlers.map((b) => {
                const maxEcon = 18;
                const actualWidth = Math.min(100, (b.hp_econ / maxEcon) * 100);
                const expWidth = Math.min(100, (b.hp_expected_econ / maxEcon) * 100);

                return (
                  <div 
                    key={b.bowler_id}
                    onClick={() => onSelectBowler(b)}
                    className="p-2 hover:bg-slate-50 rounded transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 font-mono font-bold text-slate-500">#{b.rank}</span>
                        <span className="font-semibold text-slate-900 group-hover:text-blue-700">{b.bowler_name}</span>
                        <span className="text-slate-400 font-mono text-[11px]">({b.hp_legal} legal balls)</span>
                      </div>
                      <div className="font-mono text-xs">
                        <span className="text-slate-900 font-bold">{formatNumber(b.hp_econ, 2)}</span>
                        <span className="text-slate-400 mx-1">vs</span>
                        <span className="text-blue-700 font-medium">{formatNumber(b.hp_expected_econ, 2)} exp</span>
                        <span className="text-amber-700 font-semibold ml-2">
                          ({formatRunsSaved(b.runs_saved_per6)}/6)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {/* Actual HP Economy Bar */}
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-slate-800 h-full rounded-full transition-all duration-500"
                          style={{ width: `${actualWidth}%` }}
                        />
                      </div>
                      {/* Contextual Expected Economy Bar */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${expWidth}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {chartView === 'score' && (
          <div className="space-y-2.5 pt-2">
            {bowlers.map((b) => {
              const pctWidth = Math.min(100, Math.max(10, (b.score / 80) * 100));
              return (
                <div 
                  key={b.bowler_id} 
                  onClick={() => onSelectBowler(b)}
                  className="flex items-center space-x-3 group cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
                >
                  <div className="w-6 font-mono font-bold text-xs text-slate-500 text-right shrink-0">
                    #{b.rank}
                  </div>
                  <div className="w-36 sm:w-44 font-semibold text-xs sm:text-sm text-slate-900 truncate group-hover:text-blue-700">
                    {b.bowler_name}
                  </div>
                  <div className="flex-1 bg-slate-100 h-6 rounded overflow-hidden relative flex items-center">
                    <div 
                      className="h-full bg-blue-700 transition-all duration-500 rounded"
                      style={{ width: `${pctWidth}%` }}
                    />
                    <span className="absolute right-2 font-mono font-bold text-xs text-slate-700">
                      {formatNumber(b.score, 2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
              placeholder="Search by bowler name..."
              className="w-full pl-9 pr-3 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-500 font-mono">
              Showing {filteredBowlers.length} of {bowlers.length}
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
                  <span>Bowler Name</span>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('score')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Composite</span>
                    <ArrowUpDown className="w-3 h-3 text-blue-600" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_conceded')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>HP Runs (Balls)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_econ')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>HP Econ</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_expected_econ')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Expected Econ</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('runs_saved_per6')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>Runs Saved/6</span>
                    <ArrowUpDown className="w-3 h-3 text-amber-600" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_wickets')}>
                  <div className="flex items-center justify-end space-x-1">
                    <span>HP Wkts</span>
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
              {filteredBowlers.map((b) => (
                <tr 
                  key={b.bowler_id}
                  onClick={() => onSelectBowler(b)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                    <span className="w-6 h-6 rounded bg-slate-100 group-hover:bg-blue-600 group-hover:text-white inline-flex items-center justify-center transition-colors">
                      {b.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 group-hover:text-blue-700">
                    <div className="flex items-center space-x-1.5">
                      <span>{b.bowler_name}</span>
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
                    {b.hp_conceded} <span className="text-slate-400">({b.hp_legal}b)</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatNumber(b.hp_econ, 2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-blue-700">
                    {formatNumber(b.hp_expected_econ, 2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-700">
                    {formatRunsSaved(b.runs_saved_per6)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700">
                    {b.hp_wickets} <span className="text-slate-400 font-normal">({formatNumber(b.hp_wk_per100, 1)}/100)</span>
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
                        onSelectBowler(b);
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

      {/* Metric Definitions & Warning Interpretation Note */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <HelpCircle className="w-4 h-4 text-slate-700" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Bowler Metric Definitions & Cautionary Note
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600 leading-relaxed">
          <div>
            <strong className="text-slate-900 block mb-0.5">Contextual Expected Economy:</strong>
            The expected economy rate based on historical runs per ball in the matching innings, phase, and wicket state.
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5">Runs Saved per 6:</strong>
            (Expected Runs - Actual Runs Conceded) / Legal Balls × 6. Negative values denote that more runs were conceded than expected baseline.
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5">HP Dot Ball %:</strong>
            Percentage of legal high-pressure balls that yielded 0 runs. Critical for bowling control in death and leverage phases.
          </div>
          <div>
            <strong className="text-slate-900 block mb-0.5">Relative vs Absolute Standing:</strong>
            Higher composite scores indicate better relative ranking within the screened pool, not objective mastery of clutch bowling.
          </div>
        </div>
      </div>
    </div>
  );
};
