export default {
  id: 'A-K-06',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Akvárium felszíne',
  difficulty: 6,
  scenario: 'Egy **nyitott tetejű** akvárium mérete **50 cm × 30 cm × 40 cm** (hossz × szélesség × magasság). Be akarjuk vonni az üveglapokat matricával **kívülről** (a tető nyitott, oda nem kell matrica).',
  question: 'Hány **cm²** matricára lesz szükség?',
  visual: {
    type: 'box3d',
    box: {
      l: 50,
      w: 30,
      h: 40
    },
    cubeEdge: 10,
    unit: 'cm'
  },
  answer: '7900 cm²',
  keywords: ['felszín', 'téglatest', 'gyakorlati feladat'],
  solution: `**Lépések (tető nélkül):**

1. Alj: $50 \\cdot 30 = 1500$ cm².
2. Két hosszú oldal: $2 \\cdot (50 \\cdot 40) = 4000$ cm².
3. Két rövid oldal: $2 \\cdot (30 \\cdot 40) = 2400$ cm².
4. Összesen: $1500 + 4000 + 2400 = \\mathbf{7900}$ cm².`
};
