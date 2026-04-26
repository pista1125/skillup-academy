export default {
  id: 'H-A-31',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 80 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **1500 Ft**, perc: **15 Ft**.',
  question: 'Mennyi a **80 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 1500 + 15 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 80
    }
  },
  options: ['2600', '2700', '2800', '3200'],
  answer: '2700',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$1500 + 15 \\cdot 80 = 1500 + 1200 = 2700$ Ft.'
};
