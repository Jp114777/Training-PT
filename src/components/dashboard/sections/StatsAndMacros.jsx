import React from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { Calculator, Beef, Wheat, Droplet, Info } from 'lucide-react';

export default function StatsAndMacros({ plan }) {
  const m = plan.macros;
  const data = [
    { label: 'Protein', grams: m.protein.grams, pct: m.protein.pct, kcal: m.protein.calories, color: 'text-rose-500', bg: 'bg-rose-500', icon: Beef },
    { label: 'Carbs', grams: m.carbs.grams, pct: m.carbs.pct, kcal: m.carbs.calories, color: 'text-amber-500', bg: 'bg-amber-500', icon: Wheat },
    { label: 'Fat', grams: m.fat.grams, pct: m.fat.pct, kcal: m.fat.calories, color: 'text-emerald-500', bg: 'bg-emerald-500', icon: Droplet },
  ];

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BigStat label="BMR" value={plan.stats.bmr} suffix="cal/day"
          desc="Calories you'd burn at total rest." />
        <BigStat label="TDEE" value={plan.stats.tdee} suffix="cal/day"
          desc="Daily burn including all activity." />
        <BigStat label="Target" value={plan.stats.targetCalories} suffix="cal/day" accent
          desc={plan.stats.kind === 'cut' ? 'Sustainable deficit for fat loss.'
            : plan.stats.kind === 'bulk' ? 'Lean surplus for muscle gain.'
            : plan.stats.kind === 'recomp' ? 'Slight deficit, high protein, recomp window.'
            : 'Maintenance.'} />
        <BigStat label={plan.stats.deficitOrSurplus < 0 ? 'Deficit' : plan.stats.deficitOrSurplus > 0 ? 'Surplus' : 'Balance'}
          value={Math.abs(plan.stats.deficitOrSurplus)}
          suffix="cal/day"
          desc={plan.stats.deficitOrSurplus !== 0 ? '~3,500 cal ≈ 1 lb of body fat.' : 'Even with TDEE.'} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Macro Breakdown" subtitle="Protein anchored to lean mass; fat ~25–28%; carbs fill the rest." icon={Calculator} />
          <CardBody>
            <div className="space-y-4">
              {data.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-sm font-medium text-ink-800 dark:text-ink-100">
                        <Icon className={`h-4 w-4 ${d.color}`} />
                        {d.label}
                      </div>
                      <div className="text-sm text-ink-500 dark:text-ink-400">
                        <span className="font-semibold text-ink-900 dark:text-ink-50">{d.grams}g</span> · {d.kcal} kcal · {d.pct}%
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
                      <div className={`h-full ${d.bg} transition-all duration-700`} style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {data.map((d) => (
                <div key={d.label} className="text-center rounded-2xl bg-ink-50 dark:bg-ink-800/50 p-3">
                  <div className="relative h-20 w-20 mx-auto">
                    <svg className="absolute inset-0" viewBox="0 0 36 36">
                      <path className="text-ink-200 dark:text-ink-700"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className={d.color}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3"
                        strokeDasharray={`${d.pct}, 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                      {d.pct}%
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-ink-500 dark:text-ink-400">{d.label}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="The Math" subtitle="Mifflin-St Jeor — current scientific standard." icon={Info} />
          <CardBody>
            <div className="space-y-4 text-sm">
              <Equation
                title="BMR — Mifflin-St Jeor"
                formula={plan.client.sex === 'female'
                  ? 'BMR = 10·kg + 6.25·cm − 5·age − 161'
                  : 'BMR = 10·kg + 6.25·cm − 5·age + 5'}
                result={`= ${plan.stats.bmr} cal/day`}
              />
              <Equation
                title="TDEE — activity multiplier"
                formula={`TDEE = BMR × ${(plan.stats.tdee / plan.stats.bmr).toFixed(2)}`}
                result={`= ${plan.stats.tdee} cal/day`}
              />
              <Equation
                title="Target calories"
                formula={`Target = TDEE ${plan.stats.deficitOrSurplus >= 0 ? '+' : '−'} ${Math.abs(plan.stats.deficitOrSurplus)}`}
                result={`= ${plan.stats.targetCalories} cal/day`}
              />
              <Equation
                title="Protein"
                formula={`~${(plan.macros.protein.grams / Math.max(1, plan.client.weight.lb)).toFixed(2)} g per lb of bodyweight`}
                result={`= ${plan.macros.protein.grams}g`}
              />
              <Equation
                title="Fat"
                formula={`${plan.macros.fat.pct}% of total calories ÷ 9 cal/g`}
                result={`= ${plan.macros.fat.grams}g`}
              />
              <Equation
                title="Carbs"
                formula="Remaining calories ÷ 4 cal/g"
                result={`= ${plan.macros.carbs.grams}g`}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function BigStat({ label, value, suffix, desc, accent }) {
  return (
    <div className={`rounded-3xl p-5 border ${accent ? 'bg-ink-900 text-white border-ink-900 dark:bg-white dark:text-ink-900 dark:border-white' : 'bg-white dark:bg-ink-800/60 border-ink-100 dark:border-ink-700'}`}>
      <div className={`text-xs uppercase tracking-wide ${accent ? 'text-white/70 dark:text-ink-500' : 'text-ink-400 dark:text-ink-500'}`}>{label}</div>
      <div className="text-3xl font-bold mt-1">{value.toLocaleString()}</div>
      <div className={`text-xs mt-0.5 ${accent ? 'text-white/70 dark:text-ink-600' : 'text-ink-400'}`}>{suffix}</div>
      <div className={`text-xs mt-3 ${accent ? 'text-white/80 dark:text-ink-700' : 'text-ink-500 dark:text-ink-400'}`}>{desc}</div>
    </div>
  );
}

function Equation({ title, formula, result }) {
  return (
    <div className="rounded-xl bg-ink-50 dark:bg-ink-800/40 p-3">
      <div className="text-xs text-ink-500 dark:text-ink-400 mb-1">{title}</div>
      <div className="font-mono text-ink-900 dark:text-ink-50">{formula}</div>
      <div className="font-mono text-accent-600 mt-0.5">{result}</div>
    </div>
  );
}
