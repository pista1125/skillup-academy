export default {
  id: 'S-T-43',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Venn-diagram — leolvasás',
  difficulty: 2,
  scenario: 'Az osztályban a sporttevékenységet Venn-diagram ábrázolja: tenisz és úszás.',
  question: 'Hányan **mindkét** sportot űzik?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Tenisz',
        color: '#22c55e'
      },
      {
        label: 'Úszás',
        color: '#0ea5e9'
      }
    ],
    regions: {
      onlyA: 5,
      onlyB: 8,
      both: 3,
      neither: 9
    },
    universe: 25
  },
  options: ['3', '5', '8', '9'],
  answer: '3',
  keywords: ['Venn-diagram', 'metszet'],
  solution: `**A két halmaz metszetében 3 áll.**

**A helyes válasz: 3.**`
};
