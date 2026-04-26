export default {
  id: 'H-A-27',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 6. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **4**, minden következő **4-vel több**.',
  question: 'Mi a **6.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 4,
        label: '1. sor'
      },
      {
        count: 8,
        label: '2. sor'
      },
      {
        count: 12,
        label: '3. sor'
      },
      {
        count: 16,
        label: '4. sor'
      }
    ]
  },
  options: ['20', '24', '28', '32'],
  answer: '24',
  keywords: ['sorozat'],
  solution: '$a_n = 4 + 4(n-1) = 4 + 4 \\cdot 5 = 24$.'
};
