export default {
  id: 'M-A-45',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Tört műveletek — süti osztás',
  difficulty: 4,
  scenario: 'Egy tortának Bence megette **1/4** részét, Réka **1/3** részét.',
  question: 'Mennyi **maradt** a tortából?',
  visual: {
    type: 'pieChart',
    caption: 'Torta részei',
    slices: [
      { label: 'Bence 1/4', value: 25 },
      { label: 'Réka 1/3', value: 33.33 },
      { label: 'Maradt', value: 41.67 }
    ]
  },
  options: ['1/6', '5/12', '7/12', '2/3'],
  answer: '5/12',
  keywords: ['törtek', 'összeadás', 'kivonás'],
  solution: `Megevett: $\\tfrac{1}{4} + \\tfrac{1}{3} = \\tfrac{3}{12} + \\tfrac{4}{12} = \\tfrac{7}{12}$.

Maradt: $1 - \\tfrac{7}{12} = \\mathbf{\\tfrac{5}{12}}$.`
};
