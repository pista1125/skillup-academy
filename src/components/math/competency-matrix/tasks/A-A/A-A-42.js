export default {
  id: 'A-A-42',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Jelzőtábla — háromszög',
  difficulty: 3,
  scenario: 'Egy háromszög alakú jelzőtábla alapja **60 cm**, magassága **52 cm**.',
  question: 'Mekkora a területe?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 60,
    side: 60,
    unit: 'cm'
  },
  options: ['520 cm²', '780 cm²', '1560 cm²', '3120 cm²'],
  answer: '1560 cm²',
  keywords: ['terület', 'háromszög'],
  solution: '$T = \\dfrac{60 \\cdot 52}{2} = \\mathbf{1560}$ cm².'
};
