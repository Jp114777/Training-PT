// Supplement recommendations. The plan generator filters by goal kind.

const baseStack = [
  {
    name: 'Whey Protein Isolate',
    purpose: 'Hits daily protein target without dragging fat/carbs.',
    dose: '25–30g (1 scoop)',
    timing: 'Post-workout or whenever a meal is short on protein.',
    tag: 'essential',
    appliesTo: ['cut', 'bulk', 'recomp', 'maintain'],
  },
  {
    name: 'Creatine Monohydrate',
    purpose: 'Best-studied performance and lean-mass aid in supplementation.',
    dose: '5g daily',
    timing: 'Same time every day. Loading is optional.',
    tag: 'essential',
    appliesTo: ['cut', 'bulk', 'recomp', 'maintain'],
  },
  {
    name: 'Vitamin D3 + K2',
    purpose: 'Most clients are subclinically low. Supports hormones and bone density.',
    dose: '2,000–4,000 IU D3 + 100 mcg K2',
    timing: 'With a meal containing fat.',
    tag: 'essential',
    appliesTo: ['cut', 'bulk', 'recomp', 'maintain'],
  },
  {
    name: 'Omega-3 (EPA/DHA)',
    purpose: 'Anti-inflammatory; supports recovery and cardiovascular markers.',
    dose: '2g combined EPA+DHA',
    timing: 'With dinner.',
    tag: 'essential',
    appliesTo: ['cut', 'bulk', 'recomp', 'maintain'],
  },
  {
    name: 'Magnesium Glycinate',
    purpose: 'Sleep quality, muscle relaxation, recovery.',
    dose: '300–400mg',
    timing: '30 minutes before bed.',
    tag: 'optional',
    appliesTo: ['cut', 'bulk', 'recomp', 'maintain'],
  },
];

const cutAdds = [
  {
    name: 'Caffeine',
    purpose: 'Appetite blunting and training performance during a deficit.',
    dose: '100–200mg',
    timing: 'Pre-workout or early afternoon. Avoid within 8 hours of bed.',
    tag: 'optional',
    appliesTo: ['cut'],
  },
  {
    name: 'Psyllium Husk',
    purpose: 'Helps with satiety and regularity when fiber drops.',
    dose: '5–10g',
    timing: 'With one meal, plenty of water.',
    tag: 'optional',
    appliesTo: ['cut'],
  },
];

const bulkAdds = [
  {
    name: 'Mass Gainer (food-first alternative: oats + whey + PB)',
    purpose: 'Adds 400–600 kcal in liquid form on hard-to-eat days.',
    dose: '1 serving',
    timing: 'Between meals or post-workout.',
    tag: 'optional',
    appliesTo: ['bulk'],
  },
  {
    name: 'Beta-Alanine',
    purpose: 'Buffers fatigue in the 30s–90s rep range — helpful for hypertrophy work.',
    dose: '3–5g daily',
    timing: 'Split doses to avoid tingling.',
    tag: 'optional',
    appliesTo: ['bulk'],
  },
];

export const SUPPLEMENTS = [...baseStack, ...cutAdds, ...bulkAdds];

export function pickSupplements(kind) {
  return SUPPLEMENTS.filter((s) => s.appliesTo.includes(kind));
}
