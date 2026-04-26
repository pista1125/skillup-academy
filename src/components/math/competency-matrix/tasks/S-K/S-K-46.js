export default {
  id: 'S-K-46',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Diagram elemzés — igaz állítás',
  difficulty: 6,
  scenario: 'A groupedBar diagram a 6.a és 6.b osztály néhány tantárgyi átlagát mutatja.',
  question: 'Melyik állítás **IGAZ**?',
  visual: {
    type: 'groupedBar',
    categories: ['Matek', 'Magyar', 'Történelem'],
    yMax: 5,
    yLabel: 'Átlag',
    series: [
      {
        name: '6.a',
        color: '#2563eb',
        values: [4.2, 3.8, 4]
      },
      {
        name: '6.b',
        color: '#ef4444',
        values: [3.9, 4.5, 3.8]
      }
    ]
  },
  options: ['A 6.b minden tárgyban jobb.', 'A 6.a matekból jobb, a 6.b magyarból jobb.', 'A két osztály minden tárgyban egyforma.', 'A 6.b matekból jobb, mint a 6.a.'],
  answer: 'A 6.a matekból jobb, a 6.b magyarból jobb.',
  keywords: ['diagram', 'logika', 'összehasonlítás'],
  solution: `**Matek:** 6.a = 4,2 > 6.b = 3,9 → 6.a jobb ✓

**Magyar:** 6.a = 3,8 < 6.b = 4,5 → 6.b jobb ✓

**Történelem:** 6.a = 4,0 > 6.b = 3,8 → 6.a jobb.

A „6.a matekból jobb, 6.b magyarból jobb" **IGAZ**.

**A helyes válasz: „A 6.a matekból jobb, a 6.b magyarból jobb."**`
};
