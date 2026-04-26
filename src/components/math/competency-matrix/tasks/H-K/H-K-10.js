export default {
  id: 'H-K-10',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Edzés/hét (óra) × 100m idő (mp)',
  difficulty: 6,
  scenario: 'A pontdiagram edzés/hét (óra) és 100m idő (mp) kapcsolatát mutatja.',
  question: 'Milyen az összefüggés?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Edzés/hét (óra)',
    yLabel: '100m idő (mp)',
    xMin: 0,
    xMax: 10,
    yMin: 12,
    yMax: 18,
    points: [
      {
        x: 1,
        y: 17.5
      },
      {
        x: 2,
        y: 16.8
      },
      {
        x: 3,
        y: 15.8
      },
      {
        x: 4,
        y: 15.2
      },
      {
        x: 5,
        y: 14.9
      },
      {
        x: 6,
        y: 14.2
      },
      {
        x: 7,
        y: 13.8
      },
      {
        x: 8,
        y: 13.5
      },
      {
        x: 9,
        y: 13
      }
    ]
  },
  options: ['Több edzés → gyorsabb idő', 'Edzés/hét nő → 100m csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Több edzés → gyorsabb idő',
  keywords: ['pontdiagram', 'összefüggés'],
  solution: 'A pontok trendje: **Több edzés → gyorsabb idő**.'
};
