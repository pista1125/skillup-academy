export default {
  id: 'M-A-18',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: '10% kedvezmény — 15 000 Ft',
  difficulty: 4,
  scenario: 'Egy termék eredeti ára **15 000 Ft**, most **10% kedvezményt** adnak rá.',
  question: 'Mennyibe kerül a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 15000,
    discountPercent: 10,
    currency: 'Ft'
  },
  options: ['13 000 Ft', '13 500 Ft', '14 000 Ft', '14 500 Ft'],
  answer: '13 500 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `Kedvezmény: $15000 \\cdot \\tfrac{10}{100} = 1500$ Ft.

Fizetendő: $15000 - 1500 = 13500$ Ft.

**A helyes válasz: 13 500 Ft.**`
};
