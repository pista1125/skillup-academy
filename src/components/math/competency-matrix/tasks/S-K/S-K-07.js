export default {
  id: 'S-K-07',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Állatkerti felmérés — két halmaz',
  difficulty: 7,
  scenario: `Egy állatkerti látogatáson 40 diákot kérdeztek meg, ki látta az **elefántot** (E) és/vagy a **zsiráfot** (Z). Az adatok:

- **28** diák látta az elefántot.
- **22** diák látta a zsiráfot.
- **5** diák **egyiket sem** látta.`,
  question: 'Hány diák látta **mindkét** állatot?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Elefánt',
        color: '#6b7280'
      },
      {
        label: 'Zsiráf',
        color: '#eab308'
      }
    ],
    regions: {
      onlyA: 13,
      onlyB: 7,
      both: 15,
      neither: 5
    },
    universe: 40
  },
  options: ['10', '13', '15', '18'],
  answer: '15',
  keywords: ['Venn-diagram', 'szitaformula', 'halmazok'],
  solution: `**Szitaformula:**

A valamelyiket látta: $40 - 5 = 35$ diák.

$$|E \\cup Z| = |E| + |Z| - |E \\cap Z|$$

$$35 = 28 + 22 - |E \\cap Z|$$

$$|E \\cap Z| = 50 - 35 = \\mathbf{15}$$

**Ellenőrzés Venn-diagrammal:**

- Csak elefánt: $28 - 15 = 13$
- Csak zsiráf: $22 - 15 = 7$
- Mindkettő: $15$
- Egyiket sem: $5$
- Összesen: $13 + 7 + 15 + 5 = 40$ ✓

**A helyes válasz: 15 diák.**`
};
