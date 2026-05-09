import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { Replace, ArrowRight, Search } from 'lucide-react';
import { TextInput } from '../../ui/Field.jsx';

export default function FoodSubstitutions({ plan }) {
  const [q, setQ] = useState('');
  const filtered = plan.substitutions.filter((s) => {
    if (!q.trim()) return true;
    const t = q.toLowerCase();
    return s.from.toLowerCase().includes(t) || s.to.toLowerCase().includes(t) || s.why.toLowerCase().includes(t);
  });

  return (
    <Card>
      <CardHeader title="Food Substitutions"
        subtitle="Quick swaps that compound over weeks. Search for the food you're trying to replace."
        icon={Replace}
        action={
          <div className="relative w-56">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <TextInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search swaps…" className="pl-9 py-2" />
          </div>
        }
      />
      <CardBody>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500">
                <th className="px-3 py-2 font-medium">Original</th>
                <th className="px-3 py-2 font-medium"></th>
                <th className="px-3 py-2 font-medium">Better option</th>
                <th className="px-3 py-2 font-medium">Why swap</th>
                <th className="px-3 py-2 font-medium">Macro difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
              {filtered.map((s, i) => (
                <tr key={i} className="hover:bg-ink-50/60 dark:hover:bg-ink-800/40 transition-colors">
                  <td className="px-3 py-3 align-top">
                    <span className="text-ink-700 dark:text-ink-300 line-through decoration-ink-300 dark:decoration-ink-600">
                      {s.from}
                    </span>
                  </td>
                  <td className="px-3 py-3 align-top text-ink-300">
                    <ArrowRight className="h-4 w-4" />
                  </td>
                  <td className="px-3 py-3 align-top font-medium text-ink-900 dark:text-ink-50">{s.to}</td>
                  <td className="px-3 py-3 align-top text-ink-500 dark:text-ink-400">{s.why}</td>
                  <td className="px-3 py-3 align-top text-ink-700 dark:text-ink-200">
                    <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs dark:bg-emerald-500/10 dark:text-emerald-300">
                      {s.macroDiff}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-6 text-center text-ink-400">No swaps match "{q}".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
