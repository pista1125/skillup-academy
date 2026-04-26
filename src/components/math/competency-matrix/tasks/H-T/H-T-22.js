export default {
  id: 'H-T-22',
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
      ['Anna', '132'],
      ['Bea', '145'],
      ['Cili', '138'],
      ['Dóri', '150']
    ]
  },
  options: ['Anna', 'Bea', 'Cili', 'Dóri'],
  answer: 'Dóri',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **Dóri** = 150.'
};
