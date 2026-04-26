export default {
  id: 'M-T-44',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Prímszám felismerése',
  difficulty: 2,
  scenario: 'Négy szám közül kell kiválasztanod a prímszámot.',
  question: 'Melyik **prímszám** a következők közül?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'A', formula: '21', result: '' },
      { label: 'B', formula: '27', result: '' },
      { label: 'C', formula: '29', result: '' },
      { label: 'D', formula: '33', result: '' }
    ]
  },
  options: ['21', '27', '29', '33'],
  answer: '29',
  keywords: ['prímszám', 'oszthatóság'],
  solution: '$21 = 3 \\cdot 7$, $27 = 3^3$, $33 = 3 \\cdot 11$. A **29** csak 1-gyel és önmagával osztható → **prím**.'
};
