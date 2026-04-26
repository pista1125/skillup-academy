export default {
  id: 'M-T-49',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Kerekítés — százasokra',
  difficulty: 2,
  scenario: 'A fesztiválon **7 482** látogató vett részt.',
  question: 'Mennyi ez **százasokra** kerekítve?',
  visual: {
    type: 'formula',
    formula: '7482 ≈ ?',
    variables: [],
    example: {}
  },
  options: ['7400', '7480', '7500', '7000'],
  answer: '7500',
  keywords: ['kerekítés'],
  solution: 'A tízesek helyén 8 áll (≥5) → felfelé kerekítünk. $7482 \\approx \\mathbf{7500}$.'
};
