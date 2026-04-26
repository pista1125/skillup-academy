export default {
  id: 'A-K-15',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Festett kocka — belseje',
  difficulty: 6,
  scenario: 'Egy **3 × 3 × 3-as** kockát kívülről befestünk, majd szétszedjük.',
  question: 'Hány kis kockának nincs festett oldala?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'inner'
  },
  options: ['0', '1', '6', '8'],
  answer: '1',
  keywords: ['festett kocka', 'térbeli'],
  solution: 'Belső = a $(n-2)^3 = 1^3 = \\mathbf{1}$ db kocka.'
};
