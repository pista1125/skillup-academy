export default {
  id: 'A-A-33',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Ajándékcsomag borítása',
  difficulty: 5,
  scenario: 'Egy **téglatest** ajándékdoboz mérete **20 cm × 10 cm × 5 cm**. A teljes felületét csomagolópapírral borítjuk.',
  question: 'Mekkora csomagolópapír-felület kell?',
  visual: {
    type: 'box3d',
    box: {
      l: 20,
      w: 10,
      h: 5
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['350 cm²', '500 cm²', '700 cm²', '1000 cm²'],
  answer: '700 cm²',
  keywords: ['felszín', 'téglatest'],
  solution: `$A = 2(20 \\cdot 10 + 10 \\cdot 5 + 5 \\cdot 20)$

$A = 2(200 + 50 + 100) = 2 \\cdot 350 = \\mathbf{700}$ cm².`
};
