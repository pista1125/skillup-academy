export default {
  id: 'H-T-09',
  contentArea: 'H',
  contentSub: '2.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Pont a koordináta-rendszerben',
  difficulty: 2,
  scenario: 'A koordináta-rendszerben megjelölt pont egy kincs helyét jelöli.',
  question: 'Mi a **P** pont koordinátája?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 8,
    yMin: 0,
    yMax: 6,
    points: [
      {
        x: 5,
        y: 3,
        label: 'P',
        color: '#ef4444'
      }
    ]
  },
  options: ['(3; 5)', '(5; 3)', '(3; 3)', '(5; 5)'],
  answer: '(5; 3)',
  keywords: ['koordináta-rendszer', 'pont leolvasása'],
  solution: `**Leolvasás:**

Az $x$ tengelyen: **5**, az $y$ tengelyen: **3**.

**A helyes válasz: (5; 3).**`
};
