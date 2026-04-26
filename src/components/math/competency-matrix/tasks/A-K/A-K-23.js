export default {
  id: 'A-K-23',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Dobozba pakolás — több réteg',
  difficulty: 6,
  scenario: 'Egy **20 × 15 × 10 cm**-es dobozba **5 cm** élű kis kockákat rakunk.',
  question: 'Hány kis kocka fér el?',
  visual: {
    type: 'box3d',
    box: {
      l: 20,
      w: 15,
      h: 10
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['12', '18', '24', '30'],
  answer: '24',
  keywords: ['csomagolás', 'térfogat'],
  solution: '$20/5 \\cdot 15/5 \\cdot 10/5 = 4 \\cdot 3 \\cdot 2 = \\mathbf{24}$ db.'
};
