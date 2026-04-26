export default {
  id: 'A-K-14',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Legkisebb befoglaló kocka',
  difficulty: 6,
  scenario: 'Egy szobor befoglaló téglatestje **7 cm × 5 cm × 4 cm**. Olyan **kocka** alakú vitrint készítünk, amelyben a szobor elfér, de a kocka éle **egész szám** cm.',
  question: 'Mekkora a **legkisebb** megfelelő kocka éle, és mennyi az üres tér térfogata?',
  visual: {
    type: 'box3d',
    box: {
      l: 7,
      w: 5,
      h: 4
    },
    cubeEdge: 7,
    unit: 'cm'
  },
  options: ['5 cm; 95 cm³', '7 cm; 203 cm³', '7 cm; 343 cm³', '8 cm; 372 cm³'],
  answer: '7 cm; 203 cm³',
  keywords: ['befoglaló test', 'térfogat', 'kocka'],
  solution: `A kockának be kell fogadnia a téglatest **legnagyobb élét**: $\\max(7,5,4) = 7$ cm.

**Kocka térfogata:** $7^3 = 343$ cm³.

**Szobor (téglatest) térfogata:** $7 \\cdot 5 \\cdot 4 = 140$ cm³.

**Üres tér:** $343 - 140 = \\mathbf{203}$ cm³.`
};
