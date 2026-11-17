import { describe, it, expect } from 'vitest';
import { superRRData } from '../data/superrrLoader';

describe('SUPER RR Data Integrity & Verification Tests', () => {
  it('should parse summary JSON correctly with exact values', () => {
    expect(superRRData.summary.scope).toBe('IPL 2022-2026');
    expect(superRRData.summary.matches).toBe(367);
    expect(superRRData.summary.deliveries).toBe(87673);
    expect(superRRData.summary.eligible_batters).toBe(37);
    expect(superRRData.summary.eligible_bowlers).toBe(32);
  });

  it('should contain exactly 10 top batters in the exact supplied ranking order', () => {
    expect(superRRData.top10Batters.length).toBe(10);

    const expectedBatters = [
      { rank: 1, name: 'Abdul Samad', scoreMin: 72.5, scoreMax: 72.6 },
      { rank: 2, name: 'Krunal Pandya', scoreMin: 71.1, scoreMax: 71.3 },
      { rank: 3, name: 'Lalit Yadav', scoreMin: 67.4, scoreMax: 67.5 },
      { rank: 4, name: 'Axar Patel', scoreMin: 65.3, scoreMax: 65.4 },
      { rank: 5, name: 'Kieron Pollard', scoreMin: 64.9, scoreMax: 65.1 },
      { rank: 6, name: 'Andre Russell', scoreMin: 64.2, scoreMax: 64.3 },
      { rank: 7, name: 'Romario Shepherd', scoreMin: 64.2, scoreMax: 64.3 },
      { rank: 8, name: 'Shahbaz Ahmed', scoreMin: 61.0, scoreMax: 61.1 },
      { rank: 9, name: 'Rovman Powell', scoreMin: 60.8, scoreMax: 60.9 },
      { rank: 10, name: 'Suryakumar Yadav', scoreMin: 57.5, scoreMax: 57.6 },
    ];

    expectedBatters.forEach((expected, idx) => {
      const actual = superRRData.top10Batters[idx];
      expect(actual.rank).toBe(expected.rank);
      expect(actual.striker_name).toBe(expected.name);
      expect(actual.score).toBeGreaterThanOrEqual(expected.scoreMin);
      expect(actual.score).toBeLessThanOrEqual(expected.scoreMax);
    });
  });

  it('should contain exactly 10 top bowlers in the exact supplied ranking order', () => {
    expect(superRRData.top10Bowlers.length).toBe(10);

    const expectedBowlers = [
      { rank: 1, name: 'Mukesh Kumar', scoreMin: 65.4, scoreMax: 65.5 },
      { rank: 2, name: 'Jasprit Bumrah', scoreMin: 63.0, scoreMax: 63.1 },
      { rank: 3, name: 'Deepak Chahar', scoreMin: 61.7, scoreMax: 61.9 },
      { rank: 4, name: 'Shardul Thakur', scoreMin: 61.2, scoreMax: 61.3 },
      { rank: 5, name: 'Harshal Patel', scoreMin: 60.9, scoreMax: 61.0 },
      { rank: 6, name: 'Marco Jansen', scoreMin: 59.1, scoreMax: 59.2 },
      { rank: 7, name: 'Shahbaz Ahmed', scoreMin: 57.0, scoreMax: 57.2 },
      { rank: 8, name: 'T Natarajan', scoreMin: 56.8, scoreMax: 56.9 },
      { rank: 9, name: 'Arshdeep Singh', scoreMin: 56.8, scoreMax: 56.9 },
      { rank: 10, name: 'Auqib Nabi', scoreMin: 56.4, scoreMax: 56.5 },
    ];

    expectedBowlers.forEach((expected, idx) => {
      const actual = superRRData.top10Bowlers[idx];
      expect(actual.rank).toBe(expected.rank);
      expect(actual.bowler_name).toBe(expected.name);
      expect(actual.score).toBeGreaterThanOrEqual(expected.scoreMin);
      expect(actual.score).toBeLessThanOrEqual(expected.scoreMax);
    });
  });

  it('should verify critical analytical finding: all top 10 bowlers have negative runs_saved_per6', () => {
    superRRData.top10Bowlers.forEach((bowler) => {
      expect(bowler.runs_saved_per6).toBeLessThan(0);
      // Actual HP economy must be greater than expected economy
      expect(bowler.hp_econ).toBeGreaterThan(bowler.hp_expected_econ);
    });
  });

  it('should load all 37 eligible candidate batters', () => {
    expect(superRRData.allBatters.length).toBe(37);
    expect(superRRData.allBatters[0].striker_name).toBe('Abdul Samad');
    expect(superRRData.allBatters[36].striker_name).toBe('Rinku Singh');
  });

  it('should load all 32 eligible candidate bowlers', () => {
    expect(superRRData.allBowlers.length).toBe(32);
    expect(superRRData.allBowlers[0].bowler_name).toBe('Mukesh Kumar');
    expect(superRRData.allBowlers[31].bowler_name).toBe('Sunil Narine');
  });

  it('should load threshold sensitivity records accurately', () => {
    expect(superRRData.thresholdSensitivity.length).toBe(3);
    
    const t60 = superRRData.thresholdSensitivity.find((t) => t.threshold === 60);
    expect(t60?.batting_high_pressure_deliveries).toBe(7167);
    expect(t60?.bowling_high_pressure_deliveries).toBe(4478);

    const t65 = superRRData.thresholdSensitivity.find((t) => t.threshold === 65);
    expect(t65?.batting_high_pressure_deliveries).toBe(5502);
    expect(t65?.bowling_high_pressure_deliveries).toBe(2728);

    const t70 = superRRData.thresholdSensitivity.find((t) => t.threshold === 70);
    expect(t70?.batting_high_pressure_deliveries).toBe(4792);
    expect(t70?.bowling_high_pressure_deliveries).toBe(1617);
  });

  it('should contain original methodology text without fabrication', () => {
    expect(superRRData.methodologyRaw).toContain('Phase 7 — IPL 2022–2026 exploratory shortlist');
    expect(superRRData.methodologyRaw).toContain('All top-10 bowlers in the current shortlist have negative runs-saved-per-six values');
  });
});
