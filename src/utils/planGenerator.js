import {
  normalizeBody,
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
  calculateMacros,
  calculateBMI,
  projectTimeline,
} from './calculations.js';
import { buildWeek, mealPlanName, isoWeek, applyOverrides } from '../mockData/meals.js';
import { assembleWorkout } from './workoutAssembler.js';
import { SUBSTITUTIONS } from '../mockData/substitutions.js';
import { pickSupplements } from '../mockData/supplements.js';
import { pickCookbooks } from '../mockData/cookbooks.js';

export function generatePlan(intake) {
  const { weightKg, weightLb, heightCm } = normalizeBody(intake);
  const bmr = calculateBMR({
    weightKg,
    heightCm,
    age: Number(intake.age),
    sex: intake.sex,
  });
  const tdee = calculateTDEE(bmr, intake.activityLevel || 'moderately_active');
  const goalKey = intake.primaryGoal || 'general';
  const target = calculateTargetCalories(
    tdee,
    goalKey === 'general' ? 'general' : goalKey,
    intake.urgency || 'steady'
  );

  const bodyFatPct = intake.bodyFatUnknown
    ? Number(intake.bodyFatEstimate) || null
    : Number(intake.bodyFat) || null;

  const macros = calculateMacros({
    calories: target.calories,
    weightLb,
    bodyFatPct,
    kind: target.kind,
  });

  const bmi = calculateBMI(weightKg, heightCm);

  // Goal weight in lb
  let goalWeightLb = Number(intake.goalWeight);
  if (intake.weightUnit === 'kg' && goalWeightLb) {
    goalWeightLb = goalWeightLb / 0.45359237;
  }
  if (!goalWeightLb) goalWeightLb = weightLb;

  const timeline = projectTimeline({
    startWeightLb: weightLb,
    goalWeightLb,
    startBodyFat: bodyFatPct,
    goalBodyFat: Number(intake.goalBodyFat) || null,
    kind: target.kind,
    experience: intake.experience,
    urgency: intake.urgency,
  });

  // Build the per-client workout
  const days = Number(intake.daysPerWeek) || 4;
  const workoutSeed = `${intake.savedId || intake.fullName || 'guest'}-${target.kind}-workout-${days}`;
  const split = assembleWorkout(intake, days, workoutSeed);

  // Per-client + per-week seed → unique plan for each client that rotates each ISO week.
  const now = new Date();
  const clientToken = intake.savedId || intake.fullName || 'guest';
  const seedKey = `${clientToken}-${now.getFullYear()}-${isoWeek(now)}-${target.kind}`;
  const baseMeals = buildWeek(target.kind, seedKey);
  const mealPlan = {
    name: mealPlanName(target.kind),
    meals: applyOverrides(baseMeals, intake.mealOverrides),
  };

  const supplements = pickSupplements(target.kind);
  const cookbooks = pickCookbooks(target.kind);

  // Goal summary line
  const goalSummary = buildGoalSummary({
    primaryGoal: goalKey,
    startWeightLb: weightLb,
    goalWeightLb,
    weeks: timeline.weeks,
    weightUnit: intake.weightUnit,
  });

  return {
    mealOverrides: intake.mealOverrides || {},
    client: {
      id: intake.savedId || null,
      name: intake.fullName || 'Client',
      goalSummary,
      currentProblem: intake.currentProblem,
      isReturning: intake.clientType === 'returning',
      bodyFat: bodyFatPct,
      goalBodyFat: Number(intake.goalBodyFat) || null,
      sex: intake.sex,
      age: intake.age,
      weight: { lb: weightLb, kg: weightKg, unit: intake.weightUnit },
      height: { cm: heightCm, unit: intake.heightUnit },
      currentInjuryAreas: intake.currentInjuryAreas || [],
      currentInjuryNotes: intake.currentInjuryNotes || '',
    },
    stats: {
      bmr,
      tdee,
      targetCalories: target.calories,
      deficitOrSurplus: target.deficit,
      kind: target.kind,
      bmi,
    },
    macros,
    timeline,
    workout: split,
    daysPerWeek: days,
    workoutDuration: intake.workoutDuration,
    mealPlan,
    substitutions: SUBSTITUTIONS,
    supplements,
    cookbooks,
  };
}

function buildGoalSummary({ primaryGoal, startWeightLb, goalWeightLb, weeks, weightUnit }) {
  const diff = Math.abs(goalWeightLb - startWeightLb);
  const display = weightUnit === 'kg'
    ? `${Math.round(diff * 0.45359237)} kg`
    : `${Math.round(diff)} lb`;
  if (primaryGoal === 'fat_loss') return `Lose ${display} in ${weeks} weeks`;
  if (primaryGoal === 'muscle_gain') return `Gain ${display} of lean mass in ${weeks} weeks`;
  if (primaryGoal === 'recomp') return `Body recomp over ${weeks} weeks — drop fat, hold muscle`;
  return `Build sustainable fitness over ${weeks} weeks`;
}
