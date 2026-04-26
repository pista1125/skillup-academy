export default {
  id: 'M-T-36',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Negatív számok — fagypont alatt',
  difficulty: 2,
  scenario: 'Reggel a hőmérő **-3 °C**-ot mutatott, délben **5 °C**-ot.',
  question: 'Hány fokot **emelkedett** a hőmérséklet?',
  visual: {
    type: 'numberLine',
    min: -10,
    max: 10,
    divisions: 20,
    points: [
      { x: -3, label: 'reggel' },
      { x: 5, label: 'dél' }
    ]
  },
  options: ['2 °C', '5 °C', '7 °C', '8 °C'],
  answer: '8 °C',
  keywords: ['negatív szám', 'különbség'],
  solution: '$5 - (-3) = 5 + 3 = \\mathbf{8}$ °C-ot emelkedett.'
};
