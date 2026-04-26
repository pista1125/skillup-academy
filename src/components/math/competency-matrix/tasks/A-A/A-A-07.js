export default {
  id: 'A-A-07',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kincskereső térkép',
  difficulty: 4,
  scenario: 'A kalózok egy **8 × 6**-os rácsú térképen jelölték a **X-szel jelölt kincset** és három szigetet. Indulj a **hajó (H)** pozíciójából **(1; 1)**, a kincs **K**-val jelölt helyén található.',
  question: 'Mennyi a **hajó** és a **kincs** közötti **vízszintes** távolság (csak $x$ irányban)?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 6,
    start: {
      x: 1,
      y: 1,
      label: 'H'
    },
    islands: [
      {
        x: 3,
        y: 4,
        label: 'A'
      },
      {
        x: 6,
        y: 2,
        label: 'B'
      },
      {
        x: 5,
        y: 5,
        label: 'K'
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '4',
  keywords: ['koordináták', 'térkép', 'távolság'],
  solution: `**Lépések:**

1. Hajó $x$-koordinátája: $1$.
2. Kincs $x$-koordinátája: $5$.
3. Vízszintes távolság: $5 - 1 = \\mathbf{4}$.`
};
