import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  ArrowUpDown, 
  RotateCcw, 
  Download, 
  Flame, 
  Target
} from 'lucide-react';
import type { BatterRecord, BowlerRecord } from '../types/cricket';
import { formatNumber, formatPercent, formatRunsSaved } from '../utils/formatters';
import { downloadCsv } from '../data/superrrLoader';

interface CandidateExplorerSectionProps {
  allBatters: BatterRecord[];
  allBowlers: BowlerRecord[];
  rawCsvs: {
    allBatters: string;
    allBowlers: string;
  };
  onSelectBatter: (batter: BatterRecord) => void;
  onSelectBowler: (bowler: BowlerRecord) => void;
}

export const CandidateExplorerSection: React.FC<CandidateExplorerSectionProps> = ({
  allBatters,
  allBowlers,
  rawCsvs,
  onSelectBatter,
  onSelectBowler,
}) => {
  const [activeTab, setActiveTab] = useState<'batters' | 'bowlers'>('batters');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('rank');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [filterTop10Only, setFilterTop10Only] = useState<boolean>(false);

  const handleTabChange = (tab: 'batters' | 'bowlers') => {
    setActiveTab(tab);
    setSearchTerm('');
    setSortField('rank');
    setSortAsc(true);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(field === 'rank' ? true : false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortField('rank');
    setSortAsc(true);
    setFilterTop10Only(false);
  };

  const filteredBatters = useMemo(() => {
    let list = [...allBatters];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((b) => b.striker_name.toLowerCase().includes(q));
    }
    if (filterTop10Only) {
      list = list.filter((b) => (b.rank ?? 999) <= 10);
    }
    list.sort((a, b) => {
      // @ts-expect-error dynamic key access
      let valA = a[sortField] ?? 0;
      // @ts-expect-error dynamic key access
      let valB = b[sortField] ?? 0;
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return list;
  }, [allBatters, searchTerm, filterTop10Only, sortField, sortAsc]);

  const filteredBowlers = useMemo(() => {
    let list = [...allBowlers];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((b) => b.bowler_name.toLowerCase().includes(q));
    }
    if (filterTop10Only) {
      list = list.filter((b) => (b.rank ?? 999) <= 10);
    }
    list.sort((a, b) => {
      // @ts-expect-error dynamic key access
      let valA = a[sortField] ?? 0;
      // @ts-expect-error dynamic key access
      let valB = b[sortField] ?? 0;
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
    return list;
  }, [allBowlers, searchTerm, filterTop10Only, sortField, sortAsc]);

  const handleExportCsv = () => {
    if (activeTab === 'batters') {
      downloadCsv('ipl_batter_rankings_all.csv', rawCsvs.allBatters);
    } else {
      downloadCsv('ipl_bowler_rankings_all.csv', rawCsvs.allBowlers);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-700 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Candidate Pool Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Full Screened Candidate Database
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Complete universe of players meeting IPL 2022–2026 eligibility thresholds. Inspect all 37 qualified batters and 32 qualified bowlers with comprehensive stats, percentiles, and shrinkage factors.
            </p>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-blue-300" />
            <span>Export {activeTab === 'batters' ? 'Batters' : 'Bowlers'} CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => handleTabChange('batters')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-wider transition-colors ${
            activeTab === 'batters'
              ? 'bg-white text-blue-700 border-t-2 border-blue-600 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-4 h-4 text-pink-600" />
          <span>All Eligible Batters ({allBatters.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('bowlers')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-wider transition-colors ${
            activeTab === 'bowlers'
              ? 'bg-white text-blue-700 border-t-2 border-blue-600 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4 text-blue-700" />
          <span>All Eligible Bowlers ({allBowlers.length})</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === 'batters' ? 'batters' : 'bowlers'} by name...`}
            className="w-full pl-9 pr-3 py-1.5 rounded bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center space-x-1.5 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterTop10Only}
              onChange={(e) => setFilterTop10Only(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
            />
            <span className="font-medium">Top 10 Only</span>
          </label>

          <span className="text-slate-500 font-mono">
            Showing {activeTab === 'batters' ? filteredBatters.length : filteredBowlers.length} of{' '}
            {activeTab === 'batters' ? allBatters.length : allBowlers.length} candidates
          </span>

          <button
            onClick={resetFilters}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Tables */}
      {activeTab === 'batters' && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3 w-12 text-center cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('rank')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>#</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('striker_name')}>
                    <div className="flex items-center space-x-1">
                      <span>Striker</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('score')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Score</span>
                      <ArrowUpDown className="w-3 h-3 text-blue-600" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_runs')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>HP Runs</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_balls')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>HP Balls</span>
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
                      <span>Ret %</span>
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
                      <span>Bound %</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_dot_pct')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Dot %</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('reliability')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Reliability</span>
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
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                      {b.rank}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 group-hover:text-blue-700">
                      <div className="flex items-center space-x-1.5">
                        <span>{b.striker_name}</span>
                        {b.rank && b.rank <= 10 && (
                          <span className="text-[10px] px-1 py-0.2 rounded bg-pink-100 text-pink-800 font-mono font-bold">
                            Top 10
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 bg-slate-50/50">
                      {formatNumber(b.score, 2)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{b.hp_runs}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{b.hp_balls}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{formatNumber(b.hp_sr, 1)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">{formatNumber(b.all_sr, 1)}</td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      <span className={b.sr_retention >= 100 ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
                        {formatNumber(b.sr_retention, 1)}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatNumber(b.hp_avg, 1)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatPercent(b.hp_boundary_pct, 1)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatPercent(b.hp_dot_pct, 1)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">{formatNumber(b.reliability, 3)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBatter(b);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-medium transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bowlers' && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-3 w-12 text-center cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('rank')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>#</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('bowler_name')}>
                    <div className="flex items-center space-x-1">
                      <span>Bowler</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('score')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Score</span>
                      <ArrowUpDown className="w-3 h-3 text-blue-600" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_conceded')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Conceded</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_legal')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Legal Balls</span>
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
                      <span>Exp Econ</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('runs_saved_per6')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Saved/6</span>
                      <ArrowUpDown className="w-3 h-3 text-amber-600" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_wickets')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Wkts</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('hp_dot_pct')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Dot %</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('reliability')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Reliability</span>
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
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                      {b.rank}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900 group-hover:text-blue-700">
                      <div className="flex items-center space-x-1.5">
                        <span>{b.bowler_name}</span>
                        {b.rank && b.rank <= 10 && (
                          <span className="text-[10px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-mono font-bold">
                            Top 10
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 bg-slate-50/50">
                      {formatNumber(b.score, 2)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{b.hp_conceded}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{b.hp_legal}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{formatNumber(b.hp_econ, 2)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-blue-700">{formatNumber(b.hp_expected_econ, 2)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span className={b.runs_saved_per6 < 0 ? 'text-amber-700' : 'text-slate-700'}>
                        {formatRunsSaved(b.runs_saved_per6)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{b.hp_wickets}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatPercent(b.hp_dot_pct, 1)}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">{formatNumber(b.reliability, 3)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBowler(b);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-medium transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
