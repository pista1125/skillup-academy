export default {
  id: 'A-A-38',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Asztalterítő mintája — szimmetria',
  difficulty: 4,
  scenario: 'Egy négyzet alakú asztalterítő mintája úgy készül, hogy egy kisebb négyzetet **45°-kal elforgatva** ráhelyeznek. A végső minta egy négyzet benne egy „gyémánt"-tal.',
  question: 'Hány szimmetriatengelye van a teljes mintázatnak?',
  visual: {
    type: 'grid',
    w: 6,
    h: 6,
    shadedCells: [
      [3, 1],
      [2, 2],
      [4, 2],
      [1, 3],
      [5, 3],
      [2, 4],
      [4, 4],
      [3, 5]
    ]
  },
  options: ['2', '4', '6', '8'],
  answer: '4',
  keywords: ['szimmetria', 'négyzet', 'tengelyek'],
  solution: `A négyzetnek **4 szimmetriatengelye** van: 2 középvonal (vízszintes, függőleges) és 2 átló.

A 45°-kal elforgatott belső négyzetnek szintén 4 szimmetriatengelye van, de ezek **egybeesnek** az eredeti négyzet tengelyeivel (ami az egyikre tükör, az a másikra átló).

A közös szimmetriák: **4 tengely**.`
};
