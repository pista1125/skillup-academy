export default {
  id: 'S-K-17',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Három sportág — hány csak egyet űz?',
  difficulty: 7,
  scenario: `Az 50 fős osztályban sportolásra vonatkozó adatok:

- **Foci:** 18 fő
- **Kosár:** 15 fő
- **Úszás:** 12 fő
- **Foci ÉS kosár:** 6 fő
- **Foci ÉS úszás:** 5 fő
- **Kosár ÉS úszás:** 4 fő
- **Mindhárom:** 2 fő`,
  question: 'Hányan űznek **pontosan egy** sportágat?',
  options: ['17', '21', '25', '29'],
  answer: '21',
  keywords: ['3-halmaz', 'Venn', 'pontosan egy'],
  solution: `**Képlet a „csak X" régiókra:** $|X| - |X \\cap Y| - |X \\cap Z| + |X \\cap Y \\cap Z|$.

- **Csak foci:** $18 - 6 - 5 + 2 = 9$
- **Csak kosár:** $15 - 6 - 4 + 2 = 7$
- **Csak úszás:** $12 - 5 - 4 + 2 = 5$

**Összeg (pontosan egy):** $9 + 7 + 5 = \\mathbf{21}$.

**A helyes válasz: 21.**`
};
