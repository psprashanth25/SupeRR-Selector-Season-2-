import React from 'react';
import { 
  UserCheck, 
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';
import type { V2ValidationSummary, V2BatterRecord } from '../types/cricket';
import { formatNumber, formatPercent } from '../utils/formatters';

interface ViratKohliAuditProps {
  auditData: V2ValidationSummary['virat_kohli_audit'];
  kohliRecord?: V2BatterRecord;
}

export const ViratKohliAuditSection: React.FC<ViratKohliAuditProps> = ({
  auditData,
  kohliRecord
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
            <UserCheck className="w-5 h-5" />
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Virat Kohli Analytical Case Study
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          An empirical case study demonstrating how shifting from fixed to context-normalised pressure definitions 
          alters candidate pool inclusion without artificially guaranteeing a top-tier composite score.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            V2 Composite Score
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">
            {formatNumber(auditData.score, 2)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Rank <strong>#95</strong> of 112 Batters
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Pressure Strike Rate
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {formatNumber(auditData.hp_sr, 2)}
          </div>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">
            +5.15% above overall SR ({formatNumber(auditData.all_sr, 2)})
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Pressure Average
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {formatNumber(auditData.hp_avg, 2)}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Across 34 pressure matches
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            SR Retention
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
            {formatNumber(auditData.sr_retention, 2)}%
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Reliability: {kohliRecord ? formatNumber(kohliRecord.reliability, 3) : '0.679'}
          </span>
        </div>
      </div>

      {/* Summary Matrix Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="font-bold text-sm tracking-tight flex items-center space-x-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Virat Kohli: Exact V2 Verified Analytical Metrics</span>
          </h3>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            Candidate ID: 47 &bull; Role: Opener (Med Order: 1.0)
          </span>
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">High-Pressure Runs</span>
            <span className="text-lg font-bold font-mono text-slate-900">{formatNumber(auditData.hp_runs, 0)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">High-Pressure Balls</span>
            <span className="text-lg font-bold font-mono text-slate-900">{formatNumber(auditData.hp_balls, 0)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Total Career Balls</span>
            <span className="text-lg font-bold font-mono text-slate-900">2,090</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Pressure Matches</span>
            <span className="text-lg font-bold font-mono text-slate-900">{formatNumber(auditData.hp_matches, 0)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Overall Tournament SR</span>
            <span className="text-lg font-bold font-mono text-slate-900">{formatNumber(auditData.all_sr, 2)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">HP Boundary %</span>
            <span className="text-lg font-bold font-mono text-slate-900">{kohliRecord ? formatPercent(kohliRecord.hp_boundary_pct) : '23.62%'}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">HP Dot Ball %</span>
            <span className="text-lg font-bold font-mono text-slate-900">{kohliRecord ? formatPercent(kohliRecord.hp_dot_pct) : '38.58%'}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">V2 Top 10 Status</span>
            <span className="text-lg font-bold text-amber-700">Not in Top 10 (#95)</span>
          </div>
        </div>
      </div>

      {/* Deep-Dive Case Study Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <XCircle className="w-4 h-4" />
            <span>1. Why V1 Excluded Him</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Global Threshold Bias Against Openers
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Under Model V1, high pressure was defined by a single fixed threshold of &ge; 65 across all overs. 
            Deliveries reaching that stress level occur almost exclusively during extreme chases (RRR &gt; 10.5) 
            in the middle and death overs. As an opener, Kohli had <strong>0 qualifying high-pressure balls</strong> under V1, 
            as he either built early innings or had been dismissed before extreme late-phase scoring spikes.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>2. Why V2 Included Him</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Phase-Stratified Percentile Cutoffs
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Model V2 recognized that pressure in the Powerplay is contextually different from death overs. 
            By applying a phase-specific 70th percentile cutoff (floor 35), pressure was captured relative to early-over wickets and required baselines. 
            Kohli registered <strong>127 pressure balls across 34 matches</strong>, qualifying him for the 112-batter candidate pool.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>3. Why He Is Ranked #95</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Role Normalisation &amp; Percentile Metric
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eligibility does NOT equal automatic top-10 ranking. In V2, percentiles are computed within the 
            <strong> Opener cohort</strong>. Relative to openers like Ishan Kishan (Score 80.80) and Wriddhiman Saha (Score 72.45), 
            Kohli's high dot-ball rate (38.58%) and moderate boundary frequency (23.62%) yielded a pre-shrunk percentile profile 
            that settled at <strong>35.01</strong> after Bayesian shrinkage <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">127/(127+60) = 0.679</code>.
          </p>
        </div>
      </div>

      {/* Analytical Integrity Manifesto */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md">
        <h4 className="text-sm font-bold uppercase tracking-wider text-pink-400 mb-2">
          Methodological Integrity Statement for Rajasthan Royals
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          A fundamental principle of professional sports analytics is that models must never be altered, reverse-engineered, or manually overridden to shoehorn high-profile celebrity players into top rankings. 
          The exclusion of Virat Kohli from V1 was a structural symptom of a single fixed threshold; his inclusion in V2 proves the benefit of phase stratification. 
          However, his final V2 ranking of #95 reflects honest empirical performance under the specified metric weights.
        </p>
      </div>
    </div>
  );
};
