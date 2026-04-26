export default {
  id: 'A-A-17',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tükrözés a $y$-tengelyre',
  difficulty: 3,
  scenario: 'Egy háromszög csúcsai $A(2;1)$, $B(5;3)$, $C(3;6)$. Tükrözzük a $y$-tengelyre.',
  question: 'Mik lesznek a **B\'** képpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -6,
    xMax: 6,
    yMin: -1,
    yMax: 7,
    points: [
      {
        label: 'A',
        x: 2,
        y: 1
      },
      {
        label: 'B',
        x: 5,
        y: 3
      },
      {
        label: 'C',
        x: 3,
        y: 6
      }
    ]
  },
  options: ['(−5; 3)', '(5; −3)', '(−5; −3)', '(3; 5)'],
  answer: '(−5; 3)',
  keywords: ['tengelyes tükrözés', 'koordináta'],
  solution: `$y$-tengelyre: $x \\to -x$, $y$ változatlan.

$B(5;3) \\to B'(\\mathbf{-5;3})$.`
};
