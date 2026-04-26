export default {
  id: 'S-A-37',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Hobbi — metszet számítás',
  difficulty: 4,
  scenario: 'Az osztályban 25 diákból **15** szereti a focit, **12** az úszást. Összesen **22** diák kedveli legalább az egyiket.',
  question: 'Hányan szeretik **mindkettőt**?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Foci',
        color: '#22c55e'
      },
      {
        label: 'Úszás',
        color: '#0ea5e9'
      }
    ],
    regions: {
      onlyA: 10,
      onlyB: 7,
      both: 5,
      neither: 3
    },
    universe: 25
  },
  options: ['3', '5', '7', '10'],
  answer: '5',
  keywords: ['Venn', 'szitaformula'],
  solution: `**Szitaformula:** $|F \\cup Ú| = |F| + |Ú| - |F \\cap Ú|$.

$22 = 15 + 12 - x \\Rightarrow x = 27 - 22 = \\mathbf{5}$.

**A helyes válasz: 5.**`
};
