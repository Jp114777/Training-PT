import React from 'react';

export function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-ink-800 dark:text-ink-100 mb-1.5">{label}</span>
      )}
      {children}
      {hint && !error && (
        <span className="block text-xs text-ink-400 dark:text-ink-500 mt-1.5">{hint}</span>
      )}
      {error && (
        <span className="block text-xs text-rose-500 mt-1.5">{error}</span>
      )}
    </label>
  );
}

export function TextInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2.5 rounded-xl border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-300/50 focus:border-accent-400 transition dark:bg-ink-800 dark:border-ink-700 dark:text-ink-50 ${className}`}
      {...props}
    />
  );
}

export function TextArea({ className = '', ...props }) {
  return (
    <textarea
      rows={3}
      className={`w-full px-4 py-2.5 rounded-xl border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-accent-300/50 focus:border-accent-400 transition dark:bg-ink-800 dark:border-ink-700 dark:text-ink-50 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full px-4 py-2.5 rounded-xl border border-ink-200 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-accent-300/50 focus:border-accent-400 transition dark:bg-ink-800 dark:border-ink-700 dark:text-ink-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function RadioCardGroup({ options, value, onChange, columns = 2 }) {
  const colCls = columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2';
  return (
    <div className={`grid gap-3 ${colCls}`}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`text-left rounded-2xl px-4 py-3 border transition-all
              ${selected
                ? 'border-accent-500 bg-accent-50 dark:bg-accent-500/10 dark:border-accent-400 shadow-soft'
                : 'border-ink-200 hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:hover:bg-ink-800'}
            `}
          >
            <div className="font-medium text-ink-900 dark:text-ink-50">{opt.label}</div>
            {opt.description && (
              <div className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{opt.description}</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function CheckboxGroup({ options, values, onToggle, columns = 2 }) {
  const colCls = columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : columns === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2';
  return (
    <div className={`grid gap-2 ${colCls}`}>
      {options.map((opt) => {
        const selected = values?.includes(opt.value);
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className={`text-left rounded-xl px-3.5 py-2.5 border transition-all flex items-center gap-2.5
              ${selected
                ? 'border-accent-500 bg-accent-50 dark:bg-accent-500/10 dark:border-accent-400'
                : 'border-ink-200 hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:hover:bg-ink-800'}
            `}
          >
            <span className={`h-5 w-5 rounded-md border flex items-center justify-center
              ${selected ? 'bg-accent-500 border-accent-500' : 'border-ink-300 dark:border-ink-600'}`}>
              {selected && (
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-white" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-5.121-5.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            <span className="text-sm text-ink-900 dark:text-ink-50">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SegmentedToggle({ options, value, onChange }) {
  return (
    <div className="inline-flex p-1 rounded-xl bg-ink-100 dark:bg-ink-800">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all
              ${selected
                ? 'bg-white text-ink-900 shadow-soft dark:bg-ink-700 dark:text-white'
                : 'text-ink-500 hover:text-ink-700 dark:text-ink-400'}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
