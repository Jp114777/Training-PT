import React from 'react';
import { useIntakeStore } from '../../store/intakeStore.js';
import { Field, TextArea, CheckboxGroup } from '../ui/Field.jsx';

const INJURY_AREAS = [
  { value: 'shoulder', label: 'Shoulder' },
  { value: 'lower_back', label: 'Lower back' },
  { value: 'knee', label: 'Knee' },
  { value: 'hip', label: 'Hip' },
  { value: 'wrist', label: 'Wrist' },
  { value: 'ankle', label: 'Ankle' },
  { value: 'neck', label: 'Neck' },
  { value: 'elbow', label: 'Elbow' },
];

export default function HealthStep() {
  const intake = useIntakeStore((s) => s.intake);
  const setField = useIntakeStore((s) => s.setField);
  const toggleInArray = useIntakeStore((s) => s.toggleInArray);

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">Health & injuries</h2>
        <p className="text-ink-500 dark:text-ink-400">So we don't make anything worse — and can work around what's limiting.</p>
      </div>

      <Field label="Current injuries — where?">
        <CheckboxGroup
          columns={4}
          values={intake.currentInjuryAreas}
          onToggle={(v) => toggleInArray('currentInjuryAreas', v)}
          options={INJURY_AREAS}
        />
      </Field>

      <Field label="Current injury notes" hint="Briefly describe what's going on, since when, what makes it worse.">
        <TextArea
          rows={3}
          value={intake.currentInjuryNotes}
          onChange={(e) => setField('currentInjuryNotes', e.target.value)}
          placeholder="Right shoulder — bothers me on overhead press since November..."
        />
      </Field>

      <Field label="Past injuries — where?">
        <CheckboxGroup
          columns={4}
          values={intake.pastInjuryAreas}
          onToggle={(v) => toggleInArray('pastInjuryAreas', v)}
          options={INJURY_AREAS}
        />
      </Field>

      <Field label="Past injury notes" hint="Anything I should know about recovered injuries.">
        <TextArea
          rows={3}
          value={intake.pastInjuryNotes}
          onChange={(e) => setField('pastInjuryNotes', e.target.value)}
          placeholder="ACL reconstruction 2019, fully cleared but I avoid deep knee bends under load."
        />
      </Field>

      <Field label="Medical conditions" hint="Optional. Anything affecting training or nutrition.">
        <TextArea
          rows={3}
          value={intake.medicalConditions}
          onChange={(e) => setField('medicalConditions', e.target.value)}
          placeholder="Type 2 diabetes, asthma, etc."
        />
      </Field>

      <Field label="Medications affecting training/diet" hint="Optional. Beta-blockers, GLP-1, thyroid, etc.">
        <TextArea
          rows={3}
          value={intake.medications}
          onChange={(e) => setField('medications', e.target.value)}
        />
      </Field>
    </div>
  );
}

export function validateHealth() {
  return null; // all fields optional
}
