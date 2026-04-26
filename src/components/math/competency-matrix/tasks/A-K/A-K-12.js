export default {
  id: 'A-K-12',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kiállítás — tárlók elrendezése',
  difficulty: 6,
  scenario: `Egy kiállítás térképén négy tárló van:

- **T₁(1; 2)**, **T₂(5; 2)**, **T₃(5; 6)**, **T₄(1; 6)**.

A szervezők egy új tárlót (T₅) szeretnének elhelyezni, amely **a már kijelölt téglalap középpontjában** áll.`,
  question: 'Milyen koordinátájú T₅?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 7,
    yMin: 0,
    yMax: 7,
    points: [
      { label: 'T₁', x: 1, y: 2 },
      { label: 'T₂', x: 5, y: 2 },
      { label: 'T₃', x: 5, y: 6 },
      { label: 'T₄', x: 1, y: 6 }
    ]
  },
  options: ['(2; 4)', '(3; 4)', '(3; 3)', '(4; 4)'],
  answer: '(3; 4)',
  keywords: ['koordináta', 'középpont', 'téglalap'],
  solution: `A téglalap **középpontja** az átlók metszéspontja, amely az $x$ és $y$ koordináták **átlaga**.

- $x$-átlag: $\\dfrac{1 + 5}{2} = 3$.
- $y$-átlag: $\\dfrac{2 + 6}{2} = 4$.

**T₅ = (3; 4).**`
};
