export default {
  id: 'H-T-32',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Diagram — matek dolgozat',
  difficulty: 2,
  scenario: 'A diagram matek dolgozat adatait mutatja.',
  question: 'Hol a **legnagyobb** érték?',
  visual: {
    type: 'barChart',
    xLabel: '',
    yLabel: '',
    yMin: 0,
    yMax: 104,
    bars: [
      {
        label: 'Anna',
        value: 82,
        color: '#2563eb'
      },
      {
        label: 'Béla',
        value: 94,
        color: '#16a34a'
      },
      {
        label: 'Cili',
        value: 70,
        color: '#f59e0b'
      },
      {
        label: 'Dani',
        value: 88,
        color: '#ef4444'
      },
      {
        label: 'Éva',
        value: 78,
        color: '#8b5cf6'
      }
    ]
  },
  options: ['Anna', 'Béla', 'Cili', 'Dani', 'Éva'],
  answer: 'Béla',
  keywords: ['oszlopdiagram'],
  solution: 'A legmagasabb: **Béla** (94).'
};
