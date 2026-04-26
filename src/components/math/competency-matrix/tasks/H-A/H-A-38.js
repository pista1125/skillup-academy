export default {
  id: 'H-A-38',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gyűjtés — célteljesítés',
  difficulty: 4,
  scenario: 'Egy osztálygyűjtés célja **60 000 Ft**; eddig **45 000 Ft** gyűlt össze.',
  question: 'Hány **százaléka** teljesült?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Gyűjtött', value: 75, color: '#22c55e' },
      { label: 'Hiány', value: 25, color: '#9ca3af' }
    ]
  },
  options: ['60%', '70%', '75%', '80%'],
  answer: '75%',
  keywords: ['százalék', 'arány'],
  solution: '$45\\,000 \\div 60\\,000 = 0{,}75 = \\mathbf{75\\%}$.'
};
