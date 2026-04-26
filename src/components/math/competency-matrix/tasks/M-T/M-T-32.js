export default {
  id: 'M-T-32',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Téglalap kerülete — kert',
  difficulty: 2,
  scenario: 'Egy téglalap alakú veteményes kert **oldalai 8 m és 5 m**.',
  question: 'Mennyi a kert **kerülete**?',
  visual: {
    type: 'rectangle',
    width: 8,
    height: 5,
    unit: 'm',
    label: 'Kert'
  },
  options: ['13 m', '18 m', '26 m', '40 m'],
  answer: '26 m',
  keywords: ['kerület', 'téglalap', 'kert'],
  solution: '$K = 2 \\cdot (8 + 5) = 2 \\cdot 13 = \\mathbf{26}$ m.'
};
