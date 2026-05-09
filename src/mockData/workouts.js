// Sample splits — keyed by training days/week.
// Each day: { name, focus, exercises: [{ name, sets, reps, rest, notes }] }

export const SPLITS = {
  3: {
    name: 'Full Body 3-Day',
    description: 'Time-efficient strength + hypertrophy. Train Mon/Wed/Fri.',
    days: [
      {
        name: 'Day 1',
        focus: 'Full Body — Strength Bias',
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '5', rest: '2–3 min', notes: 'Top set @ RPE 8' },
          { name: 'Bench Press', sets: 4, reps: '5–6', rest: '2 min', notes: 'Pause last rep' },
          { name: 'Bent-Over Row', sets: 3, reps: '8', rest: '90s' },
          { name: 'Romanian Deadlift', sets: 3, reps: '8–10', rest: '90s' },
          { name: 'Plank', sets: 3, reps: '45s', rest: '45s' },
        ],
      },
      {
        name: 'Day 2',
        focus: 'Full Body — Hypertrophy',
        exercises: [
          { name: 'Front Squat', sets: 3, reps: '8', rest: '2 min' },
          { name: 'Incline DB Press', sets: 3, reps: '10', rest: '90s' },
          { name: 'Lat Pulldown', sets: 3, reps: '10', rest: '90s' },
          { name: 'Walking Lunge', sets: 3, reps: '10/leg', rest: '90s' },
          { name: 'Cable Crunch', sets: 3, reps: '15', rest: '60s' },
        ],
      },
      {
        name: 'Day 3',
        focus: 'Full Body — Power & Posterior',
        exercises: [
          { name: 'Deadlift', sets: 4, reps: '3–5', rest: '3 min', notes: 'Reset every rep' },
          { name: 'Overhead Press', sets: 4, reps: '6', rest: '2 min' },
          { name: 'Weighted Pull-Up', sets: 3, reps: '6–8', rest: '2 min' },
          { name: 'Hip Thrust', sets: 3, reps: '10', rest: '90s' },
          { name: 'Hanging Leg Raise', sets: 3, reps: '10', rest: '60s' },
        ],
      },
    ],
  },
  4: {
    name: 'Upper / Lower 4-Day',
    description: 'Classic split — Mon/Tue/Thu/Fri. Great hypertrophy stimulus.',
    days: [
      {
        name: 'Day 1',
        focus: 'Upper — Strength',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '5', rest: '2–3 min' },
          { name: 'Weighted Pull-Up', sets: 4, reps: '6–8', rest: '2 min' },
          { name: 'Seated DB Press', sets: 3, reps: '8', rest: '90s' },
          { name: 'Chest-Supported Row', sets: 3, reps: '10', rest: '90s' },
          { name: 'Lateral Raise', sets: 3, reps: '12', rest: '60s' },
          { name: 'EZ-Bar Curl', sets: 3, reps: '10', rest: '60s' },
        ],
      },
      {
        name: 'Day 2',
        focus: 'Lower — Strength',
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '5', rest: '2–3 min' },
          { name: 'Romanian Deadlift', sets: 3, reps: '8', rest: '2 min' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10/leg', rest: '90s' },
          { name: 'Leg Curl', sets: 3, reps: '12', rest: '60s' },
          { name: 'Standing Calf Raise', sets: 4, reps: '12', rest: '45s' },
        ],
      },
      {
        name: 'Day 3',
        focus: 'Upper — Hypertrophy',
        exercises: [
          { name: 'Incline DB Press', sets: 4, reps: '10', rest: '90s' },
          { name: 'Lat Pulldown', sets: 4, reps: '10', rest: '90s' },
          { name: 'Cable Fly', sets: 3, reps: '12', rest: '60s' },
          { name: 'Face Pull', sets: 3, reps: '15', rest: '45s' },
          { name: 'Rope Triceps Pushdown', sets: 3, reps: '12', rest: '60s' },
          { name: 'Hammer Curl', sets: 3, reps: '10', rest: '60s' },
        ],
      },
      {
        name: 'Day 4',
        focus: 'Lower — Hypertrophy',
        exercises: [
          { name: 'Front Squat', sets: 3, reps: '8', rest: '2 min' },
          { name: 'Hip Thrust', sets: 4, reps: '10', rest: '90s' },
          { name: 'Walking Lunge', sets: 3, reps: '12/leg', rest: '90s' },
          { name: 'Leg Extension', sets: 3, reps: '12', rest: '60s' },
          { name: 'Seated Calf Raise', sets: 4, reps: '15', rest: '45s' },
          { name: 'Hanging Leg Raise', sets: 3, reps: '10', rest: '60s' },
        ],
      },
    ],
  },
  5: {
    name: 'Push / Pull / Legs + Upper / Lower',
    description: '5-day hybrid — high frequency, balanced volume.',
    days: [
      {
        name: 'Day 1',
        focus: 'Push',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '6', rest: '2 min' },
          { name: 'Seated DB Press', sets: 3, reps: '8', rest: '90s' },
          { name: 'Incline DB Press', sets: 3, reps: '10', rest: '90s' },
          { name: 'Lateral Raise', sets: 4, reps: '12', rest: '45s' },
          { name: 'Triceps Dip', sets: 3, reps: '10', rest: '60s' },
        ],
      },
      {
        name: 'Day 2',
        focus: 'Pull',
        exercises: [
          { name: 'Deadlift', sets: 3, reps: '5', rest: '3 min' },
          { name: 'Weighted Pull-Up', sets: 4, reps: '6–8', rest: '2 min' },
          { name: 'Barbell Row', sets: 3, reps: '8', rest: '90s' },
          { name: 'Face Pull', sets: 3, reps: '15', rest: '45s' },
          { name: 'EZ-Bar Curl', sets: 3, reps: '10', rest: '60s' },
        ],
      },
      {
        name: 'Day 3',
        focus: 'Legs',
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '6', rest: '2–3 min' },
          { name: 'Romanian Deadlift', sets: 3, reps: '8', rest: '90s' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10/leg', rest: '90s' },
          { name: 'Leg Curl', sets: 3, reps: '12', rest: '60s' },
          { name: 'Calf Raise', sets: 4, reps: '12', rest: '45s' },
        ],
      },
      {
        name: 'Day 4',
        focus: 'Upper Hypertrophy',
        exercises: [
          { name: 'Incline DB Press', sets: 4, reps: '10', rest: '90s' },
          { name: 'Chest-Supported Row', sets: 4, reps: '10', rest: '90s' },
          { name: 'Cable Fly', sets: 3, reps: '12', rest: '60s' },
          { name: 'Lat Pulldown', sets: 3, reps: '12', rest: '60s' },
          { name: 'Hammer Curl', sets: 3, reps: '10', rest: '60s' },
          { name: 'Triceps Pushdown', sets: 3, reps: '12', rest: '60s' },
        ],
      },
      {
        name: 'Day 5',
        focus: 'Lower Hypertrophy',
        exercises: [
          { name: 'Front Squat', sets: 3, reps: '8', rest: '2 min' },
          { name: 'Hip Thrust', sets: 4, reps: '10', rest: '90s' },
          { name: 'Walking Lunge', sets: 3, reps: '12/leg', rest: '90s' },
          { name: 'Leg Extension', sets: 3, reps: '12', rest: '60s' },
          { name: 'Hanging Leg Raise', sets: 3, reps: '10', rest: '60s' },
        ],
      },
    ],
  },
  6: {
    name: 'Push / Pull / Legs ×2',
    description: 'High-volume PPL — train each pattern twice per week.',
    days: [
      {
        name: 'Day 1',
        focus: 'Push (Heavy)',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '5', rest: '2–3 min' },
          { name: 'Overhead Press', sets: 3, reps: '6', rest: '2 min' },
          { name: 'Incline DB Press', sets: 3, reps: '10', rest: '90s' },
          { name: 'Lateral Raise', sets: 3, reps: '12', rest: '45s' },
          { name: 'Close-Grip Bench', sets: 3, reps: '8', rest: '90s' },
        ],
      },
      {
        name: 'Day 2',
        focus: 'Pull (Heavy)',
        exercises: [
          { name: 'Deadlift', sets: 3, reps: '5', rest: '3 min' },
          { name: 'Weighted Pull-Up', sets: 4, reps: '6', rest: '2 min' },
          { name: 'Barbell Row', sets: 3, reps: '8', rest: '90s' },
          { name: 'Face Pull', sets: 3, reps: '15', rest: '45s' },
          { name: 'Barbell Curl', sets: 3, reps: '8', rest: '60s' },
        ],
      },
      {
        name: 'Day 3',
        focus: 'Legs (Heavy)',
        exercises: [
          { name: 'Back Squat', sets: 4, reps: '5', rest: '2–3 min' },
          { name: 'Romanian Deadlift', sets: 3, reps: '8', rest: '90s' },
          { name: 'Leg Press', sets: 3, reps: '10', rest: '90s' },
          { name: 'Leg Curl', sets: 3, reps: '12', rest: '60s' },
          { name: 'Standing Calf Raise', sets: 4, reps: '10', rest: '45s' },
        ],
      },
      {
        name: 'Day 4',
        focus: 'Push (Volume)',
        exercises: [
          { name: 'Incline DB Press', sets: 4, reps: '10', rest: '90s' },
          { name: 'Seated DB Press', sets: 3, reps: '10', rest: '90s' },
          { name: 'Cable Fly', sets: 3, reps: '12', rest: '60s' },
          { name: 'Lateral Raise', sets: 4, reps: '15', rest: '45s' },
          { name: 'Triceps Pushdown', sets: 3, reps: '12', rest: '60s' },
        ],
      },
      {
        name: 'Day 5',
        focus: 'Pull (Volume)',
        exercises: [
          { name: 'Lat Pulldown', sets: 4, reps: '10', rest: '90s' },
          { name: 'Chest-Supported Row', sets: 4, reps: '10', rest: '90s' },
          { name: 'Cable Pullover', sets: 3, reps: '12', rest: '60s' },
          { name: 'Reverse Pec Deck', sets: 3, reps: '15', rest: '45s' },
          { name: 'Hammer Curl', sets: 3, reps: '10', rest: '60s' },
        ],
      },
      {
        name: 'Day 6',
        focus: 'Legs (Volume)',
        exercises: [
          { name: 'Front Squat', sets: 3, reps: '8', rest: '2 min' },
          { name: 'Hip Thrust', sets: 4, reps: '10', rest: '90s' },
          { name: 'Walking Lunge', sets: 3, reps: '12/leg', rest: '90s' },
          { name: 'Leg Extension', sets: 3, reps: '15', rest: '60s' },
          { name: 'Seated Calf Raise', sets: 4, reps: '15', rest: '45s' },
        ],
      },
    ],
  },
  2: {
    name: 'Minimum Effective Dose',
    description: 'Two full-body sessions for very busy schedules.',
    days: [
      {
        name: 'Day 1',
        focus: 'Full Body A',
        exercises: [
          { name: 'Goblet Squat', sets: 4, reps: '8', rest: '90s' },
          { name: 'DB Bench Press', sets: 4, reps: '8', rest: '90s' },
          { name: 'One-Arm DB Row', sets: 3, reps: '10/side', rest: '90s' },
          { name: 'DB Romanian Deadlift', sets: 3, reps: '10', rest: '60s' },
          { name: 'Plank', sets: 3, reps: '45s', rest: '45s' },
        ],
      },
      {
        name: 'Day 2',
        focus: 'Full Body B',
        exercises: [
          { name: 'Reverse Lunge', sets: 4, reps: '8/leg', rest: '90s' },
          { name: 'Push-Up', sets: 4, reps: '12', rest: '60s' },
          { name: 'Pull-Up or Inverted Row', sets: 4, reps: 'AMRAP', rest: '90s' },
          { name: 'DB Shoulder Press', sets: 3, reps: '10', rest: '60s' },
          { name: 'Hollow Hold', sets: 3, reps: '30s', rest: '45s' },
        ],
      },
    ],
  },
  7: null, // 7-day falls back to 6-day with one mobility day
};

// Equipment-aware fallbacks
export const BODYWEIGHT_NOTE = 'No equipment? Substitute push-ups, dips, pull-ups, single-leg squats, and Bulgarian split squats.';
