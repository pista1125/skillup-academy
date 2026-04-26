export default {
  id: 'A-K-27',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Tó területének becslése',
  difficulty: 6,
  scenario: 'Egy tó körvonalát rácsra rajzoljuk. A teljesen belül lévő mezők száma **32**, a részben belül lévőké **14**.',
  question: 'Mekkora a tó **becsült területe** rácsegységben (részben belül lévők fele számít)?',
  visual: {
    type: 'grid',
    w: 10,
    h: 8,
    shadedCells: [
      [2, 2],
      [3, 2],
      [4, 2]
    ]
  },
  answer: '39 rácsegység',
  keywords: ['terület', 'becslés', 'rács'],
  solution: '$T \\approx 32 + \\dfrac{14}{2} = 32 + 7 = \\mathbf{39}$ rácsegység.'
};
