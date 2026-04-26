export default {
  id: 'S-K-02',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Halmazok — sportágak',
  difficulty: 6,
  scenario: `Egy 30 fős osztályban megkérdezték, ki focizik és ki kosarazik rendszeresen.

- **18** tanuló focizik.
- **12** tanuló kosarazik.
- **7** tanuló **mindkettőt** űzi.`,
  question: 'Hány tanuló **nem** sportol rendszeresen egyik felsorolt sportágat sem?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Foci',
        color: '#2563eb'
      },
      {
        label: 'Kosár',
        color: '#f59e0b'
      }
    ],
    regions: {
      onlyA: 11,
      onlyB: 5,
      both: 7,
      neither: '?'
    },
    universe: 30
  },
  options: ['3', '5', '7', '11'],
  answer: '7',
  keywords: ['halmaz', 'Venn-diagram', 'szitaformula'],
  solution: `**Venn-diagram régiói:**

- Csak foci: $18 - 7 = 11$
- Csak kosár: $12 - 7 = 5$
- Mindkettő: $7$

**Valamelyiket űzi:** $11 + 5 + 7 = 23$ tanuló.

**Egyiket sem:** $30 - 23 = \\mathbf{7}$ tanuló.

Ellenőrzés szitaformulával: $|A \\cup B| = 18 + 12 - 7 = 23$ ✓

**A helyes válasz: 7 tanuló.**`
};
