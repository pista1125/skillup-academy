export default {
  id: 'M-A-33',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Strand — homokozó térfogata',
  difficulty: 4,
  scenario: 'A strandon egy **téglalap alakú homokozót** építenek: **4 m hosszú, 3 m széles, 0,3 m mély**.',
  question: 'Hány **m³ homokra** van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 4,
    heightM: 3,
    label: 'Homokozó (mélység: 0,3 m)',
    unit: 'm'
  },
  options: ['2,4 m³', '3,0 m³', '3,6 m³', '4,8 m³'],
  answer: '3,6 m³',
  keywords: ['térfogat', 'strand'],
  solution: '$V = 4 \\cdot 3 \\cdot 0{,}3 = \\mathbf{3{,}6}$ m³.'
};
