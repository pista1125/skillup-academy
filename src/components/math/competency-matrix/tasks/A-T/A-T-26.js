export default {
  id: 'A-T-26',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'L-alak kerülete — parkoló',
  difficulty: 3,
  scenario: 'Egy parkoló L-alakú. Külső téglalap **7 m × 5 m**, a levágott sarok **3 m × 2 m**.',
  question: 'Mekkora a parkoló **kerülete**?',
  visual: {
    type: 'polygonL',
    outer: { w: 7, h: 5 },
    cut: { w: 3, h: 2 },
    unit: 'm'
  },
  options: ['17 m', '19 m', '22 m', '24 m'],
  answer: '24 m',
  keywords: ['kerület', 'L-alak'],
  solution: `Az L-alak **kerülete ugyanannyi, mint a befoglaló téglalapé**, mert a belső sarkot kivéve az oldalhosszak összege változatlan.

$K = 2 \\cdot (7 + 5) = 2 \\cdot 12 = \\mathbf{24}$ m.`
};
