export default {
  id: 'S-K-21',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két osztály közös átlaga',
  difficulty: 6,
  scenario: 'A 6.a (20 fő) átlaga matekból **4,0**, a 6.b (30 fő) átlaga **3,5**.',
  question: 'Mennyi a **közös átlag**?',
  visual: {
    type: 'groupedBar',
    categories: ['Matek'],
    yMax: 5,
    yLabel: 'Átlag',
    series: [
      {
        name: '6.a',
        color: '#2563eb',
        values: [4]
      },
      {
        name: '6.b',
        color: '#ef4444',
        values: [3.5]
      }
    ]
  },
  options: ['3,70', '3,75', '3,80', '3,85'],
  answer: '3,70',
  keywords: ['súlyozott átlag'],
  solution: `**Teljes pontösszeg:** $20 \\cdot 4{,}0 + 30 \\cdot 3{,}5 = 80 + 105 = 185$.

**Összes tanuló:** 50.

$$\\bar{x} = \\dfrac{185}{50} = \\mathbf{3{,}70}$$

**A helyes válasz: 3,70.**`
};
