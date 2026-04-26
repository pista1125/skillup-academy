export default {
  id: 'A-T-33',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Kocka felszíne — játékkocka',
  difficulty: 2,
  scenario: 'Egy kocka alakú dobókocka éle **2 cm**.',
  question: 'Mekkora a **felszíne**?',
  visual: {
    type: 'box3d',
    box: {
      l: 2,
      w: 2,
      h: 2
    },
    cubeEdge: 2,
    unit: 'cm'
  },
  options: ['8 cm²', '12 cm²', '24 cm²', '48 cm²'],
  answer: '24 cm²',
  keywords: ['felszín', 'kocka'],
  solution: 'A kockának 6 egybevágó lapja van. Egy lap területe $2 \\cdot 2 = 4$ cm². Felszín: $6 \\cdot 4 = \\mathbf{24}$ cm².'
};
