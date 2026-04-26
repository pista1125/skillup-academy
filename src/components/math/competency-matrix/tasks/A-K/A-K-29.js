export default {
  id: 'A-K-29',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Képkeret — belső négyzettel',
  difficulty: 6,
  scenario: 'Egy **20 cm × 16 cm** képkeretben egy **14 cm × 10 cm** méretű kép található. A kép körüli keret területe?',
  question: 'Mekkora a keret területe?',
  visual: {
    type: 'rectangle',
    widthM: 20,
    heightM: 16,
    label: 'keret',
    fill: '#e0c8ff',
    unit: 'cm'
  },
  options: ['60 cm²', '120 cm²', '180 cm²', '240 cm²'],
  answer: '180 cm²',
  keywords: ['terület', 'különbség'],
  solution: '$T = 20 \\cdot 16 - 14 \\cdot 10 = 320 - 140 = \\mathbf{180}$ cm².'
};
