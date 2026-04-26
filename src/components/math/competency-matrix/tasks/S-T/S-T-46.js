export default {
  id: 'S-T-46',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Reggeli sorrend — fadiagram',
  difficulty: 2,
  scenario: 'Reggel először italt (tej vagy kakaó), majd pékárut (kenyér vagy kifli) választunk.',
  question: 'Hány különböző **kombináció** van?',
  visual: {
    type: 'treeDiagram',
    root: 'reggeli',
    levels: [
      {
        label: 'Ital',
        branches: ['tej', 'kakaó']
      },
      {
        label: 'Pékáru',
        branches: ['kenyér', 'kifli']
      }
    ]
  },
  options: ['2', '3', '4', '6'],
  answer: '4',
  keywords: ['fadiagram', 'szorzási elv'],
  solution: `**Szorzási elv:** $2 \\cdot 2 = \\mathbf{4}$ kombináció.

A fadiagramon is 4 ág vezet a végpontig.

**A helyes válasz: 4.**`
};
