export default {
  id: 'S-A-31',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Osztály átlagjegy',
  difficulty: 4,
  scenario: 'A 20 fős osztály történelemdolgozatának jegyeloszlása az alábbi oszlopdiagramon látható.',
  question: 'Mennyi az **átlagjegy**?',
  visual: {
    type: 'barChart',
    xLabel: 'Jegy',
    yLabel: 'Tanulók',
    yMin: 0,
    yMax: 10,
    bars: [
      {
        label: '2',
        value: 2,
        color: '#ef4444'
      },
      {
        label: '3',
        value: 5,
        color: '#f97316'
      },
      {
        label: '4',
        value: 8,
        color: '#eab308'
      },
      {
        label: '5',
        value: 5,
        color: '#22c55e'
      }
    ]
  },
  options: ['3,6', '3,8', '3,9', '4,2'],
  answer: '3,8',
  keywords: ['súlyozott átlag'],
  solution: `$$\\bar{x} = \\dfrac{2 \\cdot 2 + 3 \\cdot 5 + 4 \\cdot 8 + 5 \\cdot 5}{20} = \\dfrac{4+15+32+25}{20} = \\dfrac{76}{20} = \\mathbf{3{,}8}$$

**A helyes válasz: 3,8.**`
};
