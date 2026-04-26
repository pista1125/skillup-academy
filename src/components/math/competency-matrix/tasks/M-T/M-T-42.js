export default {
  id: 'M-T-42',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Oszthatóság: 126 / 3?',
  difficulty: 2,
  scenario: 'Adott a **126** szám.',
  question: '**Osztható-e** 3-mal?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Szám',
        formula: '126',
        result: ''
      },
      {
        label: 'Osztó',
        formula: '3',
        result: ''
      }
    ]
  },
  options: ['Igen', 'Nem'],
  answer: 'Igen',
  keywords: ['oszthatóság'],
  solution: '$126 \\div 3 = 42$, **maradék nélkül** → **Igen**.'
};
