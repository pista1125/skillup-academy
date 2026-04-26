export default {
  id: 'M-T-08',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Tort felosztása',
  difficulty: 2,
  scenario: 'Egy születésnapi tortát **8 egyenlő** szeletre vágtunk. A vendégek **3 szeletet** megettek.',
  question: 'A torta **mekkora része** maradt meg (közönséges tört alakjában)?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        label: 'Összes',
        count: 8
      },
      {
        label: 'Megmaradt',
        count: 5
      }
    ]
  },
  options: ['$\\tfrac{3}{8}$', '$\\tfrac{5}{8}$', '$\\tfrac{3}{5}$', '$\\tfrac{5}{3}$'],
  answer: '$\\tfrac{5}{8}$',
  keywords: ['tört', 'rész-egész'],
  solution: `**Rész-egész gondolkodás:**

1. Az egész tortát $8$ szeletre osztottuk, ez a **nevező**.
2. Megmaradt: $8 - 3 = 5$ szelet, ez a **számláló**.
3. A megmaradt rész: $\\mathbf{\\tfrac{5}{8}}$.`
};
