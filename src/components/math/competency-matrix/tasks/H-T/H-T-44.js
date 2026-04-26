export default {
  id: 'H-T-44',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vitaminadagolás — recept',
  difficulty: 2,
  scenario: 'Egy multivitamin tabletta naponta 3-szor, négy napon át szedendő.',
  question: 'Hány tabletta fogy el **4 nap alatt**?',
  visual: {
    type: 'recipe',
    title: 'Napi adag',
    ingredients: [
      { name: 'Tabletta', amount: '3 db / nap' },
      { name: 'Kezelés időtartama', amount: '4 nap' }
    ]
  },
  options: ['7', '9', '10', '12'],
  answer: '12',
  keywords: ['szorzás', 'adagolás'],
  solution: '$3 \\cdot 4 = 12$ tabletta.'
};
