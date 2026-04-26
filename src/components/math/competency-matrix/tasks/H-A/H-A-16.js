export default {
  id: 'H-A-16',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Áremelés — 15%',
  difficulty: 4,
  scenario: 'Egy kiflit a pékségben **15%-kal** drágított. Az új ára **345 Ft**.',
  question: 'Mennyi volt az **eredeti** ár?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti ár', formula: '100%', result: '?' },
      { label: 'Új ár', formula: '115% = 345 Ft', result: '' }
    ]
  },
  options: ['280 Ft', '300 Ft', '320 Ft', '330 Ft'],
  answer: '300 Ft',
  keywords: ['százalékalap', 'áremelés'],
  solution: '$115\\% = 345$ → $1\\% = 3$. $100\\% = \\mathbf{300}$ Ft.'
};
