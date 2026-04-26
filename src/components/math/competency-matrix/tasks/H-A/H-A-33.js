export default {
  id: 'H-A-33',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tippek aránya',
  difficulty: 4,
  scenario: 'Egy totó-szelvényen **12 találatból 9** volt jó.',
  question: 'Hány **százalékos** a találati arány?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Jó tipp', formula: '9', result: '' },
      { label: 'Összes', formula: '12', result: '' }
    ]
  },
  options: ['70%', '72%', '75%', '80%'],
  answer: '75%',
  keywords: ['százalék', 'arány'],
  solution: '$9 \\div 12 = 0{,}75 = \\mathbf{75\\%}$.'
};
