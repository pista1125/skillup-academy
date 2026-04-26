export default {
  id: 'M-A-16',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: '20% kedvezmény — 8500 Ft',
  difficulty: 4,
  scenario: 'Egy termék eredeti ára **8500 Ft**, most **20% kedvezményt** adnak rá.',
  question: 'Mennyibe kerül a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 8500,
    discountPercent: 20,
    currency: 'Ft'
  },
  options: ['6300 Ft', '6800 Ft', '7300 Ft', '7800 Ft'],
  answer: '6800 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `Kedvezmény: $8500 \\cdot \\tfrac{20}{100} = 1700$ Ft.

Fizetendő: $8500 - 1700 = 6800$ Ft.

**A helyes válasz: 6800 Ft.**`
};
