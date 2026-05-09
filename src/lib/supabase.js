import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Surface a clear error in the browser console rather than a confusing fetch failure later.
  // eslint-disable-next-line no-console
  console.error(
    'Missing Supabase env vars. Copy .env.example → .env.local and set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY, then restart `npm run dev`.'
  );
}

export const supabase = createClient(url || 'http://invalid', anonKey || 'invalid', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'coach.supabase.auth',
  },
});

export const isSupabaseConfigured = !!(url && anonKey);
