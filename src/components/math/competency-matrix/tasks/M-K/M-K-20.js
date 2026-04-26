export default {
  id: 'M-K-20',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Egyenlet — testvérek kora',
  difficulty: 6,
  scenario: 'Anna most **8 éves**, testvére Bence **4 éves**. Minden évben mindketten 1 évet öregednek.',
  question: 'Hány év múlva lesz Anna kora **Bence korának 1,5-szerese**?',
  visual: {
    type: 'formula',
    formula: '8 + x = 1.5 · (4 + x)',
    variables: [{ name: 'x', desc: 'eltelt évek' }]
  },
  options: ['2', '4', '6', '8'],
  answer: '4',
  keywords: ['egyenlet', 'életkor'],
  solution: `$8 + x = 1{,}5 \\cdot (4 + x)$

$8 + x = 6 + 1{,}5x$

$2 = 0{,}5x \\Rightarrow x = \\mathbf{4}$ év.`
};
