import React from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card.jsx';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Legend, CartesianGrid } from 'recharts';
import { LineChart as LineIcon, Flag } from 'lucide-react';

export default function TimelineProjection({ plan }) {
  const { points, weeks, lbsPerWeek } = plan.timeline;
  const milestones = [
    { week: Math.min(4, weeks), label: 'Week 4 check-in' },
    { week: Math.min(8, weeks), label: 'Week 8 milestone' },
    { week: weeks, label: 'Goal date' },
  ].filter((m, i, arr) => arr.findIndex((x) => x.week === m.week) === i);

  const startWeight = points[0]?.weight;
  const endWeight = points[points.length - 1]?.weight;
  const startBF = points[0]?.bodyFat;
  const endBF = points[points.length - 1]?.bodyFat;
  const hasBF = startBF != null && endBF != null && startBF !== endBF;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <SummaryTile label="Duration" value={`${weeks} weeks`} sub={`Pace: ~${lbsPerWeek.toFixed(1)} lb/week`} />
        <SummaryTile label="Weight delta" value={`${(endWeight - startWeight > 0 ? '+' : '')}${(endWeight - startWeight).toFixed(1)} lb`} sub={`${startWeight} → ${endWeight} lb`} />
        {hasBF
          ? <SummaryTile label="BF% delta" value={`${(endBF - startBF).toFixed(1)} pts`} sub={`${startBF}% → ${endBF}%`} />
          : <SummaryTile label="Goal BF%" value={plan.client.goalBodyFat ? `${plan.client.goalBodyFat}%` : '—'} sub="Set in intake" />}
      </div>

      <Card>
        <CardHeader title="Projection" subtitle="Realistic rate based on goal, urgency, and experience." icon={LineIcon} />
        <CardBody>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#8e97ad' }} axisLine={false} tickLine={false}
                  label={{ value: 'Weeks', position: 'insideBottom', offset: -2, fill: '#8e97ad', fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#8e97ad' }} axisLine={false} tickLine={false}
                  domain={['dataMin - 3', 'dataMax + 3']}
                  label={{ value: 'Weight (lb)', angle: -90, position: 'insideLeft', fill: '#8e97ad', fontSize: 11 }} />
                {hasBF && (
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#8e97ad' }} axisLine={false} tickLine={false}
                    domain={['dataMin - 2', 'dataMax + 2']}
                    label={{ value: 'BF %', angle: 90, position: 'insideRight', fill: '#8e97ad', fontSize: 11 }} />
                )}
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef0f4', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="weight" name="Weight" stroke="#2a6bf2" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                {hasBF && <Line yAxisId="right" type="monotone" dataKey="bodyFat" name="Body Fat %" stroke="#e11d48" strokeWidth={2.5} dot={false} strokeDasharray="4 4" activeDot={{ r: 5 }} />}
                {milestones.map((mk) => (
                  <ReferenceLine
                    key={mk.week}
                    yAxisId="left"
                    x={mk.week}
                    stroke="#bac1d1"
                    strokeDasharray="2 4"
                    label={{ value: mk.label, fontSize: 10, fill: '#646e87', position: 'top' }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Milestones" icon={Flag} />
        <CardBody>
          <div className="grid sm:grid-cols-3 gap-4">
            {milestones.map((mk, i) => {
              const point = points.find((p) => p.week === mk.week) || points[points.length - 1];
              return (
                <div key={i} className="rounded-2xl bg-ink-50/60 dark:bg-ink-800/50 p-4 border border-ink-100 dark:border-ink-700">
                  <div className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500">{mk.label}</div>
                  <div className="text-2xl font-semibold mt-1 text-ink-900 dark:text-ink-50">{point.weight} lb</div>
                  {point.bodyFat != null && (
                    <div className="text-sm text-ink-500 dark:text-ink-400">{point.bodyFat}% body fat</div>
                  )}
                  <div className="text-xs text-ink-400 mt-2">Week {mk.week}</div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function SummaryTile({ label, value, sub }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-ink-800/60 border border-ink-100 dark:border-ink-700 p-5">
      <div className="text-xs uppercase tracking-wide text-ink-400 dark:text-ink-500">{label}</div>
      <div className="text-2xl font-bold text-ink-900 dark:text-ink-50 mt-1">{value}</div>
      <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">{sub}</div>
    </div>
  );
}
