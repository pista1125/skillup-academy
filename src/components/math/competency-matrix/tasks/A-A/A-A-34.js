export default {
  id: 'A-A-34',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Két pont távolsága',
  difficulty: 3,
  scenario: 'A **koordináta-rendszerben** $A(2; 1)$ és $B(2; 7)$ pontokat összekötjük.',
  question: 'Mekkora a szakasz hossza?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 5,
    yMin: -1,
    yMax: 9,
    points: [
      {
        label: 'A',
        x: 2,
        y: 1
      },
      {
        label: 'B',
        x: 2,
        y: 7
      }
    ]
  },
  options: ['4', '5', '6', '8'],
  answer: '6',
  keywords: ['koordináta', 'távolság'],
  solution: 'Azonos $x$-ek → $|7 - 1| = \\mathbf{6}$.'
};
