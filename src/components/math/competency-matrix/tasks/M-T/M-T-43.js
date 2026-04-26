export default {
  id: 'M-T-43',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Oszthatóság: 205 / 5?',
  difficulty: 2,
  scenario: 'Adott a **205** szám.',
  question: '**Osztható-e** 5-mal?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Szám',
        formula: '205',
        result: ''
      },
      {
        label: 'Osztó',
        formula: '5',
        result: ''
      }
    ]
  },
  options: ['Igen', 'Nem'],
  answer: 'Igen',
  keywords: ['oszthatóság'],
  solution: '$205 \\div 5 = 41$, **maradék nélkül** → **Igen**.'
};
