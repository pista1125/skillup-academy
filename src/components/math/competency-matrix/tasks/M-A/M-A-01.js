export default {
  id: 'M-A-01',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kedvezményes ár',
  difficulty: 4,
  scenario: 'Egy kabát eredeti ára 12 500 Ft. A boltban 20% kedvezményt adnak.',
  question: 'Mennyibe kerül a kabát a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 12500,
    discountPercent: 20,
    currency: 'Ft'
  },
  options: ['9 500 Ft', '10 000 Ft', '10 500 Ft', '11 000 Ft'],
  answer: '10 000 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `**Kedvezményes ár számítása:**

1. A kedvezmény összege: $12\\,500 \\cdot \\tfrac{20}{100} = 2\\,500$ Ft.
2. A fizetendő ár: $12\\,500 - 2\\,500 = 10\\,000$ Ft.

Ellenőrzés: a fizetendő a teljes ár 80%-a, $12\\,500 \\cdot 0{,}8 = 10\\,000$ Ft. ✓

**A helyes válasz: 10 000 Ft.**`
};
