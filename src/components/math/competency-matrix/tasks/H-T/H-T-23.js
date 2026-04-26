export default {
  id: 'H-T-23',
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
      ['Piros', '45'],
      ['Kék', '38'],
      ['Zöld', '52'],
      ['Sárga', '41']
    ]
  },
  options: ['Piros', 'Kék', 'Zöld', 'Sárga'],
  answer: 'Zöld',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **Zöld** = 52.'
};
