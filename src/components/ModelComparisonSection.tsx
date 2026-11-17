import React from 'react';
import { 
  GitCompare, 
  Layers, 
  Sliders
} from 'lucide-react';
import type { 
  V2BatterRecord, 
  V2BowlerRecord, 
  BatterRecord, 
  BowlerRecord,
  V2ThresholdSensitivityRecord,
  ThresholdSensitivityRecord
} from '../types/cricket';
import { formatNumber } from '../utils/formatters';

interface ModelComparisonProps {
  v2Batters: V2BatterRecord[];
  v2Bowlers: V2BowlerRecord[];
  v1Batters: BatterRecord[];
  v1Bowlers: BowlerRecord[];
  v2Sensitivity: V2ThresholdSensitivityRecord[];
  v1Sensitivity: ThresholdSensitivityRecord[];
}

export const ModelComparisonSection: React.FC<ModelComparisonProps> = ({
  v2Batters,
  v2Bowlers,
  v1Batters,
  v1Bowlers,
  v2Sensitivity,
  v1Sensitivity,
}) => {
  const v1BatterNames = v1Batters.map(b => b.striker_name);
  const v2BatterNames = v2Batters.map(b => b.player);
  const batterOverlap = v2BatterNames.filter(name => v1BatterNames.includes(name));

  const v1BowlerNames = v1Bowlers.map(b => b.bowler_name);
  const v2BowlerNames = v2Bowlers.map(b => b.player);
  const bowlerOverlap = v2BowlerNames.filter(name => v1BowlerNames.includes(name));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <GitCompare className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            V1 Baseline vs V2 Exploratory Model Comparison
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          A side-by-side technical evaluation contrasting our original fixed-threshold model (V1) against the phase-normalised exploratory model (V2). 
          <strong> Note:</strong> The models' metrics are strictly kept separate. Never blend or combine V1 and V2 scores.
        </p>
      </div>

      {/* Architecture Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-sm tracking-tight flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Structural Model Architecture Differences</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">IPL 2022–2026 Scope</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-mono uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3 px-4 w-1/4">Evaluation Dimension</th>
                <th className="py-3 px-4 w-3/8 text-slate-900 bg-slate-200/50">Model V1 (Fixed-Threshold Baseline)</th>
                <th className="py-3 px-4 w-3/8 text-blue-900 bg-blue-50/50">Model V2 (Context-Normalised Exploratory)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Pressure Definition</td>
                <td className="py-3 px-4 text-slate-700 bg-slate-50/30">
                  Global pre-delivery pressure metric &ge; 65 across all match phases.
                </td>
                <td className="py-3 px-4 text-slate-800 bg-blue-50/20 font-medium">
                  Phase- and innings-specific 70th percentile pressure cutoff (with floor of 35).
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Pressure Deliveries</td>
                <td className="py-3 px-4 font-mono text-slate-700 bg-slate-50/30">
                  6,799 / 6,800 balls (<strong>7.75%</strong> of tournament volume)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-700 bg-blue-50/20">
                  17,592 balls (<strong>20.07%</strong> of tournament volume)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Eligible Batters Pool</td>
                <td className="py-3 px-4 font-mono text-slate-700 bg-slate-50/30">
                  <strong>37 batters</strong> (Min 40 HP balls, 150 all balls, 5 matches)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-700 bg-blue-50/20">
                  <strong>112 batters</strong> (Min 30 HP balls, 100 all balls, 4 matches)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Eligible Bowlers Pool</td>
                <td className="py-3 px-4 font-mono text-slate-700 bg-slate-50/30">
                  <strong>32 bowlers</strong> (Min 40 HP balls, 150 all balls, 5 matches)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-700 bg-blue-50/20">
                  <strong>129 bowlers</strong> (Min 24 HP balls, 60 all balls, 4 matches)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Role Normalisation</td>
                <td className="py-3 px-4 text-slate-700 bg-slate-50/30">
                  None. All qualified players compared in one single undivided pool.
                </td>
                <td className="py-3 px-4 text-slate-800 bg-blue-50/20 font-medium">
                  Stratified percentiles: Batters by median order (1-2 Opener, 3-5 Middle, 6-7 Finisher); Bowlers by predominant phase (Powerplay, Middle, Death).
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Shrinkage Formula</td>
                <td className="py-3 px-4 font-mono text-slate-700 bg-slate-50/30">
                  Bayesian shrinkage toward 50: <code className="bg-slate-200/60 px-1 py-0.5 rounded">n / (n + 60)</code>
                </td>
                <td className="py-3 px-4 font-mono text-blue-800 bg-blue-50/20">
                  Bayesian shrinkage toward 50: <code className="bg-blue-100 px-1 py-0.5 rounded">n / (n + 60)</code>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Opener Representation (Top 10)</td>
                <td className="py-3 px-4 text-slate-700 bg-slate-50/30">
                  <strong>0 Openers</strong> (Completely dominated by middle/finishers)
                </td>
                <td className="py-3 px-4 text-blue-800 bg-blue-50/20 font-semibold">
                  <strong>2 Openers</strong> (Ishan Kishan #1, Wriddhiman Saha #6)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-800">Top-Ranked Individuals</td>
                <td className="py-3 px-4 text-slate-800 bg-slate-50/30 font-semibold">
                  Batter: Abdul Samad &bull; Bowler: Mukesh Kumar
                </td>
                <td className="py-3 px-4 text-blue-900 bg-blue-50/20 font-semibold">
                  Batter: Ishan Kishan &bull; Bowler: Shahbaz Ahmed
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 10 Overlap Analysis (Critical Finding) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Batters Overlap */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
              <span>Batters Top 10 Overlap: 2 / 10 (20%)</span>
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-800">
              80% Turnover
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Only two batters appear in both V1 and V2 Top 10 lists: <strong>Krunal Pandya</strong> and <strong>Shahbaz Ahmed</strong>.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                Model V1 Top 10
              </span>
              <ol className="space-y-1 list-decimal list-inside text-slate-600 font-mono text-[11px]">
                {v1Batters.map((b) => (
                  <li key={b.striker_id} className={batterOverlap.includes(b.striker_name) ? 'font-bold text-blue-700 bg-blue-100/60 px-1 rounded' : ''}>
                    {b.striker_name}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1 text-[11px] uppercase tracking-wider">
                Model V2 Top 10
              </span>
              <ol className="space-y-1 list-decimal list-inside text-slate-700 font-mono text-[11px]">
                {v2Batters.map((b) => (
                  <li key={b.player_id} className={batterOverlap.includes(b.player) ? 'font-bold text-blue-700 bg-blue-100 px-1 rounded' : ''}>
                    {b.player}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-200">
            <strong>Key Takeaway:</strong> V1 favoured boundary-hitting lower-order finishers facing acute death-over run rates. V2 stratifies by median order, promoting openers (Ishan Kishan, Wriddhiman Saha) who performed well relative to early-over baselines.
          </div>
        </div>

        {/* Bowlers Overlap */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Bowlers Top 10 Overlap: 2 / 10 (20%)</span>
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-800">
              80% Turnover
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Only two bowlers appear in both V1 and V2 Top 10 lists: <strong>Mukesh Kumar</strong> and <strong>Shahbaz Ahmed</strong>.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                Model V1 Top 10
              </span>
              <ol className="space-y-1 list-decimal list-inside text-slate-600 font-mono text-[11px]">
                {v1Bowlers.map((b) => (
                  <li key={b.bowler_id} className={bowlerOverlap.includes(b.bowler_name) ? 'font-bold text-blue-700 bg-blue-100/60 px-1 rounded' : ''}>
                    {b.bowler_name}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 block mb-1 text-[11px] uppercase tracking-wider">
                Model V2 Top 10
              </span>
              <ol className="space-y-1 list-decimal list-inside text-slate-700 font-mono text-[11px]">
                {v2Bowlers.map((b) => (
                  <li key={b.player_id} className={bowlerOverlap.includes(b.player) ? 'font-bold text-blue-700 bg-blue-100 px-1 rounded' : ''}>
                    {b.player}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 border border-slate-200">
            <strong>Key Takeaway:</strong> High rank volatility is driven by V2's phase grouping (Powerplay, Middle, Death). However, neither model produces positive absolute contextual runs saved for bowlers in high-pressure states.
          </div>
        </div>
      </div>

      {/* Threshold Sensitivity Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Sliders className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-base text-slate-900">
            Threshold Sensitivity: Delivery Volume Under Alternative Cutoffs
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          How delivery classification expands or contracts depending on the strictness of the pressure threshold.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* V2 Quantiles */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center justify-between">
              <span>Model V2 Phase-Specific Quantile Cutoffs</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">Floor: 35</span>
            </h4>
            <div className="space-y-2.5">
              {v2Sensitivity.map((row) => {
                const isSelected = row.within_phase_quantile === 0.7;
                return (
                  <div 
                    key={row.within_phase_quantile}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      isSelected 
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono">{Math.round(row.within_phase_quantile * 100)}th Percentile Cutoff</span>
                      {isSelected && <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] bg-white text-blue-900 uppercase">Selected V2 Setting</span>}
                    </div>
                    <div className="font-mono text-right">
                      <span>{formatNumber(row.high_pressure_deliveries)} balls</span>
                      <span className={`ml-2 text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        ({row.share_pct}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* V1 Thresholds */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center justify-between">
              <span>Model V1 Fixed Absolute Thresholds</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">Global Metric</span>
            </h4>
            <div className="space-y-2.5">
              {v1Sensitivity.map((row) => {
                const isSelected = row.threshold === 65;
                const totalTournament = 87673;
                const share = (row.batting_high_pressure_deliveries / totalTournament) * 100;
                return (
                  <div 
                    key={row.threshold}
                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                      isSelected 
                        ? 'bg-slate-800 text-white font-bold border-slate-800 shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono">Threshold &ge; {row.threshold}</span>
                      {isSelected && <span className="ml-2 px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-slate-900 uppercase">Selected V1 Setting</span>}
                    </div>
                    <div className="font-mono text-right">
                      <span>{formatNumber(row.batting_high_pressure_deliveries)} balls</span>
                      <span className={`ml-2 text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        ({formatNumber(share, 2)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
