import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';
import { pickAlternateMeal } from '../mockData/meals.js';

const THEME_KEY = 'coach.theme';

const initialIntake = {
  // Returning client check
  clientType: null, // 'new' | 'returning'
  returningName: '',
  currentProblem: '',
  savedId: null, // server-issued client.id once persisted

  // Step 1 — Basics
  fullName: '',
  age: '',
  sex: '',
  heightUnit: 'imperial',
  height: { feet: '', inches: '' },
  heightCm: '',
  weightUnit: 'lb',
  weight: '',
  bodyFat: '',
  bodyFatUnknown: false,
  bodyFatEstimate: '',
  goalWeight: '',
  goalBodyFat: '',

  // Step 2 — Goals
  primaryGoal: '',
  urgency: '',
  why: '',

  // Step 3 — Activity & Experience
  activityLevel: '',
  experience: '',
  daysPerWeek: 4,
  equipment: [],
  workoutDuration: 60,

  // Step 4 — Health & Injuries
  currentInjuryAreas: [],
  currentInjuryNotes: '',
  pastInjuryAreas: [],
  pastInjuryNotes: '',
  medicalConditions: '',
  medications: '',

  // Step 5 — Nutrition & Lifestyle
  dietaryRestrictions: [],
  dislikedFoods: '',
  cookingFrequency: '',
  sleepHours: 7,
  stressLevel: 5,
  workSchedule: '',
};

function loadTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function applyThemeClass(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

// Map a Supabase clients row → the in-memory intake shape used by the wizard.
function rowToIntake(row) {
  return {
    ...initialIntake,
    ...row.intake,
    savedId: row.id,
    fullName: row.intake?.fullName || row.name || '',
    clientType: 'returning',
    currentProblem: '', // each consultation captures a fresh issue
  };
}

export const useIntakeStore = create((set, get) => ({
  intake: { ...initialIntake },
  plan: null,
  savedClients: [],
  clientsLoading: false,
  clientsError: null,
  session: null,
  theme: loadTheme(),

  setSession: (session) => set({ session }),

  setTheme: (theme) => {
    const t = theme === 'light' ? 'light' : 'dark';
    try { window.localStorage.setItem(THEME_KEY, t); } catch {}
    applyThemeClass(t);
    set({ theme: t });
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    try { window.localStorage.setItem(THEME_KEY, next); } catch {}
    applyThemeClass(next);
    set({ theme: next });
  },

  setField: (field, value) =>
    set((state) => ({ intake: { ...state.intake, [field]: value } })),

  setNested: (field, key, value) =>
    set((state) => ({
      intake: { ...state.intake, [field]: { ...state.intake[field], [key]: value } },
    })),

  toggleInArray: (field, value) =>
    set((state) => {
      const arr = state.intake[field] || [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { intake: { ...state.intake, [field]: next } };
    }),

  reset: () => set({ intake: { ...initialIntake }, plan: null }),

  setPlan: (plan) => set({ plan }),

  // ── Server-backed client list ──────────────────────────────
  fetchClients: async () => {
    set({ clientsLoading: true, clientsError: null });
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, intake, meal_overrides, share_token, created_at, updated_at')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      set({ savedClients: data || [], clientsLoading: false });
    } catch (err) {
      set({ clientsError: err.message || String(err), clientsLoading: false });
    }
  },

  // Insert or update the row representing the active intake. Returns the saved id.
  saveCurrentClient: async () => {
    const intake = get().intake;
    const session = get().session;
    if (!session?.user) throw new Error('Not signed in');

    const payload = {
      trainer_id: session.user.id,
      name: (intake.fullName || 'Unnamed').trim(),
      intake,
      updated_at: new Date().toISOString(),
    };

    let id = intake.savedId;
    if (id) {
      const { error } = await supabase.from('clients').update(payload).eq('id', id);
      if (error) throw error;
    } else {
      const { data, error } = await supabase
        .from('clients')
        .insert({ ...payload, meal_overrides: {} })
        .select('id')
        .single();
      if (error) throw error;
      id = data.id;
      set((state) => ({ intake: { ...state.intake, savedId: id } }));
    }
    await get().fetchClients();
    return id;
  },

  // Hydrate the active intake from a row in savedClients
  loadClient: async (id) => {
    let row = get().savedClients.find((c) => c.id === id);
    if (!row) {
      const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
      if (error) return false;
      row = data;
    }
    set({ intake: rowToIntake(row), plan: null });
    return true;
  },

  deleteClient: async (id) => {
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (error) throw error;
    set((state) => ({ savedClients: state.savedClients.filter((c) => c.id !== id) }));
  },

  // ── Meal swap (now persists to the server) ─────────────────
  swapMeal: (day, mealIndex) => {
    const state = get();
    const plan = state.plan;
    if (!plan) return;
    const dayMeals = plan.mealPlan?.meals?.[day];
    if (!dayMeals) return;
    const current = dayMeals[mealIndex];
    if (!current) return;

    const usedIds = new Set();
    for (const d of Object.values(plan.mealPlan.meals)) {
      for (const m of d) if (m.id) usedIds.add(m.id);
    }
    const alternate = pickAlternateMeal({
      slot: current.slot,
      kind: plan.stats.kind,
      currentId: current.id,
      excludeIds: usedIds,
    });
    if (!alternate) return;

    const newDay = dayMeals.map((m, i) => (i === mealIndex ? alternate : m));
    const nextOverrides = { ...(plan.mealOverrides || {}), [`${day}-${mealIndex}`]: alternate.id };

    set({
      plan: {
        ...plan,
        mealPlan: { ...plan.mealPlan, meals: { ...plan.mealPlan.meals, [day]: newDay } },
        mealOverrides: nextOverrides,
      },
    });

    // Persist to the server (fire-and-forget). Trainer-only path.
    const clientId = plan.client?.id || state.intake.savedId;
    if (clientId && state.session?.user) {
      supabase
        .from('clients')
        .update({ meal_overrides: nextOverrides, updated_at: new Date().toISOString() })
        .eq('id', clientId)
        .then(({ error }) => {
          if (error) console.error('Failed to persist meal swap:', error.message);
        });
    }
  },
}));
