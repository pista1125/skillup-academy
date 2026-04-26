export default {
  id: 'M-T-09',
  contentArea: 'M',
  contentSub: '1.2.6',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Kerület képlete',
  difficulty: 2,
  scenario: 'A téglalap kerületét a $K = 2 \\cdot (a + b)$ képlettel számoljuk. Egy tanteremben $a = 6$ m, $b = 4$ m.',
  question: 'Mekkora a terem kerülete?',
  visual: {
    type: 'formula',
    formula: 'K = 2 · (a + b)',
    variables: [
      {
        name: 'a',
        desc: 'téglalap egyik oldala (m)'
      },
      {
        name: 'b',
        desc: 'téglalap másik oldala (m)'
      }
    ],
    example: {
      a: 6,
      b: 4
    }
  },
  options: ['10 m', '20 m', '24 m', '48 m'],
  answer: '20 m',
  keywords: ['behelyettesítés', 'kerület'],
  solution: `**Behelyettesítés a képletbe:**

$$K = 2 \\cdot (a + b) = 2 \\cdot (6 + 4) = 2 \\cdot 10 = 20\\ \\text{m}.$$

**A helyes válasz: 20 m.**`
};
