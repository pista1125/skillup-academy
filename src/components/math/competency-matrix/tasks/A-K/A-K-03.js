export default {
  id: 'A-K-03',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Kocka festése',
  difficulty: 7,
  scenario: 'Egy **3 × 3 × 3-as** nagy kockát úgy raktunk össze **1 cm³-es** kis kockákból, hogy a nagy kockát kívülről befestettük. Ezután szétszedtük.',
  question: 'Hány olyan kis kocka van, amelynek **pontosan 2 oldala** festett?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'edge'
  },
  options: ['4', '8', '12', '24'],
  answer: '12',
  keywords: ['test paraméterei', 'kombinatorika', 'térbeli gondolkodás'],
  solution: `**Analízis egy 3×3×3-as kocka festett kis kockáin:**

- **3 oldala festett:** a 8 sarokkocka.
- **2 oldala festett:** az élek közepén található kockák — minden él közepén 1 kocka, a kockának 12 éle van → **12**.
- **1 oldala festett:** minden lap közepén 1 kocka × 6 lap = 6.
- **0 oldala festett:** a legbelső, 1 db.

Ellenőrzés: $8+12+6+1 = 27$ ✓

**A helyes válasz: 12.**`
};
