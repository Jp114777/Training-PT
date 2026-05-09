// Builds the concrete weekly workout for a client by:
//   1. picking the right split template by daysPerWeek
//   2. applying a goal modifier to each block's sets/reps/rest, and
//      appending a metabolic finisher to 1–2 days for fat-loss goals
//   3. picking an exercise per block via a hard→soft→fallback filter cascade
//
// The output keeps the existing dashboard contract:
//   { name, description, days: [{ name, focus, exercises: [{ name, sets, reps, rest, notes, pickedReason }] }] }
// Plus two new fields the dashboard surfaces:
//   adaptations:  ['Knee injury', 'Bodyweight only', '75 yo', 'Beginner']
//   goalShape:    'Hypertrophy' | 'Fat loss' | 'Recomposition' | 'General fitness'

import { SPLITS } from '../mockData/workouts.js';
import { EXERCISES, experienceLevel } from '../mockData/exercises.js';
import { hashSeed, mulberry32 } from './rng.js';

const INJURY_LABELS = {
  shoulder: 'shoulder',
  lower_back: 'lower back',
  knee: 'knee',
  hip: 'hip',
  wrist: 'wrist',
  ankle: 'ankle',
  neck: 'neck',
  elbow: 'elbow',
};

const EQUIPMENT_LABELS = {
  full_gym: 'Full gym',
  home_gym: 'Home gym',
  dumbbells: 'Dumbbells only',
  bodyweight: 'Bodyweight only',
  bands: 'Bands only',
};

const EXP_LABELS = ['Beginner', 'Beginner', 'Intermediate', 'Advanced', 'Advanced'];

// Days where the fat-loss finisher should be appended (1-indexed). Picks vary by
// split size: 2-day → both days, 3-day → days 1 & 3, 4-day → days 2 & 4 (lower days),
// 5/6-day → 2 sessions ending the week.
const FINISHER_DAYS = {
  2: [1, 2],
  3: [1, 3],
  4: [2, 4],
  5: [3, 5],
  6: [3, 6],
};

// ─── Public API ───────────────────────────────────────────────────────

export function assembleWorkout(intake, daysPerWeek, seedKey = 'default') {
  const days = clampDays(daysPerWeek);
  const template = SPLITS[days] || SPLITS[4];

  const goalKind = goalKindFromIntake(intake);
  const expLevel = experienceLevel(intake.experience);
  const isOlderClient = Number(intake.age) >= 60;

  const rng = mulberry32(hashSeed(seedKey));

  // 1. Apply goal modifier to each day's blocks (and append finisher days)
  const shapedDays = template.days.map((day, dayIdx) => {
    const blocks = day.blocks.map((block) => goalAdjust(block, goalKind, intake.urgency));
    if (goalKind === 'cut' && (FINISHER_DAYS[days] || []).includes(dayIdx + 1)) {
      blocks.push({
        pattern: 'finisher',
        sets: 1,
        reps: '1 round',
        rest: 'as listed',
        priority: 'finisher',
      });
    }
    return { ...day, blocks };
  });

  // 2. For each block, pick an exercise. Track adaptations.
  const concreteDays = [];
  const adaptationsTriggered = new Set();
  for (const day of shapedDays) {
    const usedIds = new Set();
    const exercises = [];
    for (const block of day.blocks) {
      const pick = pickExercise({
        block,
        intake,
        expLevel,
        isOlderClient,
        usedIds,
        rng,
      });
      if (!pick) continue;
      usedIds.add(pick.exercise.id);
      if (pick.reason) adaptationsTriggered.add(pick.reason);
      exercises.push({
        name: pick.exercise.name,
        sets: block.sets,
        reps: block.reps,
        rest: block.rest,
        notes: pick.exercise.repCue,
        pickedReason: pick.reason,
        priority: block.priority,
      });
    }
    concreteDays.push({ name: day.name, focus: day.focus, exercises });
  }

  // 3. Build the adaptations summary (always shows the structural filters,
  //    even if not every one caused a substitution).
  const adaptations = buildAdaptationsSummary({
    intake, expLevel, isOlderClient, triggeredReasons: adaptationsTriggered,
  });

  return {
    name: template.name,
    description: template.description,
    days: concreteDays,
    adaptations,
    goalShape: goalShapeLabel(goalKind),
  };
}

// ─── Goal modifier ────────────────────────────────────────────────────

