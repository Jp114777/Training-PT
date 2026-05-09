// Tagged exercise library. The workout assembler picks an exercise per movement pattern
// based on the client's intake (equipment, current injuries, experience, age).
//
// Schema:
//   id              unique slug
//   name            display name
//   pattern         one of: squat, hinge, lunge, horizontal-push, vertical-push,
//                   horizontal-pull, vertical-pull, core, carry, finisher
//   equipment       array — exercise can be done if any of these match intake.equipment
//   contraindications  array of injury area slugs — exercise excluded if intake has any
//   experienceMin   integer 0–4 (none/lt1/1to3/3to5/5plus)
//   highImpact      true → excluded for clients age ≥ 60
//   defaultRank     lower = preferred when multiple candidates qualify (0 = the heavy
//                   compound default for that pattern). Used so the assembler picks the
//                   "heaviest reasonable" option for advanced clients with no constraints.
//
// Equipment values match intake checkboxes: full_gym, home_gym, dumbbells, bodyweight, bands.
// Injury area slugs match intake checkboxes: shoulder, lower_back, knee, hip, wrist,
// ankle, neck, elbow.

export const EXERCISES = [
  // ── Squat ───────────────────────────────────────────────
  { id: 'back_squat',         name: 'Back Squat',          pattern: 'squat', equipment: ['full_gym','home_gym'],          contraindications: ['lower_back','knee','hip'], experienceMin: 2, highImpact: false, defaultRank: 0, repCue: 'reset every set' },
  { id: 'front_squat',        name: 'Front Squat',         pattern: 'squat', equipment: ['full_gym','home_gym'],          contraindications: ['knee','wrist'],            experienceMin: 3, highImpact: false, defaultRank: 1 },
  { id: 'goblet_squat',       name: 'Goblet Squat',        pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [],                       experienceMin: 0, highImpact: false, defaultRank: 2 },
  { id: 'leg_press',          name: 'Leg Press',           pattern: 'squat', equipment: ['full_gym'],                     contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 3 },
  { id: 'bulgarian_split',    name: 'Bulgarian Split Squat', pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip'], experienceMin: 1, highImpact: false, defaultRank: 4, repCue: 'each leg' },
  { id: 'box_step_up',        name: 'Box Step-Up',         pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: [],         experienceMin: 0, highImpact: false, defaultRank: 5, repCue: 'each leg' },
  { id: 'bw_squat',           name: 'Bodyweight Squat',    pattern: 'squat', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 6 },

  // ── Hinge ───────────────────────────────────────────────
  { id: 'deadlift',           name: 'Conventional Deadlift', pattern: 'hinge', equipment: ['full_gym','home_gym'],        contraindications: ['lower_back','knee'],       experienceMin: 2, highImpact: false, defaultRank: 0, repCue: 'reset every rep' },
  { id: 'hex_bar_dl',         name: 'Trap-Bar Deadlift',   pattern: 'hinge', equipment: ['full_gym'],                     contraindications: ['lower_back'],              experienceMin: 1, highImpact: false, defaultRank: 1 },
  { id: 'rdl',                name: 'Romanian Deadlift',   pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['lower_back'],          experienceMin: 1, highImpact: false, defaultRank: 2 },
  { id: 'single_leg_rdl',     name: 'Single-Leg RDL',      pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['hip'], experienceMin: 2, highImpact: false, defaultRank: 3, repCue: 'each leg' },
  { id: 'kb_swing',           name: 'Kettlebell Swing',    pattern: 'hinge', equipment: ['full_gym','home_gym'],          contraindications: ['lower_back'],              experienceMin: 1, highImpact: true,  defaultRank: 4 },
  { id: 'hip_thrust',         name: 'Hip Thrust',          pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells','bands'], contraindications: [],            experienceMin: 0, highImpact: false, defaultRank: 5 },
  { id: 'glute_bridge',       name: 'Glute Bridge',        pattern: 'hinge', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 6 },

  // ── Lunge ───────────────────────────────────────────────
  { id: 'walking_lunge',      name: 'Walking Lunge',       pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip','ankle'], experienceMin: 1, highImpact: false, defaultRank: 0, repCue: 'each leg' },
  { id: 'reverse_lunge',      name: 'Reverse Lunge',       pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['hip'],   experienceMin: 0, highImpact: false, defaultRank: 1, repCue: 'each leg' },
  { id: 'lateral_lunge',      name: 'Lateral Lunge',       pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip'], experienceMin: 1, highImpact: false, defaultRank: 2, repCue: 'each side' },
  { id: 'split_squat',        name: 'Static Split Squat',  pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee','hip'], experienceMin: 0, highImpact: false, defaultRank: 3, repCue: 'each leg' },
  { id: 'curtsy_lunge',       name: 'Curtsy Lunge',        pattern: 'lunge', equipment: ['full_gym','home_gym','dumbbells','bodyweight'], contraindications: ['knee'],  experienceMin: 1, highImpact: false, defaultRank: 4, repCue: 'each side' },

  // ── Horizontal Push ─────────────────────────────────────
  { id: 'bench_press',        name: 'Barbell Bench Press', pattern: 'horizontal-push', equipment: ['full_gym','home_gym'], contraindications: ['shoulder','wrist','elbow'], experienceMin: 2, highImpact: false, defaultRank: 0 },
  { id: 'incline_db_press',   name: 'Incline DB Press',    pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['shoulder'], experienceMin: 1, highImpact: false, defaultRank: 1 },
  { id: 'flat_db_press',      name: 'Flat DB Press',       pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['shoulder'], experienceMin: 0, highImpact: false, defaultRank: 2 },
  { id: 'machine_chest_press',name: 'Machine Chest Press', pattern: 'horizontal-push', equipment: ['full_gym'],            contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 3 },
  { id: 'push_up',            name: 'Push-Up',             pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['wrist','elbow'], experienceMin: 0, highImpact: false, defaultRank: 4 },
  { id: 'incline_push_up',    name: 'Incline Push-Up',     pattern: 'horizontal-push', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 5 },
  { id: 'dip',                name: 'Triceps Dip',         pattern: 'horizontal-push', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','elbow'], experienceMin: 2, highImpact: false, defaultRank: 6 },

  // ── Vertical Push ───────────────────────────────────────
  { id: 'overhead_press',     name: 'Standing Overhead Press', pattern: 'vertical-push', equipment: ['full_gym','home_gym'], contraindications: ['shoulder','lower_back'], experienceMin: 2, highImpact: false, defaultRank: 0 },
  { id: 'seated_db_press',    name: 'Seated DB Shoulder Press', pattern: 'vertical-push', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['shoulder'], experienceMin: 1, highImpact: false, defaultRank: 1 },
  { id: 'machine_shoulder',   name: 'Machine Shoulder Press', pattern: 'vertical-push', equipment: ['full_gym'],            contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 2 },
  { id: 'landmine_press',     name: 'Landmine Press',      pattern: 'vertical-push', equipment: ['full_gym','home_gym'], contraindications: [],                          experienceMin: 1, highImpact: false, defaultRank: 3, repCue: 'each side' },
  { id: 'pike_push_up',       name: 'Pike Push-Up',        pattern: 'vertical-push', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','wrist'], experienceMin: 1, highImpact: false, defaultRank: 4 },

  // ── Horizontal Pull ─────────────────────────────────────
  { id: 'barbell_row',        name: 'Bent-Over Barbell Row', pattern: 'horizontal-pull', equipment: ['full_gym','home_gym'], contraindications: ['lower_back'],            experienceMin: 2, highImpact: false, defaultRank: 0 },
  { id: 'chest_supp_row',     name: 'Chest-Supported Row', pattern: 'horizontal-pull', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [],          experienceMin: 0, highImpact: false, defaultRank: 1 },
  { id: 'one_arm_db_row',     name: 'One-Arm DB Row',      pattern: 'horizontal-pull', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [],          experienceMin: 0, highImpact: false, defaultRank: 2, repCue: 'each side' },
  { id: 'cable_row',          name: 'Seated Cable Row',    pattern: 'horizontal-pull', equipment: ['full_gym'],             contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 3 },
  { id: 't_bar_row',          name: 'T-Bar Row',           pattern: 'horizontal-pull', equipment: ['full_gym'],             contraindications: ['lower_back'],              experienceMin: 2, highImpact: false, defaultRank: 4 },
  { id: 'inverted_row',       name: 'Inverted Row',        pattern: 'horizontal-pull', equipment: ['full_gym','home_gym','bodyweight'], contraindications: [],          experienceMin: 0, highImpact: false, defaultRank: 5 },
  { id: 'face_pull',          name: 'Face Pull',           pattern: 'horizontal-pull', equipment: ['full_gym','bands'],     contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 6 },

  // ── Vertical Pull ───────────────────────────────────────
  { id: 'pull_up',            name: 'Pull-Up',             pattern: 'vertical-pull', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','elbow'], experienceMin: 2, highImpact: false, defaultRank: 0 },
  { id: 'chin_up',            name: 'Chin-Up',             pattern: 'vertical-pull', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['shoulder','elbow'], experienceMin: 1, highImpact: false, defaultRank: 1 },
  { id: 'lat_pulldown',       name: 'Lat Pulldown',        pattern: 'vertical-pull', equipment: ['full_gym'],               contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 2 },
  { id: 'neutral_pulldown',   name: 'Neutral-Grip Pulldown', pattern: 'vertical-pull', equipment: ['full_gym'],             contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 3 },
  { id: 'banded_pulldown',    name: 'Banded Pulldown',     pattern: 'vertical-pull', equipment: ['bands','bodyweight'],     contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 4 },

  // ── Core ────────────────────────────────────────────────
  { id: 'plank',              name: 'Plank',               pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['shoulder','wrist'], experienceMin: 0, highImpact: false, defaultRank: 0, repCue: 'hold seconds' },
  { id: 'side_plank',         name: 'Side Plank',          pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['shoulder','wrist'], experienceMin: 0, highImpact: false, defaultRank: 1, repCue: 'each side' },
  { id: 'hollow_hold',        name: 'Hollow Hold',         pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: ['lower_back','neck'], experienceMin: 1, highImpact: false, defaultRank: 2 },
  { id: 'dead_bug',           name: 'Dead Bug',            pattern: 'core', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3 },
  { id: 'hanging_leg_raise',  name: 'Hanging Leg Raise',   pattern: 'core', equipment: ['full_gym','home_gym'], contraindications: ['shoulder','lower_back'], experienceMin: 2, highImpact: false, defaultRank: 4 },
  { id: 'cable_crunch',       name: 'Cable Crunch',        pattern: 'core', equipment: ['full_gym'], contraindications: ['neck'],                experienceMin: 0, highImpact: false, defaultRank: 5 },
  { id: 'pallof_press',       name: 'Pallof Press',        pattern: 'core', equipment: ['full_gym','bands'], contraindications: [],            experienceMin: 0, highImpact: false, defaultRank: 6, repCue: 'each side' },
  { id: 'ab_wheel',           name: 'Ab Wheel Rollout',    pattern: 'core', equipment: ['full_gym','home_gym'], contraindications: ['lower_back','shoulder'], experienceMin: 2, highImpact: false, defaultRank: 7 },

  // ── Carry ───────────────────────────────────────────────
  { id: 'farmers_carry',      name: 'Farmer\'s Carry',     pattern: 'carry', equipment: ['full_gym','home_gym','dumbbells'], contraindications: [],                       experienceMin: 0, highImpact: false, defaultRank: 0, repCue: 'distance or seconds' },
  { id: 'suitcase_carry',     name: 'Suitcase Carry',      pattern: 'carry', equipment: ['full_gym','home_gym','dumbbells'], contraindications: ['lower_back'],          experienceMin: 0, highImpact: false, defaultRank: 1, repCue: 'each side' },
  { id: 'sled_push',          name: 'Sled Push',           pattern: 'carry', equipment: ['full_gym'],                      contraindications: [],                          experienceMin: 1, highImpact: false, defaultRank: 2 },
  { id: 'sled_drag',          name: 'Backwards Sled Drag', pattern: 'carry', equipment: ['full_gym'],                      contraindications: [],                          experienceMin: 0, highImpact: false, defaultRank: 3 },

  // ── Finisher (metabolic conditioning blocks for fat-loss) ─────────────
  { id: 'fin_kb_swings',      name: 'KB Swing Intervals',  pattern: 'finisher', equipment: ['full_gym','home_gym'],         contraindications: ['lower_back'],            experienceMin: 1, highImpact: true,  defaultRank: 0, repCue: '8 rounds: 30s on / 30s off' },
  { id: 'fin_sled_intervals', name: 'Sled Push Intervals', pattern: 'finisher', equipment: ['full_gym'],                    contraindications: [],                          experienceMin: 1, highImpact: false, defaultRank: 1, repCue: '6 × 20m heavy' },
  { id: 'fin_jump_rope',      name: 'Jump Rope Intervals', pattern: 'finisher', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['knee','ankle'],   experienceMin: 0, highImpact: true,  defaultRank: 2, repCue: '10 × 60s on / 30s off' },
  { id: 'fin_bw_circuit',     name: 'Bodyweight Circuit',  pattern: 'finisher', equipment: ['full_gym','home_gym','dumbbells','bodyweight','bands'], contraindications: [], experienceMin: 0, highImpact: false, defaultRank: 3, repCue: '3 rounds: 10 squats / 10 push-ups / 10 row' },
  { id: 'fin_burpee_emom',    name: 'Burpee EMOM',         pattern: 'finisher', equipment: ['full_gym','home_gym','bodyweight'], contraindications: ['knee','ankle','wrist'], experienceMin: 1, highImpact: true,  defaultRank: 4, repCue: '8 min: 8 burpees per minute' },
];

export const PATTERNS = [
  'squat', 'hinge', 'lunge',
  'horizontal-push', 'vertical-push',
  'horizontal-pull', 'vertical-pull',
  'core', 'carry', 'finisher',
];

// Map intake.experience → integer 0–4
export function experienceLevel(value) {
  switch (value) {
    case 'none': return 0;
    case 'lt1': return 1;
    case '1to3': return 2;
    case '3to5': return 3;
    case '5plus': return 4;
    default: return 1;
  }
}
