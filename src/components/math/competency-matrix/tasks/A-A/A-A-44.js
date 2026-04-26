export default {
  id: 'A-A-44',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Rácsos alak területe',
  difficulty: 4,
  scenario: 'Az alábbi rácson egy U-alakú mező látható.',
  question: 'Hány rácsegységnyi a területe?',
  visual: {
    type: 'grid',
    w: 6,
    h: 5,
    shadedCells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
      [4, 1],
      [0, 2],
      [4, 2]
    ]
  },
  options: ['8', '9', '10', '12'],
  answer: '9',
  keywords: ['terület', 'rács'],
  solution: 'Számlálás: 5 + 2 + 2 = **9** rácsegység.'
};
