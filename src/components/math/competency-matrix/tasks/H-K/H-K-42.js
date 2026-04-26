export default {
  id: 'H-K-42',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Eső × Kerékpárosok',
  difficulty: 6,
  scenario: 'A pontdiagram egy kerékpárút napi átlag csapadékát (mm) és forgalmát (ezer fő) mutatja.',
  question: 'Milyen az **összefüggés**?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Csapadék (mm)',
    yLabel: 'Forgalom (ezer fő)',
    xMin: 0,
    xMax: 20,
    yMin: 0,
    yMax: 12,
    points: [
      { x: 0, y: 10.5 },
      { x: 1, y: 9.5 },
      { x: 3, y: 7.8 },
      { x: 5, y: 6 },
      { x: 8, y: 4.2 },
      { x: 12, y: 2.5 },
      { x: 16, y: 1 }
    ]
  },
  options: ['Több eső → kevesebb kerékpáros', 'Eső nő → Forgalom nő', 'Nincs kapcsolat', 'Egyenes arány'],
  answer: 'Több eső → kevesebb kerékpáros',
  keywords: ['pontdiagram', 'fordított'],
  solution: 'A pontok trendje: **Több eső → kevesebb kerékpáros**.'
};
