export default {
  id: 'A-K-19',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Festett kocka 4×4×4 — 2 oldal',
  difficulty: 7,
  scenario: 'Egy **4 × 4 × 4**-es kockát befestünk, majd szétszedjük.',
  question: 'Hány kis kockának lesz **pontosan 2 oldala** festett?',
  visual: {
    type: 'bigCube',
    n: 4,
    highlight: 'edge'
  },
  options: ['8', '12', '24', '36'],
  answer: '24',
  keywords: ['festett kocka', 'kombinatorika'],
  solution: '$n = 4$, egy élen $(n-2) = 2$ kis kocka van 2 festett lappal. 12 él × 2 = **24**.'
};
