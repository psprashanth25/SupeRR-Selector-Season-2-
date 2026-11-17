import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  ArrowUpDown, 
  Award
} from 'lucide-react';
import type { 
  V2BatterRecord, 
  V2BowlerRecord,
  BatterRecord,
  BowlerRecord
} from '../types/cricket';
import { formatNumber, formatPercent } from '../utils/formatters';
import { downloadCsv } from '../data/superrrLoader';

interface CandidateExplorerProps {
  v2AllBatters: V2BatterRecord[];
  v2AllBowlers: V2BowlerRecord[];
  v1AllBatters: BatterRecord[];
  v1AllBowlers: BowlerRecord[];
  rawCsvs: {
    v2Batters: string;
    v2Bowlers: string;
    v1Batters: string;
    v1Bowlers: string;
  };
  onSelectV2Batter: (batter: V2BatterRecord) => void;
  onSelectV2Bowler: (bowler: V2BowlerRecord) => void;
  onSelectV1Batter: (batter: BatterRecord) => void;
  onSelectV1Bowler: (bowler: BowlerRecord) => void;
}

export const CandidateExplorerSection: React.FC<CandidateExplorerProps> = ({
  v2AllBatters,
  v2AllBowlers,
  v1AllBatters,
  v1AllBowlers,
  rawCsvs,
  onSelectV2Batter,
  onSelectV2Bowler,
  onSelectV1Batter,
  onSelectV1Bowler
}) => {
  const [modelMode, setModelMode] = useState<'v2' | 'v1'>('v2');
  const [discipline, setDiscipline] = useState<'batters' | 'bowlers'>('batters');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'top10' | 'rest'>('all');
  const [sortField, setSortField] = useState<string>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'rank' ? 'asc' : 'desc');
    }
  };

  // Filtered V2 Batters
  const filteredV2Batters = useMemo(() => {
    let result = [...v2AllBatters];

    if (roleFilter !== 'all') {
      result = result.filter(b => b.role.toLowerCase() === roleFilter.toLowerCase());
    }

    if (statusFilter === 'top10') {
      result = result.filter(b => b.rank <= 10);
    } else if (statusFilter === 'rest') {
      result = result.filter(b => b.rank > 10);
    }

    if (searchTerm.trim()) {
      result = result.filter(b => 
        b.player.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    result.sort((a, b) => {
      const aVal = (a as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      const bVal = (b as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return result;
  }, [v2AllBatters, roleFilter, statusFilter, searchTerm, sortField, sortDirection]);

  // Filtered V2 Bowlers
  const filteredV2Bowlers = useMemo(() => {
    let result = [...v2AllBowlers];

    if (roleFilter !== 'all') {
      result = result.filter(b => b.role.toLowerCase() === roleFilter.toLowerCase());
    }

    if (statusFilter === 'top10') {
      result = result.filter(b => b.rank <= 10);
    } else if (statusFilter === 'rest') {
      result = result.filter(b => b.rank > 10);
    }

    if (searchTerm.trim()) {
      result = result.filter(b => 
        b.player.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    result.sort((a, b) => {
      const aVal = (a as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      const bVal = (b as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return result;
  }, [v2AllBowlers, roleFilter, statusFilter, searchTerm, sortField, sortDirection]);

  // Filtered V1 Batters
  const filteredV1Batters = useMemo(() => {
    let result = [...v1AllBatters];

    if (statusFilter === 'top10') {
      result = result.filter(b => (b.rank ?? 0) <= 10);
    } else if (statusFilter === 'rest') {
      result = result.filter(b => (b.rank ?? 0) > 10);
    }

    if (searchTerm.trim()) {
      result = result.filter(b => 
        b.striker_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    result.sort((a, b) => {
      const aVal = (a as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      const bVal = (b as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return result;
  }, [v1AllBatters, statusFilter, searchTerm, sortField, sortDirection]);

  // Filtered V1 Bowlers
  const filteredV1Bowlers = useMemo(() => {
    let result = [...v1AllBowlers];

    if (statusFilter === 'top10') {
      result = result.filter(b => (b.rank ?? 0) <= 10);
    } else if (statusFilter === 'rest') {
      result = result.filter(b => (b.rank ?? 0) > 10);
    }

    if (searchTerm.trim()) {
      result = result.filter(b => 
        b.bowler_name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    result.sort((a, b) => {
      const aVal = (a as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      const bVal = (b as unknown as Record<string, unknown>)[sortField] as number ?? 0;
      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return result;
  }, [v1AllBowlers, statusFilter, searchTerm, sortField, sortDirection]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Complete Candidate Explorer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Inspect the entire qualified player cohort. Filter by role, search players, and distinguish Top 10 selections from the broader eligible candidate pool.
            </p>
          </div>

          {/* Model Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => { setModelMode('v2'); setRoleFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                modelMode === 'v2'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Model V2 (112 Batters / 129 Bowlers)
            </button>
            <button
              onClick={() => { setModelMode('v1'); setRoleFilter('all'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                modelMode === 'v1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Model V1 (37 Batters / 32 Bowlers)
            </button>
          </div>
        </div>

        {/* Sub-bar: Discipline Tabs + Export */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setDiscipline('batters'); setRoleFilter('all'); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                discipline === 'batters'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Batters Pool</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-pink-300">
                {modelMode === 'v2' ? v2AllBatters.length : v1AllBatters.length}
              </span>
            </button>
            <button
              onClick={() => { setDiscipline('bowlers'); setRoleFilter('all'); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                discipline === 'bowlers'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Bowlers Pool</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-blue-300">
                {modelMode === 'v2' ? v2AllBowlers.length : v1AllBowlers.length}
              </span>
            </button>
          </div>

          <button
            onClick={() => {
              if (modelMode === 'v2') {
                if (discipline === 'batters') downloadCsv('v2_batter_rankings_all.csv', rawCsvs.v2Batters);
                else downloadCsv('v2_bowler_rankings_all.csv', rawCsvs.v2Bowlers);
              } else {
                if (discipline === 'batters') downloadCsv('v1_ipl_batter_rankings_all.csv', rawCsvs.v1Batters);
                else downloadCsv('v1_ipl_bowler_rankings_all.csv', rawCsvs.v1Bowlers);
              }
            }}
            className="inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Full Cohort CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                statusFilter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              All Pool
            </button>
            <button
              onClick={() => setStatusFilter('top10')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                statusFilter === 'top10' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Top 10 Only
            </button>
            <button
              onClick={() => setStatusFilter('rest')}
              className={`px-2.5 py-1 rounded font-medium transition ${
                statusFilter === 'rest' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              Beyond Top 10
            </button>
          </div>

          {/* Role Filter (V2 Only) */}
          {modelMode === 'v2' && (
            <div className="flex items-center space-x-1 ml-0 sm:ml-2">
              <span className="text-xs text-slate-500 font-semibold mr-1">Role:</span>
              {(discipline === 'batters' 
                ? ['all', 'opener', 'middle order', 'finisher'] 
                : ['all', 'powerplay', 'middle', 'death']
              ).map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-2.5 py-1 text-xs rounded-full capitalize transition ${
                    roleFilter === role
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={`Search ${discipline === 'batters' ? 'batters' : 'bowlers'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>

      {/* Main Table Display */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {modelMode === 'v2' && discipline === 'batters' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px] select-none">
                  <th onClick={() => handleSort('rank')} className="py-3 px-3 cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center space-x-1"><span>Rank</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th className="py-3 px-4">Player &amp; Role</th>
                  <th className="py-3 px-3 text-center">Selection Status</th>
                  <th onClick={() => handleSort('score')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>Score</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('hp_runs')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>HP Runs (Balls)</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('hp_sr')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>HP SR</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('hp_avg')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>HP Avg</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('sr_retention')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>Retention</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('reliability')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>Reliability</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredV2Batters.map((batter) => {
                  const isTop10 = batter.rank <= 10;
                  return (
                    <tr
                      key={batter.player_id}
                      onClick={() => onSelectV2Batter(batter)}
                      className={`hover:bg-blue-50/60 cursor-pointer transition ${
                        isTop10 ? 'bg-blue-50/20' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                        #{batter.rank}
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                          <span>{batter.player}</span>
                          {batter.player === 'Virat Kohli' && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                              AUDIT CASE STUDY
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {batter.role} &bull; Med Order: {batter.med_order} &bull; ID: {batter.player_id}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {isTop10 ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            <Award className="w-3 h-3 text-blue-600" />
                            <span>TOP 10</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <span>Candidate</span>
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                        {formatNumber(batter.score, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                        <span className="font-bold">{formatNumber(batter.hp_runs, 0)}</span>
                        <span className="text-slate-400 text-[11px] ml-1">({batter.hp_balls}b)</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">
                        {formatNumber(batter.hp_sr, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                        {formatNumber(batter.hp_avg, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        {formatNumber(batter.sr_retention, 1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {formatNumber(batter.reliability, 3)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {modelMode === 'v2' && discipline === 'bowlers' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px] select-none">
                  <th onClick={() => handleSort('rank')} className="py-3 px-3 cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center space-x-1"><span>Rank</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th className="py-3 px-4">Bowler &amp; Phase</th>
                  <th className="py-3 px-3 text-center">Selection Status</th>
                  <th onClick={() => handleSort('score')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>Score</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('runs_saved_per6')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800 bg-rose-950/40 text-rose-300">
                    <div className="flex items-center justify-end space-x-1"><span>Saved/6b</span><ArrowUpDown className="w-3 h-3 text-rose-300" /></div>
                  </th>
                  <th onClick={() => handleSort('hp_econ')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>HP Econ (Exp)</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('hp_wickets')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>HP Wkts (Balls)</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('wk_per100')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>Wkts/100b</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                  <th onClick={() => handleSort('reliability')} className="py-3 px-3 text-right cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center justify-end space-x-1"><span>Reliability</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredV2Bowlers.map((bowler) => {
                  const isTop10 = bowler.rank <= 10;
                  return (
                    <tr
                      key={bowler.player_id}
                      onClick={() => onSelectV2Bowler(bowler)}
                      className={`hover:bg-blue-50/60 cursor-pointer transition ${
                        isTop10 ? 'bg-blue-50/20' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                        #{bowler.rank}
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">{bowler.player}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {bowler.role} Phase &bull; ID: {bowler.player_id}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {isTop10 ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            <Award className="w-3 h-3 text-blue-600" />
                            <span>TOP 10</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <span>Candidate</span>
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                        {formatNumber(bowler.score, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-700 bg-rose-50/30">
                        {formatNumber(bowler.runs_saved_per6, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                        <span className="font-bold">{formatNumber(bowler.hp_econ, 2)}</span>
                        <span className="text-slate-400 text-[11px] ml-1">({formatNumber(bowler.expected_econ, 2)})</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                        <span className="font-bold">{bowler.hp_wickets}</span>
                        <span className="text-slate-400 text-[11px] ml-1">({bowler.hp_legal}b)</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">
                        {formatNumber(bowler.wk_per100, 2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {formatNumber(bowler.reliability, 3)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {modelMode === 'v1' && discipline === 'batters' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Score</th>
                  <th className="py-3 px-3 text-right">HP Runs (Balls)</th>
                  <th className="py-3 px-3 text-right">HP SR</th>
                  <th className="py-3 px-3 text-right">HP Avg</th>
                  <th className="py-3 px-3 text-right">SR Retention</th>
                  <th className="py-3 px-3 text-right">Reliability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredV1Batters.map((batter) => {
                  const isTop10 = (batter.rank ?? 0) <= 10;
                  return (
                    <tr
                      key={batter.striker_id}
                      onClick={() => onSelectV1Batter(batter)}
                      className={`hover:bg-blue-50/60 cursor-pointer transition ${isTop10 ? 'bg-blue-50/20' : ''}`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">#{batter.rank}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{batter.striker_name}</td>
                      <td className="py-2.5 px-3 text-center">
                        {isTop10 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">TOP 10</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">Candidate</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-extrabold text-blue-700">{formatNumber(batter.score, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">{batter.hp_runs} ({batter.hp_balls}b)</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">{formatNumber(batter.hp_sr, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{formatNumber(batter.hp_avg, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{formatPercent(batter.sr_retention)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">{formatNumber(batter.reliability, 3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {modelMode === 'v1' && discipline === 'bowlers' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-4">Bowler</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Score</th>
                  <th className="py-3 px-3 text-right">Saved / 6b</th>
                  <th className="py-3 px-3 text-right">HP Econ</th>
                  <th className="py-3 px-3 text-right">HP Wkts (Balls)</th>
                  <th className="py-3 px-3 text-right">Dot %</th>
                  <th className="py-3 px-3 text-right">Reliability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredV1Bowlers.map((bowler) => {
                  const isTop10 = (bowler.rank ?? 0) <= 10;
                  return (
                    <tr
                      key={bowler.bowler_id}
                      onClick={() => onSelectV1Bowler(bowler)}
                      className={`hover:bg-blue-50/60 cursor-pointer transition ${isTop10 ? 'bg-blue-50/20' : ''}`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">#{bowler.rank}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{bowler.bowler_name}</td>
                      <td className="py-2.5 px-3 text-center">
                        {isTop10 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">TOP 10</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">Candidate</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-extrabold text-blue-700">{formatNumber(bowler.score, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-700">{formatNumber(bowler.runs_saved_per6, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{formatNumber(bowler.hp_econ, 2)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">{bowler.hp_wickets} ({bowler.hp_legal}b)</td>
                      <td className="py-2.5 px-3 text-right font-mono">{formatPercent(bowler.hp_dot_pct)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">{formatNumber(bowler.reliability, 3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
