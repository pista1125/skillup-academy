export default {
  id: 'H-K-15',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Testvérek kora',
  difficulty: 7,
  scenario: 'Anna most **5×** idősebb, mint öccse. **8 év múlva** csak 3× annyi idős lesz.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 5P',
        result: ''
      },
      {
        label: '8 év múlva',
        formula: 'A + 8 = 3(P + 8)',
        result: ''
      }
    ]
  },
  options: ['P=4, A=20', 'P=5, A=21', 'P=6, A=22', 'P=3, A=19'],
  answer: 'P=4, A=20',
  keywords: ['egyenlet'],
  solution: '$5x + 8 = 3(x + 8)$ → $x = 4$. **Anna: 20, öcs: 4**.'
};
