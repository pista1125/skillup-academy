export default {
  id: 'M-A-17',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: '25% kedvezmény — 12 000 Ft',
  difficulty: 4,
  scenario: 'Egy termék eredeti ára **12 000 Ft**, most **25% kedvezményt** adnak rá.',
  question: 'Mennyibe kerül a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 12000,
    discountPercent: 25,
    currency: 'Ft'
  },
  options: ['8500 Ft', '9000 Ft', '9500 Ft', '10 000 Ft'],
  answer: '9000 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `Kedvezmény: $12000 \\cdot \\tfrac{25}{100} = 3000$ Ft.

Fizetendő: $12000 - 3000 = 9000$ Ft.

**A helyes válasz: 9000 Ft.**`
};
