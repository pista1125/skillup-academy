export default {
  id: 'H-K-33',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Egymást követő áremelések',
  difficulty: 6,
  scenario: 'Egy termék ára először **20%-kal nőtt**, majd **25%-kal nőtt**. Az eredeti ár **8000 Ft**.',
  question: 'Mennyi a **végső ár**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti', formula: '8000', result: '' },
      { label: '+20%', formula: '9600', result: '' },
      { label: '+25%', formula: '?', result: '' }
    ]
  },
  options: ['11 000 Ft', '11 600 Ft', '12 000 Ft', '12 600 Ft'],
  answer: '12 000 Ft',
  keywords: ['százalék', 'összetett'],
  solution: '$8000 \\cdot 1{,}2 \\cdot 1{,}25 = 8000 \\cdot 1{,}5 = \\mathbf{12\\,000}$ Ft.'
};
