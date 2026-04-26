export default {
  id: 'M-K-44',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vegyes munka — autómosás',
  difficulty: 6,
  scenario: 'Apa **8 percenként**, fia **12 percenként** mos meg egy autót. **2 óra** alatt hány autót mosnak meg **együtt** (párhuzamosan dolgozva)?',
  question: 'Hány autót mosnak meg **összesen**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Apa', formula: '120 / 8', result: '15 db' },
      { label: 'Fia', formula: '120 / 12', result: '10 db' }
    ]
  },
  options: ['20 db', '22 db', '25 db', '30 db'],
  answer: '25 db',
  keywords: ['arány', 'munkaidő'],
  solution: `Apa: $120/8 = 15$ db. Fia: $120/12 = 10$ db.

Együtt: $15 + 10 = \\mathbf{25}$ db.`
};
