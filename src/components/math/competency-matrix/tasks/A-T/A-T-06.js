export default {
  id: 'A-T-06',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Pizzaszelet — téglalap területe',
  difficulty: 2,
  scenario: 'Egy pizzériában egy szögletes pizzaszelet **15 cm** hosszú és **8 cm** széles.',
  question: 'Mekkora a szelet **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 15,
    heightM: 8,
    label: 'pizza',
    fill: '#ffd28a',
    unit: 'cm'
  },
  options: ['23 cm²', '46 cm²', '120 cm²', '150 cm²'],
  answer: '120 cm²',
  keywords: ['terület', 'téglalap'],
  solution: `**Lépések:**

1. Képlet: $T = a \\cdot b$.
2. Behelyettesítés: $T = 15 \\cdot 8$.
3. Eredmény: $T = \\mathbf{120}$ cm².`
};
