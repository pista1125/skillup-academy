export default {
  id: 'A-A-01',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'L-alak területe',
  difficulty: 4,
  scenario: 'Egy telek alakja "L"-betűt formáz, a méretek a rajzon láthatók.',
  question: 'Mekkora a telek **területe**?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 10,
      h: 8
    },
    cut: {
      w: 4,
      h: 3
    },
    unit: 'm'
  },
  options: ['56 m²', '68 m²', '72 m²', '80 m²'],
  answer: '68 m²',
  keywords: ['terület', 'átdarabolás'],
  solution: `**Két téglalapra bontás:**

$T_\\text{nagy} = 10 \\cdot 8 = 80$ m²
$T_\\text{kivágott} = 4 \\cdot 3 = 12$ m²

**L-alak területe:** $80 - 12 = \\mathbf{68}$ m².`
};
