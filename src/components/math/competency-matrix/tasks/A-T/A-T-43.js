export default {
  id: 'A-T-43',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kincseshajó távolsága',
  difficulty: 2,
  scenario: 'A térképen a hajó (H) a **(1; 2)**, a kincs (K) a **(5; 2)** pontban van.',
  question: 'Mekkora a **vízszintes** távolság?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 5,
    start: {
      x: 1,
      y: 2,
      label: 'H'
    },
    islands: [
      {
        x: 5,
        y: 2,
        label: 'K'
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '4',
  keywords: ['koordináta', 'távolság'],
  solution: '$|5 - 1| = \\mathbf{4}$ rácsegység.'
};
