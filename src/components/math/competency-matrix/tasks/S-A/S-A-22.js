export default {
  id: 'S-A-22',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medián pontdiagramról',
  difficulty: 4,
  scenario: 'Egy osztály hat tanulója egy kisdolgozaton ennyi pontot ért el.',
  question: 'Mennyi a **medián**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Pont',
    xMin: 0,
    xMax: 10,
    dots: [
      {
        x: 4,
        count: 1
      },
      {
        x: 6,
        count: 2
      },
      {
        x: 7,
        count: 1
      },
      {
        x: 8,
        count: 1
      },
      {
        x: 10,
        count: 1
      }
    ]
  },
  options: ['6', '6,5', '7', '7,5'],
  answer: '6,5',
  keywords: ['medián'],
  solution: `**Rendezés:** $4,\\,6,\\,6,\\,7,\\,8,\\,10$.

Páros elemszám (6) → a 3. és 4. elem átlaga:

$$\\text{medián} = \\dfrac{6+7}{2} = \\mathbf{6{,}5}$$

**A helyes válasz: 6,5.**`
};
