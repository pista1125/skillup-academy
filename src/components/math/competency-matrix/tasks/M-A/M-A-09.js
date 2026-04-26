export default {
  id: 'M-A-09',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.1',
  title: 'Főző-hőmérő',
  difficulty: 3,
  scenario: 'A konyhai hőmérő skáláját nézed a pecsenye sütésekor. Az ideális maghőmérséklet **82 °C**.',
  question: 'Hány fokkal **kevesebb** az ideálisnál a most mutatott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 120,
    step: 10,
    unit: '°C',
    value: 68,
    label: 'Jelenlegi maghőmérséklet'
  },
  options: ['12 °C', '14 °C', '18 °C', '22 °C'],
  answer: '14 °C',
  keywords: ['skála', 'kivonás'],
  solution: `**Skála + kivonás:**

1. Leolvasás: a mutató **68 °C**-ot jelez.
2. Különbség: $82 - 68 = 14$ °C.

**14 °C-kal alacsonyabb az ideálisnál.**`
};
