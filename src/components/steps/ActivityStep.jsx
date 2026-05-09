import React from 'react';
import { useIntakeStore } from '../../store/intakeStore.js';
import { Field, RadioCardGroup, CheckboxGroup } from '../ui/Field.jsx';
import Slider from '../ui/Slider.jsx';

export default function ActivityStep() {
  const intake = useIntakeStore((s) => s.intake);
  const setField = useIntakeStore((s) => s.setField);
  const toggleInArray = useIntakeStore((s) => s.toggleInArray);

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">Activity & experience</h2>
        <p className="text-ink-500 dark:text-ink-400">Helps me set the right starting volume and progression.</p>
      </div>

      <Field label="Current activity level (outside training)">
        <RadioCardGroup
          columns={2}
          value={intake.activityLevel}
          onChange={(v) => setField('activityLevel', v)}
          options={[
            { value: 'sedentary', label: 'Sedentary', description: 'Desk job, little movement.' },
            { value: 'lightly_active', label: 'Lightly active', description: 'Walk most days, light chores.' },
            { value: 'moderately_active', label: 'Moderately active', description: 'On feet often or 3–5×/wk active.' },
            { value: 'very_active', label: 'Very active', description: 'Manual job or training 6–7×/wk.' },
            { value: 'athlete', label: 'Athlete', description: 'Twice-daily sessions or competitive sport.' },
          ]}
        />
      </Field>

      <Field label="Training experience">
        <RadioCardGroup
          columns={3}
          value={intake.experience}
          onChange={(v) => setField('experience', v)}
          options={[
            { value: 'none', label: 'None' },
            { value: 'lt1', label: '< 1 year' },
            { value: '1to3', label: '1–3 years' },
            { value: '3to5', label: '3–5 years' },
            { value: '5plus', label: '5+ years' },
          ]}
        />
      </Field>

      <Field label="How many days per week do you want to train?">
        <Slider
          min={2}
          max={7}
          value={intake.daysPerWeek}
          onChange={(v) => setField('daysPerWeek', v)}
          suffix="days/week"
          labels={['2', '3', '4', '5', '6', '7']}
        />
      </Field>

      <Field label="Equipment access">
        <CheckboxGroup
          values={intake.equipment}
          onToggle={(v) => toggleInArray('equipment', v)}
          options={[
            { value: 'full_gym', label: 'Full gym' },
            { value: 'home_gym', label: 'Home gym' },
            { value: 'dumbbells', label: 'Dumbbells only' },
            { value: 'bodyweight', label: 'Bodyweight only' },
            { value: 'bands', label: 'Bands' },
          ]}
        />
      </Field>

      <Field label="Preferred workout duration">
        <RadioCardGroup
          columns={4}
          value={intake.workoutDuration}
          onChange={(v) => setField('workoutDuration', v)}
          options={[
            { value: 30, label: '30 min' },
            { value: 45, label: '45 min' },
            { value: 60, label: '60 min' },
            { value: 90, label: '90 min' },
          ]}
        />
      </Field>
    </div>
  );
}

export function validateActivity(intake) {
  if (!intake.activityLevel) return 'Select activity level';
  if (!intake.experience) return 'Select training experience';
  if (!intake.equipment?.length) return 'Pick at least one equipment option';
  return null;
}
