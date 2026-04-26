export default {
  id: 'A-K-01',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Kincskereső térkép',
  difficulty: 7,
  scenario: `Egy térképen **négy sziget** van. A hajó az **A pontból indul**, és a következő utasításokat kapja:

1. Észak felé **3** mezőt
2. Kelet felé **4** mezőt
3. Dél felé **1** mezőt
4. Kelet felé **2** mezőt`,
  question: 'Melyik szigethez ér a hajó?',
  visual: {
    type: 'treasureMap',
    gridW: 10,
    gridH: 8,
    start: {
      x: 1,
      y: 2,
      label: 'A'
    },
    islands: [
      {
        x: 4,
        y: 4,
        label: '①'
      },
      {
        x: 7,
        y: 4,
        label: '②'
      },
      {
        x: 7,
        y: 1,
        label: '③'
      },
      {
        x: 9,
        y: 6,
        label: '④'
      }
    ]
  },
  options: ['①', '②', '③', '④'],
  answer: '②',
  keywords: ['koordináta-rendszer', 'tájékozódás', 'útvonal'],
  solution: `**Lépésről lépésre:**

- Kezdés A: (1; 2)
- É 3: (1; 5)
- K 4: (5; 5)
- D 1: (5; 4)
- K 2: (7; 4)

A végpont **(7; 4)** → **② sziget**.`
};
