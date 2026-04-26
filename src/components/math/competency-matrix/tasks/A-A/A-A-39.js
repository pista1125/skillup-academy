export default {
  id: 'A-A-39',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kocka felszíne — hálóból',
  difficulty: 3,
  scenario: 'Egy kocka éle **6 cm**.',
  question: 'Mekkora a **teljes felszíne**?',
  visual: {
    type: 'box3d',
    box: {
      l: 6,
      w: 6,
      h: 6
    },
    cubeEdge: 6,
    unit: 'cm'
  },
  options: ['36 cm²', '72 cm²', '216 cm²', '144 cm²'],
  answer: '216 cm²',
  keywords: ['felszín', 'kocka'],
  solution: '$A = 6 \\cdot a^2 = 6 \\cdot 36 = \\mathbf{216}$ cm².'
};
