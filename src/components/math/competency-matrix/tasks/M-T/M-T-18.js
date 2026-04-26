export default {
  id: 'M-T-18',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — sebesség',
  difficulty: 2,
  scenario: 'A rajzon egy sebességmérő kijelzése látható.',
  question: 'Hány km/h a leolvasott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 100,
    step: 10,
    unit: 'km/h',
    value: 65,
    label: 'Sebességmérő'
  },
  options: ['55 km/h', '65 km/h', '75 km/h', '85 km/h'],
  answer: '65 km/h',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **65 km/h**-nál áll.

**A helyes válasz: 65 km/h.**`
};
