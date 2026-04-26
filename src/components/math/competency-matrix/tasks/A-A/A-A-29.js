export default {
  id: 'A-A-29',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tükrözés az $x$-tengelyre',
  difficulty: 3,
  scenario: 'Egy pont az $(3; -5)$. Tükrözzük az $x$-tengelyre.',
  question: 'Mik a képpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -6,
    yMax: 6,
    points: [
      {
        label: 'P',
        x: 3,
        y: -5
      }
    ]
  },
  options: ['(−3; −5)', '(3; 5)', '(−3; 5)', '(5; 3)'],
  answer: '(3; 5)',
  keywords: ['tengelyes tükrözés'],
  solution: '$x$-tengelyre: $y \\to -y$. $(3;-5) \\to (\\mathbf{3;5})$.'
};
