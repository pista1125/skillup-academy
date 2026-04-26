export default {
  id: 'M-T-19',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — hőmérséklet',
  difficulty: 2,
  scenario: 'A rajzon egy hőmérő kijelzése látható.',
  question: 'Hány °C a leolvasott érték?',
  visual: {
    type: 'scale',
    min: -20,
    max: 40,
    step: 5,
    unit: '°C',
    value: 18,
    label: 'Hőmérő'
  },
  options: ['13 °C', '18 °C', '23 °C', '28 °C'],
  answer: '18 °C',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **18 °C**-nál áll.

**A helyes válasz: 18 °C.**`
};
