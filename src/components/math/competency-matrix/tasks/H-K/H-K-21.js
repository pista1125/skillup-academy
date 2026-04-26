export default {
  id: 'H-K-21',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Napsütés × Fagylaltfogyás',
  difficulty: 6,
  scenario: 'A pontdiagram egy fagylaltozó napi eladását (liter) mutatja a napsütés óraszámához képest.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Napsütés (óra)',
    yLabel: 'Fagylalt (L)',
    xMin: 0,
    xMax: 14,
    yMin: 0,
    yMax: 60,
    points: [
      { x: 2, y: 8 },
      { x: 4, y: 15 },
      { x: 6, y: 22 },
      { x: 7, y: 28 },
      { x: 8, y: 34 },
      { x: 10, y: 44 },
      { x: 12, y: 52 }
    ]
  },
  options: ['Több napsütés → több fagylalt', 'Napsütés nő → Fogyás csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Több napsütés → több fagylalt',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Több napsütés → több fagylalt**.'
};
