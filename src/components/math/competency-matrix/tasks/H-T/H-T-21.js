export default {
  id: 'H-T-21',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Legnagyobb érték keresése',
  difficulty: 2,
  scenario: 'A táblázat ${s.rows.length} érték.',
  question: 'Melyiknek van a **legnagyobb** értéke?',
  visual: {
    type: 'table',
    caption: 'Adatok',
    headers: ['Jel', 'Érték'],
    rows: [
      ['X', '8.5'],
      ['Y', '8.05'],
      ['Z', '9'],
      ['W', '7.8']
    ]
  },
  options: ['X', 'Y', 'Z', 'W'],
  answer: 'Z',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **Z** = 9.'
};
