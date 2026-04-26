export default {
  id: 'H-T-16',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Iskolai verseny — pontszámok',
  difficulty: 2,
  scenario: 'A diagram öt tanuló pontszámát mutatja egy matematikaversenyen.',
  question: 'Hány pontot ért el **Dóra**?',
  visual: {
    type: 'barChart',
    xLabel: 'Tanuló',
    yLabel: 'Pont',
    bars: [
      { label: 'Anna', value: 62 },
      { label: 'Béla', value: 78 },
      { label: 'Csaba', value: 55 },
      { label: 'Dóra', value: 91 },
      { label: 'Eszter', value: 73 }
    ]
  },
  options: ['78', '82', '91', '95'],
  answer: '91',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: 'Dóra oszlopa a legmagasabb: **91 pont**.'
};
