export default {
  id: 'H-T-13',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérséklet — hét',
  difficulty: 2,
  scenario: 'A diagram egy hét napjainak átlaghőmérsékletét mutatja.',
  question: 'Melyik napon volt a **legmelegebb**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: '°C',
    yMin: 0,
    yMax: 20,
    series: [
      {
        name: 'Hőm.',
        color: '#ef4444',
        points: [
          {
            x: 'Hé',
            y: 10
          },
          {
            x: 'Ke',
            y: 12
          },
          {
            x: 'Sze',
            y: 14
          },
          {
            x: 'Csü',
            y: 15
          },
          {
            x: 'Pé',
            y: 13
          },
          {
            x: 'Szo',
            y: 9
          },
          {
            x: 'Vas',
            y: 8
          }
        ]
      }
    ]
  },
  options: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'adatleolvasás'],
  solution: 'A legmagasabb oszlop: **15°C** a(z) **csütörtök** napon.'
};
