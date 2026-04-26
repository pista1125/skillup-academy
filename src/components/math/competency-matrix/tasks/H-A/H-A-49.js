export default {
  id: 'H-A-49',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Taxiviteldíj — 12 km',
  difficulty: 4,
  scenario: 'Egy taxi **alapdíja 900 Ft**, kilométerdíja **320 Ft/km**.',
  question: 'Mennyi a viteldíj **12 km** után?',
  visual: {
    type: 'formula',
    formula: 'díj = 900 + 320 · km',
    variables: [
      { name: 'km', desc: 'megtett km' }
    ],
    example: { km: 12 }
  },
  options: ['3840 Ft', '4200 Ft', '4740 Ft', '5040 Ft'],
  answer: '4740 Ft',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$900 + 320 \\cdot 12 = 900 + 3840 = \\mathbf{4740}$ Ft.'
};
