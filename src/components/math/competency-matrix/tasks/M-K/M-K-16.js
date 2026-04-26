export default {
  id: 'M-K-16',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Bank — kamatos kamat 2 évre',
  difficulty: 7,
  scenario: '**Tamás 200 000 Ft-ot** helyez el a bankban **évi 5% kamatos kamatra**. Nem vesz ki semmit.',
  question: 'Mennyi lesz a számláján **2 év múlva**?',
  visual: {
    type: 'comparison',
    items: [
      { label: '1. év vége', formula: '200000 × 1.05', result: '210 000 Ft' },
      { label: '2. év vége', formula: '210000 × 1.05', result: '220 500 Ft' }
    ]
  },
  options: ['220 000 Ft', '220 500 Ft', '221 000 Ft', '230 000 Ft'],
  answer: '220 500 Ft',
  keywords: ['kamatos kamat', 'bank'],
  solution: `1. év: $200000 \\cdot 1{,}05 = 210\\,000$ Ft.

2. év: $210000 \\cdot 1{,}05 = \\mathbf{220\\,500}$ Ft.`
};
