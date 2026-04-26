export default {
  id: 'H-T-37',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Osztálykirándulás — buszok',
  difficulty: 2,
  scenario: 'Három iskolai busz utaslétszámát piktogramon mutatjuk (egy figura = 5 fő).',
  question: 'Hány tanuló utazott a **B busszal**?',
  visual: {
    type: 'pictogram',
    unit: 5,
    unitLabel: 'fő',
    rows: [
      { label: 'A busz', count: 6 },
      { label: 'B busz', count: 9 },
      { label: 'C busz', count: 7 }
    ]
  },
  options: ['35', '40', '45', '50'],
  answer: '45',
  keywords: ['piktogram', 'leolvasás'],
  solution: '9 figura × 5 fő = **45** tanuló.'
};
