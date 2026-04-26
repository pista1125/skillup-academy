export default {
  id: 'A-A-12',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tetőépítés — háromszög',
  difficulty: 5,
  scenario: 'Egy tetőszerkezet **egyenlő szárú háromszög** alakú. Az alap **6 m**, a kerülete **16 m**.',
  question: 'Milyen hosszú egy **szár**?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 6,
    side: 5,
    unit: 'm'
  },
  options: ['3 m', '4 m', '5 m', '10 m'],
  answer: '5 m',
  keywords: ['kerület', 'egyenletmegoldás', 'háromszög'],
  solution: `**Lépések:**

1. $K = \\text{alap} + 2 \\cdot \\text{szár}$.
2. $16 = 6 + 2s \\Rightarrow 2s = 10$.
3. $s = \\mathbf{5}$ m.`
};