function goalKindFromIntake(intake) {
  switch (intake.primaryGoal) {
    case 'fat_loss': return 'cut';
    case 'muscle_gain': return 'bulk';
    case 'recomp': return 'recomp';
    case 'general': return 'general';
    default: return 'recomp';
  }
}

function goalShapeLabel(kind) {
  switch (kind) {
    case 'cut': return 'Fat loss';
    case 'bulk': return 'Hypertrophy';
    case 'recomp': return 'Recomposition';
    case 'general': return 'General fitness';
    default: return 'Recomposition';
  }
}

// Override sets/reps/rest based on goal kind + urgency. Keeps the block's pattern + priority.
function goalAdjust(block, kind, urgency) {
  const out = { ...block };

  if (kind === 'cut') {
    if (block.priority === 'main') {
      out.reps = repFor(block, '8-10');
      out.rest = restCap(block.rest, '90s');
    } else if (block.priority === 'accessory') {
      out.reps = repFor(block, '12-15');
      out.rest = restCap(block.rest, '60s');
    }
  } else if (kind === 'bulk') {
    if (block.priority === 'main') {
      out.reps = repFor(block, '5-8');
      out.rest = restFloor(block.rest, '2 min');
      out.sets = block.sets + 1; // extra set on main blocks for hypertrophy
    } else if (block.priority === 'accessory') {
      out.reps = repFor(block, '8-12');
      out.rest = restFloor(block.rest, '90s');
    }
  } else if (kind === 'general') {
    if (block.priority === 'main') {
      out.reps = repFor(block, '8-10');
      out.rest = block.rest;
    } else if (block.priority === 'accessory') {
      out.reps = repFor(block, '10-12');
      out.sets = Math.max(2, block.sets - 1); // less volume
    }
  }
  // recomp falls through with no changes — block defaults are recomp-shaped.

  // Urgency tweaks
  if (urgency === 'aggressive' && block.priority === 'main') {
    out.sets = out.sets + 1;
  } else if (urgency === 'no_rush' && block.priority === 'accessory') {
    out.sets = Math.max(2, out.sets - 1);
  }

  // Sanity caps
  if (out.sets > 6) out.sets = 6;
  if (out.sets < 2) out.sets = 2;

  return out;
}

// If the original block's reps used a unit (seconds, distance, AMRAP, "each leg"),
// preserve it. Otherwise apply the goal-shaped rep range.
function repFor(block, range) {
  const orig = String(block.reps);
  if (/[a-zA-Z]/.test(orig)) return orig; // anything with letters (s, m, AMRAP, "each leg") → keep
  return range;
}

const REST_RANK = { '30s': 0, '45s': 1, '60s': 2, '90s': 3, '2 min': 4, '2-3 min': 5, '3 min': 6, 'as listed': 99 };
function restCap(current, max) {
  const a = REST_RANK[current] ?? 99, b = REST_RANK[max] ?? 99;
  return a > b ? max : current;
}
function restFloor(current, min) {
  const a = REST_RANK[current] ?? 99, b = REST_RANK[min] ?? 99;
  return a < b ? min : current;
}

// ─── Exercise picker (hard → soft → fallback) ──────────────────────────

