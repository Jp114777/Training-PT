import React from 'react';

export default function Slider({ min, max, step = 1, value, onChange, suffix = '', labels }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-2xl font-semibold text-ink-900 dark:text-ink-50">
          {value}
          {suffix && <span className="text-base text-ink-500 dark:text-ink-400 ml-1">{suffix}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      {labels && (
        <div className="flex justify-between mt-2 text-xs text-ink-400 dark:text-ink-500">
          {labels.map((l) => <span key={l}>{l}</span>)}
        </div>
      )}
    </div>
  );
}
