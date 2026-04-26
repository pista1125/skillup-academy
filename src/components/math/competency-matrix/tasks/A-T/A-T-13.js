export default {
  id: 'A-T-13',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglalap területe — csempe',
  difficulty: 1,
  scenario: 'Egy fürdőszobai csempe **8 cm** hosszú és **5 cm** széles.',
  question: 'Mekkora a csempe **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 5,
    label: 'csempe',
    fill: '#b0d8ff',
    unit: 'cm'
  },
  options: ['13 cm²', '26 cm²', '40 cm²', '45 cm²'],
  answer: '40 cm²',
  keywords: ['terület', 'téglalap'],
  solution: `**Lépések:**

1. Képlet: $T = a \\cdot b$.
2. Behelyettesítés: $T = 8 \\cdot 5$.
3. Eredmény: $T = \\mathbf{40}$ cm².`
};
