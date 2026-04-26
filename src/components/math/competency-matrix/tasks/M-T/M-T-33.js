export default {
  id: 'M-T-33',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Téglalap területe — szoba',
  difficulty: 2,
  scenario: 'Egy téglalap alakú szoba **7 m hosszú** és **4 m széles**.',
  question: 'Mekkora a szoba **alapterülete**?',
  visual: {
    type: 'rectangle',
    width: 7,
    height: 4,
    unit: 'm',
    label: 'Szoba'
  },
  options: ['11 m²', '22 m²', '28 m²', '32 m²'],
  answer: '28 m²',
  keywords: ['terület', 'téglalap'],
  solution: '$T = 7 \\cdot 4 = \\mathbf{28}$ m².'
};
