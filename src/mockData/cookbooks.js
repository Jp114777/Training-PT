// Cookbook recommendations. Cover is a gradient placeholder — swap with real images later.

export const COOKBOOKS = [
  {
    title: 'The Performance Plate',
    author: 'Renaissance Periodization',
    blurb: 'Macro-friendly recipes scaled to a daily protein target. Great for clients who hate counting from scratch.',
    fitsFor: ['cut', 'bulk', 'recomp', 'maintain'],
    cover: { from: '#1a52d6', to: '#84b6ff' },
  },
  {
    title: 'Lean Habits for Lifelong Weight Loss',
    author: 'Georgie Fear',
    blurb: 'Behavior-first, recipes second. Best for clients who keep falling off plans.',
    fitsFor: ['cut', 'recomp'],
    cover: { from: '#0f5132', to: '#7bc99c' },
  },
  {
    title: 'Run Fast. Cook Fast. Eat Slow.',
    author: 'Shalane Flanagan & Elyse Kopecky',
    blurb: 'Whole-food endurance recipes. Great for clients with a cardio bias.',
    fitsFor: ['recomp', 'maintain'],
    cover: { from: '#b35f10', to: '#f5b97a' },
  },
  {
    title: 'The Macro Solution',
    author: 'Donald Layman',
    blurb: 'Protein-forward meal frameworks from the researcher who put leucine on the map.',
    fitsFor: ['cut', 'recomp'],
    cover: { from: '#5b22b3', to: '#c8a4f5' },
  },
  {
    title: 'The Bigger Leaner Stronger Cookbook',
    author: 'Michael Matthews',
    blurb: 'Hits clear macro targets, written for the gym crowd. Easy weeknight rotation.',
    fitsFor: ['bulk', 'recomp'],
    cover: { from: '#a8170f', to: '#f08a82' },
  },
  {
    title: 'Salt, Fat, Acid, Heat',
    author: 'Samin Nosrat',
    blurb: 'Teaches cooking, not recipes. Pays compound interest for any client who cooks regularly.',
    fitsFor: ['cut', 'bulk', 'recomp', 'maintain'],
    cover: { from: '#143d59', to: '#5fa8d3' },
  },
  {
    title: 'Plant-Based Athlete',
    author: 'Matt Frazier & Robert Cheeke',
    blurb: 'For vegetarian/vegan clients training hard. Real protein math, not hand-waving.',
    fitsFor: ['cut', 'bulk', 'recomp', 'maintain'],
    cover: { from: '#0c5e3a', to: '#7ad19c' },
  },
  {
    title: 'The Athlete’s Cookbook',
    author: 'Nicholas Romanov',
    blurb: 'Pre/post training meals built around session demands. High-touch, high-quality.',
    fitsFor: ['bulk', 'recomp', 'maintain'],
    cover: { from: '#ad580e', to: '#f3b06e' },
  },
];

export function pickCookbooks(kind) {
  return COOKBOOKS.filter((c) => c.fitsFor.includes(kind));
}
