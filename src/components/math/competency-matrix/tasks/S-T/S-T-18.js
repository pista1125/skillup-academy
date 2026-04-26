export default {
  id: 'S-T-18',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Félévi jegyek eloszlása',
  difficulty: 2,
  scenario: 'Egy osztályban a matematika félévi jegyek eloszlását oszlopdiagram mutatja.',
  question: 'Hány tanuló kapott **ötöst**?',
  visual: {
    type: 'barChart',
    xLabel: 'Jegy',
    yLabel: 'Tanulók száma',
    yMin: 0,
    yMax: 10,
    bars: [
      { label: '1', value: 1, color: '#ef4444' },
      { label: '2', value: 2, color: '#f97316' },
      { label: '3', value: 6, color: '#eab308' },
      { label: '4', value: 8, color: '#84cc16' },
      { label: '5', value: 5, color: '#22c55e' }
    ]
  },
  options: ['3', '5', '6', '8'],
  answer: '5',
  keywords: ['oszlopdiagram', 'osztályzat'],
  solution: `**Az 5-ös jegy oszlopa 5 tanulót mutat.**

**A helyes válasz: 5.**`
};
