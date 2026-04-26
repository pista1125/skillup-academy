export default {
  id: 'A-A-08',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Labdák csomagolása',
  difficulty: 4,
  scenario: 'Egy **20 cm × 10 cm × 10 cm** méretű dobozba **5 cm élű** kocka alakú ajándékokat pakolunk.',
  question: 'Hány kocka fér a dobozba hézagmentesen?',
  visual: {
    type: 'box3d',
    box: {
      l: 20,
      w: 10,
      h: 10
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['8', '12', '16', '20'],
  answer: '16',
  keywords: ['térfogat', 'pakolás'],
  solution: `**Lépések:**

1. Hosszában: $20 \\div 5 = 4$ kocka.
2. Szélességében: $10 \\div 5 = 2$ kocka.
3. Magasságban: $10 \\div 5 = 2$ kocka.
4. Összesen: $4 \\cdot 2 \\cdot 2 = \\mathbf{16}$ kocka.`
};
