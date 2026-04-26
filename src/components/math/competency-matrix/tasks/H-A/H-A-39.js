export default {
  id: 'H-A-39',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Áremelés után leárazás',
  difficulty: 5,
  scenario: 'Egy termék ára **10%-kal drágult**, majd **10%-kal csökkent**. Eredeti ár: **5000 Ft**.',
  question: 'Mennyi a **végső ár**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti', formula: '5000 Ft', result: '' },
      { label: '+10%', formula: '5500', result: '' },
      { label: '−10%', formula: '?', result: '' }
    ]
  },
  options: ['4900 Ft', '4950 Ft', '5000 Ft', '5050 Ft'],
  answer: '4950 Ft',
  keywords: ['százalék', 'összetett'],
  solution: '$5000 \\cdot 1{,}1 \\cdot 0{,}9 = 5000 \\cdot 0{,}99 = \\mathbf{4950}$ Ft.'
};
