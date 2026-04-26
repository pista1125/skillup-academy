export default {
  id: 'A-K-49',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Labirintus — szimmetria',
  difficulty: 6,
  scenario: `Egy négyzet alakú labirintus **bal fele** látható:

- folyosók pontjai: $(1;1)$, $(1;2)$, $(1;3)$, $(2;3)$, $(3;3)$.

A labirintus a **függőleges középtengelyre** szimmetrikus.`,
  question: 'Hány pontból áll a **teljes** labirintus folyosója, ha a tengelyen is megőrizzük az ott lévő pontot?',
  visual: {
    type: 'symmetryHalf',
    axis: 'y',
    halfPoints: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 }
    ]
  },
  options: ['5', '8', '9', '10'],
  answer: '9',
  keywords: ['szimmetria', 'tengely', 'tükrözés'],
  solution: `A tengely az $x = 3$-nál van (középen). Minden pontot tükrözünk ide: $(x;y) \\to (6-x;\\,y)$.

- $(1;1) \\to (5;1)$ (új)
- $(1;2) \\to (5;2)$ (új)
- $(1;3) \\to (5;3)$ (új)
- $(2;3) \\to (4;3)$ (új)
- $(3;3) \\to (3;3)$ — **a tengelyen**, nem duplikálódik.

Új pontok: **4**, eredeti: **5**, összesen: $5 + 4 = \\mathbf{9}$.`
};
