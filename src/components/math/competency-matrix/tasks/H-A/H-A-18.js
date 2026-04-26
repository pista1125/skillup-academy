export default {
  id: 'H-A-18',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Leárazás — 30% kedvezmény',
  difficulty: 4,
  scenario: 'Egy pulóvert **30%-os** kedvezménnyel árulnak, az engedmény összege **1800 Ft**.',
  question: 'Mennyi az **eredeti ár**?',
  visual: {
    type: 'priceTag',
    items: [
      { name: 'Kedvezmény', price: '30%' },
      { name: 'Levont összeg', price: '1800 Ft' },
      { name: 'Eredeti ár', price: '?' }
    ]
  },
  options: ['5000 Ft', '6000 Ft', '7200 Ft', '9000 Ft'],
  answer: '6000 Ft',
  keywords: ['százalékalap', 'leárazás'],
  solution: '$30\\% = 1800$ → $1\\% = 60$. $100\\% = \\mathbf{6000}$ Ft.'
};
