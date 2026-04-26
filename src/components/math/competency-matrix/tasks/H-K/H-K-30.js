export default {
  id: 'H-K-30',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Életkor × Cipőméret',
  difficulty: 6,
  scenario: 'A pontdiagram gyermekek életkorát (év) és cipőméretét mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Életkor (év)',
    yLabel: 'Cipőméret',
    xMin: 2,
    xMax: 16,
    yMin: 20,
    yMax: 44,
    points: [
      { x: 3, y: 22 },
      { x: 5, y: 27 },
      { x: 7, y: 30 },
      { x: 9, y: 33 },
      { x: 11, y: 36 },
      { x: 13, y: 38 },
      { x: 15, y: 40 }
    ]
  },
  options: ['Idősebb → nagyobb cipő', 'Életkor nő → Méret csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Idősebb → nagyobb cipő',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Idősebb → nagyobb cipő**.'
};
