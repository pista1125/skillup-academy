export default {
  id: 'H-T-33',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Diagram — szavazatok',
  difficulty: 2,
  scenario: 'A diagram szavazatok adatait mutatja.',
  question: 'Hol a **legnagyobb** érték?',
  visual: {
    type: 'barChart',
    xLabel: '',
    yLabel: '',
    yMin: 0,
    yMax: 28,
    bars: [
      {
        label: 'Piros',
        value: 12,
        color: '#2563eb'
      },
      {
        label: 'Kék',
        value: 18,
        color: '#16a34a'
      },
      {
        label: 'Zöld',
        value: 9,
        color: '#f59e0b'
      },
      {
        label: 'Sárga',
        value: 15,
        color: '#ef4444'
      }
    ]
  },
  options: ['Piros', 'Kék', 'Zöld', 'Sárga'],
  answer: 'Kék',
  keywords: ['oszlopdiagram'],
  solution: 'A legmagasabb: **Kék** (18).'
};
