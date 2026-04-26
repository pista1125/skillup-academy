export default {
  id: 'H-A-29',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 45 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **2500 Ft**, perc: **12 Ft**.',
  question: 'Mennyi a **45 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 2500 + 12 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 45
    }
  },
  options: ['2940', '3040', '3140', '3540'],
  answer: '3040',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$2500 + 12 \\cdot 45 = 2500 + 540 = 3040$ Ft.'
};
