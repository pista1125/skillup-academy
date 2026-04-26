export default {
  id: 'H-A-46',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Színházszékek — n-edik sor',
  difficulty: 4,
  scenario: 'A nézőtér első sorában **18 szék** van; minden hátsóbb sorban **2-vel több**.',
  question: 'Hány szék van a **9. sorban**?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 18, label: '1. sor' },
      { count: 20, label: '2. sor' },
      { count: 22, label: '3. sor' },
      { count: 24, label: '4. sor' }
    ]
  },
  options: ['30', '32', '34', '36'],
  answer: '34',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_9 = 18 + 8 \\cdot 2 = \\mathbf{34}$ szék.'
};
