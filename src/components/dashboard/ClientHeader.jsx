import React from 'react';
import { AlertCircle, Target, Eye } from 'lucide-react';

export default function ClientHeader({ plan, readOnly = false }) {
  const initials = plan.client.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center text-xl font-semibold shadow-lift">
          {initials || 'JM'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-500 uppercase tracking-wide">
            {readOnly ? (
              <span className="inline-flex items-center gap-1 text-accent-600 dark:text-accent-300">
                <Eye className="h-3.5 w-3.5" /> Prepared by your coach
              </span>
            ) : (
              plan.client.isReturning ? 'Returning client' : 'New client'
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-50 truncate">
            {plan.client.name}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-ink-600 dark:text-ink-300">
            <Target className="h-4 w-4 text-accent-500" />
            <span className="font-medium">{plan.client.goalSummary}</span>
          </div>
        </div>
      </div>

      {plan.client.currentProblem && (
        <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-300 p-4 sm:p-5 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-300 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300 font-semibold">
              What we need to fix
            </div>
            <p className="mt-1 text-ink-900 dark:text-ink-50 leading-relaxed">
              {plan.client.currentProblem}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
