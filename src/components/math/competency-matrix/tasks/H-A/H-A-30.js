export default {
  id: 'H-A-30',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 60 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **3000 Ft**, perc: **10 Ft**.',
  question: 'Mennyi a **60 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 3000 + 10 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 60
    }
  },
  options: ['3500', '3600', '3700', '4100'],
  answer: '3600',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$3000 + 10 \\cdot 60 = 3000 + 600 = 3600$ Ft.'
};
