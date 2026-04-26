export default {
  id: 'H-T-01',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérsékleti görbe',
  difficulty: 3,
  scenario: 'Az alábbi vonaldiagram egy októberi hét napjainak hőmérsékletét mutatja.',
  question: 'Melyik nap volt a legmelegebb?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: '°C',
    yMin: 0,
    yMax: 20,
    series: [
      {
        name: 'Hőmérséklet (°C)',
        color: '#ef4444',
        points: [
          {
            x: 'Hé',
            y: 12
          },
          {
            x: 'Ke',
            y: 14
          },
          {
            x: 'Sze',
            y: 17
          },
          {
            x: 'Csü',
            y: 18
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
  options: ['Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['diagram', 'adatleolvasás'],
  solution: `**Leolvasás:**

A görbe **csütörtökön** éri el a legnagyobb értékét: **18 °C**. Ennél magasabb oszlop nincs.

**A helyes válasz: Csütörtök.**`
};
