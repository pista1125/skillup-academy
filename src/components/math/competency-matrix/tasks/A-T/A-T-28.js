export default {
  id: 'A-T-28',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Rácsos terület — parketta',
  difficulty: 2,
  scenario: 'Egy **5 × 4**-es parkettán a beszínezett mezők jelölik a szőnyeg helyét.',
  question: 'Hány **rácsegységnyi** a szőnyeg területe?',
  visual: {
    type: 'grid',
    w: 5,
    h: 4,
    shadedCells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2]
    ]
  },
  options: ['4', '5', '6', '8'],
  answer: '6',
  keywords: ['terület', 'rács'],
  solution: 'A beszínezett mezők száma: **6**. Ez a szőnyeg területe rácsegységben.'
};
