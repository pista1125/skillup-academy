export default {
  id: 'H-K-12',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Magasság (cm) × Tömeg (kg)',
  difficulty: 6,
  scenario: 'A pontdiagram magasság (cm) és tömeg (kg) kapcsolatát mutatja.',
  question: 'Milyen az összefüggés?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Magasság (cm)',
    yLabel: 'Tömeg (kg)',
    xMin: 130,
    xMax: 180,
    yMin: 30,
    yMax: 80,
    points: [
      {
        x: 135,
        y: 35
      },
      {
        x: 145,
        y: 42
      },
      {
        x: 155,
        y: 50
      },
      {
        x: 160,
        y: 55
      },
      {
        x: 170,
        y: 65
      },
      {
        x: 175,
        y: 72
      },
      {
        x: 180,
        y: 78
      }
    ]
  },
  options: ['Magasabb → nehezebb', 'Magasság nő → Tömeg csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Magasabb → nehezebb',
  keywords: ['pontdiagram', 'összefüggés'],
  solution: 'A pontok trendje: **Magasabb → nehezebb**.'
};
