export default {
  id: 'H-A-26',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 8. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **2**, minden következő **3-vel több**.',
  question: 'Mi a **8.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 2,
        label: '1. sor'
      },
      {
        count: 5,
        label: '2. sor'
      },
      {
        count: 8,
        label: '3. sor'
      },
      {
        count: 11,
        label: '4. sor'
      }
    ]
  },
  options: ['20', '23', '26', '29'],
  answer: '23',
  keywords: ['sorozat'],
  solution: '$a_n = 2 + 3(n-1) = 2 + 3 \\cdot 7 = 23$.'
};
