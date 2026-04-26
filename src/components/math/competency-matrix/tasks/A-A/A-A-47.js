export default {
  id: 'A-A-47',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Háromszög tükrözése',
  difficulty: 4,
  scenario: 'Tükrözd az $A(1;2), B(4;2), C(2;5)$ háromszöget az **$x$-tengelyre**.',
  question: 'Mik az új **$C\'$** koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 6,
    yMin: -6,
    yMax: 6,
    points: [
      {
        label: 'A',
        x: 1,
        y: 2
      },
      {
        label: 'B',
        x: 4,
        y: 2
      },
      {
        label: 'C',
        x: 2,
        y: 5
      }
    ]
  },
  options: ['(2; 5)', '(−2; 5)', '(2; −5)', '(−2; −5)'],
  answer: '(2; −5)',
  keywords: ['tengelyes tükrözés'],
  solution: '$x$-tengelyre: $y \\to -y$. $C(2;5) \\to C\'(\\mathbf{2;-5})$.'
};
