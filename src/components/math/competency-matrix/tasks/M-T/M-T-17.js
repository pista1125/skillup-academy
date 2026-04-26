export default {
  id: 'M-T-17',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — liszt',
  difficulty: 2,
  scenario: 'A rajzon egy konyhai mérleg kijelzése látható.',
  question: 'Hány g a leolvasott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 2000,
    step: 200,
    unit: 'g',
    value: 1400,
    label: 'Konyhai mérleg'
  },
  options: ['1200 g', '1400 g', '1600 g', '1800 g'],
  answer: '1400 g',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **1400 g**-nál áll.

**A helyes válasz: 1400 g.**`
};
