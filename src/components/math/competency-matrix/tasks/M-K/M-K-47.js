export default {
  id: 'M-K-47',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Koordináta — háromszög területe',
  difficulty: 6,
  scenario: 'Egy háromszög csúcsai a koordináta-rendszerben: $A(0, 0)$, $B(6, 0)$, $C(0, 4)$.',
  question: 'Mekkora a háromszög **területe**?',
  visual: {
    type: 'coordinateGrid',
    caption: 'Háromszög csúcsai',
    points: [
      { x: 0, y: 0, label: 'A' },
      { x: 6, y: 0, label: 'B' },
      { x: 0, y: 4, label: 'C' }
    ],
    xRange: [-1, 8],
    yRange: [-1, 6]
  },
  options: ['6', '10', '12', '24'],
  answer: '12',
  keywords: ['terület', 'háromszög', 'koordináta'],
  solution: `Derékszögű háromszög, befogói $6$ és $4$.

$T = \\tfrac{1}{2} \\cdot 6 \\cdot 4 = \\mathbf{12}$ területegység.`
};
