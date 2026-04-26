export default {
  id: 'M-K-37',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kombinatorika — kódlakat',
  difficulty: 7,
  scenario: 'Egy kódlakathoz **3 számjegyű kódot** kell megadni. Minden jegy **0-tól 9-ig** lehet, és a jegyek **ismétlődhetnek**.',
  question: 'Hány **különböző kód** állítható össze?',
  visual: {
    type: 'formula',
    formula: '10 × 10 × 10 = ?',
    variables: []
  },
  options: ['30', '300', '720', '1000'],
  answer: '1000',
  keywords: ['kombinatorika', 'variáció ismétléssel'],
  solution: 'Minden helyre 10 választás, független: $10 \\cdot 10 \\cdot 10 = \\mathbf{1000}$ kód.'
};
