import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Activity, ArrowLeft, ArrowRight, UserPlus, Trash2, Edit3,
  Inbox, Search, Target, Dumbbell, Flame, Link as LinkIcon, Check, AlertCircle
} from 'lucide-react';
import { useIntakeStore } from '../store/intakeStore.js';
import { generatePlan } from '../utils/planGenerator.js';
import Button from './ui/Button.jsx';
import Card, { CardBody } from './ui/Card.jsx';
import { Field, TextArea, TextInput } from './ui/Field.jsx';

export default function ClientsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const savedClients = useIntakeStore((s) => s.savedClients);
  const clientsLoading = useIntakeStore((s) => s.clientsLoading);
  const clientsError = useIntakeStore((s) => s.clientsError);
  const loadClient = useIntakeStore((s) => s.loadClient);
  const deleteClient = useIntakeStore((s) => s.deleteClient);
  const setPlan = useIntakeStore((s) => s.setPlan);
  const setField = useIntakeStore((s) => s.setField);
  const reset = useIntakeStore((s) => s.reset);
  const activePlan = useIntakeStore((s) => s.plan);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [openingClient, setOpeningClient] = useState(null);
  const [problem, setProblem] = useState('');
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const cameFromDashboard = location.state?.from === 'dashboard' || !!activePlan;

  const goNew = () => {
    reset();
    setField('clientType', 'new');
    navigate('/intake');
  };

  const handleOpen = (client) => {
    setOpeningClient(client);
    setProblem('');
  };

  const confirmOpen = async (withProblem) => {
    setActionError(null);
    const ok = await loadClient(openingClient.id);
    if (!ok) {
      setActionError('Could not load that client.');
      return;
    }
    const intake = useIntakeStore.getState().intake;
    const finalProblem = withProblem ? problem.trim() : '';
    if (finalProblem) setField('currentProblem', finalProblem);
    const plan = generatePlan({ ...intake, currentProblem: finalProblem, mealOverrides: openingClient.meal_overrides });
    setPlan(plan);
    setOpeningClient(null);
    navigate('/dashboard');
  };

  const handleEdit = async (client) => {
    setActionError(null);
    const ok = await loadClient(client.id);
    if (ok) navigate('/intake');
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
    } catch (err) {
      setActionError(err?.message || 'Could not delete client');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleCopyLink = async (client) => {
    const url = `${window.location.origin}/share/${client.share_token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(client.id);
      setTimeout(() => setCopiedId((cur) => (cur === client.id ? null : cur)), 1800);
    } catch {
      setActionError('Clipboard blocked — copy this URL manually: ' + url);
    }
  };

  const filtered = savedClients
    .slice()
    .sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0))
    .filter((c) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        (c.name || '').toLowerCase().includes(q) ||
        goalLabel(c.intake?.primaryGoal).toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink-50 dark:bg-ink-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(cameFromDashboard ? '/dashboard' : '/')}
              className="inline-flex items-center text-sm text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {cameFromDashboard ? 'Back to dashboard' : 'Back to welcome'}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={goNew}>
              <UserPlus className="h-4 w-4" /> New client
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="h-11 w-11 rounded-2xl bg-ink-900 text-white flex items-center justify-center dark:bg-white dark:text-ink-900">
            <Activity className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-50 leading-tight">All Clients</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              {clientsLoading
                ? 'Loading…'
                : `${savedClients.length} saved file${savedClients.length === 1 ? '' : 's'}.`}
            </p>
          </div>
        </div>

        {clientsError && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-sm flex gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Could not load clients: {clientsError}</span>
          </div>
        )}
        {actionError && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-sm flex gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

        {savedClients.length > 0 && (
          <div className="relative max-w-md mt-4">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or goal…"
              className="pl-9"
            />
          </div>
        )}

        {/* Empty state */}
        {savedClients.length === 0 && (
          <Card className="mt-6">
            <CardBody>
              <div className="py-10 text-center">
                <div className="h-12 w-12 rounded-2xl bg-ink-50 dark:bg-ink-700 mx-auto flex items-center justify-center text-ink-400 mb-4">
                  <Inbox className="h-6 w-6" />
                </div>
                <div className="font-medium text-ink-900 dark:text-ink-50">No saved clients yet</div>
                <p className="text-sm text-ink-500 dark:text-ink-400 mt-1 mb-6 max-w-sm mx-auto">
                  Run a new-client intake — the moment you click "Generate My Plan" it'll appear here automatically.
                </p>
                <Button onClick={goNew}>
                  <UserPlus className="h-4 w-4" /> Start a new intake
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {savedClients.length > 0 && filtered.length === 0 && (
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-6">No clients match "{query}".</p>
        )}

        {/* Client list */}
        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          {filtered.map((c) => (
            <ClientDetailCard
              key={c.id}
              client={c}
              isConfirmingDelete={confirmDeleteId === c.id}
              isCopied={copiedId === c.id}
              onOpen={() => handleOpen(c)}
              onEdit={() => handleEdit(c)}
              onCopyLink={() => handleCopyLink(c)}
              onAskDelete={() => setConfirmDeleteId(c.id)}
              onCancelDelete={() => setConfirmDeleteId(null)}
              onConfirmDelete={() => handleDelete(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Open-client modal */}
      {openingClient && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpeningClient(null)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-ink-800 rounded-3xl shadow-lift border border-ink-100 dark:border-ink-700 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-xs uppercase tracking-wide text-accent-600 mb-1">Opening</div>
              <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">{openingClient.name}</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400 mb-5">
                Anything new since last session? Add it and I'll surface it on their dashboard.
              </p>
              <Field label="Today's issue (optional)">
                <TextArea
                  autoFocus
                  rows={4}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="e.g. Stuck at the same weight for two weeks. Sleep is suffering."
                />
              </Field>
            </div>
            <div className="px-6 py-4 border-t border-ink-100 dark:border-ink-700 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setOpeningClient(null)}
                className="text-sm text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => confirmOpen(false)}>
                  Skip — just open
                </Button>
                <Button onClick={() => confirmOpen(true)} disabled={!problem.trim()}>
                  Open with note <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ClientDetailCard({
  client, isConfirmingDelete, isCopied, onOpen, onEdit, onCopyLink, onAskDelete, onCancelDelete, onConfirmDelete,
}) {
  const initials = client.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('') || '?';

  // Compute a fresh plan summary for display. Pure math, fast.
  let plan = null;
  try { plan = generatePlan(intake); } catch { plan = null; }

  const intake = { ...(client.intake || {}), savedId: client.id, mealOverrides: client.meal_overrides };
  const heightDisplay = intake.heightUnit === 'imperial'
    ? (intake.height?.feet ? `${intake.height.feet}'${intake.height.inches || 0}"` : '—')
    : (intake.heightCm ? `${intake.heightCm} cm` : '—');
  const weightDisplay = intake.weight ? `${intake.weight} ${intake.weightUnit}` : '—';
  const goalWeightDisplay = intake.goalWeight ? `${intake.goalWeight} ${intake.weightUnit}` : '—';
  const bf = intake.bodyFatUnknown ? intake.bodyFatEstimate : intake.bodyFat;

  return (
    <Card className="overflow-hidden">
      {/* Header strip */}
      <div className="flex items-start gap-3 p-5 pb-3 border-b border-ink-100 dark:border-ink-700">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-white flex items-center justify-center font-semibold shadow-soft shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-ink-900 dark:text-ink-50 truncate">{client.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300">
              {goalLabel(intake.primaryGoal)}
            </span>
          </div>
          <div className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
            {[
              intake.age && `${intake.age} yo`,
              intake.sex && capitalize(intake.sex),
              `Saved ${formatAgo(new Date(client.updated_at || client.created_at).getTime())}`,
            ].filter(Boolean).join(' · ')}
          </div>
        </div>
      </div>

      <CardBody className="pt-4">
        {/* Goal summary */}
        {plan?.client?.goalSummary && (
          <div className="flex items-start gap-2 mb-4">
            <Target className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
            <span className="text-sm font-medium text-ink-900 dark:text-ink-50">{plan.client.goalSummary}</span>
          </div>
        )}

        {/* Three-column info grid */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <InfoBlock title="Body" icon={null}>
            <Row k="Now" v={`${weightDisplay}${bf ? ` · ${bf}%` : ''}`} />
            <Row k="Goal" v={`${goalWeightDisplay}${intake.goalBodyFat ? ` · ${intake.goalBodyFat}%` : ''}`} />
            <Row k="Height" v={heightDisplay} />
          </InfoBlock>

          <InfoBlock title="Targets" icon={Flame}>
            {plan ? (
              <>
                <Row k="TDEE" v={`${plan.stats.tdee.toLocaleString()} cal`} />
                <Row k="Target" v={`${plan.stats.targetCalories.toLocaleString()} cal`} accent />
                <Row k="Macros" v={`P${plan.macros.protein.grams}/C${plan.macros.carbs.grams}/F${plan.macros.fat.grams}`} />
              </>
            ) : <Row k="—" v="" />}
          </InfoBlock>

          <InfoBlock title="Training" icon={Dumbbell}>
            <Row k="Days" v={`${intake.daysPerWeek || '—'}/week`} />
            <Row k="Length" v={intake.workoutDuration ? `${intake.workoutDuration} min` : '—'} />
            <Row k="Equip" v={equipmentShort(intake.equipment)} />
          </InfoBlock>
        </div>

        {/* Why */}
        {intake.why && (
          <div className="mt-4 rounded-xl bg-ink-50/70 dark:bg-ink-800/50 px-3 py-2 border border-ink-100 dark:border-ink-700">
            <div className="text-[11px] uppercase tracking-wide text-ink-400 dark:text-ink-500 mb-0.5">Their motivation</div>
            <p className="text-sm text-ink-700 dark:text-ink-200 italic line-clamp-3">"{intake.why}"</p>
          </div>
        )}

        {/* Last session problem */}
        {intake.currentProblem && (
          <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 px-3 py-2 border border-amber-100 dark:border-amber-500/20">
            <div className="text-[11px] uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-0.5">Last session note</div>
            <p className="text-sm text-amber-900 dark:text-amber-100 line-clamp-2">{intake.currentProblem}</p>
          </div>
        )}

        {/* Actions */}
        {!isConfirmingDelete ? (
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-ink-100 dark:border-ink-700">
            <Button onClick={onOpen} className="flex-1 sm:flex-none">
              Open dashboard <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" onClick={onEdit}>
              <Edit3 className="h-4 w-4" /> Edit
            </Button>
            <Button variant="ghost" onClick={onCopyLink}>
              {isCopied ? (
                <><Check className="h-4 w-4 text-emerald-500" /> Copied</>
              ) : (
                <><LinkIcon className="h-4 w-4" /> Copy link</>
              )}
            </Button>
            <button
              onClick={onAskDelete}
              aria-label={`Delete ${client.name}`}
              className="ml-auto p-2 rounded-lg text-ink-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 dark:text-ink-500 dark:hover:text-rose-300 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mt-5 pt-4 border-t border-ink-100 dark:border-ink-700 rounded-b-xl">
            <div className="flex items-center justify-between gap-3 bg-rose-50 dark:bg-rose-500/10 -mx-6 -mb-6 px-6 py-3 mt-2">
              <div className="text-sm text-rose-800 dark:text-rose-200">
                Delete <span className="font-semibold">{client.name}</span>? This is permanent.
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={onCancelDelete}
                  className="px-3 py-1.5 rounded-lg text-sm text-ink-700 dark:text-ink-200 hover:bg-white dark:hover:bg-ink-800"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirmDelete}
                  className="px-3 py-1.5 rounded-lg text-sm text-white bg-rose-600 hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function InfoBlock({ title, icon: Icon, children }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-ink-400 dark:text-ink-500 font-semibold flex items-center gap-1 mb-1.5">
        {Icon && <Icon className="h-3 w-3" />}
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Row({ k, v, accent }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-xs">
      <span className="text-ink-400 dark:text-ink-500">{k}</span>
      <span className={`font-medium truncate text-right ${accent ? 'text-accent-600' : 'text-ink-900 dark:text-ink-50'}`}>
        {v}
      </span>
    </div>
  );
}

function goalLabel(g) {
  switch (g) {
    case 'fat_loss': return 'Fat loss';
    case 'muscle_gain': return 'Muscle gain';
    case 'recomp': return 'Recomp';
    case 'general': return 'General fitness';
    default: return 'No goal';
  }
}

function equipmentShort(eq) {
  if (!eq?.length) return '—';
  const map = { full_gym: 'Gym', home_gym: 'Home', dumbbells: 'DBs', bodyweight: 'BW', bands: 'Bands' };
  return eq.map((e) => map[e] || e).join(', ');
}

function capitalize(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : '';
}

function formatAgo(ts) {
  if (!ts) return 'just now';
  const diffMs = Date.now() - ts;
  const m = Math.round(diffMs / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} day${d === 1 ? '' : 's'} ago`;
  const months = Math.round(d / 30);
  return `${months} mo ago`;
}
