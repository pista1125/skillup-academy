export default {
  id: 'M-K-21',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Munkaidő — közös munka',
  difficulty: 6,
  scenario: 'Kati egyedül **6 óra** alatt rendezi ki a könyvtárat. Judit egyedül **4 óra** alatt. Ha együtt dolgoznak...',
  question: 'Hány **óra** alatt végeznek együtt?',
  visual: {
    type: 'formula',
    formula: '1/6 + 1/4 = ?',
    variables: []
  },
  options: ['2 óra', '2 óra 24 perc', '3 óra', '5 óra'],
  answer: '2 óra 24 perc',
  keywords: ['arány', 'munkaidő'],
  solution: `Óránkénti munka: $\\tfrac{1}{6} + \\tfrac{1}{4} = \\tfrac{2}{12} + \\tfrac{3}{12} = \\tfrac{5}{12}$.

Teljes munka: $1 / (5/12) = 12/5 = 2{,}4$ óra = **2 óra 24 perc**.`
};
