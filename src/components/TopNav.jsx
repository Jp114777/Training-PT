import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Users, UserPlus, Home, LayoutDashboard, Moon, Sun, LogOut, Eye } from 'lucide-react';
import { useIntakeStore } from '../store/intakeStore.js';
import { supabase } from '../lib/supabase.js';

export default function TopNav({ variant = 'trainer' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reset = useIntakeStore((s) => s.reset);
  const setField = useIntakeStore((s) => s.setField);
  const savedCount = useIntakeStore((s) => s.savedClients.length);
  const hasActivePlan = useIntakeStore((s) => !!s.plan);
  const session = useIntakeStore((s) => s.session);
  const theme = useIntakeStore((s) => s.theme);
  const toggleTheme = useIntakeStore((s) => s.toggleTheme);

  const goNew = () => {
    reset();
    setField('clientType', 'new');
    navigate('/intake');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname === path;
  const isTrainer = variant === 'trainer';

  return (
    <header className="sticky top-0 z-40 h-14 bg-white/85 dark:bg-ink-900/85 backdrop-blur-md border-b border-ink-100 dark:border-ink-800">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">
        <Link to={isTrainer ? '/' : '#'} className="flex items-center gap-2.5 group shrink-0">
          <div className="h-8 w-8 rounded-lg bg-ink-900 text-white flex items-center justify-center dark:bg-white dark:text-ink-900 group-hover:scale-105 transition-transform">
            <Activity className="h-4 w-4" strokeWidth={2.4} />
          </div>
          <span className="font-semibold text-ink-900 dark:text-ink-50 hidden sm:block">Coach</span>
          {!isTrainer && (
            <span className="hidden sm:inline-flex ml-2 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 items-center gap-1">
              <Eye className="h-3 w-3" /> Read-only
            </span>
          )}
        </Link>

        <nav className="flex items-center gap-1">
          {isTrainer && (
            <>
              <NavLink to="/" active={isActive('/')} icon={Home} label="Welcome" />
              <NavLink
                to="/clients"
                active={isActive('/clients')}
                icon={Users}
                label="Clients"
                badge={savedCount > 0 ? savedCount : null}
              />
              {hasActivePlan && (
                <NavLink
                  to="/dashboard"
                  active={isActive('/dashboard')}
                  icon={LayoutDashboard}
                  label="Dashboard"
                />
              )}
            </>
          )}

          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-1 inline-flex items-center justify-center h-9 w-9 rounded-lg text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50 transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isTrainer && (
            <>
              <button
                onClick={goNew}
                className="ml-1 sm:ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 active:scale-[0.98] transition-all"
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">New client</span>
              </button>
              {session && (
                <button
                  onClick={signOut}
                  aria-label="Sign out"
                  title={`Sign out ${session.user?.email || ''}`}
                  className="ml-1 inline-flex items-center justify-center h-9 w-9 rounded-lg text-ink-500 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, active, icon: Icon, label, badge }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
        ${active
          ? 'bg-ink-100 text-ink-900 dark:bg-ink-800 dark:text-ink-50 font-medium'
          : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50'}
      `}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      {badge != null && (
        <span className="text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-900 font-semibold">
          {badge}
        </span>
      )}
    </Link>
  );
}
