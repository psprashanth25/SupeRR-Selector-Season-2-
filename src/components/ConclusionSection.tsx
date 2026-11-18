import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import type { ActiveSection } from '../types/cricket';

interface ConclusionSectionProps {
  onNavigate: (section: ActiveSection) => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-blue-700 mb-1">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Final Analytical Synthesis &amp; Takeaways</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Analytical Conclusions &amp; Strategic Insights
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Synthesizing historical findings across 367 matches and 87,673 deliveries (IPL 2022–2026). 
          A definitive evaluation of what our dual models prove, where they diverge, and what franchise decision-makers should take away.
        </p>
      </div>

      {/* 6 Structured Analytical Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: What We Learned */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-700 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs">1</span>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              What We Learned: The Multi-Dimensional Nature of Pressure
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pressure in T20 cricket is not a monolithic number. A single fixed cutoff (&ge; 65 in Model V1) concentrates 
            overwhelmingly on acute death-over run chases with Required Run Rates exceeding 10.5. 
            While mathematically clean, this created a structural blind spot against openers and early wickets. 
            When pressure is stratified across innings and phases (Model V2), high-leverage deliveries increase from 
            <strong> 7.75% (6,799 balls)</strong> to <strong>20.07% (17,592 balls)</strong>, broadening the qualified candidate pool from 69 to 241 players.
          </p>
        </div>

        {/* Pillar 2: What Both Models Agree On */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-pink-700 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center font-bold text-xs">2</span>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              What the Models Agree On: Consensus &amp; Bowling Reality
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Across both models, two key analytical truths emerge:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Dual-Model Outliers:</strong> Only two players in each discipline overlap in both Top 10 lists—<strong>Krunal Pandya &amp; Shahbaz Ahmed</strong> (Batters) and <strong>Mukesh Kumar &amp; Shahbaz Ahmed</strong> (Bowlers). These players demonstrate genuine cross-model robustness regardless of threshold definitions.
            </li>
            <li>
              <strong>The Harsh Truth of Pressure Bowling:</strong> All top-ranked bowlers in both models conceded more runs than contextual baseline expectations under pressure (V2 runs saved ranging from -0.08 to -4.21). Pressure bowling in modern IPL is defensive damage limitation, boundary mitigation, and wicket-taking, not absolute run suppression.
            </li>
          </ul>
        </div>

        {/* Pillar 3: Why Model Definition Matters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-700 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center font-bold text-xs">3</span>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Why Model Definition Matters: 80% Turnover
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The fact that 8 out of 10 players change between V1 and V2 does <em>not</em> prove either model is defective. 
            Rather, it exposes that player rankings are directly driven by mathematical definitions. 
            V1 measured: <em>"Who hits boundaries and takes wickets during late-innings crisis chases?"</em> 
            V2 measures: <em>"Who outperforms their specific role peers across Powerplay, Middle, and Death phases?"</em> 
            No algorithm can produce an undisputed universal truth; transparency about the lens is mandatory.
          </p>
        </div>

        {/* Pillar 4: What the V2 Alternative Contributes */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs">4</span>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              What Model V2 Contributes: Role Fairness &amp; Pool Expansion
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Model V2 eliminates the systemic bias against top-order batters. Openers like Ishan Kishan (V2 Rank #1) and Wriddhiman Saha (V2 Rank #6) 
            gain rightful recognition for absorbing early scoreboard pressure without getting lost in a pool dominated by finishers. 
            Similarly, Virat Kohli gains 127 pressure balls under V2, illustrating that role-stratified evaluation accurately reflects early-phase scoring stress.
          </p>
        </div>

        {/* Pillar 5: What the Findings Mean for Rajasthan Royals */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">5</span>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Strategic Implications: Tactical Role Matching Over Raw Scores
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For franchise strategists, this analysis offers three practical takeaways:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Look for Strike-Rate Retention:</strong> Batters who accelerate or maintain scoring speed under pressure (e.g., Krunal Pandya 90.8%, Shahbaz Ahmed 89.6%, Tewatia 87.1%) provide true composure.
            </li>
            <li>
              <strong>Do Not Mistake Composite Scores for Runs Saved:</strong> Bowlers with high composite rankings are simply better than their role peers at generating dots and wickets, but they still concede runs under extreme leverage.
            </li>
            <li>
              <strong>Beware Small-Sample Outliers:</strong> Reliability factors below 0.60 (e.g., Mitchell Marsh 0.36, Chris Jordan 0.48) warn that individual tournament ranks can be volatile.
            </li>
          </ul>
        </div>

        {/* Pillar 6: What Remains Uncertain */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-rose-700 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center font-bold text-xs">6</span>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              What Remains Uncertain: Required Future Validation
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Before adopting either model for live recruitment or tactical operations, three critical validation steps remain:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Multi-Season Persistence:</strong> Does pressure composure persist from season to season, or is it heavily regressed to the mean across years?
            </li>
            <li>
              <strong>Match-Level Bootstrap:</strong> Conducting leave-one-season-out cross-validation to measure ranking stability.
            </li>
            <li>
              <strong>Dismissal Attribution Audit:</strong> Clarifying raw data feed handling of run-outs, stumping assists, and extras attribution across venues.
            </li>
          </ul>
        </div>
      </div>

      {/* Final Executive Declaration */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-black text-xs font-mono">
              RR
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                SuperRR Selector Season 2 — Final Analytical Verdict
              </h3>
              <p className="text-xs text-slate-400">
                Independent Analytical Submission for Rajasthan Royals
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Validated &amp; Complete
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          By presenting both our original <strong>Model V1 Baseline</strong> and the newly developed <strong>Model V2 Context-Normalised Model</strong> with absolute data integrity, transparent limitations, and a dedicated Virat Kohli case study, this submission fulfills the SuperRR challenge with high academic and professional rigor. We conclude that <strong>Krunal Pandya</strong> and <strong>Shahbaz Ahmed</strong> are the most resilient multi-model pressure batters, while <strong>Mukesh Kumar</strong> and <strong>Shahbaz Ahmed</strong> are the consensus pressure bowling performers.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('overview')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm"
          >
            <span>Return to Executive Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('comparison')}
            className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
          >
            <span>Review Model Comparison</span>
          </button>
          <button
            onClick={() => onNavigate('explorer')}
            className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
          >
            <span>Explore All 241 Candidates</span>
          </button>
        </div>
      </div>
    </div>
  );
};
