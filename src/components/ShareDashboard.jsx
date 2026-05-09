import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Activity, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { generatePlan } from '../utils/planGenerator.js';
import { DashboardShell } from './dashboard/Dashboard.jsx';

export default function ShareDashboard() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'notfound' | 'error'
  const [errorMsg, setErrorMsg] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('id, name, intake, meal_overrides')
          .eq('share_token', token)
          .maybeSingle();
        if (cancelled) return;
        if (error) throw error;
        if (!data) {
          setStatus('notfound');
          return;
        }
        const intake = {
          ...(data.intake || {}),
          savedId: data.id,
          fullName: data.intake?.fullName || data.name,
          mealOverrides: data.meal_overrides || {},
        };
        setPlan(generatePlan(intake));
        setStatus('ok');
      } catch (err) {
        setErrorMsg(err?.message || String(err));
        setStatus('error');
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  if (status === 'loading') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center text-ink-500 dark:text-ink-400">
        <div className="animate-pulse text-sm">Loading your plan…</div>
      </div>
    );
  }

  if (status === 'notfound') {
    return (
      <CenterCard
        title="Plan not found"
        message="This link is no longer valid. Reach out to your coach for a fresh one."
      />
    );
  }

  if (status === 'error') {
    return (
      <CenterCard
        title="Couldn't load this plan"
        message={errorMsg || 'Something went wrong reaching the server. Try refreshing.'}
        tone="error"
      />
    );
  }

  return <DashboardShell plan={plan} readOnly={true} />;
}

function CenterCard({ title, message, tone = 'neutral' }) {
  const isError = tone === 'error';
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6 py-12 bg-ink-50 dark:bg-ink-900">
      <div className="w-full max-w-md text-center">
        <div className="h-12 w-12 rounded-2xl bg-ink-100 dark:bg-ink-800 mx-auto flex items-center justify-center mb-4 text-ink-500 dark:text-ink-300">
          {isError ? <AlertCircle className="h-6 w-6 text-rose-500" /> : <Activity className="h-6 w-6" />}
        </div>
        <h1 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-2">{title}</h1>
        <p className="text-ink-500 dark:text-ink-400">{message}</p>
      </div>
    </div>
  );
}
