export default {
  id: 'A-T-09',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Csillagkép pontja',
  difficulty: 2,
  scenario: 'A csillagkép négy fényes csillaga a koordináta-rendszerben látható.',
  question: 'Melyik csillag koordinátája **(−2; 3)**?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 2,
        y: 3
      },
      {
        label: 'B',
        x: -2,
        y: 3
      },
      {
        label: 'C',
        x: -2,
        y: -3
      },
      {
        label: 'D',
        x: 2,
        y: -3
      }
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'B',
  keywords: ['koordináták', 'csillagkép'],
  solution: `**Lépések:**

1. $x = -2$ → balra 2-t.
2. $y = 3$ → fel 3-at.
3. Ez a **B** csillag.`
};
