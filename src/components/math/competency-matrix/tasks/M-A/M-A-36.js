export default {
  id: 'M-A-36',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szoba festése — 4×3 m',
  difficulty: 4,
  scenario: 'Egy **4 m × 3 m** mennyezetet festünk. Egy doboz festék **6 m²**-re elég.',
  question: 'Legkevesebb **hány doboz** festékre van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 4,
    heightM: 3,
    label: 'Mennyezet',
    fill: '#fef3c7',
    unit: 'm'
  },
  options: ['1 doboz', '2 doboz', '3 doboz', '4 doboz'],
  answer: '2 doboz',
  keywords: ['terület', 'osztás'],
  solution: 'Terület: $4 \\cdot 3 = 12$ m². Doboz: $\\lceil 12/6 \\rceil = 2$.'
};
