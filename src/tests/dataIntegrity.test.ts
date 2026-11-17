import { describe, it, expect } from 'vitest';
import { superRRData } from '../data/superrrLoader';

describe('SUPER RR V1 Data Integrity & Verification Tests', () => {
  it('should parse V1 summary JSON correctly with exact values', () => {
    expect(superRRData.v1.summary.scope).toBe('IPL 2022-2026');
    expect(superRRData.v1.summary.matches).toBe(367);
    expect(superRRData.v1.summary.deliveries).toBe(87673);
    expect(superRRData.v1.summary.eligible_batters).toBe(37);
    expect(superRRData.v1.summary.eligible_bowlers).toBe(32);
  });

  it('should contain exactly 10 top batters in the exact supplied V1 ranking order', () => {
    expect(superRRData.v1.top10Batters.length).toBe(10);

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
      const actual = superRRData.v1.top10Batters[idx];
      expect(actual.rank).toBe(expected.rank);
      expect(actual.striker_name).toBe(expected.name);
      expect(actual.score).toBeGreaterThanOrEqual(expected.scoreMin);
      expect(actual.score).toBeLessThanOrEqual(expected.scoreMax);
    });
  });

  it('should contain exactly 10 top bowlers in the exact supplied V1 ranking order', () => {
    expect(superRRData.v1.top10Bowlers.length).toBe(10);

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
      const actual = superRRData.v1.top10Bowlers[idx];
      expect(actual.rank).toBe(expected.rank);
      expect(actual.bowler_name).toBe(expected.name);
      expect(actual.score).toBeGreaterThanOrEqual(expected.scoreMin);
      expect(actual.score).toBeLessThanOrEqual(expected.scoreMax);
    });
  });

  it('should load all 37 eligible candidate batters and 32 bowlers in V1', () => {
    expect(superRRData.v1.allBatters.length).toBe(37);
    expect(superRRData.v1.allBowlers.length).toBe(32);
  });
});

