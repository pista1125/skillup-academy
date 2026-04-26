export default {
  id: 'A-K-47',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Fél akvárium',
  difficulty: 6,
  scenario: 'Egy téglatest akvárium **50 cm × 30 cm × 40 cm**. **Félig** van töltve vízzel.',
  question: 'Hány **liter** víz van benne?',
  visual: {
    type: 'box3d',
    box: {
      l: 50,
      w: 30,
      h: 40
    },
    cubeEdge: 10,
    unit: 'cm'
  },
  options: ['15 l', '30 l', '60 l', '120 l'],
  answer: '30 l',
  keywords: ['térfogat', 'átváltás'],
  solution: `$V = 50 \\cdot 30 \\cdot 40 = 60\\,000$ cm³ $= 60$ l.

Fele: $\\mathbf{30}$ l.`
};
