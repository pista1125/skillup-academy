export default {
  id: 'A-K-02',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Szabálytalan kert',
  difficulty: 7,
  scenario: 'Egy szabálytalan alakú kert rácsmezőkre osztott rajza látható. Minden rácsnégyzet oldala **1 m**.',
  question: 'Hány m² a kert területe? (Csak az egész négyzeteket és a pontos felezőket számold.)',
  visual: {
    type: 'grid',
    w: 8,
    h: 6,
    shadedCells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
      [3, 4],
      [4, 4],
      [5, 4]
    ]
  },
  options: ['17 m²', '18 m²', '19 m²', '20 m²'],
  answer: '19 m²',
  keywords: ['terület', 'becslés', 'rácshálózat'],
  solution: `**Négyzetek számolása:**

- 1. sor: 5 négyzet
- 2. sor: 6 négyzet
- 3. sor: 5 négyzet
- 4. sor: 3 négyzet

$5 + 6 + 5 + 3 = \\mathbf{19}$ négyzet → **19 m²**.`
};
