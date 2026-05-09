import React from 'react';
import Card, { CardBody } from '../../ui/Card.jsx';
import { BookOpen } from 'lucide-react';

export default function CookbookLibrary({ plan }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-ink-50">Cookbook Library</h2>
        <p className="text-ink-500 dark:text-ink-400 mt-1">
          Books that match your goal and fit your kitchen habits.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {plan.cookbooks.map((c, i) => (
          <Card key={i} className="overflow-hidden hover:shadow-lift transition-shadow">
            <div
              className="aspect-[3/4] flex items-end p-5 text-white"
              style={{
                background: `linear-gradient(160deg, ${c.cover.from}, ${c.cover.to})`,
              }}
            >
              <BookOpen className="h-6 w-6 opacity-80" />
            </div>
            <CardBody>
              <div className="font-semibold text-ink-900 dark:text-ink-50 leading-tight">{c.title}</div>
              <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">{c.author}</div>
              <p className="text-sm text-ink-600 dark:text-ink-300 mt-3 leading-relaxed">{c.blurb}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
