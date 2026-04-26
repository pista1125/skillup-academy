export default {
  id: 'A-T-45',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kocka nézete',
  difficulty: 2,
  scenario: 'Egy **4 × 4 × 4**-es kockát oldalról nézünk.',
  question: 'Milyen alakú az **oldalnézete**?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 4,
      h: 4
    },
    cubeEdge: 1,
    unit: 'cm'
  },
  options: ['Kör', 'Négyzet', 'Háromszög', 'Hatszög'],
  answer: 'Négyzet',
  keywords: ['nézet', 'kocka'],
  solution: 'Egy kockának minden lapja **négyzet**, ezért az oldalnézet is **négyzet**.'
};
