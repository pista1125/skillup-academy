export default {
  id: 'A-K-07',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Szimmetrikus kertrajz',
  difficulty: 6,
  scenario: 'Egy kertterv **függőlegesen szimmetrikus**. A bal oldalon három fontos pont található: kapu $K(-4; 0)$, szökőkút $S(-2; 3)$ és pad $P(-1; -2)$. A jobb oldalon ugyanilyen elrendezés van, tükrözve.',
  question: 'Mik a jobb oldali pontok koordinátái?',
  visual: {
    type: 'symmetryHalf',
    axis: 'vertical',
    halfPoints: [
      {
        x: -4,
        y: 0
      },
      {
        x: -2,
        y: 3
      },
      {
        x: -1,
        y: -2
      }
    ]
  },
  answer: 'K\'(4; 0), S\'(2; 3), P\'(1; −2)',
  keywords: ['szimmetria', 'tükrözés', 'koordináta', 'kertterv'],
  solution: `**Függőleges tengelyre tükrözés:** $x \\to -x$, $y$ változatlan.

1. $K(-4;\\ 0) \\to K'(\\mathbf{4;\\ 0})$.
2. $S(-2;\\ 3) \\to S'(\\mathbf{2;\\ 3})$.
3. $P(-1;\\ -2) \\to P'(\\mathbf{1;\\ -2})$.`
};
