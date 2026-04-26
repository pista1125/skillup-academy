export default {
  id: 'A-T-48',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Négyszög belső szögei',
  difficulty: 2,
  scenario: 'Egy tetszőleges négyszög belső szögeinek összege állandó.',
  question: 'Mekkora ez az összeg?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 4,
    label: 'négyszög',
    fill: '#ffe8b0',
    unit: 'cm'
  },
  options: ['180°', '270°', '360°', '720°'],
  answer: '360°',
  keywords: ['szög', 'négyszög'],
  solution: 'Egy négyszög belső szögeinek összege $\\mathbf{360°}$ (két háromszögre bontás).'
};
