import React from 'react';
import { useIntakeStore } from '../../store/intakeStore.js';
import { Field, TextArea, RadioCardGroup } from '../ui/Field.jsx';

export default function GoalsStep() {
  const intake = useIntakeStore((s) => s.intake);
  const setField = useIntakeStore((s) => s.setField);

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">What are we chasing?</h2>
        <p className="text-ink-500 dark:text-ink-400">Pick one primary direction. We can layer secondary goals later.</p>
      </div>

      <Field label="Primary goal">
        <RadioCardGroup
          columns={2}
          value={intake.primaryGoal}
          onChange={(v) => setField('primaryGoal', v)}
          options={[
            { value: 'fat_loss', label: 'Fat loss', description: 'Drop body fat while preserving muscle.' },
            { value: 'muscle_gain', label: 'Muscle gain', description: 'Add lean mass with a controlled surplus.' },
            { value: 'recomp', label: 'Recomposition', description: 'Lose fat and gain muscle simultaneously.' },
            { value: 'general', label: 'General fitness', description: 'Strength, conditioning, longevity.' },
          ]}
        />
      </Field>

      <Field label="How urgent is this?">
        <RadioCardGroup
          columns={3}
          value={intake.urgency}
          onChange={(v) => setField('urgency', v)}
          options={[
            { value: 'no_rush', label: 'No rush', description: 'Sustainable, lifelong.' },
            { value: 'steady', label: 'Steady', description: 'Real progress, real life.' },
            { value: 'aggressive', label: 'Aggressive', description: 'I have a deadline.' },
          ]}
        />
      </Field>

      <Field label="Why does this goal matter to you?" hint="Optional but powerful — tell me the real reason.">
        <TextArea
          rows={4}
          value={intake.why}
          onChange={(e) => setField('why', e.target.value)}
          placeholder="I want to keep up with my kids. I want to feel confident at the beach this summer..."
        />
      </Field>
    </div>
  );
}

export function validateGoals(intake) {
  if (!intake.primaryGoal) return 'Pick your primary goal';
  if (!intake.urgency) return 'Tell me how urgent this is';
  return null;
}
