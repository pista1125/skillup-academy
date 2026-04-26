export default {
  id: 'H-A-43',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Festék — gipszkarton',
  difficulty: 4,
  scenario: 'Egy 3 literes festékkel **24 m²** falfelület festhető.',
  question: 'Hány **liter** festék kell egy **40 m²**-es falhoz?',
  visual: {
    type: 'comparison',
    items: [
      { label: '3 L', formula: '24 m²', result: '' },
      { label: '? L', formula: '40 m²', result: '' }
    ]
  },
  options: ['4 L', '5 L', '6 L', '8 L'],
  answer: '5 L',
  keywords: ['arány', 'egyenes arányosság'],
  solution: '$3 \\div 24 \\cdot 40 = 0{,}125 \\cdot 40 = \\mathbf{5}$ L.'
};
