export default {
  id: 'A-T-29',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'L-alak területe — kis telek',
  difficulty: 3,
  scenario: 'Egy L-alakú telek külső mérete **6 m × 4 m**, a kivágott sarok **2 m × 2 m**.',
  question: 'Mekkora a telek területe?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 6,
      h: 4
    },
    cut: {
      w: 2,
      h: 2
    },
    unit: 'm'
  },
  options: ['12 m²', '20 m²', '24 m²', '28 m²'],
  answer: '20 m²',
  keywords: ['terület', 'L-alak'],
  solution: '$T = 6 \\cdot 4 - 2 \\cdot 2 = 24 - 4 = \\mathbf{20}$ m².'
};
