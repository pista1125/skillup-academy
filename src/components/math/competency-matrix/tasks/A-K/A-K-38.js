export default {
  id: 'A-K-38',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.4',
  title: 'Visszatérés — vektorösszeg',
  difficulty: 7,
  scenario: 'A futár 4 lépést tesz: **(+2; +3)**, **(−1; +2)**, **(+3; −4)**, **(x; y)**. A végén visszaér a kiindulóponthoz.',
  question: 'Mekkora a negyedik lépés **$(x;y)$** vektora?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'S',
        x: 0,
        y: 0
      }
    ]
  },
  answer: '(−4; −1)',
  keywords: ['vektor', 'visszatérés'],
  solution: `Összeg = 0:

$x$: $2 - 1 + 3 + x = 0 \\Rightarrow x = -4$.

$y$: $3 + 2 - 4 + y = 0 \\Rightarrow y = -1$.

**(−4; −1)**.`
};
