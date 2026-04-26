export default {
  id: 'H-T-46',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Babapelenka — csomag',
  difficulty: 2,
  scenario: 'Egy baba naponta 6 pelenkát használ, egy csomagban 72 db van.',
  question: 'Hány **napra** elég egy csomag?',
  visual: {
    type: 'formula',
    formula: 'napok = 72 ÷ 6',
    variables: [
      { name: 'db/nap', desc: '6' }
    ],
    example: { '': '' }
  },
  options: ['10', '11', '12', '14'],
  answer: '12',
  keywords: ['osztás', 'hányados'],
  solution: '$72 \\div 6 = \\mathbf{12}$ nap.'
};
