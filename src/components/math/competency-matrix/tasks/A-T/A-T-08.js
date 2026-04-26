export default {
  id: 'A-T-08',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Szabályos háromszög kerülete',
  difficulty: 2,
  scenario: 'Egy **szabályos háromszög** alakú jelzőtábla minden oldala **12 cm** hosszú.',
  question: 'Mekkora a tábla **kerülete**?',
  visual: {
    type: 'triangle',
    type2: 'equilateral',
    base: 12,
    side: 12,
    unit: 'cm'
  },
  options: ['24 cm', '30 cm', '36 cm', '48 cm'],
  answer: '36 cm',
  keywords: ['kerület', 'szabályos háromszög'],
  solution: `**Lépések:**

1. Szabályos háromszögnél minden oldal egyenlő.
2. $K = 3 \\cdot 12 = \\mathbf{36}$ cm.`
};
