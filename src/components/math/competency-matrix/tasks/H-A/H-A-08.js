export default {
  id: 'H-A-08',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gyümölcskosár',
  difficulty: 4,
  scenario: 'Egy gyümölcskosárban az alma és a körte aránya **3 : 2**. Összesen **30 gyümölcs** van a kosárban.',
  question: 'Hány darab **alma** van a kosárban?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Alma : Körte',
        formula: '3 : 2',
        result: ''
      },
      {
        label: 'Összesen',
        formula: 'A + K = 30',
        result: 'A = ?'
      }
    ]
  },
  options: ['12', '15', '18', '20'],
  answer: '18',
  keywords: ['arány', 'arányos osztás'],
  solution: `**Arányos osztás:**

$3 + 2 = 5$ rész, ez összesen 30 gyümölcs.

1 rész $= 30 / 5 = 6$ gyümölcs.

Alma: $3 \\cdot 6 = \\mathbf{18}$.

Körte: $2 \\cdot 6 = 12$. Ellenőrzés: $18 + 12 = 30$ ✓`
};
