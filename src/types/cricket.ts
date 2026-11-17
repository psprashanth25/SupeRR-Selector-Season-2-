export interface BatterRecord {
  striker_id: number;
  striker_name: string;
  hp_runs: number;
  hp_balls: number;
  hp_dismissals: number;
  hp_boundaries: number;
  hp_dots: number;
  hp_matches: number;
  hp_order: number;
  all_runs: number;
  all_balls: number;
  all_dismissals: number;
  all_boundaries: number;
  all_dots: number;
  all_matches: number;
  all_order: number;
  hp_sr: number;
  hp_avg: number;
  hp_boundary_pct: number;
  hp_dot_pct: number;
  all_sr: number;
  sr_retention: number;
  p_hp_sr: number;
  p_hp_avg: number;
  p_hp_boundary_pct: number;
  p_hp_dot_pct: number;
  p_sr_retention: number;
  raw_score: number;
  reliability: number;
  score: number;
  rank?: number;
}

export interface BowlerRecord {
  bowler_id: number;
  bowler_name: string;
  hp_conceded: number;
  hp_legal: number;
  hp_wickets: number;
  hp_dots: number;
  hp_matches: number;
  hp_exp_runs: number;
  all_conceded: number;
  all_legal: number;
  all_wickets: number;
  all_dots: number;
  all_matches: number;
  all_exp_runs: number;
  hp_econ: number;
  hp_wk_per100: number;
  hp_dot_pct: number;
  hp_expected_econ: number;
  runs_saved_per6: number;
  all_econ: number;
  p_runs_saved_per6: number;
  p_hp_wk_per100: number;
  p_hp_dot_pct: number;
  p_hp_econ: number;
  raw_score: number;
  reliability: number;
  score: number;
  rank?: number;
}

export interface ThresholdSensitivityRecord {
  threshold: number;
  batting_high_pressure_deliveries: number;
  bowling_high_pressure_deliveries: number;
}

export interface SummaryJson {
  scope: string;
  matches: number;
  deliveries: number;
  eligible_batters: number;
  eligible_bowlers: number;
  top_batters: Array<{
    striker_name: string;
    score: number;
    hp_runs: number;
    hp_balls: number;
    hp_matches: number;
    hp_sr: number;
    hp_avg: number;
    all_sr: number;
    sr_retention: number;
  }>;
  top_bowlers: Array<{
    bowler_name: string;
    score: number;
    hp_conceded: number;
    hp_legal: number;
    hp_matches: number;
    hp_econ: number;
    hp_expected_econ: number;
    runs_saved_per6: number;
    hp_wk_per100: number;
    hp_dot_pct: number;
  }>;
}

// ==========================================
// V2 DATA STRUCTURES (CONTEXT-NORMALISED MODEL)
// ==========================================

export interface V2BatterRecord {
  rank: number;
  player_id: number;
  player: string;
  role: 'Opener' | 'Middle order' | 'Finisher' | string;
  score: number;
  hp_runs: number;
  hp_balls: number;
  hp_matches: number;
  hp_sr: number;
  hp_avg: number;
  all_sr: number;
  sr_retention: number;
  hp_boundary_pct: number;
  hp_dot_pct: number;
  all_balls: number;
  med_order: number;
  reliability: number;
}

export interface V2BowlerRecord {
  rank: number;
  player_id: number;
  player: string;
  role: 'Powerplay' | 'Middle' | 'Death' | string;
  score: number;
  hp_conceded: number;
  hp_legal: number;
  hp_matches: number;
  hp_econ: number;
  expected_econ: number;
  runs_saved_per6: number;
  hp_wickets: number;
  wk_per100: number;
  hp_dot_pct: number;
  hp_boundary_pct: number;
  all_legal: number;
  reliability: number;
}

export interface V2ThresholdSensitivityRecord {
  within_phase_quantile: number;
  high_pressure_deliveries: number;
  share_pct: number;
}

export interface V2ValidationSummary {
  scope: string;
  model_v2_pressure_rule: string;
  batter_role_groups: string;
  bowler_role_groups: string;
  eligible_batters_v2: number;
  eligible_bowlers_v2: number;
  high_pressure_deliveries_v2: number;
  virat_kohli_audit: {
    player: string;
    role: string;
    score: number;
    hp_runs: number;
    hp_balls: number;
    hp_matches: number;
    hp_sr: number;
    hp_avg: number;
    all_sr: number;
    sr_retention: number;
  };
  batter_top10_overlap_v1: string[];
  bowler_top10_overlap_v1: string[];
  important_caveats: string[];
}

export type ActiveSection = 
  | 'overview' 
  | 'batters' 
  | 'bowlers' 
  | 'explorer' 
  | 'comparison'
  | 'kohli'
  | 'methodology' 
  | 'limitations' 
  | 'sensitivity';
