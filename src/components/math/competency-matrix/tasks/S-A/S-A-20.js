export default {
  id: 'S-A-20',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Venn — zenei klub és sportkör',
  difficulty: 4,
  scenario: 'Egy 30 fős osztályban **14** tanuló jár zenei klubba, **16** sportkörbe, és **6** tanuló **mindkettőbe**.',
  question: 'Hány tanuló jár **legalább az egyikbe**?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Zene',
        color: '#a855f7'
      },
      {
        label: 'Sport',
        color: '#22c55e'
      }
    ],
    regions: {
      onlyA: 8,
      onlyB: 10,
      both: 6,
      neither: 6
    },
    universe: 30
  },
  options: ['20', '24', '26', '30'],
  answer: '24',
  keywords: ['Venn', 'szitaformula'],
  solution: `**Szitaformula:**

$$|Z \\cup S| = 14 + 16 - 6 = \\mathbf{24}$$

**A helyes válasz: 24.**`
};
