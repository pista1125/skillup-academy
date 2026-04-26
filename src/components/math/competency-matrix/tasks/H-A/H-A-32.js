export default {
  id: 'H-A-32',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 100 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **5000 Ft**, perc: **8 Ft**.',
  question: 'Mennyi a **100 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 5000 + 8 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 100
    }
  },
  options: ['5700', '5800', '5900', '6300'],
  answer: '5800',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$5000 + 8 \\cdot 100 = 5000 + 800 = 5800$ Ft.'
};
