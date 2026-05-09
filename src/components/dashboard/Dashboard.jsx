import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIntakeStore } from '../../store/intakeStore.js';
import Sidebar, { SECTIONS } from './Sidebar.jsx';
import ClientHeader from './ClientHeader.jsx';
import Overview from './sections/Overview.jsx';
import StatsAndMacros from './sections/StatsAndMacros.jsx';
import TimelineProjection from './sections/TimelineProjection.jsx';
import WorkoutPlan from './sections/WorkoutPlan.jsx';
import MealPlan from './sections/MealPlan.jsx';
import FoodSubstitutions from './sections/FoodSubstitutions.jsx';
import Supplements from './sections/Supplements.jsx';
import CookbookLibrary from './sections/CookbookLibrary.jsx';

// Reusable shell. `Dashboard` is the default trainer-route export; ShareDashboard imports
// `DashboardShell` directly with a pre-loaded plan + readOnly=true.
export function DashboardShell({ plan, onReset, readOnly = false }) {
  const [active, setActive] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  let SectionComp;
  switch (active) {
    case 'stats': SectionComp = <StatsAndMacros plan={plan} />; break;
    case 'timeline': SectionComp = <TimelineProjection plan={plan} />; break;
    case 'workout': SectionComp = <WorkoutPlan plan={plan} />; break;
    case 'meals': SectionComp = <MealPlan plan={plan} readOnly={readOnly} />; break;
    case 'subs': SectionComp = <FoodSubstitutions plan={plan} />; break;
    case 'supps': SectionComp = <Supplements plan={plan} />; break;
    case 'cookbooks': SectionComp = <CookbookLibrary plan={plan} />; break;
    default: SectionComp = <Overview plan={plan} onNavigate={setActive} />;
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex bg-ink-50 dark:bg-ink-900">
      <Sidebar
        active={active}
        onChange={setActive}
        onReset={onReset}
        readOnly={readOnly}
      />

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setMobileOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-ink-900">
            <Sidebar
              active={active}
              onChange={(id) => { setActive(id); setMobileOpen(false); }}
              onReset={onReset}
              readOnly={readOnly}
            />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-ink-100 dark:border-ink-800 sticky top-14 bg-white/80 dark:bg-ink-900/80 backdrop-blur z-20">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg text-ink-600 dark:text-ink-300">
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-sm font-medium text-ink-900 dark:text-ink-50">
            {SECTIONS.find((s) => s.id === active)?.label}
          </div>
          <span className="w-9" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-8">
          <ClientHeader plan={plan} readOnly={readOnly} />
          <div key={active} className="animate-fadeIn">
            {SectionComp}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  const plan = useIntakeStore((s) => s.plan);
  const reset = useIntakeStore((s) => s.reset);
  const navigate = useNavigate();

  if (!plan) return <Navigate to="/" replace />;

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return <DashboardShell plan={plan} onReset={handleReset} readOnly={false} />;
}
