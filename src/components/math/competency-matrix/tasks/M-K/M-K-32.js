export default {
  id: 'M-K-32',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Sorozat — mértani képzés',
  difficulty: 6,
  scenario: 'Egy sorozat első tagja **3**, minden következő az előző **kétszerese**.',
  question: 'Mi a **7. tag**?',
  visual: {
    type: 'sequence',
    items: [3, 6, 12, 24, 48, 96, '?'],
    rule: '×2'
  },
  options: ['96', '144', '192', '256'],
  answer: '192',
  keywords: ['mértani sorozat'],
  solution: `$a_n = 3 \\cdot 2^{n-1}$.

$a_7 = 3 \\cdot 2^6 = 3 \\cdot 64 = \\mathbf{192}$.`
};
