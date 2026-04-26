export default {
  id: 'A-A-43',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Felezőpont',
  difficulty: 4,
  scenario: 'Az $A(−2; 4)$ és $B(6; −2)$ szakasz **felezőpontját** keressük.',
  question: 'Mik a felezőpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 7,
    yMin: -5,
    yMax: 6,
    points: [
      {
        label: 'A',
        x: -2,
        y: 4
      },
      {
        label: 'B',
        x: 6,
        y: -2
      }
    ]
  },
  options: ['(2; 1)', '(4; 2)', '(2; 2)', '(1; 2)'],
  answer: '(2; 1)',
  keywords: ['koordináta', 'felezőpont'],
  solution: '$F = \\left(\\dfrac{-2+6}{2}; \\dfrac{4+(-2)}{2}\\right) = (\\mathbf{2; 1})$.'
};
