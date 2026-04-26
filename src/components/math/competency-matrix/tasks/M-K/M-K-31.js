export default {
  id: 'M-K-31',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Ismétlődő események — 7. alkalom',
  difficulty: 6,
  scenario: 'Egy busz minden **10 percben** indul, az első **12:30-kor**.',
  question: 'Hánykor indul a **7. busz**?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '12:30',
        label: '1. busz',
        color: '#2563eb'
      },
      {
        t: '13:30',
        label: '7. busz',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['13:30'],
  answer: '13:30',
  keywords: ['időintervallum', 'sorozat'],
  solution: '(7 - 1) × 10 perc = 60 perc. Végső idő: **13:30**.'
};
