export default {
  id: 'A-A-20',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Téglalap — ismert terület',
  difficulty: 4,
  scenario: 'Egy téglalap **területe 48 m²**, az egyik oldala **6 m**.',
  question: 'Mekkora a **kerülete**?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 6,
    label: 'telek',
    fill: '#c9e8b0',
    unit: 'm'
  },
  options: ['14 m', '20 m', '28 m', '48 m'],
  answer: '28 m',
  keywords: ['terület', 'kerület'],
  solution: `Másik oldal: $48 / 6 = 8$ m.

$K = 2 \\cdot (8 + 6) = \\mathbf{28}$ m.`
};
