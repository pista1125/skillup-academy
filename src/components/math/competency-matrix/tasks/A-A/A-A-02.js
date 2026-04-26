export default {
  id: 'A-A-02',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Koordináták',
  difficulty: 4,
  scenario: 'A koordináta-rendszerben négy pont található.',
  question: 'Melyik pont van a **(3; −2)** koordinátán?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: -3,
        y: 2
      },
      {
        label: 'Q',
        x: 3,
        y: 2
      },
      {
        label: 'R',
        x: 3,
        y: -2
      },
      {
        label: 'S',
        x: -3,
        y: -2
      }
    ]
  },
  options: ['P', 'Q', 'R', 'S'],
  answer: 'R',
  keywords: ['koordináta-rendszer', 'helymeghatározás'],
  solution: `**A (3; −2) pont:**

- $x = 3$ → jobbra 3-at
- $y = -2$ → lefelé 2-t

Ez az **R** pont.`
};
