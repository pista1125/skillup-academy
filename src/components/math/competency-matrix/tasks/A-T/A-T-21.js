export default {
  id: 'A-T-21',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglalap kerülete — virágágyás',
  difficulty: 1,
  scenario: 'Egy virágágyás **9 m** hosszú és **3 m** széles.',
  question: 'Mekkora az ágyás **kerülete**?',
  visual: {
    type: 'rectangle',
    widthM: 9,
    heightM: 3,
    label: 'virág',
    fill: '#ffd0d0',
    unit: 'm'
  },
  options: ['12 m', '18 m', '24 m', '27 m'],
  answer: '24 m',
  keywords: ['kerület', 'téglalap'],
  solution: '$K = 2 \\cdot (9 + 3) = 2 \\cdot 12 = \\mathbf{24}$ m.'
};
