// Real fitness math — these run during the consultation, not mocked.
// Inputs come from the intake wizard.

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

export const ACTIVITY_LABELS = {
  sedentary: 'Sedentary (desk job, little exercise)',
  lightly_active: 'Lightly active (1–3 days/week)',
  moderately_active: 'Moderately active (3–5 days/week)',
  very_active: 'Very active (6–7 days/week)',
  athlete: 'Athlete (twice daily / physical job)',
};

// Convert imperial → metric
export const lbToKg = (lb) => lb * 0.45359237;
export const kgToLb = (kg) => kg / 0.45359237;
export const inToCm = (inches) => inches * 2.54;
export const cmToIn = (cm) => cm / 2.54;

export function normalizeBody({ weight, weightUnit, height, heightUnit }) {
  const weightKg = weightUnit === 'kg' ? Number(weight) : lbToKg(Number(weight));
  const weightLb = weightUnit === 'lb' ? Number(weight) : kgToLb(Number(weight));
  let heightCm;
  if (heightUnit === 'cm') {
    heightCm = Number(height);
  } else {
    // height is { feet, inches } when imperial
    const feet = Number(height?.feet) || 0;
    const inches = Number(height?.inches) || 0;
    heightCm = inToCm(feet * 12 + inches);
  }
  return { weightKg, weightLb, heightCm };
}

// Mifflin-St Jeor equation
export function calculateBMR({ weightKg, heightCm, age, sex }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === 'female') return Math.round(base - 161);
  return Math.round(base + 5); // male / other use male equation as default
}

export function calculateTDEE(bmr, activityLevel) {
  const mult = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.375;
  return Math.round(bmr * mult);
}

// Returns { calories, deficit, kind } where kind ∈ 'cut' | 'bulk' | 'recomp' | 'maintain'
export function calculateTargetCalories(tdee, primaryGoal, urgency) {
  if (primaryGoal === 'fat_loss') {
    const deficit = urgency === 'aggressive' ? 750 : urgency === 'no_rush' ? 350 : 500;
    return { calories: Math.max(1200, tdee - deficit), deficit: -deficit, kind: 'cut' };
  }
  if (primaryGoal === 'muscle_gain') {
    const surplus = urgency === 'aggressive' ? 500 : urgency === 'no_rush' ? 200 : 300;
    return { calories: tdee + surplus, deficit: surplus, kind: 'bulk' };
  }
  if (primaryGoal === 'recomp') {
    return { calories: tdee - 250, deficit: -250, kind: 'recomp' };
  }
  return { calories: tdee, deficit: 0, kind: 'maintain' };
}

// Macros: protein anchored to lean mass (or bodyweight if BF unknown), fat 27% kcal, carbs remainder
export function calculateMacros({ calories, weightLb, bodyFatPct, kind }) {
  const leanMassLb = bodyFatPct ? weightLb * (1 - bodyFatPct / 100) : weightLb * 0.82;
  const proteinPerLb = kind === 'cut' ? 1.1 : kind === 'bulk' ? 0.9 : 1.0;
  const proteinG = Math.round(leanMassLb * proteinPerLb);
  const fatPctOfCal = kind === 'cut' ? 0.25 : 0.28;
  const fatG = Math.round((calories * fatPctOfCal) / 9);
  const carbCal = calories - proteinG * 4 - fatG * 9;
  const carbG = Math.max(0, Math.round(carbCal / 4));
  const total = proteinG * 4 + carbG * 4 + fatG * 9;
  return {
    protein: { grams: proteinG, calories: proteinG * 4, pct: Math.round((proteinG * 4 / total) * 100) },
    carbs: { grams: carbG, calories: carbG * 4, pct: Math.round((carbG * 4 / total) * 100) },
    fat: { grams: fatG, calories: fatG * 9, pct: Math.round((fatG * 9 / total) * 100) },
    totalCalories: total,
  };
}

// BMI for context
export function calculateBMI(weightKg, heightCm) {
  const m = heightCm / 100;
  return +(weightKg / (m * m)).toFixed(1);
}

// Timeline projection. Returns array of { week, weight, bodyFat } points.
// Cut: 0.5–1% bodyweight/week. Bulk: 0.25–0.5 lb/week trained, up to 1 lb/week novice.
export function projectTimeline({
  startWeightLb,
  goalWeightLb,
  startBodyFat,
  goalBodyFat,
  kind,
  experience,
  urgency,
}) {
  const direction = goalWeightLb < startWeightLb ? -1 : goalWeightLb > startWeightLb ? 1 : 0;
  const totalLbsToChange = Math.abs(goalWeightLb - startWeightLb);

  let lbsPerWeek;
  if (kind === 'cut') {
    lbsPerWeek = urgency === 'aggressive' ? 1.5 : urgency === 'no_rush' ? 0.75 : 1.0;
  } else if (kind === 'bulk') {
    const novice = experience === 'none' || experience === 'lt1';
    lbsPerWeek = novice
      ? (urgency === 'aggressive' ? 1.0 : 0.6)
      : (urgency === 'aggressive' ? 0.6 : 0.4);
  } else if (kind === 'recomp') {
    lbsPerWeek = 0.4;
  } else {
    lbsPerWeek = 0;
  }

  const totalWeeks = lbsPerWeek > 0 ? Math.ceil(totalLbsToChange / lbsPerWeek) : 12;
  const weeks = Math.min(Math.max(totalWeeks, 4), 36);

  const bfDelta = (startBodyFat ?? 0) - (goalBodyFat ?? 0);
  const points = [];
  for (let w = 0; w <= weeks; w++) {
    const progress = w / weeks;
    const weight = +(startWeightLb + direction * progress * totalLbsToChange).toFixed(1);
    const bodyFat = startBodyFat
      ? +(startBodyFat - progress * bfDelta).toFixed(1)
      : null;
    points.push({ week: w, weight, bodyFat });
  }
  return { points, weeks, lbsPerWeek };
}

// Format helpers
export const fmtLb = (n) => `${Math.round(Number(n))} lb`;
export const fmtKg = (n) => `${Math.round(Number(n))} kg`;
export const fmtCal = (n) => `${Math.round(Number(n)).toLocaleString()} cal`;
