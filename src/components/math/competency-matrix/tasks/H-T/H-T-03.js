export default {
  id: 'H-T-03',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat szabálya',
  difficulty: 2,
  scenario: 'A következő számsorozatot látod.',
  question: 'Mi a sorozat 7. eleme?',
  visual: {
    type: 'sequence',
    elements: ['3', '6', '9', '12', '15', '18', '?']
  },
  options: ['20', '21', '22', '24'],
  answer: '21',
  keywords: ['sorozat', 'szabály'],
  solution: `**Szabály felismerése:**

Minden elem **3-mal több** az előzőnél (számtani sorozat, különbség = 3).

- 6. elem: $18$
- 7. elem: $18 + 3 = \\mathbf{21}$.`
};
