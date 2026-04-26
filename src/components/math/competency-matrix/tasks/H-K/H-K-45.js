export default {
  id: 'H-K-45',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kamatos kamat — 3 év',
  difficulty: 7,
  scenario: 'A bank évi **5%** kamatos kamatot fizet. Egy betét **3 év alatt 23 152 Ft** értékűre nő.',
  question: 'Mekkora volt az **eredeti betét**? (kerekíts egészre)',
  visual: {
    type: 'formula',
    formula: 'T_n = T_0 · (1 + p)^n',
    variables: [
      { name: 'T_3', desc: '23 152 Ft' },
      { name: 'p', desc: '0,05' },
      { name: 'n', desc: '3' }
    ],
    example: { eredmény: '?' }
  },
  options: ['18 000', '19 000', '20 000', '21 000'],
  answer: '20 000',
  keywords: ['kamatos kamat', 'egyenlet'],
  solution: '$T_0 = 23\\,152 \\div 1{,}05^3 = 23\\,152 \\div 1{,}157625 \\approx \\mathbf{20\\,000}$ Ft.'
};
