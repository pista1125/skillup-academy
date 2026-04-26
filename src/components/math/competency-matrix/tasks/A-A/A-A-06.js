export default {
  id: 'A-A-06',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Festés — fal területe',
  difficulty: 3,
  scenario: 'Egy szoba falának mérete **4 m × 3 m**. A falon egy **2 m × 1 m**-es ablak van, amelyet **nem** kell festeni.',
  question: 'Mekkora felületet kell **befesteni**?',
  visual: {
    type: 'rectangle',
    widthM: 4,
    heightM: 3,
    label: 'fal',
    fill: '#e8d8a0',
    unit: 'm'
  },
  options: ['8 m²', '10 m²', '12 m²', '14 m²'],
  answer: '10 m²',
  keywords: ['terület', 'kivonás', 'festés'],
  solution: `**Lépések:**

1. Fal területe: $4 \\cdot 3 = 12$ m².
2. Ablak területe: $2 \\cdot 1 = 2$ m².
3. Festendő felület: $12 - 2 = \\mathbf{10}$ m².`
};
