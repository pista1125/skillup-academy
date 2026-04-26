export default {
  id: 'A-A-30',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Akvárium — festendő felület',
  difficulty: 4,
  scenario: 'Egy **tető nélküli** akvárium külső méretei **50 cm × 30 cm × 20 cm**. Az üveg külső oldalát beöntőzzük (5 oldal).',
  question: 'Mekkora a befestendő **felület** összesen?',
  visual: {
    type: 'box3d',
    box: {
      l: 50,
      w: 30,
      h: 20
    },
    unit: 'cm'
  },
  options: ['3100 cm²', '4700 cm²', '5700 cm²', '6200 cm²'],
  answer: '4700 cm²',
  keywords: ['felszín', 'téglatest', 'akvárium'],
  solution: `A tető nélküli akváriumnak **5 oldala** van: az alja és 4 függőleges oldal.

- **Alj:** $50 \\cdot 30 = 1500$ cm²
- **Két hosszú oldal:** $2 \\cdot (50 \\cdot 20) = 2000$ cm²
- **Két rövid oldal:** $2 \\cdot (30 \\cdot 20) = 1200$ cm²

Összesen: $1500 + 2000 + 1200 = \\mathbf{4700}$ cm².`
};
