export default {
  id: 'A-K-17',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Tükrözés és eltolás',
  difficulty: 6,
  scenario: 'A $P(2;3)$ pontot először az **$x$-tengelyre** tükrözzük, majd **$(+3; -1)$** vektorral **eltoljuk**.',
  question: 'Mik a végső koordináták?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 8,
    yMin: -6,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: 2,
        y: 3
      }
    ]
  },
  answer: '(5; −4)',
  keywords: ['tükrözés', 'eltolás', 'transzformáció'],
  solution: `1. Tükrözés $x$-tengelyre: $(2;3) \\to (2;-3)$.
2. Eltolás $(+3;-1)$: $(2;-3) \\to (\\mathbf{5;-4})$.`
};
