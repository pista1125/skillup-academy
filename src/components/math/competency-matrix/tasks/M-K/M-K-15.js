export default {
  id: 'M-K-15',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Két bolt — melyik olcsóbb?',
  difficulty: 7,
  scenario: 'Eredeti ár mindkét boltban 30 000 Ft. **A bolt:** 10% kedvezmény, aztán a maradékból még 8%. **B bolt:** egyszerű 15% kedvezmény.',
  question: 'Melyik bolt olcsóbb, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A bolt',
        formula: '30000 × 0.90 × 0.92',
        result: '24 840 Ft'
      },
      {
        label: 'B bolt',
        formula: '30000 × 0.85',
        result: '25 500 Ft'
      }
    ]
  },
  options: ['A bolt, 660 Ft', 'B bolt, 660 Ft', 'Ugyanannyi', 'A bolt, 1320 Ft'],
  answer: 'A bolt, 660 Ft',
  keywords: ['százalékszámítás', 'érvelés'],
  solution: '**A:** 24 840 Ft, **B:** 25 500 Ft. Különbség: 660 Ft. **A bolt** az olcsóbb.'
};
