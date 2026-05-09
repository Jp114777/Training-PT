import React from 'react';
import { useIntakeStore } from '../../store/intakeStore.js';
import { Field, TextInput, RadioCardGroup, SegmentedToggle } from '../ui/Field.jsx';

const BF_VISUAL = [
  { value: 10, label: 'Lean (8–12%)', emoji: '🏋️' },
  { value: 15, label: 'Athletic (13–17%)', emoji: '🏃' },
  { value: 20, label: 'Fit (18–22%)', emoji: '💪' },
  { value: 25, label: 'Average (23–27%)', emoji: '🧍' },
  { value: 30, label: 'Higher (28–32%)', emoji: '🙂' },
  { value: 35, label: 'Higher+ (33%+)', emoji: '😊' },
];

export default function BasicsStep() {
  const intake = useIntakeStore((s) => s.intake);
  const setField = useIntakeStore((s) => s.setField);
  const setNested = useIntakeStore((s) => s.setNested);

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50 mb-1">Tell me about yourself</h2>
        <p className="text-ink-500 dark:text-ink-400">The basics so I can build a plan that actually fits.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name">
          <TextInput
            value={intake.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            placeholder="Jordan Mitchell"
          />
        </Field>
        <Field label="Age">
          <TextInput
            type="number"
            min="14"
            max="100"
            value={intake.age}
            onChange={(e) => setField('age', e.target.value)}
            placeholder="32"
          />
        </Field>
      </div>

      <Field label="Sex">
        <RadioCardGroup
          columns={3}
          value={intake.sex}
          onChange={(v) => setField('sex', v)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
        />
      </Field>

      {/* Height */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink-800 dark:text-ink-100">Height</span>
          <SegmentedToggle
            value={intake.heightUnit}
            onChange={(v) => setField('heightUnit', v)}
            options={[
              { value: 'imperial', label: 'ft / in' },
              { value: 'metric', label: 'cm' },
            ]}
          />
        </div>
        {intake.heightUnit === 'imperial' ? (
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              type="number" min="3" max="8"
              value={intake.height.feet}
              onChange={(e) => setNested('height', 'feet', e.target.value)}
              placeholder="ft"
            />
            <TextInput
              type="number" min="0" max="11"
              value={intake.height.inches}
              onChange={(e) => setNested('height', 'inches', e.target.value)}
              placeholder="in"
            />
          </div>
        ) : (
          <TextInput
            type="number" min="120" max="230"
            value={intake.heightCm}
            onChange={(e) => setField('heightCm', e.target.value)}
            placeholder="180"
          />
        )}
      </div>

      {/* Weight */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-ink-800 dark:text-ink-100">Current weight</span>
            <SegmentedToggle
              value={intake.weightUnit}
              onChange={(v) => setField('weightUnit', v)}
              options={[
                { value: 'lb', label: 'lb' },
                { value: 'kg', label: 'kg' },
              ]}
            />
          </div>
          <TextInput
            type="number" min="60" max="500" step="0.1"
            value={intake.weight}
            onChange={(e) => setField('weight', e.target.value)}
            placeholder={intake.weightUnit === 'lb' ? '180' : '82'}
          />
        </div>

        <Field label={`Goal weight (${intake.weightUnit})`}>
          <TextInput
            type="number" min="60" max="500" step="0.1"
            value={intake.goalWeight}
            onChange={(e) => setField('goalWeight', e.target.value)}
            placeholder={intake.weightUnit === 'lb' ? '170' : '77'}
          />
        </Field>
      </div>

      {/* Body Fat */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink-800 dark:text-ink-100">Body fat %</span>
          <button
            type="button"
            onClick={() => setField('bodyFatUnknown', !intake.bodyFatUnknown)}
            className="text-xs text-accent-600 hover:underline"
          >
            {intake.bodyFatUnknown ? 'I know my BF%' : "Not sure — show estimator"}
          </button>
        </div>

        {!intake.bodyFatUnknown ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              type="number" min="3" max="60" step="0.1"
              value={intake.bodyFat}
              onChange={(e) => setField('bodyFat', e.target.value)}
              placeholder="e.g. 18"
            />
            <Field label="Target BF %">
              <TextInput
                type="number" min="3" max="60" step="0.1"
                value={intake.goalBodyFat}
                onChange={(e) => setField('goalBodyFat', e.target.value)}
                placeholder="e.g. 12"
              />
            </Field>
          </div>
        ) : (
          <div>
            <p className="text-xs text-ink-500 dark:text-ink-400 mb-3">Pick whichever is closest to where you are now.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BF_VISUAL.map((b) => {
                const selected = Number(intake.bodyFatEstimate) === b.value;
                return (
                  <button
                    type="button"
                    key={b.value}
                    onClick={() => setField('bodyFatEstimate', b.value)}
                    className={`text-left rounded-2xl px-4 py-3 border transition-all
                      ${selected
                        ? 'border-accent-500 bg-accent-50 dark:bg-accent-500/10 dark:border-accent-400'
                        : 'border-ink-200 hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:hover:bg-ink-800'}
                    `}
                  >
                    <div className="text-2xl">{b.emoji}</div>
                    <div className="text-sm font-medium text-ink-900 dark:text-ink-50 mt-1">{b.label}</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <Field label="Target BF %">
                <TextInput
                  type="number" min="3" max="60" step="0.1"
                  value={intake.goalBodyFat}
                  onChange={(e) => setField('goalBodyFat', e.target.value)}
                  placeholder="e.g. 15"
                />
              </Field>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function validateBasics(intake) {
  if (!intake.fullName?.trim()) return 'Add your full name';
  if (!intake.age) return 'Add your age';
  if (!intake.sex) return 'Select sex';
  if (intake.heightUnit === 'imperial') {
    if (!intake.height.feet) return 'Enter your height';
  } else if (!intake.heightCm) return 'Enter your height';
  if (!intake.weight) return 'Enter your current weight';
  if (!intake.goalWeight) return 'Enter your goal weight';
  return null;
}
