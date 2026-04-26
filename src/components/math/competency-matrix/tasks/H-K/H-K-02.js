export default {
  id: 'H-K-02',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két testvér — életkor',
  difficulty: 7,
  scenario: 'Anna most **3-szor olyan idős**, mint a testvére, Peti. 5 év múlva Anna már csak **2-szer olyan idős** lesz, mint Peti.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 3 · P',
        result: 'A = ?, P = ?'
      },
      {
        label: '5 év múlva',
        formula: 'A + 5 = 2 · (P + 5)',
        result: ''
      }
    ]
  },
  answer: {
    Peti: 5,
    Anna: 15
  },
  keywords: ['egyenlet', 'szöveges feladat'],
  solution: `**Egyenlet felírása:**

Legyen Peti most $x$ éves. Anna: $3x$.

5 év múlva: Peti $x+5$, Anna $3x+5$, és $3x+5 = 2(x+5)$.

**Megoldás:**

$3x + 5 = 2x + 10$
$x = 5$

**Peti most 5, Anna 15 éves.**

Ellenőrzés 5 év múlva: Peti 10, Anna 20 → $20 = 2 \\cdot 10$ ✓`
};
