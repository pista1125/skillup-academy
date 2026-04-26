export default {
  id: 'A-A-37',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Középpontos tükrözés',
  difficulty: 4,
  scenario: 'Az $O(0;0)$ pontra tükrözzük a **P(3; −2)** pontot.',
  question: 'Mik a képpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: 3,
        y: -2
      },
      {
        label: 'O',
        x: 0,
        y: 0
      }
    ]
  },
  options: ['(3; 2)', '(−3; −2)', '(−3; 2)', '(2; −3)'],
  answer: '(−3; 2)',
  keywords: ['középpontos tükrözés'],
  solution: `Origóra tükrözés: $(x;y) \\to (-x;-y)$.

$(3;-2) \\to (\\mathbf{-3;2})$.`
};
