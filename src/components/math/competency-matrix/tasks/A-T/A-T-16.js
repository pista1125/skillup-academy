export default {
  id: 'A-T-16',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Rajzterem koordinátái',
  difficulty: 2,
  scenario: 'A rajzterem padlójára koordináta-rendszert rajzoltak. Három állvány van: **F(2; 1)**, **K(4; 3)** és **R(1; 4)**.',
  question: 'Melyik állvány van a **legmagasabban** (legnagyobb $y$-koordináta)?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
    points: [
      { label: 'F', x: 2, y: 1 },
      { label: 'K', x: 4, y: 3 },
      { label: 'R', x: 1, y: 4 }
    ]
  },
  options: ['F', 'K', 'R', 'Mindhárom azonos magasságban'],
  answer: 'R',
  keywords: ['koordináta', 'leolvasás'],
  solution: `A $y$-koordináta a **függőleges** helyzetet adja meg: minél nagyobb, annál magasabban van.

- F: $y = 1$
- K: $y = 3$
- **R: $y = 4$** ← legnagyobb

A helyes válasz: **R**.`
};
