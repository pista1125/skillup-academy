export default {
  id: 'H-K-22',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Autó sebessége × fogyasztás',
  difficulty: 6,
  scenario: 'A pontdiagram egy autó sebességét (km/h) és a 100 km-re vetített fogyasztását (L) mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Sebesség (km/h)',
    yLabel: 'L/100 km',
    xMin: 40,
    xMax: 160,
    yMin: 4,
    yMax: 14,
    points: [
      { x: 50, y: 6.5 },
      { x: 70, y: 5.8 },
      { x: 90, y: 5.6 },
      { x: 110, y: 6.2 },
      { x: 130, y: 8 },
      { x: 150, y: 11 }
    ]
  },
  options: ['U-alakú: 90 km/h körül minimum', 'Mindig csökken', 'Mindig nő', 'Nincs kapcsolat'],
  answer: 'U-alakú: 90 km/h körül minimum',
  keywords: ['pontdiagram', 'nem lineáris'],
  solution: 'A fogyasztás **90 km/h körül minimum**; kisebb és nagyobb sebességnél is nő.'
};
