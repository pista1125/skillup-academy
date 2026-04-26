export default {
  id: 'A-A-11',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Befoglaló doboz',
  difficulty: 5,
  scenario: 'Egy **4 cm × 3 cm × 2 cm**-es téglatestet egy **kocka** alakú dobozba szeretnénk tenni.',
  question: 'Mekkora a **legkisebb** kocka éle, amelybe a téglatest belefér?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 4,
    unit: 'cm'
  },
  options: ['2 cm', '3 cm', '4 cm', '9 cm'],
  answer: '4 cm',
  keywords: ['befoglaló test', 'térbeli gondolkodás'],
  solution: `**Lépések:**

1. A kocka minden éle egyforma.
2. Legalább a téglatest **legnagyobb** élhossza kell: $\\max(4, 3, 2) = 4$.
3. A legkisebb kocka éle: $\\mathbf{4}$ cm.`
};
