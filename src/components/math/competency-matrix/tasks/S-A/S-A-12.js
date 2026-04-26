export default {
  id: 'S-A-12',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Logika — ÉS/VAGY műveletek',
  difficulty: 3,
  scenario: `Tekintsd az alábbi állításokat egy **12-es** számról:

- $p$: "12 páros szám."
- $q$: "12 prímszám."`,
  question: 'Melyik **összetett állítás IGAZ**?',
  visual: {
    type: 'table',
    caption: 'Logikai értékek',
    headers: ['Állítás', 'Érték'],
    rows: [
      ['p: 12 páros', 'igaz'],
      ['q: 12 prím', 'hamis']
    ]
  },
  options: ['$p \\text{ ÉS } q$', '$p \\text{ VAGY } q$', 'NEM $p$', '$q \\text{ ÉS NEM } p$'],
  answer: '$p \\text{ VAGY } q$',
  keywords: ['logikai műveletek', 'konjunkció', 'diszjunkció', 'negáció'],
  solution: `**Logikai műveletek:**

Mivel $p =$ **igaz**, $q =$ **hamis**:

- $p \\text{ ÉS } q$ → igaz ÉS hamis = **hamis**
- $p \\text{ VAGY } q$ → igaz VAGY hamis = **igaz** ✓
- NEM $p$ → **hamis**
- $q \\text{ ÉS NEM } p$ → hamis ÉS hamis = **hamis**

**A helyes válasz: $p \\text{ VAGY } q$.**`
};
