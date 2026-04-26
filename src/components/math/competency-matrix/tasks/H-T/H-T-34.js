export default {
  id: 'H-T-34',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Diagram — eladások',
  difficulty: 2,
  scenario: 'A diagram eladások adatait mutatja.',
  question: 'Hol a **legnagyobb** érték?',
  visual: {
    type: 'barChart',
    xLabel: '',
    yLabel: '',
    yMin: 0,
    yMax: 50,
    bars: [
      {
        label: 'Jan',
        value: 30,
        color: '#2563eb'
      },
      {
        label: 'Feb',
        value: 25,
        color: '#16a34a'
      },
      {
        label: 'Már',
        value: 35,
        color: '#f59e0b'
      },
      {
        label: 'Ápr',
        value: 40,
        color: '#ef4444'
      },
      {
        label: 'Máj',
        value: 28,
        color: '#8b5cf6'
      }
    ]
  },
  options: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj'],
  answer: 'Ápr',
  keywords: ['oszlopdiagram'],
  solution: 'A legmagasabb: **Ápr** (40).'
};
