export default {
  id: 'S-A-47',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Gyümölcsfák — Venn',
  difficulty: 4,
  scenario: 'Egy kertben **20** fa gyümölcsöt ad, **15** virágzik, **12** mindkettő.',
  question: 'Hány fa **vagy gyümölcsöt ad, vagy virágzik** (nem feltétlenül mindkettő)?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Gyümölcs',
        color: '#ef4444'
      },
      {
        label: 'Virág',
        color: '#ec4899'
      }
    ],
    regions: {
      onlyA: 8,
      onlyB: 3,
      both: 12,
      neither: 0
    },
    universe: 23
  },
  options: ['20', '23', '27', '35'],
  answer: '23',
  keywords: ['unió', 'Venn'],
  solution: `**Unió:** $|G \\cup V| = 20 + 15 - 12 = \\mathbf{23}$.

**A helyes válasz: 23.**`
};
