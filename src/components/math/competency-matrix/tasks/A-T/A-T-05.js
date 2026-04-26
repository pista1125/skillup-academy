export default {
  id: 'A-T-05',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglalap kerülete — origami',
  difficulty: 1,
  scenario: 'Egy origami papírlap **6 cm** hosszú és **4 cm** széles.',
  question: 'Mekkora a papírlap **kerülete**?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 4,
    label: 'papír',
    fill: '#ffe8b0',
    unit: 'cm'
  },
  options: ['10 cm', '20 cm', '24 cm', '14 cm'],
  answer: '20 cm',
  keywords: ['kerület', 'téglalap'],
  solution: `**Lépések:**

1. Képlet: $K = 2 \\cdot (a + b)$.
2. Behelyettesítés: $K = 2 \\cdot (6 + 4) = 2 \\cdot 10$.
3. Eredmény: $K = \\mathbf{20}$ cm.`
};
