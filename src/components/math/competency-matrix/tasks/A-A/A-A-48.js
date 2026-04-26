export default {
  id: 'A-A-48',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Térképen — úthossz',
  difficulty: 5,
  scenario: 'A hajó **H(1;2)** és az **A sziget (6;2)**, **B sziget (6;6)**. A hajó először $A$-ba megy, majd $B$-be.',
  question: 'Mennyi rácsegységet tesz meg **összesen**?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 8,
    start: {
      x: 1,
      y: 2,
      label: 'H'
    },
    islands: [
      {
        x: 6,
        y: 2,
        label: 'A'
      },
      {
        x: 6,
        y: 6,
        label: 'B'
      }
    ]
  },
  options: ['5', '7', '9', '11'],
  answer: '9',
  keywords: ['távolság', 'útvonal'],
  solution: '$H\\to A$: $|6-1| = 5$. $A\\to B$: $|6-2|=4$. Összesen: $5+4 = \\mathbf{9}$.'
};
