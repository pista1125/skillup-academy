export default {
  id: 'S-A-40',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kórházi ágyfoglaltság',
  difficulty: 5,
  scenario: 'Egy kórházi részlegen 10 napon át feljegyezték a foglalt ágyak számát: $8, 10, 9, 10, 11, 10, 9, 12, 10, 11$.',
  question: 'Mennyi a **módusz**?',
  options: ['9', '10', '11', '12'],
  answer: '10',
  keywords: ['módusz'],
  solution: `Gyakoriságok: 8 → 1, 9 → 2, **10 → 4**, 11 → 2, 12 → 1.

A leggyakoribb a **10**.

**A helyes válasz: 10.**`
};
