export default {
  id: 'A-T-18',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Zászló szimmetriatengelye',
  difficulty: 2,
  scenario: 'Egy téglalap alakú zászlón három vízszintes, egyenlő szélességű sáv látható: piros–fehér–piros.',
  question: 'Hány tengelyes szimmetriatengelye van a zászló mintázatának?',
  visual: {
    type: 'rectangle',
    widthM: 9,
    heightM: 6,
    label: 'zászló',
    fill: '#f5b0b0',
    unit: 'cm'
  },
  options: ['0', '1', '2', '4'],
  answer: '2',
  keywords: ['szimmetria', 'tengely', 'zászló'],
  solution: `A piros–fehér–piros csíkozás **fent és lent egyforma**, ezért a zászló középvonalára (vízszintes tengely) tükrös.

A téglalap függőleges felezővonalára is tükrös (a sávok ott is egybeesnek).

Összesen: **2 szimmetriatengely**.`
};
