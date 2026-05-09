import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { UtensilsCrossed, Clock, Flame, RefreshCw } from 'lucide-react';
import { sumDay } from '../../../mockData/meals.js';
import { useIntakeStore } from '../../../store/intakeStore.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const todayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

export default function MealPlan({ plan, readOnly = false }) {
  const [day, setDay] = useState(() => DAYS.includes(todayName()) ? todayName() : 'Monday');
  const swapMeal = useIntakeStore((s) => s.swapMeal);
  const [swappingKey, setSwappingKey] = useState(null);
  const meals = plan.mealPlan.meals[day] || [];
  const totals = sumDay(meals);

  const handleSwap = (i) => {
    if (readOnly) return;
    const key = `${day}-${i}`;
    setSwappingKey(key);
    swapMeal(day, i);
    window.setTimeout(() => setSwappingKey((cur) => (cur === key ? null : cur)), 350);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">{plan.mealPlan.name}</h2>
          <p className="text-ink-500 dark:text-ink-400 mt-1">Calibrated to your target of {plan.stats.targetCalories.toLocaleString()} cal/day.</p>
        </div>
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-ink-100 dark:bg-ink-800">
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                ${day === d
                  ? 'bg-white text-ink-900 shadow-soft dark:bg-ink-700 dark:text-white'
                  : 'text-ink-500 hover:text-ink-800 dark:text-ink-400'}
              `}
            >
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader title={`${day} totals`} subtitle="Sum across all meals for the day" icon={Flame} />
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Tot label="Calories" value={totals.kcal.toLocaleString()} suffix="kcal" />
            <Tot label="Protein" value={totals.p} suffix="g" color="text-rose-500" />
            <Tot label="Carbs" value={totals.c} suffix="g" color="text-amber-500" />
            <Tot label="Fat" value={totals.f} suffix="g" color="text-emerald-500" />
          </div>
          <DiffNote totals={totals} target={plan.stats.targetCalories} />
        </CardBody>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        {meals.map((m, i) => (
          <Card key={`${day}-${i}-${m.id}`} className={swappingKey === `${day}-${i}` ? 'animate-fadeIn' : undefined}>
            <CardHeader
              title={m.dish}
              subtitle={m.name}
              icon={UtensilsCrossed}
              action={
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-ink-400 dark:text-ink-500">
                    <Clock className="h-3.5 w-3.5" />
                    {m.prepMin} min
                  </span>
                  {!readOnly && (
                    <button
                      onClick={() => handleSwap(i)}
                      aria-label={`Swap ${m.name}`}
                      title="Swap this meal for a different one"
                      className="p-1.5 rounded-lg text-ink-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-500/10 dark:text-ink-500 dark:hover:text-accent-300 transition-colors"
                    >
                      <RefreshCw className={`h-4 w-4 ${swappingKey === `${day}-${i}` ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
              }
            />
            <CardBody>
              <ul className="text-sm text-ink-600 dark:text-ink-300 space-y-1 mb-3">
                {m.ingredients.map((ing, j) => (
                  <li key={j} className="flex items-center gap-2 before:content-['•'] before:text-ink-300">
                    {ing}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-ink-100 dark:border-ink-700">
                <MacroChip label="kcal" value={m.macros.kcal} />
                <MacroChip label="P" value={`${m.macros.p}g`} color="text-rose-500" />
                <MacroChip label="C" value={`${m.macros.c}g`} color="text-amber-500" />
                <MacroChip label="F" value={`${m.macros.f}g`} color="text-emerald-500" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Tot({ label, value, suffix, color }) {
  return (
    <div className="rounded-2xl bg-ink-50/60 dark:bg-ink-800/50 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-ink-400">{label}</div>
      <div className={`text-2xl font-semibold mt-0.5 ${color || 'text-ink-900 dark:text-ink-50'}`}>
        {value}<span className="text-sm text-ink-400 ml-1">{suffix}</span>
      </div>
    </div>
  );
}

function MacroChip({ label, value, color }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wide text-ink-400">{label}</div>
      <div className={`text-sm font-semibold ${color || 'text-ink-900 dark:text-ink-50'}`}>{value}</div>
    </div>
  );
}

function DiffNote({ totals, target }) {
  const diff = totals.kcal - target;
  if (Math.abs(diff) < 50) return null;
  const within = Math.abs(diff) < 150;
  return (
    <div className={`mt-3 text-xs ${within ? 'text-ink-500' : 'text-amber-600'} dark:text-ink-400`}>
      {diff > 0 ? `+${diff}` : diff} cal vs. target ({target.toLocaleString()}). Adjust portions on protein-anchored meals first.
    </div>
  );
}
