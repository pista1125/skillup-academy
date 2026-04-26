export default {
  id: 'H-A-35',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Baktériumszaporodás — arány',
  difficulty: 5,
  scenario: 'Egy baktériumtenyészet **18%-kal** nőtt naponta. A kezdő szám **5000**.',
  question: 'Hány baktérium lesz **1 nap múlva**?',
  visual: {
    type: 'formula',
    formula: 'N\' = N · 1,18',
    variables: [
      { name: 'N', desc: '5000' }
    ],
    example: { növekedés: '18%' }
  },
  options: ['5600', '5800', '5900', '6100'],
  answer: '5900',
  keywords: ['százalék', 'növekedés'],
  solution: '$5000 \\cdot 1{,}18 = \\mathbf{5900}$.'
};
