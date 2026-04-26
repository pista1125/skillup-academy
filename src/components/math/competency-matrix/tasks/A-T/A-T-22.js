export default {
  id: 'A-T-22',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Tetris-mintázat területe',
  difficulty: 2,
  scenario: 'Egy Tetris-játékban a rácson ez a mintázat áll. Minden kis négyzet területe **1 egység**.',
  question: 'Hány egység területű a besatírozott alakzat?',
  visual: {
    type: 'grid',
    w: 6,
    h: 5,
    shadedCells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [2, 2],
      [3, 2],
      [2, 3]
    ]
  },
  options: ['5', '6', '7', '8'],
  answer: '7',
  keywords: ['terület', 'rács', 'számolás'],
  solution: `A mintázatban a besatírozott mezőket összeszámolva:

- Alsó sor: **4** mező
- Középső sor: **2** mező
- Felső sor: **1** mező

Összesen: $4 + 2 + 1 = \\mathbf{7}$ egység.`
};
