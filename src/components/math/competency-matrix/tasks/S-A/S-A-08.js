export default {
  id: 'S-A-08',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Halmazok — nyelvtanulók',
  difficulty: 4,
  scenario: 'Egy osztály 25 tanulója közül **15** tanul **angolt**, **10** tanul **németet**, és **4** tanuló **mindkét** nyelvet tanulja.',
  question: 'Hányan tanulnak **csak angolt** (németet nem)?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Angol',
        color: '#2563eb'
      },
      {
        label: 'Német',
        color: '#dc2626'
      }
    ],
    regions: {
      onlyA: 11,
      onlyB: 6,
      both: 4,
      neither: 4
    },
    universe: 25
  },
  options: ['4', '6', '11', '15'],
  answer: '11',
  keywords: ['Venn-diagram', 'halmazműveletek', 'szitaformula'],
  solution: `**Venn-diagram kiszámolása:**

- Csak angol: $15 - 4 = \\mathbf{11}$
- Csak német: $10 - 4 = 6$
- Mindkettő: $4$
- Egyiket sem: $25 - (11+6+4) = 4$

**A helyes válasz: 11 tanuló.**`
};
