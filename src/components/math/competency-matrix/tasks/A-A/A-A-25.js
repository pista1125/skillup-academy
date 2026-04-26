export default {
  id: 'A-A-25',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Léghajó útvonala',
  difficulty: 4,
  scenario: `Egy léghajó **(3; 2)** pontból indul. Útvonala: **északra 4**, majd **keletre 3**, majd **délre 1**.`,
  question: 'Melyik koordinátájú pontban ér földet?',
  visual: {
    type: 'treasureMap',
    gridW: 10,
    gridH: 8,
    start: { x: 3, y: 2, label: 'L' },
    islands: [
      { x: 6, y: 5, label: 'X' }
    ]
  },
  options: ['(6; 5)', '(6; 6)', '(7; 5)', '(3; 5)'],
  answer: '(6; 5)',
  keywords: ['koordináta', 'égtájak', 'útvonal'],
  solution: `Induló pont: $(3;\\,2)$.

- Észak 4: $y$ nő 4-gyel $\\to (3;\\,6)$
- Kelet 3: $x$ nő 3-mal $\\to (6;\\,6)$
- Dél 1: $y$ csökken 1-gyel $\\to (6;\\,5)$

**A léghajó földet ér: $(6;\\,5)$.**`
};
