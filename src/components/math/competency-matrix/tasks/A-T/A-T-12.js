export default {
  id: 'A-T-12',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Kocka térfogata',
  difficulty: 2,
  scenario: 'Egy kocka alakú ajándékdoboz éle **5 cm**.',
  question: 'Mekkora a doboz **térfogata**?',
  visual: {
    type: 'box3d',
    box: {
      l: 5,
      w: 5,
      h: 5
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['15 cm³', '25 cm³', '75 cm³', '125 cm³'],
  answer: '125 cm³',
  keywords: ['térfogat', 'kocka'],
  solution: `**Lépések:**

1. Képlet: $V = a^3$.
2. $V = 5^3 = 5 \\cdot 5 \\cdot 5$.
3. Eredmény: $V = \\mathbf{125}$ cm³.`
};
