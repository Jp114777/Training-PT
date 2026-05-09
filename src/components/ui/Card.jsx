import React from 'react';

export default function Card({ className = '', children, ...rest }) {
  return (
    <div
      className={`bg-white dark:bg-ink-800/60 dark:border-ink-700 border border-ink-100 rounded-3xl shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, icon: Icon, action }) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-2">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="h-10 w-10 rounded-2xl bg-ink-50 dark:bg-ink-700/50 flex items-center justify-center text-ink-700 dark:text-ink-200">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
          {subtitle && (
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className = '', children }) {
  return <div className={`px-6 pb-6 pt-3 ${className}`}>{children}</div>;
}
