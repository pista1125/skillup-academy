export default {
  id: 'H-K-20',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Ár × Kereslet',
  difficulty: 6,
  scenario: 'A pontdiagram egy termék árának (Ft) és napi eladásának (db) kapcsolatát mutatja.',
  question: 'Milyen az **összefüggés**?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Ár (Ft)',
    yLabel: 'Eladás (db)',
    xMin: 200,
    xMax: 700,
    yMin: 0,
    yMax: 120,
    points: [
      { x: 250, y: 110 },
      { x: 300, y: 95 },
      { x: 350, y: 82 },
      { x: 400, y: 70 },
      { x: 450, y: 55 },
      { x: 500, y: 42 },
      { x: 600, y: 28 },
      { x: 650, y: 18 }
    ]
  },
  options: ['Drágább → kevesebbet adnak el', 'Ár nő → Eladás nő', 'Nincs kapcsolat', 'Egyenes arány'],
  answer: 'Drágább → kevesebbet adnak el',
  keywords: ['pontdiagram', 'fordított'],
  solution: 'A pontok trendje: **Drágább → kevesebbet adnak el** (fordított kapcsolat).'
};
