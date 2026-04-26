export default {
  id: 'H-A-36',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Felhőtarifa — adatkvóta',
  difficulty: 4,
  scenario: 'Egy felhőszolgáltatás **200 GB** havi kvótát ad. A hónap végén **38 GB** maradt.',
  question: 'Hány **százalékot** használtál el?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Elhasznált', formula: '200 − 38 = 162', result: '' },
      { label: 'Összes', formula: '200', result: '' }
    ]
  },
  options: ['75%', '78%', '80%', '81%'],
  answer: '81%',
  keywords: ['százalék', 'arány'],
  solution: '$162 \\div 200 = 0{,}81 = \\mathbf{81\\%}$.'
};
