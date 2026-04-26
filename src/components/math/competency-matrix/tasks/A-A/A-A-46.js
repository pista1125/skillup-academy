export default {
  id: 'A-A-46',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medence térfogata',
  difficulty: 4,
  scenario: 'Egy téglatest alakú medence **4 m × 3 m × 1{,}5 m**.',
  question: 'Hány **liter** víz fér bele? ($1\\ m^3 = 1000\\ l$)',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 1.5
    },
    cubeEdge: 1,
    unit: 'm'
  },
  options: ['9000 l', '12000 l', '18000 l', '24000 l'],
  answer: '18000 l',
  keywords: ['térfogat', 'átváltás'],
  solution: '$V = 4 \\cdot 3 \\cdot 1{,}5 = 18$ m³ $= \\mathbf{18000}$ l.'
};
