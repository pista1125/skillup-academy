export default {
  id: 'H-K-32',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Cipőméret × Versenyidő',
  difficulty: 6,
  scenario: 'A pontdiagram különböző tanulók cipőméretét és 400 m-es idejét (mp) mutatja.',
  question: 'Milyen **összefüggés** van cipőméret és futóidő között?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Cipőméret',
    yLabel: 'Idő (mp)',
    xMin: 34,
    xMax: 44,
    yMin: 60,
    yMax: 90,
    points: [
      { x: 35, y: 78 },
      { x: 36, y: 72 },
      { x: 38, y: 82 },
      { x: 39, y: 68 },
      { x: 40, y: 75 },
      { x: 41, y: 65 },
      { x: 42, y: 85 },
      { x: 43, y: 70 }
    ]
  },
  options: ['Nincs egyértelmű kapcsolat', 'Nagyobb méret → gyorsabb', 'Nagyobb méret → lassabb', 'Egyenes arány'],
  answer: 'Nincs egyértelmű kapcsolat',
  keywords: ['pontdiagram', 'szórás'],
  solution: 'A pontok **szórtan** helyezkednek el, nincs egyértelmű trend: **nincs egyértelmű kapcsolat**.'
};
