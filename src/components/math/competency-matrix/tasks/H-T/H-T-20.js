export default {
  id: 'H-T-20',
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
      ['A', '12.4'],
      ['B', '12.04'],
      ['C', '14.2'],
      ['D', '13.8']
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **C** = 14.2.'
};
