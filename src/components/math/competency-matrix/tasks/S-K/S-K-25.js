export default {
  id: 'S-K-25',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Medián gyakoriságból',
  difficulty: 6,
  scenario: 'Az osztály 25 tanulójának magasságát táblázat mutatja.',
  question: 'Mennyi a **medián** magasság?',
  visual: {
    type: 'frequencyTable',
    caption: 'Magasságok (cm)',
    headers: ['Magasság', 'Tanulók'],
    rows: [
      ['145', 3],
      ['150', 5],
      ['155', 7],
      ['160', 6],
      ['165', 4]
    ]
  },
  options: ['150', '155', '157,5', '160'],
  answer: '155',
  keywords: ['medián', 'gyakoriság'],
  solution: `**Páratlan elemszám (25):** a **13.** elem a medián.

Kumulatív gyakoriság: 145 → 3, 150 → 8, 155 → 15, ...

A 13. elem a **155 cm** sávba esik.

**A helyes válasz: 155 cm.**`
};
