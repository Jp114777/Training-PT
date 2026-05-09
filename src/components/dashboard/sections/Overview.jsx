import React from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { Flame, Beef, Wheat, Droplet, CalendarDays, UtensilsCrossed, Dumbbell } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { sumDay } from '../../../mockData/meals.js';

const todayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

export default function Overview({ plan, onNavigate }) {
  const today = todayName();
  const todaysMeals = plan.mealPlan.meals[today] || plan.mealPlan.meals.Monday;
  const todayTotals = sumDay(todaysMeals);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {/* Stats */}
      <Card className="lg:col-span-2">
        <CardHeader title="Daily Targets" subtitle="Calculated from your intake — not estimates." icon={Flame} />
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatTile label="BMR" value={plan.stats.bmr} suffix="cal" />
            <StatTile label="TDEE" value={plan.stats.tdee} suffix="cal" />
            <StatTile
              label="Target"
              value={plan.stats.targetCalories}
              suffix="cal"
              accent
              helper={plan.stats.deficitOrSurplus
                ? `${plan.stats.deficitOrSurplus > 0 ? '+' : ''}${plan.stats.deficitOrSurplus} from TDEE`
                : 'maintenance'}
            />
            <StatTile label="BMI" value={plan.stats.bmi} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <MacroPill icon={Beef} label="Protein" grams={plan.macros.protein.grams} pct={plan.macros.protein.pct} color="bg-rose-500" />
            <MacroPill icon={Wheat} label="Carbs" grams={plan.macros.carbs.grams} pct={plan.macros.carbs.pct} color="bg-amber-500" />
            <MacroPill icon={Droplet} label="Fat" grams={plan.macros.fat.grams} pct={plan.macros.fat.pct} color="bg-emerald-500" />
          </div>
        </CardBody>
      </Card>

      {/* Mini timeline */}
      <Card>
        <CardHeader title="Trajectory" subtitle={`${plan.timeline.weeks} weeks projected`} icon={CalendarDays}
          action={
            <button onClick={() => onNavigate('timeline')} className="text-xs font-medium text-accent-600 hover:underline">
              Full chart →
            </button>
          }
        />
        <CardBody>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={plan.timeline.points} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#8e97ad' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8e97ad' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef0f4', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }} />
                <Line type="monotone" dataKey="weight" stroke="#2a6bf2" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-xs text-ink-500 dark:text-ink-400">
            Pace: ~{plan.timeline.lbsPerWeek.toFixed(1)} lb/week
          </div>
        </CardBody>
      </Card>

      {/* This week's split */}
      <Card>
        <CardHeader title="This Week's Training" subtitle={plan.workout.name} icon={Dumbbell}
          action={
            <button onClick={() => onNavigate('workout')} className="text-xs font-medium text-accent-600 hover:underline">
              Open →
            </button>
          }
        />
        <CardBody>
          <ul className="space-y-2">
            {plan.workout.days.slice(0, 4).map((d) => (
              <li key={d.name} className="flex items-center justify-between text-sm">
                <span className="text-ink-600 dark:text-ink-300">{d.name}</span>
                <span className="font-medium text-ink-900 dark:text-ink-50">{d.focus}</span>
              </li>
            ))}
            {plan.workout.days.length > 4 && (
              <li className="text-xs text-ink-400 pt-1">+{plan.workout.days.length - 4} more</li>
            )}
          </ul>
        </CardBody>
      </Card>

      {/* Today's meals */}
      <Card className="lg:col-span-2">
        <CardHeader title="Today's Meals" subtitle={`${today} — ${todayTotals.kcal.toLocaleString()} kcal • P${todayTotals.p} / C${todayTotals.c} / F${todayTotals.f}`}
          icon={UtensilsCrossed}
          action={
            <button onClick={() => onNavigate('meals')} className="text-xs font-medium text-accent-600 hover:underline">
              Full plan →
            </button>
          }
        />
        <CardBody>
          <div className="grid sm:grid-cols-2 gap-3">
            {todaysMeals.map((m) => (
              <div key={m.name} className="rounded-2xl bg-ink-50/60 dark:bg-ink-800/50 px-4 py-3 border border-ink-100 dark:border-ink-700">
                <div className="text-[11px] uppercase tracking-wide text-ink-400 dark:text-ink-500">{m.name}</div>
                <div className="font-medium text-ink-900 dark:text-ink-50 mt-0.5">{m.dish}</div>
                <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                  {m.macros.kcal} kcal · P{m.macros.p}/C{m.macros.c}/F{m.macros.f}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function StatTile({ label, value, suffix, accent, helper }) {
  return (
    <div className={`rounded-2xl px-4 py-3.5 ${accent ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-ink-50/70 dark:bg-ink-800/50'}`}>
      <div className={`text-[11px] uppercase tracking-wide ${accent ? 'text-white/70 dark:text-ink-500' : 'text-ink-400 dark:text-ink-500'}`}>{label}</div>
      <div className="text-2xl font-semibold mt-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span className={`text-sm ml-1 ${accent ? 'text-white/70 dark:text-ink-500' : 'text-ink-400'}`}>{suffix}</span>}
      </div>
      {helper && <div className={`text-xs mt-1 ${accent ? 'text-white/60 dark:text-ink-500' : 'text-ink-400'}`}>{helper}</div>}
    </div>
  );
}

function MacroPill({ icon: Icon, label, grams, pct, color }) {
  return (
    <div className="rounded-2xl border border-ink-100 dark:border-ink-700 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
          <Icon className="h-4 w-4" />
          {label}
        </div>
        <span className="text-xs text-ink-400">{pct}%</span>
      </div>
      <div className="text-2xl font-semibold text-ink-900 dark:text-ink-50">
        {grams}<span className="text-sm text-ink-400 ml-1">g</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-ink-100 dark:bg-ink-800 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(100, pct * 2)}%` }} />
      </div>
    </div>
  );
}
