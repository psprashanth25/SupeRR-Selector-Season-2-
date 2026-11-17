import React from 'react';
import { Sliders, BarChart2, Scale, Info } from 'lucide-react';
import type { ThresholdSensitivityRecord } from '../types/cricket';

interface ThresholdSensitivitySectionProps {
  data: ThresholdSensitivityRecord[];
}

export const ThresholdSensitivitySection: React.FC<ThresholdSensitivitySectionProps> = ({ data }) => {
  const maxDeliveries = 8000;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-blue-700 mb-1">
          <Sliders className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Sensitivity Analysis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          High-Pressure Threshold Sensitivity Analysis
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Evaluating how calibrating the high-pressure leverage cutoff alters sample size, delivery volumes, and candidate eligibility. Demonstrating why Threshold 65 was selected as the operational baseline.
        </p>
      </div>

      {/* Comparison Grid & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Chart Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-blue-700" />
              <span>Delivery Volume by Pressure Cutoff</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Total IPL 2022–2026</span>
          </div>

          <div className="space-y-6 pt-2">
            {data.map((row) => {
              const isSelected = row.threshold === 65;
              const batPct = (row.batting_high_pressure_deliveries / maxDeliveries) * 100;
              const bowlPct = (row.bowling_high_pressure_deliveries / maxDeliveries) * 100;

              return (
                <div 
                  key={row.threshold}
                  className={`p-4 rounded-lg border transition-all ${
                    isSelected 
                      ? 'bg-blue-50/40 border-blue-400 ring-1 ring-blue-400/30' 
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        Threshold {row.threshold}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          Selected Model Baseline
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      Total: {(row.batting_high_pressure_deliveries + row.bowling_high_pressure_deliveries).toLocaleString()} balls
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Batting Deliveries */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span className="font-medium flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                          <span>Batting Pressure Deliveries</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          {row.batting_high_pressure_deliveries.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-pink-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${batPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Bowling Deliveries */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span className="font-medium flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                          <span>Bowling Pressure Deliveries</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          {row.bowling_high_pressure_deliveries.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/80 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-700 h-full rounded-full transition-all duration-500"
                          style={{ width: `${bowlPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytical Table & Trade-off Breakdown */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
              <Scale className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Threshold Empirical Data Summary
              </h3>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border border-slate-200 rounded">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold uppercase">
                    <th className="py-2.5 px-3">Threshold</th>
                    <th className="py-2.5 px-3 text-right">Batting Balls</th>
                    <th className="py-2.5 px-3 text-right">Bowling Balls</th>
                    <th className="py-2.5 px-3 text-right">Bowling Drop vs T60</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {data.map((r) => {
                    const dropPct = r.threshold === 60 ? 'Baseline' : `-${(((4478 - r.bowling_high_pressure_deliveries) / 4478) * 100).toFixed(1)}%`;
                    return (
                      <tr key={r.threshold} className={r.threshold === 65 ? 'bg-blue-50 font-bold' : ''}>
                        <td className="py-2.5 px-3">
                          {r.threshold} {r.threshold === 65 && '(Chosen)'}
                        </td>
                        <td className="py-2.5 px-3 text-right">{r.batting_high_pressure_deliveries.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right">{r.bowling_high_pressure_deliveries.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right text-amber-700">{dropPct}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
                Why Threshold 65 Was Selected:
              </h4>
              <p>
                <strong>The Statistical Trade-Off:</strong> Setting the threshold too low (e.g. 60) includes standard middle-over deliveries where required rates are manageable, diluting the definition of "pressure".
              </p>
              <p>
                Conversely, tightening the threshold to 70 causes bowling delivery volume to collapse from <strong>4,478 down to only 1,617 balls</strong>—a severe <strong>63.9% reduction</strong> across 367 matches. At that extreme scarcity (~4.4 balls per match), very few bowlers could meet the minimum eligibility filter (≥24 legal balls), making bowler candidate rankings vulnerable to small-sample noise.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-800">Methodological Transparency Note:</strong> Threshold 65 is an intentional design choice balancing situational stress with statistical sample reliability. It is an analytical parameter, not an infallible or universally permanent boundary.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
