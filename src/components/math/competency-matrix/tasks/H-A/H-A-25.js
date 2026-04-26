export default {
  id: 'H-A-25',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 10. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **1**, minden következő **2-vel több**.',
  question: 'Mi a **10.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 1,
        label: '1. sor'
      },
      {
        count: 3,
        label: '2. sor'
      },
      {
        count: 5,
        label: '3. sor'
      },
      {
        count: 7,
        label: '4. sor'
      }
    ]
  },
  options: ['17', '19', '21', '23'],
  answer: '19',
  keywords: ['sorozat'],
  solution: '$a_n = 1 + 2(n-1) = 1 + 2 \\cdot 9 = 19$.'
};
