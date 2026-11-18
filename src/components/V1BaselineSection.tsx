import React, { useState } from 'react';
import { 
  History, 
  Download, 
  Flame, 
  Target, 
  Info
} from 'lucide-react';
import type { BatterRecord, BowlerRecord } from '../types/cricket';
import { formatNumber, formatPercent } from '../utils/formatters';
import { downloadCsv } from '../data/superrrLoader';

interface V1BaselineSectionProps {
  v1Batters: BatterRecord[];
  v1Bowlers: BowlerRecord[];
  rawBattersCsv: string;
  rawBowlersCsv: string;
  onSelectBatter: (batter: BatterRecord) => void;
  onSelectBowler: (bowler: BowlerRecord) => void;
}

export const V1BaselineSection: React.FC<V1BaselineSectionProps> = ({
  v1Batters,
  v1Bowlers,
  rawBattersCsv,
  rawBowlersCsv,
  onSelectBatter,
  onSelectBowler,
}) => {
  const [activeTab, setActiveTab] = useState<'batters' | 'bowlers'>('batters');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-slate-100 text-slate-800 rounded-lg">
                <History className="w-5 h-5 text-blue-700" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Preserved Baseline Model
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Model V1 — Original Fixed-Threshold Pressure Model
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              This section preserves our original developed baseline model. 
              Model V1 defined high pressure using a single invariant threshold of &ge; 65 across all match phases, 
              evaluating all qualified players in an undivided cohort. It is preserved intact to demonstrate transparent analytical comparison with Model V2.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            <button
              onClick={() => downloadCsv('v1_ipl_top10_batters.csv', rawBattersCsv)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export V1 Batters CSV</span>
            </button>
            <button
              onClick={() => downloadCsv('v1_ipl_top10_bowlers.csv', rawBowlersCsv)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export V1 Bowlers CSV</span>
            </button>
          </div>
        </div>

        {/* V1 Methodology Summary Box */}
        <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Pressure Cutoff</span>
            <span className="font-bold text-slate-900 font-mono">Score &ge; 65 Invariant</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Pressure Balls</span>
            <span className="font-bold text-slate-900 font-mono">6,799 / 6,800 (7.75%)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Candidate Pool</span>
            <span className="font-bold text-slate-900 font-mono">37 Batters / 32 Bowlers</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Role Stratification</span>
            <span className="font-bold text-slate-900 font-mono">None (Single Pool)</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs between V1 Batters & V1 Bowlers */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('batters')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-bold transition ${
              activeTab === 'batters'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>V1 Top 10 Batters</span>
          </button>
          <button
            onClick={() => setActiveTab('bowlers')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-bold transition ${
              activeTab === 'bowlers'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>V1 Top 10 Bowlers</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Click any player row to view full statistical breakdown</span>
        </div>
      </div>

      {activeTab === 'batters' ? (
        /* V1 TOP 10 BATTERS TABLE */
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-pink-400" />
                <h3 className="font-bold text-sm tracking-tight">Model V1 Top 10 Batters (Fixed Threshold &ge; 65)</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Abdul Samad to Suryakumar Yadav</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-mono uppercase tracking-wider text-[11px] border-b border-slate-200 select-none">
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
                  {v1Batters.map((batter) => {
                    const isOverlap = batter.striker_name === 'Krunal Pandya' || batter.striker_name === 'Shahbaz Ahmed';
                    return (
                      <tr
                        key={batter.striker_id}
                        onClick={() => onSelectBatter(batter)}
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
                          <div className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                            <span>{batter.striker_name}</span>
                            {isOverlap && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                V1/V2 Overlap
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            ID: {batter.striker_id} &bull; HP Matches: {batter.hp_matches}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-extrabold text-blue-700 text-sm">
                          {formatNumber(batter.score, 2)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-800">
                          <span className="font-bold">{batter.hp_runs}</span>
                          <span className="text-slate-400 text-[11px] ml-1">({batter.hp_balls}b)</span>
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
                          <span className="px-1.5 py-0.5 rounded font-bold bg-slate-100 text-slate-800">
                            {formatPercent(batter.sr_retention)}
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

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
            <strong>Key V1 Observation:</strong> Batters in V1 are exclusively middle- and lower-order power hitters (e.g., Abdul Samad, Tim David, Pollard, Russell, Pooran). Because pressure &ge; 65 occurred predominantly during extreme death-overs run chases (RRR &gt; 10.5), opening batters had virtually zero representation.
          </div>
        </div>
      ) : (
        /* V1 TOP 10 BOWLERS TABLE */
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm tracking-tight">Model V1 Top 10 Bowlers (Fixed Threshold &ge; 65)</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Mukesh Kumar to Auqib Nabi</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-mono uppercase tracking-wider text-[11px] border-b border-slate-200 select-none">
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
                  {v1Bowlers.map((bowler) => {
                    const isOverlap = bowler.bowler_name === 'Mukesh Kumar' || bowler.bowler_name === 'Shahbaz Ahmed';
                    return (
                      <tr
                        key={bowler.bowler_id}
                        onClick={() => onSelectBowler(bowler)}
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
                          <div className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                            <span>{bowler.bowler_name}</span>
                            {isOverlap && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                                V1/V2 Overlap
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            ID: {bowler.bowler_id} &bull; HP Matches: {bowler.hp_matches}
                          </div>
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
                          <span className="font-bold">{bowler.hp_wickets}</span>
                          <span className="text-slate-400 text-[11px] ml-1">({bowler.hp_legal}b)</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatPercent(bowler.hp_dot_pct)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-600">
                          {formatNumber(bowler.reliability, 3)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
            <strong>Key V1 Observation:</strong> V1 bowlers are dominated by established death pacers and mystery spinners (Mukesh Kumar, Bumrah, Chahar, Thakur, Harshal, Boult, Kuldeep, Chahal). Similar to V2, all top V1 bowlers experienced negative runs saved per 6 balls under high leverage, reflecting the high boundary premium of late-game pressure bowling.
          </div>
        </div>
      )}
    </div>
  );
};
