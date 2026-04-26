export default {
  id: 'H-K-26',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Páros számok összege — 1-100',
  difficulty: 6,
  scenario: 'Számítsuk ki az első **50 páros** pozitív egész szám összegét: $2 + 4 + 6 + \\dots + 100$.',
  question: 'Mennyi az összeg?',
  visual: {
    type: 'sequence',
    elements: ['2', '4', '6', '...', '98', '100']
  },
  options: ['2450', '2500', '2550', '5050'],
  answer: '2550',
  keywords: ['számtani sorozat', 'összeg'],
  solution: '$S = \\dfrac{(2+100) \\cdot 50}{2} = \\mathbf{2550}$.'
};
