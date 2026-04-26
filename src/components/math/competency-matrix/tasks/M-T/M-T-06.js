export default {
  id: 'M-T-06',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérő leolvasása',
  difficulty: 2,
  scenario: 'Téli reggelen Kati megnézi a kinti hőmérőt a kertben.',
  question: 'Hány Celsius fokot mutat a hőmérő?',
  visual: {
    type: 'numberLine',
    min: -10,
    max: 10,
    divisions: 20,
    points: [
      {
        x: -4,
        label: 'H'
      }
    ]
  },
  options: ['$-6\\,°C$', '$-4\\,°C$', '$4\\,°C$', '$6\\,°C$'],
  answer: '$-4\\,°C$',
  keywords: ['számegyenes', 'negatív szám', 'hőmérséklet'],
  solution: `**Számegyenes leolvasása:**

1. A skála $-10$-től $+10$-ig tart, **20 egyenlő** részre van osztva (1 fokos osztások).
2. A 0-tól **balra** 4 osztásra van a jelölés → negatív irány.
3. A mutatott érték: $\\mathbf{-4\\,°C}$.`
};
