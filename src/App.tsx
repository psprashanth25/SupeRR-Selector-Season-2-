import { useState } from 'react';
import { superRRData } from './data/superrrLoader';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { MethodologySection } from './components/MethodologySection';
import { BatterLeaderboardSection } from './components/BatterLeaderboardSection';
import { BowlerLeaderboardSection } from './components/BowlerLeaderboardSection';
import { CandidateExplorerSection } from './components/CandidateExplorerSection';
import { ThresholdSensitivitySection } from './components/ThresholdSensitivitySection';
import { LimitationsSection } from './components/LimitationsSection';
import { ConclusionSection } from './components/ConclusionSection';
import { PlayerDetailModal } from './components/PlayerDetailModal';
import { Footer } from './components/Footer';

import type { ActiveSection, BatterRecord, BowlerRecord } from './types/cricket';

export function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [selectedPlayer, setSelectedPlayer] = useState<BatterRecord | BowlerRecord | null>(null);
  const [playerType, setPlayerType] = useState<'batter' | 'bowler'>('batter');

  const handleNavigate = (section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBatter = (batter: BatterRecord) => {
    setSelectedPlayer(batter);
    setPlayerType('batter');
  };

  const handleSelectBowler = (bowler: BowlerRecord) => {
    setSelectedPlayer(bowler);
    setPlayerType('bowler');
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleNavigate}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && (
          <OverviewSection
            summary={superRRData.summary}
            topBatters={superRRData.top10Batters}
            topBowlers={superRRData.top10Bowlers}
            onNavigate={handleNavigate}
            onSelectBatter={handleSelectBatter}
            onSelectBowler={handleSelectBowler}
          />
        )}

        {activeSection === 'methodology' && (
          <MethodologySection />
        )}

        {activeSection === 'batters' && (
          <BatterLeaderboardSection
            batters={superRRData.top10Batters}
            onSelectBatter={handleSelectBatter}
          />
        )}

        {activeSection === 'bowlers' && (
          <BowlerLeaderboardSection
            bowlers={superRRData.top10Bowlers}
            onSelectBowler={handleSelectBowler}
          />
        )}

        {activeSection === 'explorer' && (
          <CandidateExplorerSection
            allBatters={superRRData.allBatters}
            allBowlers={superRRData.allBowlers}
            rawCsvs={superRRData.rawCsvs}
            onSelectBatter={handleSelectBatter}
            onSelectBowler={handleSelectBowler}
          />
        )}

        {activeSection === 'sensitivity' && (
          <ThresholdSensitivitySection
            data={superRRData.thresholdSensitivity}
          />
        )}

        {activeSection === 'limitations' && (
          <LimitationsSection />
        )}

        {activeSection === 'conclusion' && (
          <ConclusionSection
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Interactive Player Detail Modal */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          type={playerType}
          onClose={handleCloseModal}
        />
      )}

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
