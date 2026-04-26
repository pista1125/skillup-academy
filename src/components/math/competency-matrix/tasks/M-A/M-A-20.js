export default {
  id: 'M-A-20',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Bank — kamat 1 évre',
  difficulty: 4,
  scenario: 'A bankban **180 000 Ft**-ot helyezel el **1 évre**, a kamat **4%**.',
  question: 'Mennyi **kamatot kapsz** 1 év múlva?',
  visual: {
    type: 'priceTag',
    original: 180000,
    discountPercent: 4,
    currency: 'Ft',
    label: 'Tőke és kamat'
  },
  options: ['4800 Ft', '6200 Ft', '7200 Ft', '7800 Ft'],
  answer: '7200 Ft',
  keywords: ['százalékszámítás', 'kamat', 'bank'],
  solution: '$180000 \\cdot \\tfrac{4}{100} = 7200$ Ft kamat.'
};
