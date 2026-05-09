// Pattern-block templates. Each split is keyed by training days/week.
// Sets / reps / rest are BASE values that the goal modifier in
// src/utils/workoutAssembler.js will adjust before exercise selection.
//
// Each day's `blocks[]` is a list of movement patterns to fill. The assembler
// picks an exercise per block based on the client's intake (equipment,
// injuries, experience, age) — see src/mockData/exercises.js.
//
// `priority`: 'main' (heavy compound) | 'accessory' (volume work).
// Goal modifier respects this — main blocks get strength rep ranges,
// accessory blocks get hypertrophy ranges.

export const SPLITS = {
  2: {
    name: 'Minimum Effective Dose',
    description: 'Two full-body sessions for very busy schedules.',
    days: [
      {
        name: 'Day 1', focus: 'Full Body A',
        blocks: [
          { pattern: 'squat',           sets: 4, reps: '8',     rest: '90s', priority: 'main' },
          { pattern: 'horizontal-push', sets: 4, reps: '8',     rest: '90s', priority: 'main' },
          { pattern: 'horizontal-pull', sets: 3, reps: '10',    rest: '90s', priority: 'main' },
          { pattern: 'hinge',           sets: 3, reps: '10',    rest: '60s', priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '45s',   rest: '45s', priority: 'accessory' },
        ],
      },
      {
        name: 'Day 2', focus: 'Full Body B',
        blocks: [
          { pattern: 'lunge',           sets: 4, reps: '8',     rest: '90s', priority: 'main' },
          { pattern: 'vertical-pull',   sets: 4, reps: 'AMRAP', rest: '90s', priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '10',    rest: '60s', priority: 'accessory' },
          { pattern: 'horizontal-push', sets: 3, reps: '12',    rest: '60s', priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '30s',   rest: '45s', priority: 'accessory' },
        ],
      },
    ],
  },

  3: {
    name: 'Full Body 3-Day',
    description: 'Time-efficient strength + hypertrophy. Train Mon/Wed/Fri.',
    days: [
      {
        name: 'Day 1', focus: 'Full Body — Strength Bias',
        blocks: [
          { pattern: 'squat',           sets: 4, reps: '5',   rest: '2-3 min', priority: 'main' },
          { pattern: 'horizontal-push', sets: 4, reps: '5-6', rest: '2 min',   priority: 'main' },
          { pattern: 'horizontal-pull', sets: 3, reps: '8',   rest: '90s',     priority: 'accessory' },
          { pattern: 'hinge',           sets: 3, reps: '8-10', rest: '90s',    priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '45s', rest: '45s',     priority: 'accessory' },
        ],
      },
      {
        name: 'Day 2', focus: 'Full Body — Hypertrophy',
        blocks: [
          { pattern: 'squat',           sets: 3, reps: '8',   rest: '2 min', priority: 'main' },
          { pattern: 'horizontal-push', sets: 3, reps: '10',  rest: '90s',   priority: 'accessory' },
          { pattern: 'vertical-pull',   sets: 3, reps: '10',  rest: '90s',   priority: 'accessory' },
          { pattern: 'lunge',           sets: 3, reps: '10',  rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',  rest: '60s',   priority: 'accessory' },
        ],
      },
      {
        name: 'Day 3', focus: 'Full Body — Power & Posterior',
        blocks: [
          { pattern: 'hinge',           sets: 4, reps: '3-5',  rest: '3 min', priority: 'main' },
          { pattern: 'vertical-push',   sets: 4, reps: '6',    rest: '2 min', priority: 'main' },
          { pattern: 'vertical-pull',   sets: 3, reps: '6-8',  rest: '2 min', priority: 'main' },
          { pattern: 'hinge',           sets: 3, reps: '10',   rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '10',   rest: '60s',   priority: 'accessory' },
        ],
      },
    ],
  },

  4: {
    name: 'Upper / Lower 4-Day',
    description: 'Classic split — Mon/Tue/Thu/Fri. Great hypertrophy stimulus.',
    days: [
      {
        name: 'Day 1', focus: 'Upper — Strength',
        blocks: [
          { pattern: 'horizontal-push', sets: 4, reps: '5',   rest: '2-3 min', priority: 'main' },
          { pattern: 'vertical-pull',   sets: 4, reps: '6-8', rest: '2 min',   priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '8',   rest: '90s',     priority: 'accessory' },
          { pattern: 'horizontal-pull', sets: 3, reps: '10',  rest: '90s',     priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '12',  rest: '60s',     priority: 'accessory' },
        ],
      },
      {
        name: 'Day 2', focus: 'Lower — Strength',
        blocks: [
          { pattern: 'squat',           sets: 4, reps: '5',     rest: '2-3 min', priority: 'main' },
          { pattern: 'hinge',           sets: 3, reps: '8',     rest: '2 min',   priority: 'main' },
          { pattern: 'lunge',           sets: 3, reps: '10',    rest: '90s',     priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',    rest: '60s',     priority: 'accessory' },
          { pattern: 'carry',           sets: 3, reps: '40m',   rest: '60s',     priority: 'accessory' },
        ],
      },
      {
        name: 'Day 3', focus: 'Upper — Hypertrophy',
        blocks: [
          { pattern: 'horizontal-push', sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'horizontal-pull', sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '12',  rest: '60s', priority: 'accessory' },
          { pattern: 'vertical-pull',   sets: 3, reps: '12',  rest: '60s', priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',  rest: '60s', priority: 'accessory' },
        ],
      },
      {
        name: 'Day 4', focus: 'Lower — Hypertrophy',
        blocks: [
          { pattern: 'squat',           sets: 3, reps: '8',   rest: '2 min', priority: 'main' },
          { pattern: 'hinge',           sets: 4, reps: '10',  rest: '90s',   priority: 'main' },
          { pattern: 'lunge',           sets: 3, reps: '12',  rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',  rest: '60s',   priority: 'accessory' },
        ],
      },
    ],
  },

  5: {
    name: 'Push / Pull / Legs + Upper / Lower',
    description: '5-day hybrid — high frequency, balanced volume.',
    days: [
      {
        name: 'Day 1', focus: 'Push',
        blocks: [
          { pattern: 'horizontal-push', sets: 4, reps: '6',   rest: '2 min', priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '8',   rest: '90s',   priority: 'main' },
          { pattern: 'horizontal-push', sets: 3, reps: '10',  rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 4, reps: '12',  rest: '45s',   priority: 'accessory' },
        ],
      },
      {
        name: 'Day 2', focus: 'Pull',
        blocks: [
          { pattern: 'hinge',           sets: 3, reps: '5',    rest: '3 min', priority: 'main' },
          { pattern: 'vertical-pull',   sets: 4, reps: '6-8',  rest: '2 min', priority: 'main' },
          { pattern: 'horizontal-pull', sets: 3, reps: '8',    rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',   rest: '45s',   priority: 'accessory' },
        ],
      },
      {
        name: 'Day 3', focus: 'Legs',
        blocks: [
          { pattern: 'squat',           sets: 4, reps: '6',   rest: '2-3 min', priority: 'main' },
          { pattern: 'hinge',           sets: 3, reps: '8',   rest: '90s',     priority: 'main' },
          { pattern: 'lunge',           sets: 3, reps: '10',  rest: '90s',     priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '12',  rest: '60s',     priority: 'accessory' },
        ],
      },
      {
        name: 'Day 4', focus: 'Upper Hypertrophy',
        blocks: [
          { pattern: 'horizontal-push', sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'horizontal-pull', sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '12',  rest: '60s', priority: 'accessory' },
          { pattern: 'vertical-pull',   sets: 3, reps: '12',  rest: '60s', priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',  rest: '45s', priority: 'accessory' },
        ],
      },
      {
        name: 'Day 5', focus: 'Lower Hypertrophy',
        blocks: [
          { pattern: 'squat',           sets: 3, reps: '8',   rest: '2 min', priority: 'main' },
          { pattern: 'hinge',           sets: 4, reps: '10',  rest: '90s',   priority: 'main' },
          { pattern: 'lunge',           sets: 3, reps: '12',  rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '10',  rest: '60s',   priority: 'accessory' },
        ],
      },
    ],
  },

  6: {
    name: 'Push / Pull / Legs ×2',
    description: 'High-volume PPL — train each pattern twice per week.',
    days: [
      {
        name: 'Day 1', focus: 'Push (Heavy)',
        blocks: [
          { pattern: 'horizontal-push', sets: 4, reps: '5',   rest: '2-3 min', priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '6',   rest: '2 min',   priority: 'main' },
          { pattern: 'horizontal-push', sets: 3, reps: '10',  rest: '90s',     priority: 'accessory' },
        ],
      },
      {
        name: 'Day 2', focus: 'Pull (Heavy)',
        blocks: [
          { pattern: 'hinge',           sets: 3, reps: '5',    rest: '3 min', priority: 'main' },
          { pattern: 'vertical-pull',   sets: 4, reps: '6',    rest: '2 min', priority: 'main' },
          { pattern: 'horizontal-pull', sets: 3, reps: '8',    rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',   rest: '45s',   priority: 'accessory' },
        ],
      },
      {
        name: 'Day 3', focus: 'Legs (Heavy)',
        blocks: [
          { pattern: 'squat',           sets: 4, reps: '5',   rest: '2-3 min', priority: 'main' },
          { pattern: 'hinge',           sets: 3, reps: '8',   rest: '90s',     priority: 'main' },
          { pattern: 'squat',           sets: 3, reps: '10',  rest: '90s',     priority: 'accessory' },
          { pattern: 'core',            sets: 4, reps: '10',  rest: '45s',     priority: 'accessory' },
        ],
      },
      {
        name: 'Day 4', focus: 'Push (Volume)',
        blocks: [
          { pattern: 'horizontal-push', sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'vertical-push',   sets: 3, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'horizontal-push', sets: 3, reps: '12',  rest: '60s', priority: 'accessory' },
        ],
      },
      {
        name: 'Day 5', focus: 'Pull (Volume)',
        blocks: [
          { pattern: 'vertical-pull',   sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'horizontal-pull', sets: 4, reps: '10',  rest: '90s', priority: 'main' },
          { pattern: 'vertical-pull',   sets: 3, reps: '12',  rest: '60s', priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',  rest: '45s', priority: 'accessory' },
        ],
      },
      {
        name: 'Day 6', focus: 'Legs (Volume)',
        blocks: [
          { pattern: 'squat',           sets: 3, reps: '8',   rest: '2 min', priority: 'main' },
          { pattern: 'hinge',           sets: 4, reps: '10',  rest: '90s',   priority: 'main' },
          { pattern: 'lunge',           sets: 3, reps: '12',  rest: '90s',   priority: 'accessory' },
          { pattern: 'core',            sets: 3, reps: '15',  rest: '45s',   priority: 'accessory' },
        ],
      },
    ],
  },

  7: null, // Use 6-day; assembler clamps.
};

export const BODYWEIGHT_NOTE = 'No equipment? The assembler will substitute bodyweight variants automatically.';
