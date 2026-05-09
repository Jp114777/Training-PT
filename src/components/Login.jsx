import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import Button from './ui/Button.jsx';
import { Field, TextInput } from './ui/Field.jsx';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!isSupabaseConfigured) {
      setError('Supabase env vars are missing — check .env.local and restart the dev server.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        navigate(redirectTo, { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        if (data.session) {
          navigate(redirectTo, { replace: true });
        } else {
          setInfo('Check your email — Supabase sent you a confirmation link. Once confirmed, return here and sign in.');
          setMode('signin');
        }
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-6 py-10 bg-gradient-to-br from-ink-50 via-white to-accent-50 dark:from-ink-900 dark:via-ink-900 dark:to-ink-800">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-2xl bg-ink-900 text-white flex items-center justify-center shadow-soft dark:bg-white dark:text-ink-900">
            <Activity className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-semibold text-ink-900 dark:text-ink-50">Coach</div>
            <div className="text-xs text-ink-500 dark:text-ink-400">Trainer access</div>
          </div>
        </div>

        <div className="bg-white dark:bg-ink-800 rounded-3xl border border-ink-100 dark:border-ink-700 shadow-soft p-6 sm:p-8 animate-fadeIn">
          <h1 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">
            {mode === 'signin' ? 'Sign in' : 'Create trainer account'}
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">
            {mode === 'signin' ? 'Pick up where you left off.' : 'One-time setup for the trainer.'}
          </p>

          <form onSubmit={submit} className="space-y-4">
            <Field label="Email">
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <TextInput
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  placeholder="you@example.com"
                />
              </div>
            </Field>
            <Field label="Password">
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <TextInput
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  placeholder="At least 6 characters"
                />
              </div>
            </Field>

            {error && (
              <div className="px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-sm flex gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {info && (
              <div className="px-3.5 py-2.5 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-300 text-sm">
                {info}
              </div>
            )}

            <Button type="submit" disabled={busy} className="w-full" size="lg">
              {busy ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
            {mode === 'signin' ? (
              <button onClick={() => { setMode('signup'); setError(null); setInfo(null); }} className="hover:text-ink-900 dark:hover:text-ink-100 underline-offset-4 hover:underline">
                First time? Create your trainer account
              </button>
            ) : (
              <button onClick={() => { setMode('signin'); setError(null); setInfo(null); }} className="hover:text-ink-900 dark:hover:text-ink-100 underline-offset-4 hover:underline">
                Already have an account? Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
