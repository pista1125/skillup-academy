export default {
  id: 'M-A-22',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Edzés — futás tempó',
  difficulty: 4,
  scenario: 'Réka **8 km**-t fut **40 perc** alatt, egyenletes tempóban.',
  question: 'Mennyi az **1 km megtételéhez** szükséges idő?',
  visual: {
    type: 'timeline',
    label: 'Futás ideje',
    events: [
      { t: '0 km', label: 'Start' },
      { t: '8 km', label: 'Cél (40 perc)' }
    ]
  },
  options: ['4 perc', '5 perc', '6 perc', '8 perc'],
  answer: '5 perc',
  keywords: ['arány', 'edzés', 'tempó'],
  solution: '$40 / 8 = \\mathbf{5}$ perc/km.'
};
