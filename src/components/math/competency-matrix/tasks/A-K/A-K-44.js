export default {
  id: 'A-K-44',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'A negyedik csúcs',
  difficulty: 7,
  scenario: 'Egy **paralelogramma** három csúcsa $A(0;0)$, $B(5;0)$, $C(7;3)$. A negyedik csúcs $D$.',
  question: 'Mik a $D$ csúcs koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 8,
    yMin: -1,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 0,
        y: 0
      },
      {
        label: 'B',
        x: 5,
        y: 0
      },
      {
        label: 'C',
        x: 7,
        y: 3
      }
    ]
  },
  answer: '(2; 3)',
  keywords: ['paralelogramma', 'koordináta'],
  solution: `A paralelogrammában $\\overrightarrow{AB} = \\overrightarrow{DC}$.

$\\overrightarrow{AB} = (5;0)$. Ezért $D = C - (5;0) = (7-5; 3-0) = (\\mathbf{2;3})$.`
};
