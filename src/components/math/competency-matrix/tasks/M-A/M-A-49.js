export default {
  id: 'M-A-49',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Koordináta — pont elhelyezése',
  difficulty: 4,
  scenario: 'Egy koordináta-rendszerben négy pont található: $A(2, 3)$, $B(-1, 4)$, $C(3, -2)$, $D(0, 0)$.',
  question: 'Melyik pont található a **második síknegyedben**?',
  visual: {
    type: 'coordinateGrid',
    caption: 'Koordináta-rendszer',
    points: [
      { x: 2, y: 3, label: 'A' },
      { x: -1, y: 4, label: 'B' },
      { x: 3, y: -2, label: 'C' },
      { x: 0, y: 0, label: 'D' }
    ],
    xRange: [-5, 5],
    yRange: [-5, 5]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'B',
  keywords: ['koordináta', 'síknegyed'],
  solution: 'A második síknegyed: $x < 0, y > 0$. $B(-1, 4)$ megfelelő → **B**.'
};
