export default {
  id: 'M-T-23',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Vonaldiagram — nyaralás hőmérséklete',
  difficulty: 2,
  scenario: 'Egy nyaralás során minden délben leolvasták a hőmérsékletet.',
  question: 'Melyik napon volt **a legalacsonyabb** hőmérséklet?',
  visual: {
    type: 'lineChart',
    caption: 'Déli hőmérséklet a nyaraláson',
    xLabels: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'],
    values: [28, 31, 27, 24, 26, 30, 32],
    yLabel: '°C'
  },
  options: ['Hétfő', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'leolvasás', 'nyaralás'],
  solution: 'A legalacsonyabb érték **24 °C**, ami **csütörtökön** volt. **Válasz: Csütörtök.**'
};
