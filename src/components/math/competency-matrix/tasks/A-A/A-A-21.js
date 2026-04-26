export default {
  id: 'A-A-21',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Térkép — útvonal',
  difficulty: 4,
  scenario: 'Egy túrázó **(1; 1)** pontból indul: 3 lépés észak, 2 lépés kelet, 1 lépés dél.',
  question: 'Hol lesz végül?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 8,
    start: {
      x: 1,
      y: 1,
      label: 'S'
    },
    islands: [
      {
        x: 3,
        y: 3,
        label: 'C'
      }
    ]
  },
  options: ['(3; 3)', '(3; 4)', '(4; 3)', '(1; 3)'],
  answer: '(3; 3)',
  keywords: ['útvonal', 'égtájak'],
  solution: 'Lépések: $(1;1)\\to(1;4)\\to(3;4)\\to(\\mathbf{3;3})$.'
};
