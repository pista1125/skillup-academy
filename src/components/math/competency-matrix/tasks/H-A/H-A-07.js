export default {
  id: 'H-A-07',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Taxi viteldíj',
  difficulty: 4,
  scenario: 'Egy taxi viteldíja: **800 Ft alapdíj**, és **280 Ft** kilométerenként.',
  question: 'Mennyibe kerül egy **7 km-es** út?',
  visual: {
    type: 'formula',
    formula: 'díj = 800 + 280 · k',
    variables: [
      {
        name: 'k',
        desc: 'megtett kilométer'
      }
    ],
    example: {
      k: 7
    }
  },
  options: ['1 960 Ft', '2 240 Ft', '2 760 Ft', '3 080 Ft'],
  answer: '2 760 Ft',
  keywords: ['hozzárendelési szabály', 'behelyettesítés'],
  solution: `**Behelyettesítés:**

$\\text{díj} = 800 + 280 \\cdot 7 = 800 + 1960 = \\mathbf{2760}$ Ft.`
};
