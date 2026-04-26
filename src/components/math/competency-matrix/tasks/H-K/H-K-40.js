export default {
  id: 'H-K-40',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Hőmérséklet × Jégteafogyás',
  difficulty: 6,
  scenario: 'A pontdiagram egy büfé napi átlaghőmérsékletét (°C) és jégtea eladását (db) mutatja.',
  question: 'Milyen az **összefüggés**?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Hőmérséklet (°C)',
    yLabel: 'Jégtea (db)',
    xMin: 15,
    xMax: 38,
    yMin: 0,
    yMax: 180,
    points: [
      { x: 17, y: 25 },
      { x: 20, y: 45 },
      { x: 23, y: 70 },
      { x: 26, y: 95 },
      { x: 28, y: 120 },
      { x: 31, y: 140 },
      { x: 34, y: 170 }
    ]
  },
  options: ['Melegebb → több jégtea', 'Hőmérséklet nő → eladás csökken', 'Nincs kapcsolat', 'U-alakú'],
  answer: 'Melegebb → több jégtea',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Melegebb → több jégtea**.'
};
