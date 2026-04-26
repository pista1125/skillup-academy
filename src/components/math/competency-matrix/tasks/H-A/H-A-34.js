export default {
  id: 'H-A-34',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Osztály — fiúk aránya',
  difficulty: 4,
  scenario: 'Egy **32 fős** osztályban **14 fiú** van.',
  question: 'Hány **százaléka** a fiúk az osztálynak? (kerekíts egészre)',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Fiú', value: 44, color: '#2563eb' },
      { label: 'Lány', value: 56, color: '#ec4899' }
    ]
  },
  options: ['40%', '42%', '44%', '46%'],
  answer: '44%',
  keywords: ['százalék', 'arány'],
  solution: '$14 \\div 32 = 0{,}4375 \\approx \\mathbf{44\\%}$.'
};
