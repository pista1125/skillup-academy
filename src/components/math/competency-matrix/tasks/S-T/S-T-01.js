export default {
  id: 'S-T-01',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc gyümölcsök — oszlopdiagram',
  difficulty: 2,
  scenario: 'A 6.a osztályban megkérdezték a tanulókat, melyik a kedvenc gyümölcsük. A válaszokat az alábbi oszlopdiagram mutatja.',
  question: 'Hány tanuló választotta az **almát**?',
  visual: {
    type: 'barChart',
    xLabel: 'Gyümölcs',
    yLabel: 'Tanulók száma',
    yMin: 0,
    yMax: 12,
    bars: [
      {
        label: 'Alma',
        value: 8,
        color: '#ef4444'
      },
      {
        label: 'Banán',
        value: 6,
        color: '#facc15'
      },
      {
        label: 'Körte',
        value: 4,
        color: '#22c55e'
      },
      {
        label: 'Szőlő',
        value: 5,
        color: '#8b5cf6'
      },
      {
        label: 'Eper',
        value: 7,
        color: '#ec4899'
      }
    ]
  },
  options: ['6', '7', '8', '10'],
  answer: '8',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: `**Leolvasás az oszlopdiagramról:**

Az **alma** oszlopa a **8**-as értékig ér fel.

**A helyes válasz: 8 tanuló.**`
};
