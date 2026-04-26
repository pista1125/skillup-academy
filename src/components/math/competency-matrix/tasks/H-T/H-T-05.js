export default {
  id: 'H-T-05',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kerékpáros túra távolsága',
  difficulty: 2,
  scenario: 'A vonaldiagram egy kerékpáros csapat megtett távolságát mutatja az óra függvényében.',
  question: 'Hány kilométert tettek meg **3 óra** alatt?',
  visual: {
    type: 'lineChart',
    xLabel: 'Idő (óra)',
    yLabel: 'Távolság (km)',
    yMin: 0,
    yMax: 80,
    series: [
      {
        name: 'Távolság',
        color: '#2563eb',
        points: [
          {
            x: '0',
            y: 0
          },
          {
            x: '1',
            y: 15
          },
          {
            x: '2',
            y: 30
          },
          {
            x: '3',
            y: 45
          },
          {
            x: '4',
            y: 60
          },
          {
            x: '5',
            y: 75
          }
        ]
      }
    ]
  },
  options: ['30 km', '40 km', '45 km', '60 km'],
  answer: '45 km',
  keywords: ['vonaldiagram', 'adatleolvasás'],
  solution: `**Leolvasás:**

Az $x = 3$ óra helyen a grafikon értéke **45 km**.

**A helyes válasz: 45 km.**`
};