describe('SUPER RR V2 Data Integrity & Analytical Verification Tests', () => {
  it('should parse V2 summary correctly with exact specifications', () => {
    expect(superRRData.v2.summary.eligible_batters_v2).toBe(112);
    expect(superRRData.v2.summary.eligible_bowlers_v2).toBe(129);
    expect(superRRData.v2.summary.high_pressure_deliveries_v2).toBe(17592);
  });

  it('should contain exactly 10 top batters in the exact supplied V2 ranking order', () => {
    expect(superRRData.v2.top10Batters.length).toBe(10);

    const expectedV2Batters = [
      { rank: 1, name: 'Ishan Kishan', role: 'Opener', scoreMin: 80.8, scoreMax: 80.81 },
      { rank: 2, name: 'Krunal Pandya', role: 'Middle order', scoreMin: 76.9, scoreMax: 76.97 },
      { rank: 3, name: 'Shahbaz Ahmed', role: 'Finisher', scoreMin: 76.04, scoreMax: 76.05 },
      { rank: 4, name: 'Rahul Tewatia', role: 'Finisher', scoreMin: 73.78, scoreMax: 73.79 },
      { rank: 5, name: 'Devdutt Padikkal', role: 'Middle order', scoreMin: 73.54, scoreMax: 73.55 },
      { rank: 6, name: 'Wriddhiman Saha', role: 'Opener', scoreMin: 72.45, scoreMax: 72.46 },
      { rank: 7, name: 'Abhinav Manohar', role: 'Finisher', scoreMin: 71.29, scoreMax: 71.30 },
      { rank: 8, name: 'Aniket Verma', role: 'Middle order', scoreMin: 70.72, scoreMax: 70.73 },
      { rank: 9, name: 'Venkatesh Iyer', role: 'Middle order', scoreMin: 70.20, scoreMax: 70.21 },
      { rank: 10, name: 'Rahul Tripathi', role: 'Middle order', scoreMin: 69.32, scoreMax: 69.33 },
    ];

    expectedV2Batters.forEach((expected, idx) => {
      const actual = superRRData.v2.top10Batters[idx];
      expect(actual.rank).toBe(expected.rank);
      expect(actual.player).toBe(expected.name);
      expect(actual.role).toBe(expected.role);
      expect(actual.score).toBeGreaterThanOrEqual(expected.scoreMin);
      expect(actual.score).toBeLessThanOrEqual(expected.scoreMax);
    });
  });

  it('should contain exactly 10 top bowlers in the exact supplied V2 ranking order', () => {
    expect(superRRData.v2.top10Bowlers.length).toBe(10);

    const expectedV2Bowlers = [
      { rank: 1, name: 'Shahbaz Ahmed', role: 'Middle', scoreMin: 77.94, scoreMax: 77.96 },
      { rank: 2, name: 'Romario Shepherd', role: 'Middle', scoreMin: 74.07, scoreMax: 74.08 },
      { rank: 3, name: 'Shivang Kumar', role: 'Middle', scoreMin: 73.43, scoreMax: 73.44 },
      { rank: 4, name: 'Washington Sundar', role: 'Middle', scoreMin: 71.10, scoreMax: 71.11 },
      { rank: 5, name: 'Ishant Sharma', role: 'Powerplay', scoreMin: 70.86, scoreMax: 70.87 },
      { rank: 6, name: 'Avesh Khan', role: 'Death', scoreMin: 70.72, scoreMax: 70.73 },
      { rank: 7, name: 'Mukesh Kumar', role: 'Powerplay', scoreMin: 69.31, scoreMax: 69.32 },
      { rank: 8, name: 'Mayank Markande', role: 'Middle', scoreMin: 69.11, scoreMax: 69.12 },
      { rank: 9, name: 'Chris Jordan', role: 'Death', scoreMin: 67.63, scoreMax: 67.64 },
      { rank: 10, name: 'Mitchell Marsh', role: 'Middle', scoreMin: 67.44, scoreMax: 67.45 },
    ];

    expectedV2Bowlers.forEach((expected, idx) => {
      const actual = superRRData.v2.top10Bowlers[idx];
      expect(actual.rank).toBe(expected.rank);
      expect(actual.player).toBe(expected.name);
      expect(actual.role).toBe(expected.role);
      expect(actual.score).toBeGreaterThanOrEqual(expected.scoreMin);
      expect(actual.score).toBeLessThanOrEqual(expected.scoreMax);
    });
  });

  it('should verify critical bowling finding: all 10 V2 top bowlers have negative runs_saved_per6', () => {
    const expectedRunsSaved = [
      { name: 'Shahbaz Ahmed', val: -2.26 },
      { name: 'Romario Shepherd', val: -4.21 },
      { name: 'Shivang Kumar', val: -3.61 },
      { name: 'Washington Sundar', val: -1.53 },
      { name: 'Ishant Sharma', val: -2.40 },
      { name: 'Avesh Khan', val: -0.08 },
      { name: 'Mukesh Kumar', val: -2.59 },
      { name: 'Mayank Markande', val: -1.88 },
      { name: 'Chris Jordan', val: -0.87 },
      { name: 'Mitchell Marsh', val: -3.86 },
    ];

    superRRData.v2.top10Bowlers.forEach((bowler, idx) => {
      expect(bowler.runs_saved_per6).toBeLessThan(0);
      expect(Number(bowler.runs_saved_per6.toFixed(2))).toBe(expectedRunsSaved[idx].val);
    });
  });

  it('should verify low reliability bowler examples in V2', () => {
    const marsh = superRRData.v2.top10Bowlers.find(b => b.player === 'Mitchell Marsh');
    const jordan = superRRData.v2.top10Bowlers.find(b => b.player === 'Chris Jordan');
    const shivang = superRRData.v2.top10Bowlers.find(b => b.player === 'Shivang Kumar');

    expect(Number(marsh?.reliability.toFixed(2))).toBe(0.36);
    expect(Number(jordan?.reliability.toFixed(2))).toBe(0.48);
    expect(Number(shivang?.reliability.toFixed(2))).toBe(0.55);
  });

  it('should load full candidate explorer pools with exact counts', () => {
    expect(superRRData.v2.allBatters.length).toBe(112);
    expect(superRRData.v2.allBowlers.length).toBe(129);
  });

  it('should verify Virat Kohli audit case study values exactly', () => {
    const kohli = superRRData.v2.allBatters.find(b => b.player === 'Virat Kohli');
    expect(kohli).toBeDefined();
    expect(kohli?.rank).toBe(95);
    expect(kohli?.role).toBe('Opener');
    expect(kohli?.hp_runs).toBe(195);
    expect(kohli?.hp_balls).toBe(127);
    expect(kohli?.hp_matches).toBe(34);
    expect(Number(kohli?.hp_sr.toFixed(2))).toBe(153.54);
    expect(kohli?.hp_avg).toBe(32.5);
    expect(Number(kohli?.all_sr.toFixed(2))).toBe(146.03);
    expect(Number(kohli?.sr_retention.toFixed(2))).toBe(105.15);
    expect(Number(kohli?.score.toFixed(2))).toBe(35.01);
  });

  it('should verify V1 vs V2 top-10 overlap is exactly 2 players each', () => {
    const v1BatterNames = superRRData.v1.top10Batters.map(b => b.striker_name);
    const v2BatterNames = superRRData.v2.top10Batters.map(b => b.player);
    const batterOverlap = v2BatterNames.filter(name => v1BatterNames.includes(name));

    expect(batterOverlap).toEqual(['Krunal Pandya', 'Shahbaz Ahmed']);
    expect(batterOverlap.length).toBe(2);

    const v1BowlerNames = superRRData.v1.top10Bowlers.map(b => b.bowler_name);
    const v2BowlerNames = superRRData.v2.top10Bowlers.map(b => b.player);
    const bowlerOverlap = v2BowlerNames.filter(name => v1BowlerNames.includes(name));

    expect(bowlerOverlap).toEqual(['Shahbaz Ahmed', 'Mukesh Kumar']);
    expect(bowlerOverlap.length).toBe(2);
  });

  it('should verify V2 threshold sensitivity dataset values', () => {
    const sensitivity = superRRData.v2.thresholdSensitivity;
    expect(sensitivity.length).toBe(5);

    expect(sensitivity[0]).toEqual({ within_phase_quantile: 0.6, high_pressure_deliveries: 20940, share_pct: 23.88 });
    expect(sensitivity[1]).toEqual({ within_phase_quantile: 0.65, high_pressure_deliveries: 19564, share_pct: 22.31 });
    expect(sensitivity[2]).toEqual({ within_phase_quantile: 0.7, high_pressure_deliveries: 17592, share_pct: 20.07 });
    expect(sensitivity[3]).toEqual({ within_phase_quantile: 0.75, high_pressure_deliveries: 15577, share_pct: 17.77 });
    expect(sensitivity[4]).toEqual({ within_phase_quantile: 0.8, high_pressure_deliveries: 13927, share_pct: 15.89 });
  });
});
