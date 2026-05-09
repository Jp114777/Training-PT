import React from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { Pill, Clock, Sparkles } from 'lucide-react';

export default function Supplements({ plan }) {
  const essentials = plan.supplements.filter((s) => s.tag === 'essential');
  const optionals = plan.supplements.filter((s) => s.tag === 'optional');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">Supplements</h2>
        <p className="text-ink-500 dark:text-ink-400 mt-1">
          Food first. Supplements close the gaps that your meals can't reliably fill.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-ink-500 dark:text-ink-400 mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Essentials
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {essentials.map((s, i) => <SuppCard key={i} s={s} />)}
        </div>
      </div>

      {optionals.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-ink-500 dark:text-ink-400 mb-3">
            Optional
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {optionals.map((s, i) => <SuppCard key={i} s={s} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function SuppCard({ s }) {
  const isEssential = s.tag === 'essential';
  return (
    <Card className="h-full">
      <CardHeader
        title={s.name}
        subtitle={s.purpose}
        icon={Pill}
        action={
          <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full
            ${isEssential
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
              : 'bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-300'}
          `}>
            {s.tag}
          </span>
        }
      />
      <CardBody>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500 w-16 shrink-0 pt-0.5">Dose</span>
            <span className="text-ink-900 dark:text-ink-50">{s.dose}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500 w-16 shrink-0 pt-0.5">When</span>
            <span className="text-ink-700 dark:text-ink-200 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-ink-400" />
              {s.timing}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
