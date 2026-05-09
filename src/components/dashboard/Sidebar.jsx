import React from 'react';
import { Activity, LayoutDashboard, Calculator, LineChart, Dumbbell, UtensilsCrossed, Replace, Pill, BookOpen, RotateCcw } from 'lucide-react';
import Button from '../ui/Button.jsx';

export const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'stats', label: 'Stats & Macros', icon: Calculator },
  { id: 'timeline', label: 'Timeline Projection', icon: LineChart },
  { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
  { id: 'meals', label: 'Meal Plan', icon: UtensilsCrossed },
  { id: 'subs', label: 'Food Substitutions', icon: Replace },
  { id: 'supps', label: 'Supplements', icon: Pill },
  { id: 'cookbooks', label: 'Cookbook Library', icon: BookOpen },
];

export default function Sidebar({ active, onChange, onReset, readOnly = false }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 bg-white dark:bg-ink-900 border-r border-ink-100 dark:border-ink-800 px-4 py-6">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="h-9 w-9 rounded-xl bg-ink-900 text-white flex items-center justify-center dark:bg-white dark:text-ink-900">
          <Activity className="h-4 w-4" strokeWidth={2.4} />
        </div>
        <div>
          <div className="font-semibold text-ink-900 dark:text-ink-50 leading-tight">Coach</div>
          <div className="text-[11px] text-ink-400 dark:text-ink-500">Training Studio</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 scrollbar-thin overflow-y-auto -mx-2 px-2">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const selected = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors
                ${selected
                  ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900 font-medium'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white'}
              `}
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </nav>

      {!readOnly && (
        <div className="mt-4 pt-4 border-t border-ink-100 dark:border-ink-800">
          <Button variant="secondary" size="sm" onClick={onReset} className="w-full">
            <RotateCcw className="h-3.5 w-3.5" /> New consultation
          </Button>
        </div>
      )}
    </aside>
  );
}
