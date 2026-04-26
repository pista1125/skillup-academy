export default {
  id: 'H-A-28',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 10. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **3**, minden következő **5-vel több**.',
  question: 'Mi a **10.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 3,
        label: '1. sor'
      },
      {
        count: 8,
        label: '2. sor'
      },
      {
        count: 13,
        label: '3. sor'
      },
      {
        count: 18,
        label: '4. sor'
      }
    ]
  },
  options: ['43', '48', '53', '58'],
  answer: '48',
  keywords: ['sorozat'],
  solution: '$a_n = 3 + 5(n-1) = 3 + 5 \\cdot 9 = 48$.'
};
