import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { Dumbbell, Play, ChevronRight, Flame, Sparkles } from 'lucide-react';

export default function WorkoutPlan({ plan }) {
  const [open, setOpen] = useState(null); // exerciseKey

  const adaptations = plan.workout.adaptations || [];
  const goalShape = plan.workout.goalShape;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">{plan.workout.name}</h2>
            {goalShape && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                <Sparkles className="h-3 w-3" />
                {goalShape}
              </span>
            )}
          </div>
          <p className="text-ink-500 dark:text-ink-400 mt-1">{plan.workout.description}</p>
        </div>
        <div className="text-sm text-ink-500 dark:text-ink-400">
          {plan.daysPerWeek} days/week · {plan.workoutDuration} min sessions
        </div>
      </div>

      {adaptations.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500">Adapted for:</span>
          {adaptations.map((a, i) => (
            <span
              key={i}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200"
            >
              {a}
            </span>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {plan.workout.days.map((day, idx) => (
          <Card key={idx}>
            <CardHeader
              title={day.name}
              subtitle={day.focus}
              icon={Dumbbell}
            />
            <CardBody>
              <div className="space-y-1.5">
                {day.exercises.map((ex, i) => {
                  const k = `${idx}-${i}`;
                  const isOpen = open === k;
                  const isFinisher = ex.priority === 'finisher';
                  return (
                    <div key={k}>
                      <button
                        onClick={() => setOpen(isOpen ? null : k)}
                        className={`w-full flex flex-wrap items-start gap-x-3 gap-y-1 px-3 py-2.5 rounded-xl text-left transition-colors
                          ${isFinisher
                            ? 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/20'
                            : 'hover:bg-ink-50 dark:hover:bg-ink-800/50'}
                        `}
                      >
                        <div className="flex items-start gap-2 flex-1 min-w-0 basis-full sm:basis-0 font-medium text-ink-900 dark:text-ink-50">
                          {isFinisher ? (
                            <Flame className="h-4 w-4 text-amber-600 dark:text-amber-300 mt-0.5 shrink-0" />
                          ) : (
                            <ChevronRight className={`h-4 w-4 text-ink-400 mt-0.5 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="break-words">{ex.name}</div>
                            {ex.pickedReason && (
                              <div className="text-[11px] text-accent-600 dark:text-accent-300 font-normal mt-0.5">
                                {ex.pickedReason}
                              </div>
                            )}
                            {isFinisher && (
                              <div className="text-[11px] text-amber-700 dark:text-amber-300 font-normal mt-0.5">
                                Metabolic finisher · added for fat loss
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-ink-600 dark:text-ink-300 pt-0.5 shrink-0 ml-7 sm:ml-0 tabular-nums whitespace-nowrap">
                          {ex.sets} × {ex.reps}
                        </div>
                        <div className="text-sm text-ink-400 pt-0.5 shrink-0 tabular-nums whitespace-nowrap">
                          rest {ex.rest}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="ml-7 mr-2 mb-2 rounded-2xl bg-ink-50 dark:bg-ink-800/50 border border-ink-100 dark:border-ink-700 p-3 animate-fadeIn">
                          {ex.notes && (
                            <div className="text-sm text-ink-700 dark:text-ink-200 mb-2">
                              <span className="text-xs uppercase tracking-wide text-ink-400 mr-2">Notes</span>
                              {ex.notes}
                            </div>
                          )}
                          <div className="aspect-video rounded-xl bg-gradient-to-br from-ink-200 to-ink-100 dark:from-ink-700 dark:to-ink-800 flex items-center justify-center text-ink-500 dark:text-ink-400">
                            <Play className="h-8 w-8 mr-2" />
                            <span className="text-sm">Form video placeholder</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
