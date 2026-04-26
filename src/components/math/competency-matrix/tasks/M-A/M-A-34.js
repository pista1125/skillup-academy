export default {
  id: 'M-A-34',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Piknik — szendvicsek elosztása',
  difficulty: 4,
  scenario: 'A piknik előtt **48 szendvicset** csomagolnak, ez **8 főre**, de még **4 vendég** érkezik.',
  question: 'Mennyivel kevesebb szendvics jut **1 főre**, ha most már **12 fő** között osztják el?',
  visual: {
    type: 'comparison',
    items: [
      { label: '8 főre', formula: '48 / 8', result: '6 db/fő' },
      { label: '12 főre', formula: '48 / 12', result: '4 db/fő' }
    ]
  },
  options: ['1 db', '2 db', '3 db', '4 db'],
  answer: '2 db',
  keywords: ['osztás', 'különbség', 'piknik'],
  solution: '8 főre: 6 db/fő, 12 főre: 4 db/fő. Különbség: $6 - 4 = \\mathbf{2}$ db/fő kevesebb.'
};
