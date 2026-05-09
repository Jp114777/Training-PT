import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useIntakeStore } from '../store/intakeStore.js';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState('loading'); // 'loading' | 'authed' | 'anonymous'
  const setSession = useIntakeStore((s) => s.setSession);
  const fetchClients = useIntakeStore((s) => s.fetchClients);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const session = data?.session ?? null;
      setSession(session);
      setStatus(session ? 'authed' : 'anonymous');
      if (session) fetchClients();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      setStatus(session ? 'authed' : 'anonymous');
      if (session) fetchClients();
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [setSession, fetchClients]);

  if (status === 'loading') {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center text-ink-500 dark:text-ink-400">
        <div className="animate-pulse text-sm">Loading…</div>
      </div>
    );
  }
  if (status === 'anonymous') {
    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
  }
  return children;
}
