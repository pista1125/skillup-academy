export default {
  id: 'H-A-19',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'ÁFA — nettó ár',
  difficulty: 4,
  scenario: 'Egy termék ára ÁFA-val **25 400 Ft**. Az ÁFA **27%**.',
  question: 'Mennyi a **nettó ár**? (kerekíts egészre)',
  visual: {
    type: 'formula',
    formula: 'bruttó = nettó · 1,27',
    variables: [
      { name: 'bruttó', desc: '25 400 Ft' }
    ],
    example: { nettó: '?' }
  },
  options: ['18 500 Ft', '20 000 Ft', '21 500 Ft', '24 000 Ft'],
  answer: '20 000 Ft',
  keywords: ['százalékalap', 'ÁFA'],
  solution: '$25\\,400 \\div 1{,}27 = \\mathbf{20\\,000}$ Ft.'
};
