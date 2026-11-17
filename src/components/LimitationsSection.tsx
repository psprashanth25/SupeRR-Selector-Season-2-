import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Database, 
  History, 
  Briefcase, 
  Scale, 
  Layers,
  FileCheck
} from 'lucide-react';

export const LimitationsSection: React.FC = () => {
  const limitations = [
    {
      id: 1,
      title: 'Exploratory & Provisional Nature',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      tag: 'Methodology Status',
      desc: 'These rankings represent an exploratory data science exercise conducted on the supplied dataset for the Unstop SuperRR Selector challenge. They are provisional analytical shortlists rather than officially validated, boardroom-ready selection decisions.',
    },
    {
      id: 2,
      title: 'Relative Within-Pool Standing vs Absolute Clutch Mastery',
      icon: <Scale className="w-5 h-5 text-blue-700" />,
      tag: 'Metric Interpretation',
      desc: 'All composite scores are constructed using within-pool percentiles relative to the 37 eligible batters and 32 eligible bowlers. A high score signifies that a player performed well relative to the screened candidates, not that they possess infallible pressure composure.',
    },
    {
      id: 3,
      title: 'Sample Size Asymmetries Across Candidates',
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      tag: 'Statistical Variance',
      desc: 'Eligible candidates feature substantial sample disparities. For instance, Abdul Samad faced 101 high-pressure balls across 8 matches, whereas Suryakumar Yadav faced 20 balls across 7 matches. While Empirical Bayes shrinkage dampens small-sample inflation, sample variance remains present.',
    },
    {
      id: 4,
      title: 'Small Bowling Delivery Volumes',
      icon: <Database className="w-5 h-5 text-rose-600" />,
      tag: 'Data Scarcity',
      desc: 'High-pressure bowling deliveries are structurally scarce. At threshold 65, only 2,728 bowling deliveries exist across 367 matches (~7.4 balls per match). Several top bowlers qualified with only 24 to 35 high-pressure balls, making bowling ranks more sensitive to boundary clustering.',
    },
    {
      id: 5,
      title: 'Universal Negative Contextual Runs Saved',
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      tag: 'Critical Finding',
      desc: 'Every single bowler in the exploratory top 10 conceded more runs than the model’s empirical expected baseline in high-pressure deliveries (runs saved/6 ranges from -1.54 to -5.21). Bowlers are being ranked on how well they mitigated damage relative to peers, not on absolute run denial.',
    },
    {
      id: 6,
      title: 'Data Dictionary & Edge-Case Validation Needed',
      icon: <FileCheck className="w-5 h-5 text-emerald-700" />,
      tag: 'Data Governance',
      desc: 'Before any formal presentation, key edge cases require validation against the organiser’s data dictionary: wicket attribution (ensuring run-outs and retired hurts are not credited to bowlers), extras classification (byes/leg-byes attribution), and exact match phase timestamping.',
    },
    {
      id: 7,
      title: 'Non-Predictive Historical Retrospective',
      icon: <History className="w-5 h-5 text-slate-700" />,
      tag: 'Forecasting Boundary',
      desc: 'This dashboard is a retrospective descriptive analysis of observed IPL 2022–2026 performance. It does not model aging curves, fitness trajectory, role changes, venue transitions, or predict performance in future IPL seasons.',
    },
    {
      id: 8,
      title: 'Not an Auction Purchasing Strategy',
      icon: <Briefcase className="w-5 h-5 text-blue-700" />,
      tag: 'Franchise Mandate',
      desc: 'This analysis intentionally does not incorporate player salaries, auction purses, squad balance, overseas slots, or retention rules. Retired players like Kieron Pollard remain in the analytical tables to preserve historical data integrity. It is strictly an evaluation of cricket pressure data science.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-700 mb-1">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Analytical Integrity</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Limitations, Boundary Conditions & Validation Requirements
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          High-quality sports analytics requires radical transparency about what data can and cannot prove. The following eight critical constraints define the scope, boundaries, and validation needs of this study.
        </p>
      </div>

      {/* Limitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {limitations.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {item.title}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                {item.tag}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Validation Checklist Box */}
      <div className="bg-navy-900 border border-slate-800 rounded-lg p-6 text-white shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-pink-400">
          <FileCheck className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Pre-Submission Technical Validation Checklist
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded space-y-1">
            <div className="text-pink-300 font-bold">1. Wicket Disambiguation</div>
            <p className="text-slate-400 font-sans text-xs">Verify run outs, obstruction, and retired outs are excluded from bowler wicket tallies.</p>
          </div>
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded space-y-1">
            <div className="text-pink-300 font-bold">2. Extras Attribution</div>
            <p className="text-slate-400 font-sans text-xs">Confirm leg-byes and byes are credited against team totals rather than bowler runs conceded.</p>
          </div>
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded space-y-1">
            <div className="text-pink-300 font-bold">3. Pressure Calibration</div>
            <p className="text-slate-400 font-sans text-xs">Compare sensitivity thresholds against competition organizers' specific criteria.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
