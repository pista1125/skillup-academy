export default {
  id: 'M-A-11',
  contentArea: 'M',
  contentSub: '1.2.6',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Taxi viteldíj',
  difficulty: 4,
  scenario: 'A taxi viteldíját a $D = 700 + 320 \\cdot k$ képlettel számolják, ahol **k** a megtett kilométer.',
  question: 'Mennyibe kerül egy **8 km**-es út?',
  visual: {
    type: 'formula',
    formula: 'D = 700 + 320 · k',
    variables: [
      {
        name: '700 Ft',
        desc: 'alapdíj'
      },
      {
        name: '320 Ft',
        desc: 'km-enkénti díj'
      },
      {
        name: 'k',
        desc: 'megtett km'
      }
    ],
    example: {
      k: 8
    }
  },
  options: ['2 560 Ft', '2 860 Ft', '3 260 Ft', '3 560 Ft'],
  answer: '3 260 Ft',
  keywords: ['behelyettesítés', 'szöveges feladat'],
  solution: `**Behelyettesítés:**

$$D = 700 + 320 \\cdot 8 = 700 + 2560 = 3260\\ \\text{Ft}.$$

**A helyes válasz: 3 260 Ft.**`
};
