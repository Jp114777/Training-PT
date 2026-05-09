import React from 'react';
import { useIntakeStore } from '../../store/intakeStore.js';
import { Field, TextArea, RadioCardGroup, CheckboxGroup } from '../ui/Field.jsx';
import Slider from '../ui/Slider.jsx';

export default function NutritionStep() {
  const intake = useIntakeStore((s) => s.intake);
  const setField = useIntakeStore((s) => s.setField);
  const toggleInArray = useIntakeStore((s) => s.toggleInArray);

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">Nutrition & lifestyle</h2>
        <p className="text-ink-500 dark:text-ink-400">A plan you won't follow doesn't work. Let's match your real life.</p>
      </div>

      <Field label="Dietary restrictions">
        <CheckboxGroup
          columns={3}
          values={intake.dietaryRestrictions}
          onToggle={(v) => toggleInArray('dietaryRestrictions', v)}
          options={[
            { value: 'none', label: 'None' },
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'vegan', label: 'Vegan' },
            { value: 'pescatarian', label: 'Pescatarian' },
            { value: 'gluten_free', label: 'Gluten-free' },
            { value: 'dairy_free', label: 'Dairy-free' },
            { value: 'nut_allergy', label: 'Nut allergy' },
            { value: 'other', label: 'Other' },
          ]}
        />
      </Field>

      <Field label="Foods you hate" hint="Nothing's worse than a meal plan full of stuff you won't eat.">
        <TextArea
          rows={3}
          value={intake.dislikedFoods}
          onChange={(e) => setField('dislikedFoods', e.target.value)}
          placeholder="Cottage cheese, mushrooms, anything with cilantro..."
        />
      </Field>

      <Field label="How often do you cook?">
        <RadioCardGroup
          columns={4}
          value={intake.cookingFrequency}
          onChange={(v) => setField('cookingFrequency', v)}
          options={[
            { value: 'never', label: 'Never' },
            { value: 'sometimes', label: 'Sometimes' },
            { value: 'often', label: 'Often' },
            { value: 'daily', label: 'Daily' },
          ]}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Typical sleep">
          <Slider
            min={3}
            max={11}
            step={0.5}
            value={intake.sleepHours}
            onChange={(v) => setField('sleepHours', v)}
            suffix="hrs/night"
          />
        </Field>

        <Field label="Stress level (1–10)">
          <Slider
            min={1}
            max={10}
            value={intake.stressLevel}
            onChange={(v) => setField('stressLevel', v)}
            labels={['Calm', '5', 'Maxed']}
          />
        </Field>
      </div>

      <Field label="Work schedule">
        <RadioCardGroup
          columns={2}
          value={intake.workSchedule}
          onChange={(v) => setField('workSchedule', v)}
          options={[
            { value: '9to5', label: '9–5', description: 'Predictable office hours.' },
            { value: 'shift', label: 'Shift work', description: 'Rotating or unusual hours.' },
            { value: 'flexible', label: 'Flexible', description: 'I set my own hours.' },
            { value: 'wfh', label: 'Work from home', description: 'Home base, more control.' },
          ]}
        />
      </Field>
    </div>
  );
}

export function validateNutrition(intake) {
  if (!intake.cookingFrequency) return 'Tell me how often you cook';
  if (!intake.workSchedule) return 'Pick a work schedule';
  return null;
}
