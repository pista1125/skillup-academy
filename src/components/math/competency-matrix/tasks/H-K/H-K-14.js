export default {
  id: 'H-K-14',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Testvérek kora',
  difficulty: 7,
  scenario: 'Anna most **4×** idősebb, mint öccse. **9 év múlva** csak 2× annyi idős lesz.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 4P',
        result: ''
      },
      {
        label: '9 év múlva',
        formula: 'A + 9 = 2(P + 9)',
        result: ''
      }
    ]
  },
  options: ['P=3, A=12', 'P=4, A=13', 'P=5, A=14', 'P=2, A=11'],
  answer: 'P=3, A=12',
  keywords: ['egyenlet'],
  solution: '$4x + 9 = 2(x + 9)$ → $x = 3$. **Anna: 12, öcs: 3**.'
};
