import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, UserPlus, UserCheck } from 'lucide-react';
import { useIntakeStore } from '../store/intakeStore.js';

export default function ClientTypeCheck() {
  const navigate = useNavigate();
  const setField = useIntakeStore((s) => s.setField);
  const reset = useIntakeStore((s) => s.reset);
  const savedClients = useIntakeStore((s) => s.savedClients);

  const goNew = () => {
    reset();
    setField('clientType', 'new');
    navigate('/intake');
  };

  const goReturning = () => navigate('/clients');

  const count = savedClients.length;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6 py-12 bg-gradient-to-br from-ink-50 via-white to-accent-50 dark:from-ink-900 dark:via-ink-900 dark:to-ink-800">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-11 w-11 rounded-2xl bg-ink-900 text-white flex items-center justify-center shadow-soft dark:bg-white dark:text-ink-900">
            <Activity className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-semibold text-ink-900 dark:text-ink-50">Coach</div>
            <div className="text-xs text-ink-500 dark:text-ink-400">Personal Training Studio</div>
          </div>
        </div>

        <div className="animate-fadeIn">
          <h1 className="text-4xl font-bold text-ink-900 dark:text-ink-50 tracking-tight mb-3">
            Welcome.
          </h1>
          <p className="text-ink-500 dark:text-ink-400 text-lg mb-10 max-w-md">
            Let's build your personalized plan. First — are you new here, or coming back?
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={goNew}
              className="group text-left rounded-3xl bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 p-6 hover:shadow-lift transition-all"
            >
              <div className="h-11 w-11 rounded-2xl bg-accent-500 text-white flex items-center justify-center mb-4">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="font-semibold text-ink-900 dark:text-ink-50 mb-1">New client</div>
              <div className="text-sm text-ink-500 dark:text-ink-400">First time. Walk me through your background.</div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-accent-600 group-hover:translate-x-0.5 transition-transform">
                Begin intake <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>

            <button
              onClick={goReturning}
              className="group text-left rounded-3xl bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 p-6 hover:shadow-lift transition-all"
            >
              <div className="h-11 w-11 rounded-2xl bg-ink-900 text-white flex items-center justify-center mb-4 dark:bg-ink-100 dark:text-ink-900">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="font-semibold text-ink-900 dark:text-ink-50 mb-1">Returning client</div>
              <div className="text-sm text-ink-500 dark:text-ink-400">
                {count > 0
                  ? `${count} saved file${count === 1 ? '' : 's'} — pick one or manage the list.`
                  : 'No saved files yet — start a new intake to add one.'}
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-ink-700 dark:text-ink-200 group-hover:translate-x-0.5 transition-transform">
                Open client list <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
