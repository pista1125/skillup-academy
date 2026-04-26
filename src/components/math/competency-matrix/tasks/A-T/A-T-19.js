export default {
  id: 'A-T-19',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglatest térfogata — doboz',
  difficulty: 2,
  scenario: 'Egy téglatest alakú doboz méretei: **4 cm × 3 cm × 2 cm**.',
  question: 'Mekkora a doboz **térfogata**?',
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
  options: ['9 cm³', '12 cm³', '24 cm³', '48 cm³'],
  answer: '24 cm³',
  keywords: ['térfogat', 'téglatest'],
  solution: `**Lépések:**

1. Képlet: $V = a \\cdot b \\cdot c$.
2. $V = 4 \\cdot 3 \\cdot 2 = \\mathbf{24}$ cm³.`
};
