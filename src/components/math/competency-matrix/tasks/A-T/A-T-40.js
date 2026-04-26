export default {
  id: 'A-T-40',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglatest felszíne — kicsi doboz',
  difficulty: 3,
  scenario: 'Egy téglatest doboz méretei **2 cm × 3 cm × 4 cm**.',
  question: 'Mekkora a **felszíne**?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 1,
    unit: 'cm'
  },
  options: ['24 cm²', '26 cm²', '52 cm²', '72 cm²'],
  answer: '52 cm²',
  keywords: ['felszín', 'téglatest'],
  solution: '$A = 2(ab + bc + ca) = 2(2\\cdot3 + 3\\cdot4 + 4\\cdot2) = 2(6+12+8) = 2\\cdot26 = \\mathbf{52}$ cm².'
};
