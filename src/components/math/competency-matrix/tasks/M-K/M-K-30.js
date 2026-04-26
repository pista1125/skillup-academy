export default {
  id: 'M-K-30',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Ismétlődő események — 5. alkalom',
  difficulty: 6,
  scenario: 'Egy busz minden **8 percben** indul, az első **18:00-kor**.',
  question: 'Hánykor indul a **5. busz**?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '18:00',
        label: '1. busz',
        color: '#2563eb'
      },
      {
        t: '18:32',
        label: '5. busz',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['18:32'],
  answer: '18:32',
  keywords: ['időintervallum', 'sorozat'],
  solution: '(5 - 1) × 8 perc = 32 perc. Végső idő: **18:32**.'
};
