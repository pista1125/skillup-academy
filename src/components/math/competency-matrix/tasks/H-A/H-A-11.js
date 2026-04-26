export default {
  id: 'H-A-11',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Ismeretlen szám',
  difficulty: 4,
  scenario: 'Gondoltam egy számra. Ha **megszorzom 4-gyel** és **hozzáadok 7-et**, az eredmény **35** lesz.',
  question: 'Melyik számra gondoltam?',
  visual: {
    type: 'formula',
    formula: '4 · x + 7 = 35',
    variables: [
      {
        name: 'x',
        desc: 'a gondolt szám'
      }
    ]
  },
  options: ['5', '7', '8', '10'],
  answer: '7',
  keywords: ['egyenlet', 'megoldás'],
  solution: `**Egyenlet megoldása:**

$4x + 7 = 35$

$4x = 35 - 7 = 28$

$x = 28 / 4 = \\mathbf{7}$.

Ellenőrzés: $4 \\cdot 7 + 7 = 28 + 7 = 35$ ✓`
};
