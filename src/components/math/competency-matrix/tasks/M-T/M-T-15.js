export default {
  id: 'M-T-15',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Műveletsor',
  difficulty: 3,
  scenario: 'A matek órán az alábbi kifejezés értékét kell kiszámolni.',
  question: 'Mi az értéke a $12 + 3 \\cdot (8 - 2)$ kifejezésnek?',
  visual: {
    type: 'formula',
    formula: '12 + 3 · (8 − 2)',
    variables: [
      {
        name: '()',
        desc: 'zárójel először'
      },
      {
        name: '·',
        desc: 'szorzás összeadás előtt'
      }
    ]
  },
  options: ['30', '36', '60', '90'],
  answer: '30',
  keywords: ['műveletsor', 'zárójel'],
  solution: `**Műveleti sorrend:**

1. **Zárójel:** $8 - 2 = 6$.
2. **Szorzás:** $3 \\cdot 6 = 18$.
3. **Összeadás:** $12 + 18 = 30$.

**A helyes válasz: 30.**`
};
