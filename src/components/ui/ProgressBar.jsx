import React from 'react';

export default function ProgressBar({ step, total, labels }) {
  const pct = (step / total) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-ink-500 dark:text-ink-400 mb-2">
        <span>Step {step} of {total}</span>
        {labels && labels[step - 1] && (
          <span className="font-medium text-ink-700 dark:text-ink-200">{labels[step - 1]}</span>
        )}
      </div>
      <div className="h-1.5 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-ink-900 dark:bg-white transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
