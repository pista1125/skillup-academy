export default {
  id: 'A-K-41',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Raktár — dobozok',
  difficulty: 7,
  scenario: 'Egy **6 m × 4 m × 3 m** raktárba **1 m × 1 m × 1 m**-es kockákat pakolunk. Egy sor 1 m magas, sorokat egymás fölé is tehetünk.',
  question: 'Hány kocka fér be (**maximum**)?',
  visual: {
    type: 'box3d',
    box: {
      l: 6,
      w: 4,
      h: 3
    },
    cubeEdge: 1,
    unit: 'm'
  },
  answer: '72',
  keywords: ['térfogat', 'raktár'],
  solution: '$6 \\cdot 4 \\cdot 3 = \\mathbf{72}$ kocka.'
};
