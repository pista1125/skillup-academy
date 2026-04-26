export default {
  id: 'M-T-11',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Mértékegység-átváltás — hossz',
  difficulty: 2,
  scenario: 'Egy kerékpáros versenytáv **3,5 km** hosszú.',
  question: 'Hány **méter** ez?',
  visual: {
    type: 'formula',
    formula: '1 km = 1000 m',
    variables: [
      {
        name: 'km',
        desc: 'kilométer'
      },
      {
        name: 'm',
        desc: 'méter'
      }
    ],
    example: {
      'távolság_km': 3.5
    }
  },
  options: ['35 m', '350 m', '3 500 m', '35 000 m'],
  answer: '3 500 m',
  keywords: ['mértékegység-átváltás', 'hossz'],
  solution: `**Átváltás:**

$$3{,}5\\ \\text{km} = 3{,}5 \\cdot 1000 = 3500\\ \\text{m}.$$

**A helyes válasz: 3 500 m.**`
};
