export default {
  id: 'A-K-30',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Irányok és koordináta',
  difficulty: 6,
  scenario: 'Egy futár a **(−2;1)** pontból **délkeletre** halad **3 egységet** (feltéve, hogy a délkelet +1 $x$, −1 $y$ irány egységvektor-nyi lépésekben).',
  question: 'Hova ér?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'S',
        x: -2,
        y: 1
      }
    ]
  },
  answer: '(1; −2)',
  keywords: ['égtájak', 'koordináta'],
  solution: `Délkeletre 3 lépés: $(+3; -3)$ eltolás.

$(-2; 1) + (3; -3) = (\\mathbf{1; -2})$.`
};
