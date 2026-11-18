import React from 'react';
import type { ActiveSection } from '../types/cricket';

interface FooterProps {
  onNavigate: (section: ActiveSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-blue-700 text-white font-black text-xs flex items-center justify-center font-mono">
              RR
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">SUPER RR</span>
              <p className="text-xs text-slate-400">
                Pressure Performance Analytics | IPL 2022–2026 (367 Matches, 87,673 Balls)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-300">
            <button onClick={() => onNavigate('overview')} className="hover:text-white transition-colors">1. Overview</button>
            <button onClick={() => onNavigate('batters')} className="hover:text-white transition-colors">2. V2 Batters</button>
            <button onClick={() => onNavigate('bowlers')} className="hover:text-white transition-colors">3. V2 Bowlers</button>
            <button onClick={() => onNavigate('v1-baseline')} className="hover:text-white transition-colors">4. V1 Baseline</button>
            <button onClick={() => onNavigate('comparison')} className="hover:text-white transition-colors">5. Comparison</button>
            <button onClick={() => onNavigate('explorer')} className="hover:text-white transition-colors">6. Explorer</button>
            <button onClick={() => onNavigate('kohli')} className="hover:text-white transition-colors">7. Kohli Audit</button>
            <button onClick={() => onNavigate('methodology')} className="hover:text-white transition-colors">8. Methodology</button>
            <button onClick={() => onNavigate('limitations')} className="hover:text-white transition-colors">9. Limitations</button>
            <button onClick={() => onNavigate('conclusion')} className="hover:text-white transition-colors text-emerald-400 font-bold">10. Conclusion</button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <p>
            Analytical study prepared for <strong>Rajasthan Royals</strong> (SuperRR Selector Season 2 – Round 1).
          </p>
          <p className="text-slate-500 font-mono text-[11px]">
            Dual Model Framework: Model V2 (Context-Normalised) &bull; Model V1 (Fixed-Threshold Preserved)
          </p>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded text-[11px] text-slate-500 leading-normal">
          <strong>Non-Endorsement Disclaimer:</strong> This dashboard is an independent analytical research presentation for the Unstop competition. It does not use official franchise logos, does not represent official Rajasthan Royals procurement decisions, and does not constitute auction bidding advice. All historical statistics are preserved directly from the supplied challenge files without modification.
        </div>
      </div>
    </footer>
  );
};
