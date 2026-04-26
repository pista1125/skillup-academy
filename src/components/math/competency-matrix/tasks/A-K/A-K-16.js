export default {
  id: 'A-K-16',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kincskeresés — rövidebb út',
  difficulty: 6,
  scenario: 'A hajó **(1;1)** pontból indul. Két sziget van: $A(5;1)$ és $B(1;6)$. Csak egyikhez juthat el (vízszintes vagy függőleges lépésekkel).',
  question: 'Melyik sziget **közelebb** és **mennyire**?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 8,
    start: {
      x: 1,
      y: 1,
      label: 'H'
    },
    islands: [
      {
        x: 5,
        y: 1,
        label: 'A'
      },
      {
        x: 1,
        y: 6,
        label: 'B'
      }
    ]
  },
  answer: 'A, 4 egység',
  keywords: ['távolság', 'optimalizálás'],
  solution: `$HA = |5-1| = 4$.

$HB = |6-1| = 5$.

$A$ **közelebb**, távolsága **4 egység**.`
};
