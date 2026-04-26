export default {
  id: 'M-A-32',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kávéfogyasztás — iroda',
  difficulty: 4,
  scenario: 'Egy irodában **napi 18 kávét** főznek, egy kávé **12 g** kávéport használ. A doboz kávé **750 g**.',
  question: 'Hány **napra elég** egy doboz kávé?',
  visual: {
    type: 'formula',
    formula: '750 g / (18 × 12 g) = ?',
    variables: []
  },
  options: ['2 nap', '3 nap', '4 nap', '5 nap'],
  answer: '3 nap',
  keywords: ['osztás', 'mértékegység'],
  solution: `Napi fogyasztás: $18 \\cdot 12 = 216$ g.

$750 / 216 \\approx 3{,}47$. **3 teljes napra elég.**`
};
