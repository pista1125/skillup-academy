export default {
  id: 'S-K-48',
  contentArea: 'S',
  contentSub: '4.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Csoportosított diagram — elemzés',
  difficulty: 6,
  scenario: 'A diagram a **fiúk és lányok** kedvenc sportját mutatja.',
  question: 'Melyik sportot **a fiúk és lányok is közel ugyanannyian** választották?',
  visual: {
    type: 'groupedBar',
    categories: ['Foci', 'Kosár', 'Úszás', 'Tánc'],
    yMax: 15,
    yLabel: 'Tanulók',
    series: [
      {
        name: 'Fiúk',
        color: '#2563eb',
        values: [12, 8, 5, 1]
      },
      {
        name: 'Lányok',
        color: '#ec4899',
        values: [3, 7, 5, 10]
      }
    ]
  },
  options: ['Foci', 'Kosár', 'Úszás', 'Tánc'],
  answer: 'Úszás',
  keywords: ['diagram', 'összehasonlítás'],
  solution: `A **Úszás** oszlopoknál a fiúk és lányok is **5–5** tanulót jelölnek — **egyenlő**.

A többinél jelentős eltérés van.

**A helyes válasz: Úszás.**`
};
