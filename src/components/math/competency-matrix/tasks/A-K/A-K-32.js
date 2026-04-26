export default {
  id: 'A-K-32',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Négy pont — milyen alakzat?',
  difficulty: 6,
  scenario: 'A pontok: $A(1;1)$, $B(5;1)$, $C(5;4)$, $D(1;4)$.',
  question: 'Milyen négyszöget alkotnak, és mekkora a területe?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
    points: [
      {
        label: 'A',
        x: 1,
        y: 1
      },
      {
        label: 'B',
        x: 5,
        y: 1
      },
      {
        label: 'C',
        x: 5,
        y: 4
      },
      {
        label: 'D',
        x: 1,
        y: 4
      }
    ]
  },
  answer: 'Téglalap, T = 12',
  keywords: ['koordináta', 'négyszög', 'terület'],
  solution: `Oldalak: $AB = 4$, $BC = 3$, $CD = 4$, $DA = 3$. Szögek derékszögűek → **téglalap**.

$T = 4 \\cdot 3 = \\mathbf{12}$ területegység.`
};
