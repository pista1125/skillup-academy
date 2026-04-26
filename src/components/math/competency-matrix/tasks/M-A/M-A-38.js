export default {
  id: 'M-A-38',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Városnézés — jegyár emelés',
  difficulty: 4,
  scenario: 'Egy városnéző busz jegye **2500 Ft** volt, majd **8%-kal emelkedett**.',
  question: 'Mennyi lett az **új jegyár**?',
  visual: {
    type: 'priceTag',
    original: 2500,
    discountPercent: -8,
    currency: 'Ft',
    label: 'Áremelkedés'
  },
  options: ['2580 Ft', '2700 Ft', '2780 Ft', '2820 Ft'],
  answer: '2700 Ft',
  keywords: ['százalékos emelés', 'városnézés'],
  solution: 'Emelés: $2500 \\cdot 0{,}08 = 200$ Ft. Új ár: $2500 + 200 = \\mathbf{2700}$ Ft.'
};
