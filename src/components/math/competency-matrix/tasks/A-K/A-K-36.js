export default {
  id: 'A-K-36',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Háromszög a koordinátarendszerben',
  difficulty: 6,
  scenario: 'A háromszög csúcsai: $A(0;0)$, $B(6;0)$, $C(2;4)$.',
  question: 'Mekkora a területe?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 7,
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
        x: 6,
        y: 0
      },
      {
        label: 'C',
        x: 2,
        y: 4
      }
    ]
  },
  options: ['8', '10', '12', '24'],
  answer: '12',
  keywords: ['terület', 'háromszög', 'koordináta'],
  solution: `Alap: $AB = 6$ (az $x$-tengelyen).

Magasság: $C$ $y$-koordinátája = $4$.

$T = \\dfrac{6 \\cdot 4}{2} = \\mathbf{12}$.`
};
