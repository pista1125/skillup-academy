export default {
  id: 'M-T-30',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Sorozat — következő tag',
  difficulty: 2,
  scenario: 'Az alábbi számsorozat szabályát kell felismerned.',
  question: 'Mi a **következő** szám: $3, 7, 11, 15, ?$',
  visual: {
    type: 'sequence',
    items: [3, 7, 11, 15, '?'],
    rule: '+4'
  },
  options: ['17', '18', '19', '20'],
  answer: '19',
  keywords: ['sorozat', 'szabályszerűség'],
  solution: 'Minden lépésben **+4**-et adunk. $15 + 4 = \\mathbf{19}$.'
};
