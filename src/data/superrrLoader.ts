import Papa from 'papaparse';

// V1 Imports
import v1SummaryJsonData from './superrr/v1_ipl_results_summary.json';
import v1Top10BattersCsv from './superrr/v1_ipl_top10_batters.csv?raw';
import v1Top10BowlersCsv from './superrr/v1_ipl_top10_bowlers.csv?raw';
import v1AllBattersCsv from './superrr/v1_ipl_batter_rankings_all.csv?raw';
import v1AllBowlersCsv from './superrr/v1_ipl_bowler_rankings_all.csv?raw';
import v1ThresholdSensitivityCsv from './superrr/v1_ipl_threshold_sensitivity.csv?raw';
import v1MethodologyMd from './superrr/v1_IPL_results_methodology_and_limitations.md?raw';

// V2 Imports
import v2ValidationSummaryJson from './superrr/v2_validation_summary.json';
import v2Top10BattersCsv from './superrr/v2_top10_batters.csv?raw';
import v2Top10BowlersCsv from './superrr/v2_top10_bowlers.csv?raw';
import v2AllBattersCsv from './superrr/v2_batter_rankings_all.csv?raw';
import v2AllBowlersCsv from './superrr/v2_bowler_rankings_all.csv?raw';
import v2ThresholdSensitivityCsv from './superrr/v2_threshold_sensitivity.csv?raw';
import v2MethodologyMd from './superrr/V2_methodology_and_limitations.md?raw';

// Comparison Review
import comparisonReviewMd from './superrr/V1_V2_Validation_Review.md?raw';

import type {
  BatterRecord,
  BowlerRecord,
  ThresholdSensitivityRecord,
  SummaryJson,
  V2BatterRecord,
  V2BowlerRecord,
  V2ThresholdSensitivityRecord,
  V2ValidationSummary
} from '../types/cricket';

function parseCsv<T>(csvString: string): T[] {
  const result = Papa.parse<T>(csvString.trim(), {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return result.data;
}

// Parse V1 records
const parsedV1Top10Batters = parseCsv<BatterRecord>(v1Top10BattersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

const parsedV1Top10Bowlers = parseCsv<BowlerRecord>(v1Top10BowlersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

const parsedV1AllBatters = parseCsv<BatterRecord>(v1AllBattersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

const parsedV1AllBowlers = parseCsv<BowlerRecord>(v1AllBowlersCsv).map((b, idx) => ({
  ...b,
  rank: idx + 1,
}));

const parsedV1ThresholdSensitivity = parseCsv<ThresholdSensitivityRecord>(v1ThresholdSensitivityCsv);

// Parse V2 records
const parsedV2Top10Batters = parseCsv<V2BatterRecord>(v2Top10BattersCsv);
const parsedV2Top10Bowlers = parseCsv<V2BowlerRecord>(v2Top10BowlersCsv);
const parsedV2AllBatters = parseCsv<V2BatterRecord>(v2AllBattersCsv);
const parsedV2AllBowlers = parseCsv<V2BowlerRecord>(v2AllBowlersCsv);
const parsedV2ThresholdSensitivity = parseCsv<V2ThresholdSensitivityRecord>(v2ThresholdSensitivityCsv);

export const superRRData = {
  // V2 Primary Data
  v2: {
    summary: v2ValidationSummaryJson as V2ValidationSummary,
    top10Batters: parsedV2Top10Batters,
    top10Bowlers: parsedV2Top10Bowlers,
    allBatters: parsedV2AllBatters,
    allBowlers: parsedV2AllBowlers,
    thresholdSensitivity: parsedV2ThresholdSensitivity,
    methodologyRaw: v2MethodologyMd,
    rawCsvs: {
      top10Batters: v2Top10BattersCsv,
      top10Bowlers: v2Top10BowlersCsv,
      allBatters: v2AllBattersCsv,
      allBowlers: v2AllBowlersCsv,
      thresholdSensitivity: v2ThresholdSensitivityCsv,
    }
  },
  // V1 Baseline Data
  v1: {
    summary: v1SummaryJsonData as SummaryJson,
    top10Batters: parsedV1Top10Batters,
    top10Bowlers: parsedV1Top10Bowlers,
    allBatters: parsedV1AllBatters,
    allBowlers: parsedV1AllBowlers,
    thresholdSensitivity: parsedV1ThresholdSensitivity,
    methodologyRaw: v1MethodologyMd,
    rawCsvs: {
      top10Batters: v1Top10BattersCsv,
      top10Bowlers: v1Top10BowlersCsv,
      allBatters: v1AllBattersCsv,
      allBowlers: v1AllBowlersCsv,
      thresholdSensitivity: v1ThresholdSensitivityCsv,
    }
  },
  // Comparison Review
  comparisonReviewRaw: comparisonReviewMd,

  // Backwards compatibility aliases
  summary: v1SummaryJsonData as SummaryJson,
  top10Batters: parsedV1Top10Batters,
  top10Bowlers: parsedV1Top10Bowlers,
  allBatters: parsedV1AllBatters,
  allBowlers: parsedV1AllBowlers,
  thresholdSensitivity: parsedV1ThresholdSensitivity,
  methodologyRaw: v1MethodologyMd,
  rawCsvs: {
    top10Batters: v1Top10BattersCsv,
    top10Bowlers: v1Top10BowlersCsv,
    allBatters: v1AllBattersCsv,
    allBowlers: v1AllBowlersCsv,
    thresholdSensitivity: v1ThresholdSensitivityCsv,
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
