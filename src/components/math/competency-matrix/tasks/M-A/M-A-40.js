export default {
  id: 'M-A-40',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kerékpárút — aszfaltozás',
  difficulty: 4,
  scenario: 'Egy **2,5 km hosszú, 2 m széles** kerékpárutat aszfaltoznak. Az aszfalt **0,05 m vastag**.',
  question: 'Hány **m³ aszfaltra** van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 2500,
    heightM: 2,
    label: 'Kerékpárút (vastagság: 0,05 m)',
    unit: 'm'
  },
  options: ['125 m³', '250 m³', '500 m³', '2500 m³'],
  answer: '250 m³',
  keywords: ['térfogat', 'kerékpárút'],
  solution: '2,5 km = 2500 m. $V = 2500 \\cdot 2 \\cdot 0{,}05 = \\mathbf{250}$ m³.'
};
