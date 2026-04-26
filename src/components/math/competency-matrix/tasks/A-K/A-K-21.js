export default {
  id: 'A-K-21',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kettős tükrözés',
  difficulty: 7,
  scenario: 'A $P(1;2)$ pontot tükrözzük először az **$x$-tengelyre**, majd az eredményt a **$y$-tengelyre**.',
  question: 'Mik a végpont koordinátái, és ez milyen egyszerűbb transzformációnak felel meg?',
  visual: {
    type: 'coordinateGrid',
    xMin: -4,
    xMax: 4,
    yMin: -4,
    yMax: 4,
    points: [
      {
        label: 'P',
        x: 1,
        y: 2
      }
    ]
  },
  answer: '(−1; −2); középpontos tükrözés az origóra',
  keywords: ['tükrözés', 'transzformáció', 'kompozíció'],
  solution: `1. $P(1;2) \\to P'(1;-2)$ ($x$-tengelyre).
2. $P'(1;-2) \\to P''(\\mathbf{-1;-2})$ ($y$-tengelyre).

Két egymásra merőleges tengelyre tükrözés = **középpontos tükrözés** a metszéspontra (itt az origóra).`
};
