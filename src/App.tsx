import { useState } from 'react';
import { superRRData } from './data/superrrLoader';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { BatterLeaderboardSection } from './components/BatterLeaderboardSection';
import { BowlerLeaderboardSection } from './components/BowlerLeaderboardSection';
import { V1BaselineSection } from './components/V1BaselineSection';
import { ModelComparisonSection } from './components/ModelComparisonSection';
import { CandidateExplorerSection } from './components/CandidateExplorerSection';
import { ViratKohliAuditSection } from './components/ViratKohliAuditSection';
import { MethodologySection } from './components/MethodologySection';
import { LimitationsSection } from './components/LimitationsSection';
import { ConclusionSection } from './components/ConclusionSection';
import { PlayerDetailModal, type AnyPlayerRecord } from './components/PlayerDetailModal';
import { Footer } from './components/Footer';

import type { ActiveSection, BatterRecord, BowlerRecord, V2BatterRecord, V2BowlerRecord } from './types/cricket';

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [selectedPlayer, setSelectedPlayer] = useState<AnyPlayerRecord | null>(null);
  const [playerType, setPlayerType] = useState<'batter' | 'bowler'>('batter');

  const handleNavigate = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectV2Batter = (batter: V2BatterRecord) => {
    setSelectedPlayer(batter);
    setPlayerType('batter');
  };

  const handleSelectV2Bowler = (bowler: V2BowlerRecord) => {
    setSelectedPlayer(bowler);
    setPlayerType('bowler');
  };

  const handleSelectV1Batter = (batter: BatterRecord) => {
    setSelectedPlayer(batter);
    setPlayerType('batter');
  };

  const handleSelectV1Bowler = (bowler: BowlerRecord) => {
    setSelectedPlayer(bowler);
    setPlayerType('bowler');
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  // Find Virat Kohli record for the case study
  const kohliRecord = superRRData.v2.allBatters.find(b => b.player === 'Virat Kohli');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleNavigate}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page 1: Executive Overview */}
        {activeSection === 'overview' && (
          <OverviewSection
            v2Summary={superRRData.v2.summary}
            v2TopBatters={superRRData.v2.top10Batters}
            v2TopBowlers={superRRData.v2.top10Bowlers}
            onNavigate={handleNavigate}
            onSelectBatter={handleSelectV2Batter}
            onSelectBowler={handleSelectV2Bowler}
          />
        )}

        {/* Page 2: V2 Top 10 Batters */}
        {activeSection === 'batters' && (
          <BatterLeaderboardSection
            v2Batters={superRRData.v2.top10Batters}
            v1Batters={superRRData.v1.top10Batters}
            rawV2Csv={superRRData.v2.rawCsvs.top10Batters}
            rawV1Csv={superRRData.v1.rawCsvs.top10Batters}
            onSelectV2Batter={handleSelectV2Batter}
            onSelectV1Batter={handleSelectV1Batter}
          />
        )}

        {/* Page 3: V2 Top 10 Bowlers */}
        {activeSection === 'bowlers' && (
          <BowlerLeaderboardSection
            v2Bowlers={superRRData.v2.top10Bowlers}
            v1Bowlers={superRRData.v1.top10Bowlers}
            rawV2Csv={superRRData.v2.rawCsvs.top10Bowlers}
            rawV1Csv={superRRData.v1.rawCsvs.top10Bowlers}
            onSelectV2Bowler={handleSelectV2Bowler}
            onSelectV1Bowler={handleSelectV1Bowler}
          />
        )}

        {/* Page 4: V1 Baseline Results */}
        {activeSection === 'v1-baseline' && (
          <V1BaselineSection
            v1Batters={superRRData.v1.top10Batters}
            v1Bowlers={superRRData.v1.top10Bowlers}
            rawBattersCsv={superRRData.v1.rawCsvs.top10Batters}
            rawBowlersCsv={superRRData.v1.rawCsvs.top10Bowlers}
            onSelectBatter={handleSelectV1Batter}
            onSelectBowler={handleSelectV1Bowler}
          />
        )}

        {/* Page 5: Model Comparison */}
        {activeSection === 'comparison' && (
          <ModelComparisonSection
            v2Batters={superRRData.v2.top10Batters}
            v2Bowlers={superRRData.v2.top10Bowlers}
            v1Batters={superRRData.v1.top10Batters}
            v1Bowlers={superRRData.v1.top10Bowlers}
            v2Sensitivity={superRRData.v2.thresholdSensitivity}
            v1Sensitivity={superRRData.v1.thresholdSensitivity}
          />
        )}

        {/* Page 6: Full Candidate Explorer */}
        {activeSection === 'explorer' && (
          <CandidateExplorerSection
            v2AllBatters={superRRData.v2.allBatters}
            v2AllBowlers={superRRData.v2.allBowlers}
            v1AllBatters={superRRData.v1.allBatters}
            v1AllBowlers={superRRData.v1.allBowlers}
            rawCsvs={{
              v2Batters: superRRData.v2.rawCsvs.allBatters,
              v2Bowlers: superRRData.v2.rawCsvs.allBowlers,
              v1Batters: superRRData.v1.rawCsvs.allBatters,
              v1Bowlers: superRRData.v1.rawCsvs.allBowlers,
            }}
            onSelectV2Batter={handleSelectV2Batter}
            onSelectV2Bowler={handleSelectV2Bowler}
            onSelectV1Batter={handleSelectV1Batter}
            onSelectV1Bowler={handleSelectV1Bowler}
          />
        )}

        {/* Page 7: Virat Kohli Audit Case Study */}
        {activeSection === 'kohli' && (
          <ViratKohliAuditSection
            auditData={superRRData.v2.summary.virat_kohli_audit}
            kohliRecord={kohliRecord}
          />
        )}

        {/* Page 8: Methodology */}
        {activeSection === 'methodology' && (
          <MethodologySection />
        )}

        {/* Page 9: Validation & Limitations */}
        {activeSection === 'limitations' && (
          <LimitationsSection />
        )}

        {/* Page 10: Final Analytical Conclusion */}
        {activeSection === 'conclusion' && (
          <ConclusionSection onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Player Detail Modal */}
      <PlayerDetailModal
        player={selectedPlayer}
        type={playerType}
        onClose={handleCloseModal}
      />
    </div>
  );
}
export default App;
