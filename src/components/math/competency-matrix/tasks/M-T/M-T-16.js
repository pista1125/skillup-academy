export default {
  id: 'M-T-16',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — cukor',
  difficulty: 2,
  scenario: 'A rajzon egy digitális mérleg kijelzése látható.',
  question: 'Hány g a leolvasott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 500,
    step: 50,
    unit: 'g',
    value: 350,
    label: 'Digitális mérleg'
  },
  options: ['300 g', '350 g', '400 g', '450 g'],
  answer: '350 g',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **350 g**-nál áll.

**A helyes válasz: 350 g.**`
};
