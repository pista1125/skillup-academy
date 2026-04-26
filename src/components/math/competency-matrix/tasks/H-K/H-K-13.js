export default {
  id: 'H-K-13',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Testvérek kora',
  difficulty: 7,
  scenario: 'Anna most **3×** idősebb, mint öccse. **5 év múlva** csak 2× annyi idős lesz.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 3P',
        result: ''
      },
      {
        label: '5 év múlva',
        formula: 'A + 5 = 2(P + 5)',
        result: ''
      }
    ]
  },
  options: ['P=5, A=15', 'P=6, A=16', 'P=7, A=17', 'P=4, A=14'],
  answer: 'P=5, A=15',
  keywords: ['egyenlet'],
  solution: '$3x + 5 = 2(x + 5)$ → $x = 5$. **Anna: 15, öcs: 5**.'
};
