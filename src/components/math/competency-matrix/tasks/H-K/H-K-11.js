export default {
  id: 'H-K-11',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Órák tanulás × Jegy',
  difficulty: 6,
  scenario: 'A pontdiagram órák tanulás és jegy kapcsolatát mutatja.',
  question: 'Milyen az összefüggés?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Órák tanulás',
    yLabel: 'Jegy',
    xMin: 0,
    xMax: 10,
    yMin: 1,
    yMax: 5,
    points: [
      {
        x: 0,
        y: 2
      },
      {
        x: 1,
        y: 2.5
      },
      {
        x: 2,
        y: 3
      },
      {
        x: 3,
        y: 3.5
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 5,
        y: 4.2
      },
      {
        x: 6,
        y: 4.5
      },
      {
        x: 7,
        y: 4.8
      },
      {
        x: 8,
        y: 5
      }
    ]
  },
  options: ['Több tanulás → jobb jegy', 'Órák nő → Jegy csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Több tanulás → jobb jegy',
  keywords: ['pontdiagram', 'összefüggés'],
  solution: 'A pontok trendje: **Több tanulás → jobb jegy**.'
};
