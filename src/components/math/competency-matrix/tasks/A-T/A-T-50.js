export default {
  id: 'A-T-50',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Hajó délre',
  difficulty: 2,
  scenario: 'A hajó a **(4; 5)** pontból **2 mezőt délre** halad.',
  question: 'Hol lesz?',
  visual: {
    type: 'treasureMap',
    gridW: 7,
    gridH: 7,
    start: {
      x: 4,
      y: 5,
      label: 'H'
    },
    islands: [
      {
        x: 4,
        y: 3,
        label: 'V'
      }
    ]
  },
  options: ['(4; 3)', '(4; 7)', '(2; 5)', '(6; 5)'],
  answer: '(4; 3)',
  keywords: ['égtájak', 'koordináta'],
  solution: 'Délre: $y$ csökken. $(4; 5) \\to (\\mathbf{4; 3})$.'
};
