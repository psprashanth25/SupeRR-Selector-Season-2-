import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  Flame
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'v2' | 'v1'>('v2');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Analytical Methodology &amp; Mathematical Framework
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Exhaustive technical documentation detailing pre-delivery pressure scoring, empirical expected baselines, 
              role normalisation, multi-metric percentile aggregation, and Bayesian sample-size shrinkage.
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('v2')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                activeTab === 'v2'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Model V2 (Context-Normalised)
            </button>
            <button
              onClick={() => setActiveTab('v1')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition ${
                activeTab === 'v1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Model V1 (Fixed-Threshold)
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'v2' ? (
        /* V2 METHODOLOGY */
        <div className="space-y-6">
          {/* Step 1: Pressure Classification */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs">1</span>
              <span>Pre-Delivery Pressure Assessment</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Innings- and Phase-Specific 70th Percentile Pressure Rule
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pressure is evaluated strictly using information available <strong>before</strong> each delivery occurs (avoiding post-outcome hindsight bias). 
              The pre-delivery state evaluates:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Match Phase</span>
                <span className="text-slate-600">
                  Powerplay (Overs 1–6), Middle (Overs 7–15), Death (Overs 16–20).
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Wickets Lost Band</span>
                <span className="text-slate-600">
                  Wickets already lost (0–2, 3–5, 6+) indicating batting resource depletion.
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Scoring Stress</span>
                <span className="text-slate-600">
                  Innings 1 deficit vs expected rate; Innings 2 Required Run Rate (RRR) above contextual baseline.
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              <strong>The 70th Percentile Cutoff:</strong> Instead of applying one rigid global cutoff to every delivery, 
              Model V2 applies an <strong>innings- and phase-specific 70th percentile cutoff (with an absolute floor of 35)</strong>. 
              This balances high-pressure identification across Powerplay (127 pressure balls for Kohli alone), Middle, and Death phases, 
              selecting exactly <strong>17,592 deliveries (20.07%)</strong> from the 87,673 tournament balls.
            </p>
          </div>

          {/* Step 2: Role Stratification */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs">2</span>
              <span>Tactical Role Stratification</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Role Normalisation to Prevent Tactical Incomparability
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluating an opening anchor on the exact same percentile distribution as a death-overs finisher distorts rankings. 
              Model V2 introduces role-stratified percentile rankings:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-sm flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-pink-500" />
                  <span>Batting Role Groups (Median Batting Order)</span>
                </span>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li><strong>Opener:</strong> Median batting order 1–2 (e.g., Ishan Kishan, Wriddhiman Saha, Virat Kohli).</li>
                  <li><strong>Middle Order:</strong> Median batting order 3–5 (e.g., Krunal Pandya, Devdutt Padikkal, Venkatesh Iyer).</li>
                  <li><strong>Finisher:</strong> Median batting order 6–7 (e.g., Shahbaz Ahmed, Rahul Tewatia, Abhinav Manohar).</li>
                </ul>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  *Approximation: Median order captures predominant usage, though floaters may cross bands.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-sm flex items-center space-x-1.5">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>Bowling Role Groups (Predominant Delivery Phase)</span>
                </span>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li><strong>Powerplay Specialist:</strong> Predominant legal balls in overs 1–6 (e.g., Ishant Sharma, Mukesh Kumar).</li>
                  <li><strong>Middle-Overs Controller:</strong> Predominant legal balls in overs 7–15 (e.g., Shahbaz Ahmed, Romario Shepherd, Mayank Markande).</li>
                  <li><strong>Death-Overs Closer:</strong> Predominant legal balls in overs 16–20 (e.g., Avesh Khan, Chris Jordan).</li>
                </ul>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  *Approximation: Categorises by plurality of volume; multi-phase pacers are assigned to their highest-volume phase.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Eligibility & Composite Metrics */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs">3</span>
              <span>Eligibility Thresholds &amp; Multi-Metric Aggregation</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Balanced Inclusion Filters &amp; Role-Specific Percentiles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded-lg p-3">
                <h4 className="font-bold text-slate-800 mb-2">V2 Batter Qualification</h4>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>&ge; 100 overall tournament legal balls</li>
                  <li>&ge; 30 high-pressure legal balls</li>
                  <li>&ge; 4 high-pressure matches</li>
                  <li>Median batting order &le; 7 (excludes tailenders)</li>
                  <li><strong>Result:</strong> 112 qualified candidate batters</li>
                </ul>
              </div>

              <div className="border border-slate-200 rounded-lg p-3">
                <h4 className="font-bold text-slate-800 mb-2">V2 Bowler Qualification</h4>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li>&ge; 60 overall tournament legal balls</li>
                  <li>&ge; 24 high-pressure legal balls</li>
                  <li>&ge; 4 high-pressure matches</li>
                  <li>Conceded runs exclude byes/leg-byes</li>
                  <li>Excludes non-bowler wickets (run-outs, retired out)</li>
                  <li><strong>Result:</strong> 129 qualified candidate bowlers</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900">Calculated Metrics:</h4>
              <p>
                <strong>Batters:</strong> High-pressure Strike Rate, High-pressure Batting Average, Boundary Percentage, Dot-ball Percentage, and Strike-rate Retention (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">hp_sr / all_sr * 100</code>).
              </p>
              <p>
                <strong>Bowlers:</strong> Contextual Runs Saved per 6 Balls (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">expected_econ - hp_econ</code>), Wickets per 100 HP balls, Dot-ball Percentage, and Inverse HP Economy.
              </p>
            </div>
          </div>

          {/* Step 4: Bayesian Shrinkage */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-xs">4</span>
              <span>Bayesian Sample-Size Shrinkage</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Sample-Size Regulated Posterior Estimation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Small samples produce extreme percentile volatility (e.g., a batter facing 30 balls hitting 3 boundaries could outrank a veteran facing 250 balls). 
              To mathematically regulate sample variance, raw role-percentile composite scores are shrunk toward the cohort prior mean of 50:
            </p>

            <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-xs flex items-center justify-center">
              <span>Composite Score = 50 + (Raw Score - 50) &times; [ n / (n + 60) ]</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Where <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">n</code> is the player's high-pressure legal balls. 
              The reliability weight <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">n / (n + 60)</code> penalises small-sample outliers. 
              For example, Mitchell Marsh (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">n = 34</code>) receives reliability <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">34/94 = 0.362</code>, 
              whereas Avesh Khan (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">n = 214</code>) receives reliability <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">214/274 = 0.781</code>.
            </p>
          </div>
        </div>
      ) : (
        /* V1 METHODOLOGY (PRESERVED) */
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-600 font-bold text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">V1</span>
            <span>Original Baseline Model Framework</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Fixed Pressure Threshold &ge; 65 Across All Phases
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In Model V1, high-pressure deliveries were defined by a single invariant pre-delivery pressure metric of &ge; 65 across all overs:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Identified 6,799 / 6,800 deliveries (7.75% of the 87,673 tournament balls).</li>
            <li>Required &ge; 40 high-pressure balls, &ge; 150 tournament balls, and &ge; 5 pressure matches.</li>
            <li>Yielded a restricted candidate pool of 37 batters and 32 bowlers.</li>
            <li>Zero role normalisation: all qualified players competed in a single unified pool.</li>
            <li>Heavily concentrated in death-overs chases, resulting in zero openers appearing in the top 10.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
