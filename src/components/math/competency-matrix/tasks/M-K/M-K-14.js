export default {
  id: 'M-K-14',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Két bolt — melyik olcsóbb?',
  difficulty: 7,
  scenario: 'Eredeti ár mindkét boltban 20 000 Ft. **A bolt:** 15% kedvezmény, aztán a maradékból még 10%. **B bolt:** egyszerű 20% kedvezmény.',
  question: 'Melyik bolt olcsóbb, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A bolt',
        formula: '20000 × 0.85 × 0.90',
        result: '15 300 Ft'
      },
      {
        label: 'B bolt',
        formula: '20000 × 0.80',
        result: '16 000 Ft'
      }
    ]
  },
  options: ['A bolt, 700 Ft', 'B bolt, 700 Ft', 'Ugyanannyi', 'A bolt, 1400 Ft'],
  answer: 'A bolt, 700 Ft',
  keywords: ['százalékszámítás', 'érvelés'],
  solution: '**A:** 15 300 Ft, **B:** 16 000 Ft. Különbség: 700 Ft. **A bolt** az olcsóbb.'
};
