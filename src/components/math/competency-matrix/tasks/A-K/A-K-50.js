export default {
  id: 'A-K-50',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Háromszög tükrözése koordinátarendszerben',
  difficulty: 7,
  scenario: `A koordinátarendszerben adott egy háromszög:

- $A(2; 1)$, $B(5; 1)$, $C(4; 4)$.

A háromszöget az $x$-tengelyre tükrözzük, majd az eredményt **2 egységgel felfelé** eltoljuk.`,
  question: 'Milyen koordinátájú lesz a $C$ csúcs képe a két lépés után?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 7,
    yMin: -5,
    yMax: 5,
    points: [
      { label: 'A', x: 2, y: 1 },
      { label: 'B', x: 5, y: 1 },
      { label: 'C', x: 4, y: 4 }
    ]
  },
  options: ['(4; −2)', '(4; 2)', '(4; −6)', '(−4; 4)'],
  answer: '(4; −2)',
  keywords: ['tükrözés', 'eltolás', 'koordináta'],
  solution: `**1. lépés — tükrözés az $x$-tengelyre:** $(x;\\,y) \\to (x;\\,-y)$.

- $C(4;\\,4) \\to C'(4;\\,-4)$.

**2. lépés — eltolás +2 függőlegesen:** $(x;\\,y) \\to (x;\\,y+2)$.

- $C'(4;\\,-4) \\to C''(4;\\,-2)$.

**Végső: $C'' = (4;\\,-2)$.**`
};
