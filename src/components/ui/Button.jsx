import React from 'react';

const variants = {
  primary:
    'bg-ink-900 text-white hover:bg-ink-800 active:scale-[0.98] dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:bg-ink-50 active:scale-[0.98] dark:bg-ink-800 dark:text-ink-50 dark:border-ink-700 dark:hover:bg-ink-700',
  ghost:
    'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 rounded-xl',
  lg: 'px-6 py-3 text-base rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-300/60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
