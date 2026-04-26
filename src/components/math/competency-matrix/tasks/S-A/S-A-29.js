export default {
  id: 'S-A-29',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Venn — csak olvas',
  difficulty: 4,
  scenario: 'Egy könyvtári kérdőívre 40 fő válaszolt. **22** olvas szépirodalmat, **18** szakkönyvet, **10** mindkettőt.',
  question: 'Hányan olvasnak **csak szépirodalmat**?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Szépirod.',
        color: '#ec4899'
      },
      {
        label: 'Szakkönyv',
        color: '#2563eb'
      }
    ],
    regions: {
      onlyA: 12,
      onlyB: 8,
      both: 10,
      neither: 10
    },
    universe: 40
  },
  options: ['8', '10', '12', '18'],
  answer: '12',
  keywords: ['Venn', 'metszet'],
  solution: `**Csak szépirodalom:** $22 - 10 = \\mathbf{12}$.

**A helyes válasz: 12.**`
};
