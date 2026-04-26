export default {
  id: 'M-K-27',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Áremelés-csökkentés',
  difficulty: 7,
  scenario: 'Egy termék ára **80 Ft**. Először **25%-kal emelik**, majd az új árból **30%-ot levonnak**.',
  question: 'Mennyi a végső ár?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Lépés 1',
        formula: '80 × 1.25',
        result: '100 Ft'
      },
      {
        label: 'Lépés 2',
        formula: '100 × 0.70',
        result: '70 Ft'
      }
    ]
  },
  options: ['60 Ft', '70 Ft', '80 Ft', '80 Ft'],
  answer: '70 Ft',
  keywords: ['százalékszámítás', 'több lépés'],
  solution: `1. lépés: 80 × 1.25 = 100.
2. lépés: 100 × 0.70 = **70**.`
};
