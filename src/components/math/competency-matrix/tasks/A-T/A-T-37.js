export default {
  id: 'A-T-37',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kincseshelyek olvasása',
  difficulty: 2,
  scenario: 'A térképen a hajó (H) a **(2; 1)** pontban áll, három sziget látható.',
  question: 'Melyik sziget van a hajó **északi** (pontosan fölötte lévő oszlopban) irányában?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 6,
    start: {
      x: 2,
      y: 1,
      label: 'H'
    },
    islands: [
      {
        x: 2,
        y: 5,
        label: 'A'
      },
      {
        x: 5,
        y: 1,
        label: 'B'
      },
      {
        x: 6,
        y: 4,
        label: 'C'
      }
    ]
  },
  options: ['A', 'B', 'C', 'egyik sem'],
  answer: 'A',
  keywords: ['égtájak', 'térkép'],
  solution: 'Északra az $x$ változatlan, $y$ nő. $H(2;1)$-ről északra van **A(2;5)**.'
};
