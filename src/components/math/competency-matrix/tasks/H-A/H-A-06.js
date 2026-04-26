export default {
  id: 'H-A-06',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kabát leárazása',
  difficulty: 4,
  scenario: 'Egy kabát eredeti ára **12 000 Ft**. A boltban **25% kedvezménnyel** árulják.',
  question: 'Mennyibe kerül a kabát a **kedvezmény után**?',
  visual: {
    type: 'priceTag',
    items: [
      {
        label: 'Kabát (eredeti)',
        price: '12 000 Ft'
      },
      {
        label: 'Kedvezmény',
        price: '-25%'
      }
    ]
  },
  options: ['3 000 Ft', '8 000 Ft', '9 000 Ft', '9 600 Ft'],
  answer: '9 000 Ft',
  keywords: ['százalék', 'kedvezmény', 'alkalmazás'],
  solution: `**Százalékszámítás:**

Kedvezmény: $12\\,000 \\cdot 0{,}25 = 3\\,000$ Ft.

Új ár: $12\\,000 - 3\\,000 = \\mathbf{9\\,000}$ Ft.

Más módon: $12\\,000 \\cdot 0{,}75 = 9\\,000$ Ft.`
};
