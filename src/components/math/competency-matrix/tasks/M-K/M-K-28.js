export default {
  id: 'M-K-28',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Áremelés-csökkentés',
  difficulty: 7,
  scenario: 'Egy termék ára **100 Ft**. Először **10%-kal emelik**, majd az új árból **20%-ot levonnak**.',
  question: 'Mennyi a végső ár?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Lépés 1',
        formula: '100 × 1.10',
        result: '110 Ft'
      },
      {
        label: 'Lépés 2',
        formula: '110 × 0.80',
        result: '88 Ft'
      }
    ]
  },
  options: ['78 Ft', '88 Ft', '98 Ft', '100 Ft'],
  answer: '88 Ft',
  keywords: ['százalékszámítás', 'több lépés'],
  solution: `1. lépés: 100 × 1.10 = 110.
2. lépés: 110 × 0.80 = **88**.`
};
