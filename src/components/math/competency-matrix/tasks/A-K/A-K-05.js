export default {
  id: 'A-K-05',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Hajózási útvonal',
  difficulty: 6,
  scenario: 'Egy hajó az **A(−3; −2)** pontból indul és a **B(4; 3)** pontban kiköt. Az útvonal **két egyenes** szakaszból áll: először csak **kelet** felé halad, majd csak **észak** felé.',
  question: 'Milyen koordinátájú a **fordulópont**, és mennyit kellett összesen haladnia (rácsegységben)?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: -3,
        y: -2
      },
      {
        label: 'F',
        x: 4,
        y: -2
      },
      {
        label: 'B',
        x: 4,
        y: 3
      }
    ]
  },
  answer: 'F(4; −2); összesen 12 egység',
  keywords: ['koordináta', 'útvonal', 'hajózás'],
  solution: `**Lépések:**

1. Először keletre: $y$ változatlan $(-2)$, $x$ eléri $B$ értékét: $4$. → **F(4; −2)**.
2. Kelet felé út: $4 - (-3) = 7$ egység.
3. Észak felé út: $3 - (-2) = 5$ egység.
4. Összesen: $7 + 5 = \\mathbf{12}$ rácsegység.`
};
