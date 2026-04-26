export default {
  id: 'H-K-06',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mozijegy',
  difficulty: 6,
  scenario: 'Egy moziban a **felnőtt jegy 1 800 Ft**, a **gyerekjegy 1 200 Ft**. Egy családi estére **7 jegyet** vettek, és összesen **11 400 Ft**-ot fizettek.',
  question: 'Hány **gyerekjegyet** vettek?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Jegyek száma',
        formula: 'F + Gy = 7',
        result: ''
      },
      {
        label: 'Ár',
        formula: '1800F + 1200Gy = 11400',
        result: 'Gy = ?'
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '2',
  keywords: ['egyenletrendszer', 'szöveges feladat'],
  solution: `**Egyenletrendszer:**

Legyen $F$ a felnőtt, $Gy$ a gyerekjegyek száma.

$F + Gy = 7 \\Rightarrow F = 7 - Gy$

Behelyettesítve az árképletbe: $1800(7 - Gy) + 1200Gy = 11\\,400$

$12\\,600 - 1800Gy + 1200Gy = 11\\,400$

$-600Gy = -1200 \\Rightarrow Gy = \\mathbf{2}$.

Felnőtt: $F = 5$.

Ellenőrzés: $5 \\cdot 1800 + 2 \\cdot 1200 = 9000 + 2400 = 11\\,400$ Ft ✓`
};
