export default {
  id: 'M-T-10',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Melyik a nehezebb?',
  difficulty: 2,
  scenario: 'Négy állatot megmértek az állatkertben.',
  question: 'Melyik állat a **legnehezebb**?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Strucc',
        count: 120,
        unit: 'kg',
        color: '#fef3c7'
      },
      {
        label: 'Zebra',
        count: 380,
        unit: 'kg',
        color: '#e0e7ff'
      },
      {
        label: 'Tigris',
        count: 220,
        unit: 'kg',
        color: '#fee2e2'
      },
      {
        label: 'Szarvas',
        count: 95,
        unit: 'kg',
        color: '#dcfce7'
      }
    ]
  },
  options: ['Strucc', 'Zebra', 'Tigris', 'Szarvas'],
  answer: 'Zebra',
  keywords: ['összehasonlítás', 'tömeg'],
  solution: `**Összehasonlítás:**

A tömegek: $380 > 220 > 120 > 95$ (kg).

A **zebra** a legnehezebb, $380$ kg-mal.`
};
