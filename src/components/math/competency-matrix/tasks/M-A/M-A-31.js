export default {
  id: 'M-A-31',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Medence feltöltése — 3.6 m³',
  difficulty: 4,
  scenario: 'Egy medence térfogata **3,6 m³**. A csapból **2 liter/perc** folyik.',
  question: 'Hány óra alatt telik meg?',
  visual: {
    type: 'pool',
    volumeM3: 3.6,
    flowLmin: 2
  },
  options: ['20 óra', '30 óra', '40 óra', '60 óra'],
  answer: '30 óra',
  keywords: ['mértékegység-átváltás', 'térfogat'],
  solution: '3.6 m³ = 3600 L. Perc: $\\dfrac{3600}{2} = 1800$. Óra: $\\dfrac{1800}{60} = 30$.'
};
