export default {
  id: 'M-T-50',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Római számok',
  difficulty: 2,
  scenario: 'Egy történelmi emlékművön a **MCMLXXXIV** évszám áll.',
  question: 'Melyik **arab számmal** egyenlő ez a római szám?',
  visual: {
    type: 'formula',
    formula: 'MCMLXXXIV = ?',
    variables: [],
    example: {}
  },
  options: ['1964', '1974', '1984', '1994'],
  answer: '1984',
  keywords: ['római szám'],
  solution: '$M + CM + LXXX + IV = 1000 + 900 + 80 + 4 = \\mathbf{1984}$.'
};
