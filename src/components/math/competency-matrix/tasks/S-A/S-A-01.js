export default {
  id: 'S-A-01',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Dolgozatok átlaga',
  difficulty: 4,
  scenario: 'Zsófi öt matematikadolgozatot írt. A kapott jegyei az alábbi pontdiagramon láthatók.',
  question: 'Mennyi Zsófi jegyeinek **átlaga**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Jegy',
    xMin: 1,
    xMax: 5,
    dots: [
      {
        x: 3,
        count: 1
      },
      {
        x: 4,
        count: 2
      },
      {
        x: 5,
        count: 2
      }
    ]
  },
  options: ['3,8', '4,0', '4,2', '4,5'],
  answer: '4,2',
  keywords: ['átlag', 'számtani közép'],
  solution: `**Számtani átlag:**

A jegyek: $3, 4, 4, 5, 5$.

$$\\bar{x} = \\dfrac{3+4+4+5+5}{5} = \\dfrac{21}{5} = \\mathbf{4{,}2}$$

**A helyes válasz: 4,2.**`
};
