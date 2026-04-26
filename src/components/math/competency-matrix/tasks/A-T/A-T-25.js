export default {
  id: 'A-T-25',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Négyzet szöge',
  difficulty: 1,
  scenario: 'Egy négyzet minden szöge egyenlő.',
  question: 'Mekkora egy szöge?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 6,
    label: 'négyzet',
    fill: '#ffe8b0',
    unit: 'cm'
  },
  options: ['45°', '60°', '90°', '120°'],
  answer: '90°',
  keywords: ['szög', 'négyzet'],
  solution: 'A négyzet **derékszögű** sokszög, minden szöge $\\mathbf{90°}$.'
};
