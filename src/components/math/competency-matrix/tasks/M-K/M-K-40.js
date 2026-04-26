export default {
  id: 'M-K-40',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Benzinár — két kút összehasonlítása',
  difficulty: 7,
  scenario: 'Egy autós **50 liter** benzint tankol. **A kút:** 612 Ft/L, klubkártyával 4% kedvezmény. **B kút:** 599 Ft/L, de a tankolás fix 500 Ft szervizdíjjal jár.',
  question: 'Melyik **olcsóbb**, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'A kút', formula: '50 × 612 × 0.96', result: '29 376 Ft' },
      { label: 'B kút', formula: '50 × 599 + 500', result: '30 450 Ft' }
    ]
  },
  options: ['A, 1074 Ft', 'B, 1074 Ft', 'Ugyanannyi', 'A, 574 Ft'],
  answer: 'A, 1074 Ft',
  keywords: ['érvelés', 'több lépés', 'bolt'],
  solution: `A: $50 \\cdot 612 \\cdot 0{,}96 = 29\\,376$ Ft.

B: $50 \\cdot 599 + 500 = 30\\,450$ Ft.

**A** olcsóbb, különbség **1074 Ft**.`
};
