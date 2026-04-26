export default {
  id: 'M-A-39',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép méretaránya',
  difficulty: 4,
  scenario: 'Egy térkép **méretaránya 1 : 50 000**. A térképen két település közti távolság **6 cm**.',
  question: 'Mekkora a **valós távolság** km-ben?',
  visual: {
    type: 'formula',
    formula: '6 cm × 50 000 = ?',
    variables: []
  },
  options: ['0,3 km', '3 km', '30 km', '300 km'],
  answer: '3 km',
  keywords: ['arány', 'térkép', 'mértékegység'],
  solution: `Valós: $6 \\cdot 50000 = 300000$ cm = $3000$ m = $\\mathbf{3}$ km.`
};