function pickExercise({ block, intake, expLevel, isOlderClient, usedIds, rng }) {
  const intakeEquipment = intake.equipment?.length ? intake.equipment : ['bodyweight'];
  const injuries = intake.currentInjuryAreas || [];

  // Hard constraints, never violated:
  //   - matches pattern
  //   - equipment ∩ intake.equipment non-empty
  //   - no contraindication ∈ injuries
  const hardCandidates = EXERCISES.filter(
    (e) =>
      e.pattern === block.pattern &&
      !usedIds.has(e.id) &&
      e.equipment.some((eq) => intakeEquipment.includes(eq)) &&
      !injuries.some((inj) => e.contraindications.includes(inj))
  );

  // Soft preferences applied as a filter chain:
  let candidates = hardCandidates.filter((e) => e.experienceMin <= expLevel);
  if (isOlderClient) candidates = candidates.filter((e) => !e.highImpact);

  let dropped = []; // tracks which soft filters we relaxed for the reason label

  if (candidates.length === 0) {
    candidates = hardCandidates.filter((e) => (isOlderClient ? !e.highImpact : true));
    if (candidates.length) dropped.push('experience');
  }
  if (candidates.length === 0) {
    candidates = hardCandidates;
    if (candidates.length) dropped.push('age');
  }

  // Fallback: relax equipment to bodyweight-anything if we still have nothing
  if (candidates.length === 0) {
    candidates = EXERCISES.filter(
      (e) =>
        e.pattern === block.pattern &&
        !usedIds.has(e.id) &&
        e.equipment.includes('bodyweight') &&
        !injuries.some((inj) => e.contraindications.includes(inj))
    );
    if (candidates.length) dropped.push('equipment');
  }

  // Last resort: any non-contraindicated exercise of any pattern (avoid empty days)
  if (candidates.length === 0) {
    candidates = EXERCISES.filter(
      (e) => !usedIds.has(e.id) && !injuries.some((inj) => e.contraindications.includes(inj))
    );
    if (candidates.length) dropped.push('pattern');
  }

  if (candidates.length === 0) return null;

  // Sort by defaultRank (lower = preferred) then break ties with the seeded RNG.
  candidates.sort((a, b) => {
    if (a.defaultRank !== b.defaultRank) return a.defaultRank - b.defaultRank;
    return rng() - 0.5;
  });

  // Pick the top candidate. Adapt selection if we want some variety: among the
  // top-3 by rank, pick deterministically.
  const top = candidates.slice(0, Math.min(3, candidates.length));
  const choice = top[Math.floor(rng() * top.length)] || candidates[0];

  return {
    exercise: choice,
    reason: pickedReason({ choice, block, intake, isOlderClient, dropped }),
  };
}

// What label (if any) explains why this exercise got picked instead of the default.
function pickedReason({ choice, block, intake, isOlderClient, dropped }) {
  // The "default" exercise for this pattern is the one with defaultRank 0.
  // If we selected that, no reason label.
  if (choice.defaultRank === 0) return null;

  const injuries = intake.currentInjuryAreas || [];
  const intakeEquipment = intake.equipment?.length ? intake.equipment : ['bodyweight'];

  // Find the would-be default for this pattern to check WHY it was filtered out.
  const defaultExercise = EXERCISES.find((e) => e.pattern === block.pattern && e.defaultRank === 0);
  if (!defaultExercise) return null;

  // Default has a contraindication that the client has → injury reason
  const blockedByInjury = injuries.find((i) => defaultExercise.contraindications.includes(i));
  if (blockedByInjury) {
    const lbl = INJURY_LABELS[blockedByInjury] || blockedByInjury;
    return `${cap(lbl)}-friendly substitute`;
  }

  // Default needs equipment the client doesn't have → equipment reason
  const defaultNeedsGym = !defaultExercise.equipment.some((eq) => intakeEquipment.includes(eq));
  if (defaultNeedsGym) {
    if (intakeEquipment.length === 1 && intakeEquipment[0] === 'bodyweight') return 'Bodyweight option';
    if (intakeEquipment.includes('dumbbells') && !intakeEquipment.includes('full_gym')) return 'Dumbbell option';
    if (intakeEquipment.includes('bands')) return 'Band-friendly option';
    return 'Equipment-matched option';
  }

  // Default is high-impact and the client is older → joint-friendly reason
  if (isOlderClient && defaultExercise.highImpact) return 'Joint-friendly substitute';

  // Default needs more experience than client has → experience reason
  if (dropped.includes('experience')) return 'Beginner-friendly variant';

  return null;
}

// ─── Adaptation summary for the UI ───────────────────────────────────

function buildAdaptationsSummary({ intake, expLevel, isOlderClient, triggeredReasons }) {
  const out = [];

  if (intake.age) {
    if (isOlderClient) out.push(`${intake.age} yo`);
    else if (Number(intake.age) >= 50) out.push(`${intake.age} yo`);
  }

  const injuries = intake.currentInjuryAreas || [];
  if (injuries.length === 1) {
    out.push(`${cap(INJURY_LABELS[injuries[0]] || injuries[0])} injury`);
  } else if (injuries.length > 1) {
    out.push(`${injuries.length} injuries`);
  }

  // Equipment label — only show if it's restrictive
  const eq = intake.equipment || [];
  if (eq.length === 1 && eq[0] !== 'full_gym') {
    out.push(EQUIPMENT_LABELS[eq[0]] || eq[0]);
  }

  // Experience label — only show beginner / advanced extremes
  if (expLevel <= 1) out.push('Beginner');
  else if (expLevel >= 4) out.push('Advanced');

  return out;
}

function clampDays(n) {
  const x = Number(n) || 4;
  if (x <= 2) return 2;
  if (x >= 6) return 6;
  return x;
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
