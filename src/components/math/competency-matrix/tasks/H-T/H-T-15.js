export default {
  id: 'H-T-15',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vízállás — Duna',
  difficulty: 2,
  scenario: 'A vonaldiagram a Duna vízállását mutatja egy héten át (cm).',
  question: 'Melyik napon volt a **legmagasabb** vízállás?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'cm',
    yMin: 200,
    yMax: 340,
    series: [
      {
        name: 'Vízállás',
        color: '#2563eb',
        points: [
          { x: 'Hé', y: 240 },
          { x: 'Ke', y: 260 },
          { x: 'Sze', y: 280 },
          { x: 'Csü', y: 305 },
          { x: 'Pé', y: 320 },
          { x: 'Szo', y: 295 },
          { x: 'Vas', y: 270 }
        ]
      }
    ]
  },
  options: ['Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
  answer: 'Péntek',
  keywords: ['vonaldiagram', 'vízállás'],
  solution: 'A legmagasabb pont: **320 cm** a(z) **péntek** napon.'
};
