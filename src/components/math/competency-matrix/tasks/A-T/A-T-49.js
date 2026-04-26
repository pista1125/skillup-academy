export default {
  id: 'A-T-49',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Rácsos alakzat területe',
  difficulty: 2,
  scenario: 'A rácsos ábrán egy alakzat a beszínezett mezőkből áll.',
  question: 'Hány **rácsegységnyi** a területe?',
  visual: {
    type: 'grid',
    w: 6,
    h: 5,
    shadedCells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [3, 2],
      [4, 2]
    ]
  },
  options: ['5', '6', '7', '8'],
  answer: '7',
  keywords: ['terület', 'rács'],
  solution: 'A beszínezett mezők száma: **7**.'
};
