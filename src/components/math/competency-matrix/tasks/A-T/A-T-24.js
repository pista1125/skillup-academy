export default {
  id: 'A-T-24',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Szabályos háromszög szöge',
  difficulty: 1,
  scenario: 'Egy **szabályos (egyenlő oldalú) háromszög** minden szöge egyenlő.',
  question: 'Mekkora egy **belső szöge**?',
  visual: {
    type: 'triangle',
    type2: 'equilateral',
    base: 6,
    side: 6,
    unit: 'cm'
  },
  options: ['30°', '45°', '60°', '90°'],
  answer: '60°',
  keywords: ['szög', 'szabályos háromszög'],
  solution: 'A háromszög belső szögeinek összege $180°$. Szabályos esetben mindegyik szög $\\dfrac{180°}{3} = \\mathbf{60°}$.'
};
