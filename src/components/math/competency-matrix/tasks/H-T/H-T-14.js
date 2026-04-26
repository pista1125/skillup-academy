export default {
  id: 'H-T-14',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérséklet — tavasz',
  difficulty: 2,
  scenario: 'A diagram egy hét napjainak átlaghőmérsékletét mutatja.',
  question: 'Melyik napon volt a **legmelegebb**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: '°C',
    yMin: 0,
    yMax: 29,
    series: [
      {
        name: 'Hőm.',
        color: '#ef4444',
        points: [
          {
            x: 'Hé',
            y: 18
          },
          {
            x: 'Ke',
            y: 20
          },
          {
            x: 'Sze',
            y: 22
          },
          {
            x: 'Csü',
            y: 24
          },
          {
            x: 'Pé',
            y: 21
          },
          {
            x: 'Szo',
            y: 19
          },
          {
            x: 'Vas',
            y: 17
          }
        ]
      }
    ]
  },
  options: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'adatleolvasás'],
  solution: 'A legmagasabb oszlop: **24°C** a(z) **csütörtök** napon.'
};
