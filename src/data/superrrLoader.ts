import Papa from 'papaparse';
import summaryJsonData from './superrr/ipl_results_summary.json';
import top10BattersCsv from './superrr/ipl_top10_batters.csv?raw';
import top10BowlersCsv from './superrr/ipl_top10_bowlers.csv?raw';
import allBattersCsv from './superrr/ipl_batter_rankings_all.csv?raw';
import allBowlersCsv from './superrr/ipl_bowler_rankings_all.csv?raw';
import thresholdSensitivityCsv from './superrr/ipl_threshold_sensitivity.csv?raw';
import methodologyMd from './superrr/IPL_results_methodology_and_limitations.md?raw';

import type {
  BatterRecord,
  BowlerRecord,
  ThresholdSensitivityRecord,
  SummaryJson
} from '../types/cricket';

function parseCsv<T>(csvString: string): T[] {
  const result = Papa.parse<T>(csvString.trim(), {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return result.data;
}

// Parse top 10 batters and add original ranking (1 to 10)
const parsedTop10Batters = parseCsv<BatterRecord>(top10BattersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

// Parse top 10 bowlers and add original ranking (1 to 10)
const parsedTop10Bowlers = parseCsv<BowlerRecord>(top10BowlersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

// Parse all candidate batters with rank based on provided ordering
const parsedAllBatters = parseCsv<BatterRecord>(allBattersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

// Parse all candidate bowlers with rank based on provided ordering
const parsedAllBowlers = parseCsv<BowlerRecord>(allBowlersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

// Parse threshold sensitivity
const parsedThresholdSensitivity = parseCsv<ThresholdSensitivityRecord>(thresholdSensitivityCsv);

export const superRRData = {
  summary: summaryJsonData as SummaryJson,
  top10Batters: parsedTop10Batters,
  top10Bowlers: parsedTop10Bowlers,
  allBatters: parsedAllBatters,
  allBowlers: parsedAllBowlers,
  thresholdSensitivity: parsedThresholdSensitivity,
  methodologyRaw: methodologyMd,
  rawCsvs: {
    top10Batters: top10BattersCsv,
    top10Bowlers: top10BowlersCsv,
    allBatters: allBattersCsv,
    allBowlers: allBowlersCsv,
    thresholdSensitivity: thresholdSensitivityCsv,
  }
};

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
