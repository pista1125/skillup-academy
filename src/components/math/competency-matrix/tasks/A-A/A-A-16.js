export default {
  id: 'A-A-16',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Akvárium térfogata',
  difficulty: 3,
  scenario: 'Egy téglatest akvárium mérete **60 cm × 30 cm × 40 cm**.',
  question: 'Mennyi **víz** fér bele, ha telitöltjük (literben)?',
  visual: {
    type: 'box3d',
    box: {
      l: 60,
      w: 30,
      h: 40
    },
    cubeEdge: 10,
    unit: 'cm'
  },
  options: ['36 l', '48 l', '72 l', '90 l'],
  answer: '72 l',
  keywords: ['térfogat', 'átváltás'],
  solution: '$V = 60 \\cdot 30 \\cdot 40 = 72\\,000$ cm³ $= \\mathbf{72}$ l.'
};
