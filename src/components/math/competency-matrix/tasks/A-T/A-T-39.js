export default {
  id: 'A-T-39',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Akvárium térfogata',
  difficulty: 2,
  scenario: 'Egy akvárium **40 cm × 20 cm × 25 cm** méretű téglatest.',
  question: 'Mekkora a térfogata?',
  visual: {
    type: 'box3d',
    box: {
      l: 40,
      w: 20,
      h: 25
    },
    unit: 'cm'
  },
  options: ['85 cm³', '1000 cm³', '20 000 cm³', '60 000 cm³'],
  answer: '20 000 cm³',
  keywords: ['térfogat', 'téglatest', 'akvárium'],
  solution: `**Lépések:**

1. Képlet: $V = a \\cdot b \\cdot c$.
2. Behelyettesítés: $V = 40 \\cdot 20 \\cdot 25$.
3. $40 \\cdot 20 = 800$, majd $800 \\cdot 25 = \\mathbf{20\\,000}$ cm³.`
};
