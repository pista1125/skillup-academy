export default {
  id: 'S-T-05',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Osztálykirándulás — vonaldiagram',
  difficulty: 2,
  scenario: 'Egy ötnapos osztálykirándulás során minden nap feljegyezték a délutáni hőmérsékletet.',
  question: 'Melyik napon volt a **legmelegebb** délután?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'Hőmérséklet (°C)',
    yMin: 10,
    yMax: 30,
    points: [
      {
        x: 'Hétfő',
        y: 18
      },
      {
        x: 'Kedd',
        y: 22
      },
      {
        x: 'Szerda',
        y: 25
      },
      {
        x: 'Csütörtök',
        y: 27
      },
      {
        x: 'Péntek',
        y: 24
      }
    ]
  },
  options: ['Hétfő', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'adatleolvasás', 'maximum'],
  solution: `**Leolvasás a vonaldiagramról:**

A pontok közül a legmagasabb **27 °C**, ami a **csütörtökhöz** tartozik.

**A helyes válasz: Csütörtök.**`
};
