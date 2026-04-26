export default {
  id: 'A-T-17',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Koordináta leolvasása',
  difficulty: 2,
  scenario: 'Egy koordináta-rendszerben három pont van: $A$, $B$ és $C$.',
  question: 'Mik a **B pont** koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 2,
        y: 3
      },
      {
        label: 'B',
        x: -3,
        y: 1
      },
      {
        label: 'C',
        x: 4,
        y: -2
      }
    ]
  },
  options: ['(−3; 1)', '(1; −3)', '(3; 1)', '(−1; 3)'],
  answer: '(−3; 1)',
  keywords: ['koordináta', 'olvasás'],
  solution: `A B pont $x$ tengelyen a **−3**, az $y$ tengelyen **1** értéknél van.

**B = (−3; 1).**`
};
