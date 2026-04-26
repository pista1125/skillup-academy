export default {
  id: 'M-T-01',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Konyhai mérleg',
  difficulty: 2,
  scenario: 'Anna egy digitális mérleget lát a konyhában.',
  question: 'Hány gramm a mérlegen látható lisztmennyiség?',
  visual: {
    type: 'scale',
    min: 0,
    max: 1000,
    step: 100,
    unit: 'g',
    value: 650,
    label: 'Mérleg kijelzése'
  },
  options: ['550 g', '600 g', '650 g', '700 g'],
  answer: '650 g',
  keywords: ['skála', 'leolvasás', 'mérleg'],
  solution: `**Skálaleolvasás lépései:**

1. A skálán **0-tól 1000 g-ig** terjed a tartomány, 100 g-os osztásokkal.
2. A mutató a **600 g** és **700 g** közötti szakasz közepén áll — ez **650 g**.
3. Helyes válasz: **650 g**.`
};
