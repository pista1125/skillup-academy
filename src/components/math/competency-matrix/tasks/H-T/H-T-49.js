export default {
  id: 'H-T-49',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Kávézó — bögreszám',
  difficulty: 2,
  scenario: 'A kávézóban minden asztalon 4 bögre található; egy reggel 7 asztal van megterítve.',
  question: 'Összesen hány **bögre** van az asztalokon?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 4, label: '1. asztal' },
      { count: 4, label: '2. asztal' },
      { count: 4, label: '3. asztal' },
      { count: 4, label: '...' },
      { count: 4, label: '7. asztal' }
    ]
  },
  options: ['24', '26', '28', '32'],
  answer: '28',
  keywords: ['szorzás'],
  solution: '$7 \\cdot 4 = \\mathbf{28}$ bögre.'
};
