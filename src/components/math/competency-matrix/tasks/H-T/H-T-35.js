export default {
  id: 'H-T-35',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Energiafogyasztás',
  difficulty: 3,
  scenario: 'Egy család napi áramfogyasztását (kWh) ábrázoltuk.',
  question: 'Melyik napon fogyasztottak a **legkevesebbet**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'kWh',
    yMin: 0,
    yMax: 20,
    series: [
      {
        name: 'Fogyasztás',
        color: '#f59e0b',
        points: [
          { x: 'Hé', y: 12 },
          { x: 'Ke', y: 14 },
          { x: 'Sze', y: 9 },
          { x: 'Csü', y: 11 },
          { x: 'Pé', y: 15 },
          { x: 'Szo', y: 18 },
          { x: 'Vas', y: 16 }
        ]
      }
    ]
  },
  options: ['Hétfő', 'Szerda', 'Csütörtök', 'Szombat'],
  answer: 'Szerda',
  keywords: ['vonaldiagram', 'minimum'],
  solution: 'A legalacsonyabb pont: **9 kWh** szerdán.'
};
