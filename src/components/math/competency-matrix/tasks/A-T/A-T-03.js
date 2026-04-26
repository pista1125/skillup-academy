export default {
  id: 'A-T-03',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Háromszög oldalai',
  difficulty: 3,
  scenario: 'Egy egyenlő szárú háromszög alapja **8 cm**, szárai **5-5 cm** hosszúak.',
  question: 'Mekkora a háromszög **kerülete**?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 8,
    side: 5,
    unit: 'cm'
  },
  options: ['13 cm', '16 cm', '18 cm', '40 cm'],
  answer: '18 cm',
  keywords: ['kerület', 'háromszög'],
  solution: `**Kerület = oldalak összege:**

$K = 5 + 5 + 8 = \\mathbf{18}$ cm.`
};
