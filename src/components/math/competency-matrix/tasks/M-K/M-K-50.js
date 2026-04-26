export default {
  id: 'M-K-50',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Statisztika — medián és átlag',
  difficulty: 7,
  scenario: 'Egy osztály **9 tanulójának** tollaslabda eredményei (pont): $12, 15, 14, 10, 20, 11, 14, 18, 14$.',
  question: 'Mennyi az adatsor **mediánja**?',
  visual: {
    type: 'dotPlot',
    caption: 'Eredmények (pont)',
    categories: ['10', '11', '12', '14', '15', '18', '20'],
    counts: [1, 1, 1, 3, 1, 1, 1]
  },
  options: ['12', '14', '14,25', '15'],
  answer: '14',
  keywords: ['medián', 'statisztika', 'sport'],
  solution: `Rendezve: $10, 11, 12, 14, 14, 14, 15, 18, 20$.

9 elem középsője az 5. → **14**.`
};
