import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Activity } from 'lucide-react';
import { useIntakeStore } from '../store/intakeStore.js';
import { generatePlan } from '../utils/planGenerator.js';
import ProgressBar from './ui/ProgressBar.jsx';
import Button from './ui/Button.jsx';
import BasicsStep, { validateBasics } from './steps/BasicsStep.jsx';
import GoalsStep, { validateGoals } from './steps/GoalsStep.jsx';
import ActivityStep, { validateActivity } from './steps/ActivityStep.jsx';
import HealthStep, { validateHealth } from './steps/HealthStep.jsx';
import NutritionStep, { validateNutrition } from './steps/NutritionStep.jsx';

const STEPS = [
  { label: 'Basics', component: BasicsStep, validate: validateBasics },
  { label: 'Goals', component: GoalsStep, validate: validateGoals },
  { label: 'Activity', component: ActivityStep, validate: validateActivity },
  { label: 'Health', component: HealthStep, validate: validateHealth },
  { label: 'Nutrition', component: NutritionStep, validate: validateNutrition },
];

export default function IntakeWizard() {
  const navigate = useNavigate();
  const intake = useIntakeStore((s) => s.intake);
  const setPlan = useIntakeStore((s) => s.setPlan);
  const saveCurrentClient = useIntakeStore((s) => s.saveCurrentClient);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const Current = STEPS[step - 1].component;
  const validate = STEPS[step - 1].validate;
  const isLast = step === STEPS.length;

  const next = async () => {
    const issue = validate(intake);
    if (issue) {
      setError(issue);
      return;
    }
    setError(null);
    if (isLast) {
      setSaving(true);
      try {
        await saveCurrentClient();
        const fresh = useIntakeStore.getState().intake;
        const plan = generatePlan(fresh);
        setPlan(plan);
        navigate('/dashboard');
      } catch (err) {
        setError(err?.message || 'Could not save client. Check your connection and try again.');
        setSaving(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const back = () => {
    setError(null);
    if (step === 1) {
      navigate('/');
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink-50 dark:bg-ink-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-9 w-9 rounded-xl bg-ink-900 text-white flex items-center justify-center dark:bg-white dark:text-ink-900">
            <Activity className="h-4 w-4" strokeWidth={2.4} />
          </div>
          <div className="font-semibold text-ink-900 dark:text-ink-50">Coach</div>
        </div>

        <ProgressBar step={step} total={STEPS.length} labels={STEPS.map((s) => s.label)} />

        <div className="mt-8 bg-white dark:bg-ink-800/50 rounded-3xl border border-ink-100 dark:border-ink-700 shadow-soft p-6 sm:p-8">
          <div key={step}>
            <Current />
          </div>

          {error && (
            <div className="mt-5 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 text-sm dark:bg-rose-900/30 dark:text-rose-300">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-100 dark:border-ink-700">
            <Button variant="ghost" onClick={back}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button onClick={next} disabled={saving} variant={isLast ? 'accent' : 'primary'} size="lg">
              {isLast
                ? (saving
                    ? (<>Saving…</>)
                    : (<><Sparkles className="h-4 w-4" /> Generate My Plan</>))
                : (<>Continue <ArrowRight className="h-4 w-4" /></>)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
