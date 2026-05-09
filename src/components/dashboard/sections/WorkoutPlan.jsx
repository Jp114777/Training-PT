import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { Dumbbell, Play, ChevronRight } from 'lucide-react';

export default function WorkoutPlan({ plan }) {
  const [open, setOpen] = useState(null); // exerciseKey

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">{plan.workout.name}</h2>
          <p className="text-ink-500 dark:text-ink-400 mt-1">{plan.workout.description}</p>
        </div>
        <div className="text-sm text-ink-500 dark:text-ink-400">
          {plan.daysPerWeek} days/week · {plan.workoutDuration} min sessions
        </div>
      </div>

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
                  return (
                    <div key={k}>
                      <button
                        onClick={() => setOpen(isOpen ? null : k)}
                        className="w-full grid grid-cols-12 gap-3 items-center px-3 py-2.5 rounded-xl text-left hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
                      >
                        <div className="col-span-6 sm:col-span-5 font-medium text-ink-900 dark:text-ink-50 flex items-center gap-2">
                          <ChevronRight className={`h-4 w-4 text-ink-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                          {ex.name}
                        </div>
                        <div className="col-span-3 sm:col-span-3 text-sm text-ink-600 dark:text-ink-300">
                          {ex.sets} × {ex.reps}
                        </div>
                        <div className="col-span-3 sm:col-span-4 text-sm text-ink-400 text-right">
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
